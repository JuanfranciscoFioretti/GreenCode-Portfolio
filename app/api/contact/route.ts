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

    // Verificar variables de entorno
    if (!process.env.RESEND_API_KEY || !process.env.EMAIL_RECEIVER) {
      console.error('Email configuration missing');
      return NextResponse.json(
        { success: false, error: 'Server configuration error' },
        { status: 500 }
      );
    }

    // Enviar email principal (para ti)
    const mainEmailResult = await resend.emails.send({
      from: process.env.EMAIL_FROM || 'contacto@tudominio.com', // Debe ser un dominio verificado en Resend
      to: [process.env.EMAIL_RECEIVER!], // Tu email donde quieres recibir los mensajes
      subject: `Nuevo mensaje de contacto de ${sanitizedData.name}`,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background: #f8fafc;">
          <div style="background: linear-gradient(135deg, #00FF66, #FF00FF); padding: 1px; border-radius: 12px;">
            <div style="background: white; border-radius: 11px; padding: 40px;">
              <h1 style="color: #1a202c; margin: 0 0 30px 0; font-size: 28px; font-weight: bold; text-align: center;">
                Nuevo Mensaje de Contacto 🚀
              </h1>
              
              <div style="background: #f7fafc; padding: 25px; border-radius: 10px; margin: 25px 0; border-left: 4px solid #00FF66;">
                <h2 style="color: #2d3748; margin: 0 0 15px 0; font-size: 18px;">Información del Contacto:</h2>
                <p style="margin: 8px 0; color: #4a5568;"><strong>Nombre:</strong> ${sanitizedData.name}</p>
                <p style="margin: 8px 0; color: #4a5568;"><strong>Email:</strong> <a href="mailto:${sanitizedData.email}" style="color: #00FF66; text-decoration: none;">${sanitizedData.email}</a></p>
                <p style="margin: 8px 0; color: #4a5568;"><strong>Fecha:</strong> ${new Date().toLocaleDateString('es-ES')} a las ${new Date().toLocaleTimeString('es-ES')}</p>
              </div>
              
              <div style="background: #fff; padding: 25px; border: 2px solid #e2e8f0; border-radius: 10px;">
                <h2 style="color: #2d3748; margin: 0 0 15px 0; font-size: 18px;">Mensaje:</h2>
                <div style="background: #f9f9f9; padding: 15px; border-radius: 8px; border-left: 3px solid #FF00FF;">
                  <p style="line-height: 1.6; color: #4a5568; white-space: pre-wrap; margin: 0;">${sanitizedData.message}</p>
                </div>
              </div>
              
              <div style="margin-top: 30px; padding: 20px; background: linear-gradient(135deg, #e6fffa, #f0fff4); border-radius: 10px; text-align: center;">
                <p style="margin: 0; color: #2d3748; font-size: 14px;">
                  📧 <strong>Responder:</strong> Puedes responder directamente a este email para contactar al usuario.
                </p>
                <p style="margin: 5px 0 0 0; color: #718096; font-size: 12px;">
                  ID de mensaje: ${Date.now()}-${Math.random().toString(36).substring(2, 9)}
                </p>
              </div>
            </div>
          </div>
        </div>
      `,
      replyTo: sanitizedData.email,
    });

    // Enviar email de confirmación al usuario
    const confirmationEmailResult = await resend.emails.send({
      from: process.env.EMAIL_FROM || 'noreply@tudominio.com',
      to: [sanitizedData.email],
      subject: '✅ Confirmación: Hemos recibido tu mensaje',
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #00FF66, #FF00FF); padding: 1px; border-radius: 12px;">
            <div style="background: white; border-radius: 11px; padding: 40px; text-align: center;">
              <div style="background: linear-gradient(135deg, #00FF66, #00d9f4); width: 80px; height: 80px; border-radius: 50%; margin: 0 auto 30px auto; display: flex; align-items: center; justify-content: center;">
                <span style="color: white; font-size: 40px; font-weight: bold;">✓</span>
              </div>
              
              <h1 style="color: #1a202c; margin: 0 0 20px 0; font-size: 28px; font-weight: bold;">
                ¡Gracias por contactarnos! 🎉
              </h1>
              
              <p style="color: #4a5568; font-size: 16px; line-height: 1.6; margin-bottom: 30px;">
                Hola <strong style="color: #00FF66;">${sanitizedData.name}</strong>, hemos recibido tu mensaje correctamente. 
                Te responderemos lo antes posible.
              </p>
              
              <div style="background: #f7fafc; padding: 25px; border-radius: 10px; margin: 30px 0; text-align: left; border-left: 4px solid #FF00FF;">
                <h3 style="margin: 0 0 15px 0; color: #2d3748; font-size: 16px;">Resumen de tu mensaje:</h3>
                <p style="color: #718096; font-style: italic; line-height: 1.5; margin: 0; white-space: pre-wrap;">"${sanitizedData.message}"</p>
              </div>
              
              <div style="background: linear-gradient(135deg, #f0f9ff, #e0f2fe); padding: 20px; border-radius: 10px; margin: 30px 0;">
                <h3 style="color: #0369a1; margin: 0 0 10px 0; font-size: 16px;">¿Qué sigue ahora?</h3>
                <ul style="color: #0369a1; text-align: left; margin: 0; padding-left: 20px;">
                  <li style="margin-bottom: 5px;">Revisaremos tu mensaje en las próximas horas</li>
                  <li style="margin-bottom: 5px;">Te responderemos directamente a este email</li>
                  <li>Si es urgente, también puedes contactarnos por otros medios</li>
                </ul>
              </div>
              
              <div style="margin-top: 40px; padding: 20px; background: #fff3cd; border-radius: 8px; border: 1px solid #ffeaa7;">
                <p style="margin: 0; color: #856404; font-size: 14px;">
                  💡 <strong>Tip:</strong> Revisa tu bandeja de spam por si nuestra respuesta llega ahí.
                  Agrega nuestro email a tu lista de contactos para evitarlo.
                </p>
              </div>
              
              <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
                <p style="color: #a0aec0; font-size: 12px; margin: 0;">
                  Si no enviaste este mensaje, por favor ignora este email.
                </p>
                <p style="color: #a0aec0; font-size: 12px; margin: 5px 0 0 0;">
                  Enviado el ${new Date().toLocaleDateString('es-ES')} a las ${new Date().toLocaleTimeString('es-ES')}
                </p>
              </div>
            </div>
          </div>
        </div>
      `,
    });

    // Log en modo desarrollo
    if (process.env.DEBUG_MODE === 'true') {
      console.log('Emails sent successfully:', {
        mainEmail: mainEmailResult.data?.id,
        confirmationEmail: confirmationEmailResult.data?.id,
        from: sanitizedData.email,
        name: sanitizedData.name,
        timestamp: new Date().toISOString()
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Emails sent successfully',
      details: {
        mainEmailId: mainEmailResult.data?.id,
        confirmationEmailId: confirmationEmailResult.data?.id
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