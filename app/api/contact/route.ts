import { NextRequest, NextResponse } from 'next/server';
import { checkContactRateLimit } from '@/lib/rateLimit';
import { sanitizeContactFormData } from '@/lib/sanitize';

// ============================================================================
// Backend API Configuration
// ============================================================================
import { BACKEND_URL } from '@/lib/config';

const BACKEND_TIMEOUT = 30000; // 30 seconds timeout

// ============================================================================
// API Route Handler - Proxies requests to backend API
// ============================================================================

export async function POST(request: NextRequest) {
    // Rate limiting: 10 requests per 15 minutes per IP
    const rateLimitResponse = checkContactRateLimit(request);
    if (rateLimitResponse) {
        return rateLimitResponse;
    }

    try {
        const rawBody = await request.json();

        // Sanitize all input data before processing
        const sanitizedBody = sanitizeContactFormData(rawBody);

        // Validate required fields after sanitization
        if (!sanitizedBody.name || sanitizedBody.name.length < 2) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Name is required and must be at least 2 characters.',
                    errors: [{ field: 'name', message: 'Name is required and must be at least 2 characters.' }],
                },
                { status: 400 }
            );
        }

        if (!sanitizedBody.email || !sanitizedBody.email.includes('@')) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Valid email is required.',
                    errors: [{ field: 'email', message: 'Valid email is required.' }],
                },
                { status: 400 }
            );
        }

        if (!sanitizedBody.countryCode || sanitizedBody.countryCode.length < 1) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Country code is required.',
                    errors: [{ field: 'countryCode', message: 'Country code is required.' }],
                },
                { status: 400 }
            );
        }

        if (!sanitizedBody.phone || sanitizedBody.phone.length < 7) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Phone number is required and must be at least 7 digits.',
                    errors: [{ field: 'phone', message: 'Phone number is required and must be at least 7 digits.' }],
                },
                { status: 400 }
            );
        }

        if (!sanitizedBody.projectDescription || sanitizedBody.projectDescription.length < 20) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Project description is required and must be at least 20 characters.',
                    errors: [{ field: 'projectDescription', message: 'Project description is required and must be at least 20 characters.' }],
                },
                { status: 400 }
            );
        }

        // Extract metadata from request headers (backend will use these if provided)
        const ipAddress = request.headers.get('x-forwarded-for')?.split(',')[0].trim() || 
                         request.headers.get('x-real-ip') || null;
        const userAgent = request.headers.get('user-agent') || null;
        const referrerUrl = request.headers.get('referer') || null;
        
        // Extract UTM parameters from URL
        const url = new URL(request.url);
        const utmSource = url.searchParams.get('utm_source') || null;
        const utmMedium = url.searchParams.get('utm_medium') || null;
        const utmCampaign = url.searchParams.get('utm_campaign') || null;

        // Prepare payload with sanitized data and metadata
        const payload = {
            ...sanitizedBody,
            ipAddress: ipAddress || undefined,
            userAgent: userAgent || undefined,
            referrerUrl: referrerUrl || undefined,
            utmSource: utmSource || undefined,
            utmMedium: utmMedium || undefined,
            utmCampaign: utmCampaign || undefined,
        };

        // Forward request to backend API with timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), BACKEND_TIMEOUT);

        try {
            // Log the backend URL being used (for debugging)
            console.log(`[Contact API] Attempting to connect to backend: ${BACKEND_URL}/api/contact`);

            const backendResponse = await fetch(`${BACKEND_URL}/api/contact`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
                signal: controller.signal,
            });

            clearTimeout(timeoutId);

            if (!backendResponse.ok) {
                const errorData = await backendResponse.json().catch(() => ({}));
                console.error('[Contact API] Backend returned error:', backendResponse.status, errorData);
                return NextResponse.json(
                    {
                        success: false,
                        message: errorData.message || 'Backend server error. Please try again later.',
                        errors: errorData.errors || [],
                    },
                    { status: backendResponse.status }
                );
            }

            const data = await backendResponse.json();
            console.log('[Contact API] Successfully submitted contact form');

            // Forward the response from backend
            return NextResponse.json(data, { status: backendResponse.status });
        } catch (fetchError: any) {
            clearTimeout(timeoutId);
            
            // Log the full error for debugging
            console.error('[Contact API] Fetch error:', {
                name: fetchError.name,
                code: fetchError.code,
                message: fetchError.message,
                cause: fetchError.cause,
                backendUrl: BACKEND_URL,
            });
            
            // Handle specific error types
            if (fetchError.name === 'AbortError') {
                return NextResponse.json(
                    {
                        success: false,
                        message: 'Request timeout. The server took too long to respond. Please try again.',
                    },
                    { status: 504 }
                );
            }

            // Handle connection errors
            if (
                fetchError.code === 'ECONNREFUSED' || 
                fetchError.code === 'ECONNRESET' ||
                fetchError.cause?.code === 'ECONNREFUSED' ||
                fetchError.cause?.code === 'ECONNRESET' ||
                fetchError.message?.includes('ECONNREFUSED') ||
                fetchError.message?.includes('ECONNRESET') ||
                fetchError.message?.includes('fetch failed')
            ) {
                const errorMessage = `Cannot connect to backend server at ${BACKEND_URL}. ` +
                    `Please ensure the backend server is running. ` +
                    `Start it by running 'npm run dev' in the Backend folder.`;

                return NextResponse.json(
                    {
                        success: false,
                        message: errorMessage,
                        error: 'BACKEND_CONNECTION_ERROR',
                        backendUrl: BACKEND_URL,
                        troubleshooting: [
                            '1. Check if backend server is running: cd Backend && npm run dev',
                            '2. Verify backend is running on port 3100',
                            '3. Check NEXT_PUBLIC_BACKEND_URL environment variable',
                            '4. Ensure no firewall is blocking the connection',
                        ],
                    },
                    { status: 503 }
                );
            }

            // Re-throw unknown errors
            throw fetchError;
        }
    } catch (error: any) {
        console.error('Contact form error:', error);

        // Handle JSON parsing errors
        if (error instanceof SyntaxError) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Invalid request data. Please check your input and try again.',
                },
                { status: 400 }
            );
        }

        return NextResponse.json(
            {
                success: false,
                message: 'An error occurred while processing your request. Please try again later.',
            },
            { status: 500 }
        );
    }
}

export async function GET(request: NextRequest) {
    return NextResponse.json(
        {
            message: 'Contact API endpoint. Use POST to submit a contact form.',
        },
        { status: 200 }
    );
}
