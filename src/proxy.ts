import createMiddleware from 'next-intl/middleware';
import { locales } from './i18n/request';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const nextIntlMiddleware = createMiddleware({
  locales,
  defaultLocale: 'pt-BR'
});

export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const legacyRoutes: Record<string, string> = {
    '/quem-somos': '/pt-BR/quem-somos',
    '/distribuidor': '/pt-BR/distribuidor',
    '/fale-conosco': '/pt-BR/fale-conosco',
    '/formas-de-pagamento': '/pt-BR/formas-de-pagamento',
    '/fretes-e-prazo': '/pt-BR/fretes-e-prazo',
    '/politica-de-privacidade': '/pt-BR/politica-de-privacidade',
    '/trocas-e-devolucoes': '/pt-BR/trocas-e-devolucoes',
    '/private-label': '/pt-BR/private-label',
    '/terceirizacao-de-comesticos-private-label': '/pt-BR/terceirizacao-de-comesticos-private-label',
    '/terceirizacao-de-cosmeticos-private-label': '/pt-BR/terceirizacao-de-cosmeticos-private-label'
  };

  const redirectTarget = legacyRoutes[pathname];

  if (redirectTarget) {
    return NextResponse.redirect(new URL(`${redirectTarget}${search}`, request.url), 308);
  }

  return nextIntlMiddleware(request);
}

export const config = {
  matcher: [
    '/',
    '/(pt-BR|en|es)/:path*',
    '/quem-somos',
    '/distribuidor',
    '/fale-conosco',
    '/formas-de-pagamento',
    '/fretes-e-prazo',
    '/politica-de-privacidade',
    '/trocas-e-devolucoes',
    '/private-label',
    '/terceirizacao-de-comesticos-private-label',
    '/terceirizacao-de-cosmeticos-private-label'
  ]
};
