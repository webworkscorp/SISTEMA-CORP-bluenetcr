import { createClient } from '@supabase/supabase-js';

const rawUrl = (import.meta as any).env.VITE_SUPABASE_URL || 'https://tywmtnrckhdernqbqbdt.supabase.co';
const rawKey = (import.meta as any).env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR5d210bnJja2hkZXJucWJxYmR0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ2MDQ1MTAsImV4cCI6MjEwMDE4MDUxMH0.wLS5Zb6fVTFHNIVtxSLRB8Xw_l_fm5PXLwrEwelPgkU';

const supabaseUrl = typeof rawUrl === 'string' ? rawUrl.replace(/^['"]|['"]$/g, '') : rawUrl;
const supabaseAnonKey = typeof rawKey === 'string' ? rawKey.replace(/^['"]|['"]$/g, '') : rawKey;

// Envoltorio personalizado de fetch para evitar que el interceptor del sandbox/iframe
// pierda las cabeceras personalizadas o falle al procesar objetos Request.
const customFetch = async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
  let urlStr = '';
  let options: RequestInit = {};

  if (input instanceof Request) {
    urlStr = input.url;
    
    // Copiar cabeceras desde el objeto Request
    const headers: Record<string, string> = {};
    input.headers.forEach((value, key) => {
      headers[key] = value;
    });

    options = {
      method: input.method,
      headers: {
        ...headers,
        ...(init?.headers || {})
      },
      referrer: input.referrer,
      referrerPolicy: input.referrerPolicy,
      mode: input.mode,
      credentials: input.credentials,
      cache: input.cache,
      redirect: input.redirect,
      integrity: input.integrity,
      keepalive: input.keepalive,
      signal: input.signal,
      ...init
    };

    // Si hay cuerpo, leerlo apropiadamente según el tipo
    if (input.body !== null && !['GET', 'HEAD'].includes(options.method || '')) {
      try {
        options.body = await input.clone().text();
      } catch (e) {
        options.body = input.body;
      }
    }
  } else {
    urlStr = typeof input === 'string' ? input : (input as any).toString();
    options = { ...init };
  }

  // Asegurar que el objeto de cabeceras exista
  if (!options.headers) {
    options.headers = {};
  }

  const headersRecord = options.headers as Record<string, string>;

  // Forzar cabeceras apikey y Authorization
  if (!headersRecord['apikey'] && !headersRecord['ApiKey']) {
    headersRecord['apikey'] = supabaseAnonKey;
  }
  if (!headersRecord['Authorization'] && !headersRecord['authorization']) {
    headersRecord['Authorization'] = `Bearer ${supabaseAnonKey}`;
  }

  // AGREGADO DE SEGURIDAD EXTREMA: Añadir 'apikey' como parámetro query en la URL para Supabase.
  // Esto es un respaldo infalible. Incluso si un interceptor de iframe o un proxy de red
  // elimina o altera las cabeceras, Supabase acepta el parámetro de URL 'apikey' para autenticar.
  try {
    const urlObj = new URL(urlStr);
    if (urlObj.hostname.includes('supabase.co')) {
      urlObj.searchParams.set('apikey', supabaseAnonKey);
      urlStr = urlObj.toString();
    }
  } catch (e) {
    if (urlStr.includes('supabase.co') && !urlStr.includes('apikey=')) {
      const separator = urlStr.includes('?') ? '&' : '?';
      urlStr = `${urlStr}${separator}apikey=${supabaseAnonKey}`;
    }
  }

  // IMPORTANTE: Siempre pasamos una URL de tipo string y un objeto plano de opciones
  // al fetch nativo global. Esto evita fallos en los interceptores de iframe/sandbox
  // que no saben manejar u clonar objetos Request de manera correcta.
  return fetch(urlStr, options);
};

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    flowType: 'pkce'
  },
  global: {
    fetch: customFetch
  }
});

