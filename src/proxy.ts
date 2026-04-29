import createMiddleware from 'next-intl/middleware';
import { locales } from './i18n/request';

export default createMiddleware({
  locales,
  defaultLocale: 'pt-BR'
});

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(pt-BR|en|es)/:path*']
};
