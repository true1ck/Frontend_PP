import { NextRequest, NextResponse } from 'next/server';
import { checkContactRateLimit } from '@/lib/rateLimit';

// ============================================================================
// Backend API Configuration
// ============================================================================
const BACKEND_API_URL = process.env.BACKEND_API_URL || 'http://localhost:3100';

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
        const body = await request.json();

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

        // Forward request to backend API with metadata
        const backendResponse = await fetch(`${BACKEND_API_URL}/api/contact`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...body,
                ipAddress,
                userAgent,
                referrerUrl,
                utmSource,
                utmMedium,
                utmCampaign,
            }),
        });

        const data = await backendResponse.json();

        // Forward the response from backend
        return NextResponse.json(data, { status: backendResponse.status });
    } catch (error) {
        console.error('Contact form error:', error);

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
