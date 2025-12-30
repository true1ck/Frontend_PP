import { NextRequest, NextResponse } from 'next/server';
import { checkCareerRateLimit } from '@/lib/rateLimit';

// ============================================================================
// Backend API Configuration
// ============================================================================
const BACKEND_API_URL = process.env.BACKEND_API_URL || 'http://localhost:3100';

// ============================================================================
// API Route Handler
// ============================================================================

export async function POST(request: NextRequest) {
    // Rate limiting: 5 requests per 15 minutes per IP
    const rateLimitResponse = checkCareerRateLimit(request);
    if (rateLimitResponse) {
        return rateLimitResponse;
    }

    try {
        const body = await request.json();

        // Forward request to backend API
        const backendResponse = await fetch(`${BACKEND_API_URL}/api/careers/subscribe`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...body,
                source: 'website', // Add source tracking
            }),
        });

        const data = await backendResponse.json();

        // Forward the response from backend
        return NextResponse.json(data, { status: backendResponse.status });
    } catch (error) {
        console.error('Career subscription error:', error);

        return NextResponse.json(
            {
                success: false,
                message: 'An error occurred. Please try again later.',
            },
            { status: 500 }
        );
    }
}
