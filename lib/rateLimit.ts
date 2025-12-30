import { NextRequest, NextResponse } from 'next/server';

/**
 * In-memory rate limit store
 * In production, consider using Redis or a database for distributed systems
 */
interface RateLimitEntry {
    count: number;
    resetTime: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();

/**
 * Clean up expired entries periodically (every 5 minutes)
 */
setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of rateLimitStore.entries()) {
        if (now > entry.resetTime) {
            rateLimitStore.delete(key);
        }
    }
}, 5 * 60 * 1000);

/**
 * Rate limiting utility for Next.js API routes
 * 
 * @param ip - Client IP address
 * @param maxRequests - Maximum number of requests allowed
 * @param windowMs - Time window in milliseconds
 * @returns Object with allowed status and remaining requests
 */
export function rateLimit(
    ip: string,
    maxRequests: number,
    windowMs: number
): { allowed: boolean; remaining: number; resetTime: number } {
    const now = Date.now();
    const key = ip;

    // Get or create entry
    let entry = rateLimitStore.get(key);

    // If entry doesn't exist or has expired, create new one
    if (!entry || now > entry.resetTime) {
        entry = {
            count: 1,
            resetTime: now + windowMs,
        };
        rateLimitStore.set(key, entry);
        return {
            allowed: true,
            remaining: maxRequests - 1,
            resetTime: entry.resetTime,
        };
    }

    // Check if limit exceeded
    if (entry.count >= maxRequests) {
        return {
            allowed: false,
            remaining: 0,
            resetTime: entry.resetTime,
        };
    }

    // Increment count
    entry.count++;
    rateLimitStore.set(key, entry);

    return {
        allowed: true,
        remaining: maxRequests - entry.count,
        resetTime: entry.resetTime,
    };
}

/**
 * Get client IP address from request
 */
export function getClientIP(request: NextRequest): string {
    // Check various headers for IP address
    const forwardedFor = request.headers.get('x-forwarded-for');
    if (forwardedFor) {
        // x-forwarded-for can contain multiple IPs, take the first one
        return forwardedFor.split(',')[0].trim();
    }

    const realIP = request.headers.get('x-real-ip');
    if (realIP) {
        return realIP;
    }

    // Fallback to a default (shouldn't happen in production)
    return 'unknown';
}

/**
 * Rate limit middleware for contact form
 * 10 requests per 15 minutes per IP
 */
export function checkContactRateLimit(request: NextRequest): NextResponse | null {
    const ip = getClientIP(request);
    const result = rateLimit(ip, 10, 15 * 60 * 1000); // 10 requests per 15 minutes

    if (!result.allowed) {
        const resetDate = new Date(result.resetTime);
        return NextResponse.json(
            {
                success: false,
                message: 'Too many contact form submissions. Please try again later.',
                retryAfter: resetDate.toISOString(),
            },
            {
                status: 429,
                headers: {
                    'Retry-After': Math.ceil((result.resetTime - Date.now()) / 1000).toString(),
                    'X-RateLimit-Limit': '10',
                    'X-RateLimit-Remaining': '0',
                    'X-RateLimit-Reset': resetDate.toISOString(),
                },
            }
        );
    }

    return null; // Rate limit passed
}

/**
 * Rate limit middleware for career subscriptions
 * 5 requests per 15 minutes per IP
 */
export function checkCareerRateLimit(request: NextRequest): NextResponse | null {
    const ip = getClientIP(request);
    const result = rateLimit(ip, 5, 15 * 60 * 1000); // 5 requests per 15 minutes

    if (!result.allowed) {
        const resetDate = new Date(result.resetTime);
        return NextResponse.json(
            {
                success: false,
                message: 'Too many subscription attempts. Please try again later.',
                retryAfter: resetDate.toISOString(),
            },
            {
                status: 429,
                headers: {
                    'Retry-After': Math.ceil((result.resetTime - Date.now()) / 1000).toString(),
                    'X-RateLimit-Limit': '5',
                    'X-RateLimit-Remaining': '0',
                    'X-RateLimit-Reset': resetDate.toISOString(),
                },
            }
        );
    }

    return null; // Rate limit passed
}

