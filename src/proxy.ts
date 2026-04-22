import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['pt-BR', 'en', 'es'],
  defaultLocale: 'pt-BR'
});

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(pt-BR|en|es)/:path*']
};
