const LOJA_INTEGRADA_BASE_URL =
  process.env.LOJA_INTEGRADA_BASE_URL || 'https://api.awsli.com.br';

const LOJA_INTEGRADA_API_KEY =
  process.env.LOJA_INTEGRADA_API_KEY || process.env.LOJA_INTEGRADA_API;
const LOJA_INTEGRADA_APPLICATION_KEY =
  process.env.LOJA_INTEGRADA_APPLICATION_KEY || process.env.LOJA_INTEGRADA_APLICACAO;

function getAuthorizationHeader() {
  if (!LOJA_INTEGRADA_API_KEY || !LOJA_INTEGRADA_APPLICATION_KEY) {
    throw new Error(
      'Defina LOJA_INTEGRADA_API_KEY (ou LOJA_INTEGRADA_API) e LOJA_INTEGRADA_APPLICATION_KEY (ou LOJA_INTEGRADA_APLICACAO) em web/.env.local.',
    );
  }

  return `chave_api ${LOJA_INTEGRADA_API_KEY} aplicacao ${LOJA_INTEGRADA_APPLICATION_KEY}`;
}

function buildUrl(path: string, searchParams?: URLSearchParams) {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const url = new URL(normalizedPath, LOJA_INTEGRADA_BASE_URL);

  if (searchParams) {
    url.search = searchParams.toString();
  }

  return url;
}

export async function lojaIntegradaFetch<T>(
  path: string,
  init?: RequestInit & { searchParams?: URLSearchParams },
): Promise<T> {
  const { searchParams, headers, ...requestInit } = init || {};

  const response = await fetch(buildUrl(path, searchParams), {
    ...requestInit,
    headers: {
      Authorization: getAuthorizationHeader(),
      'Content-Type': 'application/json',
      ...headers,
    },
    cache: 'no-store',
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Loja Integrada ${response.status}: ${body}`);
  }

  return response.json() as Promise<T>;
}

export function sanitizeLojaIntegradaSearchParams(searchParams: URLSearchParams) {
  const sanitized = new URLSearchParams();

  for (const [key, value] of searchParams.entries()) {
    if (value.trim()) {
      sanitized.set(key, value);
    }
  }

  return sanitized;
}
