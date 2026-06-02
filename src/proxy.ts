import createMiddleware from 'next-intl/middleware';
import { locales } from './i18n/request';
import type { NextRequest } from 'next/server';

const nextIntlMiddleware = createMiddleware({
  locales,
  defaultLocale: 'pt-BR'
});

export function proxy(request: NextRequest) {
  return nextIntlMiddleware(request);
}

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(pt-BR|en|es)/:path*']
};
