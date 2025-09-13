import { NextRequest, NextResponse } from 'next/server';
import { sanitizeInput } from '../../lib/sanitize';
import { trackFormSubmission } from '../../lib/analytics';

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json();

    // Sanitize inputs
    const sanitizedData = {
      name: sanitizeInput(name),
      email: sanitizeInput(email),
      message: sanitizeInput(message),
    };

    // Here you would typically save to a database (MySQL/PostgreSQL)
    // For demo purposes, we just track the submission
    trackFormSubmission();

    return NextResponse.json({ message: 'Form submitted successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Form submission failed' }, { status: 500 });
  }
}