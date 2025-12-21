import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { query } from '@/lib/db';

// Validation schema
const contactSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email address'),
    company: z.string().optional(),
    projectDescription: z.string().min(20, 'Project description must be at least 20 characters'),
    budget: z.string().optional(),
    timeline: z.string().optional(),
});

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // Validate input
        const validatedData = contactSchema.parse(body);

        // Insert into database
        const insertQuery = `
      INSERT INTO leads (name, email, company, project_description, budget, timeline, created_at)
      VALUES ($1, $2, $3, $4, $5, $6, NOW())
      RETURNING id
    `;

        const result = await query(insertQuery, [
            validatedData.name,
            validatedData.email,
            validatedData.company || null,
            validatedData.projectDescription,
            validatedData.budget || null,
            validatedData.timeline || null,
        ]);

        // TODO: Send email notification (integrate with SendGrid, AWS SES, etc.)
        // await sendEmailNotification(validatedData);

        return NextResponse.json(
            {
                success: true,
                message: 'Thank you for your inquiry. We will get back to you within 24 hours.',
                leadId: result.rows[0].id,
            },
            { status: 201 }
        );
    } catch (error) {
        console.error('Contact form error:', error);

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
                message: 'An error occurred while processing your request. Please try again later.',
            },
            { status: 500 }
        );
    }
}
