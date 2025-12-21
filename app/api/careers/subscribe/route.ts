import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { query } from '@/lib/db';

// Validation schema
const subscribeSchema = z.object({
    email: z.string().email('Invalid email address'),
});

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // Validate input
        const validatedData = subscribeSchema.parse(body);

        // Check if email already exists
        const checkQuery = `
      SELECT id FROM career_subscribers WHERE email = $1
    `;
        const existing = await query(checkQuery, [validatedData.email]);

        if (existing.rows.length > 0) {
            return NextResponse.json(
                {
                    success: true,
                    message: 'You are already subscribed to our career updates.',
                },
                { status: 200 }
            );
        }

        // Insert into database
        const insertQuery = `
      INSERT INTO career_subscribers (email, subscribed_at)
      VALUES ($1, NOW())
      RETURNING id
    `;

        await query(insertQuery, [validatedData.email]);

        return NextResponse.json(
            {
                success: true,
                message: 'Thank you for subscribing! We will notify you when positions open up.',
            },
            { status: 201 }
        );
    } catch (error) {
        console.error('Career subscription error:', error);

        if (error instanceof z.ZodError) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Validation error',
                    errors: error.errors,
                },
                { status: 400 }
            );
        }

        return NextResponse.json(
            {
                success: false,
                message: 'An error occurred. Please try again later.',
            },
            { status: 500 }
        );
    }
}
