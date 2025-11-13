// app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';
import { rateLimit } from '../../../lib/rate-limit';
import { sanitizeInput, sanitizeEmail, sanitizeName, isContentSafe } from '../../../lib/sanitize';

// Inicializar Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// Configurar rate limiting
const limiter = rateLimit({
  maxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '10'),
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'), // 15 minutos
});

// Schema de validación con Zod
const contactSchema = z.object({
  name: z.string().min(1, 'Name is required').max(50, 'Name must be 50 characters or less'),
  email: z.string().email('Invalid email address').min(1, 'Email is required'),
  message: z.string().min(1, 'Message is required').max(500, 'Message must be 500 characters or less'),
});

interface MyError {
  message: string;
}

export async function POST(request: NextRequest) {
  try {
    // Aplicar rate limiting
    const rateLimitResult = limiter(request);
    if (!rateLimitResult.success) {
      return NextResponse.json(
        { 
          success: false, 
          error: rateLimitResult.error || 'Too many requests' 
        },
        { 
          status: 429,
          headers: {
            'Retry-After': rateLimitResult.retryAfter?.toString() || '900'
          }
        }
      );
    }

    // Parsear y validar el body con Zod
    let body;
    try {
      body = await request.json();
    } catch (parseError) {
      console.error('An error occurred while parsing JSON:', parseError);
      return NextResponse.json(
        { success: false, error: 'Invalid JSON format' },
        { status: 400 }
      );
    }

    // Validar con Zod
    const validationResult = contactSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Validation failed', 
          details: validationResult.error.issues.map(issue => issue.message)
        },
        { status: 400 }
      );
    }

    const validatedData = validationResult.data;

    // Sanitizar los datos
    const sanitizedData = {
      name: sanitizeName(validatedData.name),
      email: sanitizeEmail(validatedData.email),
      message: sanitizeInput(validatedData.message),
    };

    // Validación adicional de seguridad
    if (!isContentSafe(validatedData.message) || !isContentSafe(validatedData.name)) {
      return NextResponse.json(
        { success: false, error: 'Content contains potentially harmful elements' },
        { status: 400 }
      );
    }

    // Verificar que la sanitización no eliminó datos críticos
    if (!sanitizedData.name || !sanitizedData.email || !sanitizedData.message) {
      return NextResponse.json(
        { success: false, error: 'Invalid or potentially malicious content detected' },
        { status: 400 }
      );
    }

    // Verify required environment variables
    if (!process.env.RESEND_API_KEY || !process.env.EMAIL_RECEIVER || !process.env.EMAIL_FROM) {
      console.error('Email configuration missing: RESEND_API_KEY, EMAIL_RECEIVER, and EMAIL_FROM are required');
      return NextResponse.json(
        { success: false, error: 'Server configuration error: missing email settings. Please set RESEND_API_KEY, EMAIL_RECEIVER, and EMAIL_FROM.' },
        { status: 500 }
      );
    }

    // Send main email (to site owner) with refreshed aesthetics and gradient border
    const mainEmailResult = await resend.emails.send({
      from: process.env.EMAIL_FROM, // Must be a verified sender in Resend
      to: [process.env.EMAIL_RECEIVER!],
      subject: `New contact message from ${sanitizedData.name}`,
      html: `
        <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial; max-width:700px; margin:0 auto; background:#f3f6fb; color:#0f1f2e;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
            <!-- Gradient border wrapper -->
            <tr>
              <td style="padding:0 24px 0 24px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:separate; border-spacing:0;">
                  <tr>
                    <td style="background:linear-gradient(135deg,#01f19d,#00d9f4); padding:2px; border-radius:16px;">
                      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:separate; border-spacing:0;">
                        <tr>
                          <td style="background:#ffffff; padding:28px; border-radius:14px; box-shadow:0 8px 24px rgba(16,42,67,0.08);">
                            <h1 style="margin:0 0 8px 0; font-size:22px; color:#0b1b28;">You have a new message</h1>
                            <p style="margin:0 0 18px 0; color:#3a4a5a;">These are the details submitted through your contact form:</p>

                            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:12px 0 18px 0;">
                              <tr>
                                <td style="padding:8px 0; font-weight:700; width:120px; color:#0f1f2e;">Name</td>
                                <td style="padding:8px 0; color:#3a4a5a;">${sanitizedData.name}</td>
                              </tr>
                              <tr>
                                <td style="padding:8px 0; font-weight:700; color:#0f1f2e;">Email</td>
                                <td style="padding:8px 0; color:#3a4a5a;"><a href="mailto:${sanitizedData.email}" style="color:#00d9f4; text-decoration:none;">${sanitizedData.email}</a></td>
                              </tr>
                              <tr>
                                <td style="padding:8px 0; font-weight:700; color:#0f1f2e;">Date</td>
                                <td style="padding:8px 0; color:#3a4a5a;">${new Date().toLocaleString('en-GB')}</td>
                              </tr>
                            </table>

                            <!-- Message card with subtle gradient left bar -->
                            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:separate; border-spacing:0;">
                              <tr>
                                <td style="background:#f6fbff; padding:16px; border-radius:12px; color:#334e68; border-left:4px solid transparent;">
                                  <div style="height:0; width:0; overflow:hidden;">&nbsp;</div>
                                  <div style="border-left:4px solid transparent; padding-left:12px; background-image:linear-gradient(180deg,#01f19d,#00d9f4); background-origin:border-box; background-clip:padding-box, border-box;">
                                    <strong style="display:block; margin-bottom:8px; color:#0b1b28;">Message</strong>
                                    <div style="white-space:pre-wrap; line-height:1.6; color:#0f1f2e;">${sanitizedData.message}</div>
                                  </div>
                                </td>
                              </tr>
                            </table>

                            <!-- Quick actions -->
                            <table role="presentation" cellpadding="0" cellspacing="0" style="margin-top:22px;">
                              <tr>
                                <td>
                                  <a href="mailto:${sanitizedData.email}" style="display:inline-block; padding:10px 16px; background:linear-gradient(90deg,#01f19d,#00d9f4); color:#000000; font-weight:700; text-decoration:none; border-radius:10px; box-shadow:0 8px 16px rgba(0,217,244,0.18);">Reply now</a>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:14px 24px 0 24px; text-align:center; color:#6b7280; font-size:12px;">
                <div style="display:inline-block; padding:8px 12px; background:#ffffff; border-radius:8px; border:1px solid #e8eef5;">Message ID: ${Date.now()}-${Math.random().toString(36).substring(2,9)}</div>
              </td>
            </tr>
            <tr>
              <td style="padding:12px 24px 40px 24px; text-align:center; color:#9aa3b2; font-size:12px;">
                Sent by your website contact form
              </td>
            </tr>
          </table>
        </div>
      `,
      replyTo: sanitizedData.email,
    });

    // Send confirmation email to the user
    const confirmationEmailResult = await resend.emails.send({
      // Must be a verified sender in Resend
      from: process.env.EMAIL_FROM,
      to: [sanitizedData.email],
      subject: 'Thank you — we received your message',
      // Plain-text alternative helps deliverability for some clients
      text: `Thanks ${sanitizedData.name},\n\nWe received your message and will get back to you as soon as possible.\n\nYour message:\n${sanitizedData.message}\n\nIf you don't hear from us within 48 hours, please check your spam folder.`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial; max-width:700px; margin:0 auto; background:#f7fafc; color:#102a43;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
            <tr>
              <td style="padding:28px 24px 0 24px; text-align:center;">
                <div style="width:72px; height:72px; margin:0 auto; border-radius:18px; background:linear-gradient(90deg,#0ea5a7,#7c3aed); display:flex; align-items:center; justify-content:center; color:#fff; font-weight:700; font-size:28px;">✓</div>
              </td>
            </tr>
            <tr>
              <td style="background:#ffffff; padding:28px; border-radius:12px; box-shadow:0 6px 18px rgba(16,42,67,0.06); text-align:left;">
                <h1 style="margin:0 0 12px 0; font-size:20px; color:#0b2447;">Thanks for reaching out!</h1>
                <p style="margin:0 0 18px 0; color:#334e68;">Hi <strong style="color:#0ea5a7;">${sanitizedData.name}</strong>, we received your message and will get back to you as soon as possible.</p>

                <div style="background:#f1f5f9; padding:16px; border-radius:8px; color:#334e68;">
                  <strong style="display:block; margin-bottom:8px; color:#0b2447;">Your message</strong>
                  <div style="white-space:pre-wrap; line-height:1.55;">"${sanitizedData.message}"</div>
                </div>

                <p style="margin:18px 0 0 0; color:#334e68;">If you don’t hear from us within 48 hours, please reply to this email or check your spam folder.</p>

                <div style="margin-top:22px; padding-top:18px; border-top:1px solid #eef2f7; font-size:13px; color:#6b7280;">
                  <div>Sent on ${new Date().toLocaleString('en-GB')}</div>
                </div>
              </td>
            </tr>
            <tr>
              <td style="padding:18px 0 50px 0; text-align:center; color:#9aa3b2; font-size:12px;">
                This is an automated confirmation from your website — please do not reply to this address.
              </td>
            </tr>
          </table>
        </div>
      `,
    });

    // Extract IDs from Resend response (SDK shapes may vary)
    const extractId = (res: unknown) => {
      if (!res || typeof res !== 'object') return null;
      const r = res as Record<string, unknown>;
      if (typeof r['id'] === 'string') return r['id'];
      if (r['data'] && typeof r['data'] === 'object') {
        const d = r['data'] as Record<string, unknown>;
        if (typeof d['id'] === 'string') return d['id'];
      }
      return null;
    };
    const mainEmailId = extractId(mainEmailResult);
    const confirmationEmailId = extractId(confirmationEmailResult);

    // Log in debug mode
    if (process.env.DEBUG_MODE === 'true') {
      console.log('Emails sent successfully:', {
        mainEmailResult,
        confirmationEmailResult,
        mainEmailId,
        confirmationEmailId,
        from: sanitizedData.email,
        name: sanitizedData.name,
        timestamp: new Date().toISOString()
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Emails sent successfully',
      details: {
        mainEmailId,
        confirmationEmailId
      }
    });

  } catch (error) {
    console.error('Contact form error:', error);
    
    // Errores específicos de Zod
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Validation failed', 
          details: error.issues.map(issue => `${issue.path.join('.')}: ${issue.message}`)
        },
        { status: 400 }
      );
    }
    
    // Errores específicos de Resend
    if (error && typeof error === 'object' && 'message' in error) {
      const errorMessage = (error as MyError).message;
      
      if (errorMessage.includes('API key')) {
        return NextResponse.json(
          { success: false, error: 'Email service authentication failed' },
          { status: 500 }
        );
      }
      
      if (errorMessage.includes('domain')) {
        return NextResponse.json(
          { success: false, error: 'Email domain not verified' },
          { status: 500 }
        );
      }
    }
    
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Método OPTIONS para CORS (si es necesario)
export async function OPTIONS(request: NextRequest) {
  console.log(request);
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}