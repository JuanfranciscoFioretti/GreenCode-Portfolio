// lib/rate-limit.ts - Protección contra spam
import { NextRequest } from 'next/server';

interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

// Store en memoria (para producción usa Redis o base de datos)
const store: RateLimitStore = {};

export function rateLimit(options: {
  maxRequests?: number;
  windowMs?: number;
  keyGenerator?: (req: NextRequest) => string;
} = {}) {
  const {
    maxRequests = 5, // 5 intentos
    windowMs = 15 * 60 * 1000, // 15 minutos
    keyGenerator = (req) => getClientIP(req) || 'unknown'
  } = options;

  return (req: NextRequest) => {
    const key = keyGenerator(req);
    const now = Date.now();
    
    // Limpiar entradas expiradas
    if (store[key] && store[key].resetTime < now) {
      delete store[key];
    }

    // Inicializar o obtener contador actual
    if (!store[key]) {
      store[key] = {
        count: 1,
        resetTime: now + windowMs
      };
      return { success: true, remaining: maxRequests - 1 };
    }

    // Verificar límite
    if (store[key].count >= maxRequests) {
      const timeLeft = Math.ceil((store[key].resetTime - now) / 1000);
      return {
        success: false,
        error: `Too many requests. Try again in ${timeLeft} seconds.`,
        retryAfter: timeLeft
      };
    }

    // Incrementar contador
    store[key].count++;
    return {
      success: true,
      remaining: maxRequests - store[key].count
    };
  };
}

function getClientIP(req: NextRequest): string | null {
  // Obtener IP del cliente considerando proxies
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0] ||
    req.headers.get('x-real-ip') ||
    req.headers.get('cf-connecting-ip') ||
    req.ip ||
    null
  );
}

// Ejemplo de uso en API route:
/*
const limiter = rateLimit({
  maxRequests: 3,
  windowMs: 15 * 60 * 1000, // 15 minutos
});

export async function POST(request: NextRequest) {
  const result = limiter(request);
  
  if (!result.success) {
    return NextResponse.json(
      { error: result.error },
      { 
        status: 429,
        headers: {
          'Retry-After': result.retryAfter?.toString() || '900'
        }
      }
    );
  }
  
  // Continuar con el procesamiento normal...
}
*/