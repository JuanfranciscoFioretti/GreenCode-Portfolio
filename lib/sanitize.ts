// lib/sanitize.ts
import DOMPurify from 'isomorphic-dompurify';

/**
 * Sanitiza el input del usuario para prevenir XSS y otros ataques
 * @param input - String a sanitizar
 * @returns String sanitizado
 */
export function sanitizeInput(input: string): string {
  if (!input || typeof input !== 'string') {
    return '';
  }

  // Configuración básica para texto plano
  const cleanInput = DOMPurify.sanitize(input, {
    ALLOWED_TAGS: [], // No permitir ningún tag HTML
    ALLOWED_ATTR: [], // No permitir ningún atributo
    KEEP_CONTENT: true, // Mantener el contenido de texto
  });

  // Escapar caracteres especiales adicionales
  return cleanInput
    .replace(/[<>]/g, '') // Remover < y > por seguridad extra
    .trim(); // Remover espacios al inicio y final
}

/**
 * Sanitiza input permitiendo algunos tags HTML básicos (para casos especiales)
 * @param input - String a sanitizar
 * @returns String sanitizado con HTML básico permitido
 */
export function sanitizeHTML(input: string): string {
  if (!input || typeof input !== 'string') {
    return '';
  }

  return DOMPurify.sanitize(input, {
    ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'u'],
    ALLOWED_ATTR: [],
  });
}

/**
 * Sanitiza email para asegurar formato correcto
 * @param email - Email a sanitizar
 * @returns Email sanitizado
 */
export function sanitizeEmail(email: string): string {
  if (!email || typeof email !== 'string') {
    return '';
  }

  // Primero sanitizar como texto normal
  const basicClean = DOMPurify.sanitize(email, {
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: [],
  });

  // Remover espacios y convertir a minúsculas
  const cleanEmail = basicClean.trim().toLowerCase();
  
  // Validación estricta de formato de email
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  
  return emailRegex.test(cleanEmail) ? cleanEmail : '';
}

/**
 * Sanitiza nombres permitiendo caracteres internacionales
 * @param name - Nombre a sanitizar
 * @returns Nombre sanitizado
 */
export function sanitizeName(name: string): string {
  if (!name || typeof name !== 'string') {
    return '';
  }

  const cleanName = DOMPurify.sanitize(name, {
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: [],
  });

  // Permitir letras (incluyendo acentos), espacios, guiones y apostrofes
  return cleanName
    .replace(/[^\p{L}\p{M}\s\-'\.]/gu, '') // Unicode para letras con acentos
    .replace(/\s+/g, ' ') // Normalizar espacios múltiples
    .trim()
    .substring(0, 100); // Limitar longitud
}

/**
 * Validador avanzado para detectar contenido potencialmente malicioso
 * @param input - Texto a validar
 * @returns true si el contenido parece seguro
 */
export function isContentSafe(input: string): boolean {
  if (!input || typeof input !== 'string') {
    return true;
  }

  // Patrones sospechosos
  const suspiciousPatterns = [
    /<script/i,
    /javascript:/i,
    /vbscript:/i,
    /onload=/i,
    /onerror=/i,
    /onclick=/i,
    /eval\(/i,
    /expression\(/i,
    /url\(/i,
    /import\s/i,
  ];

  return !suspiciousPatterns.some(pattern => pattern.test(input));
}