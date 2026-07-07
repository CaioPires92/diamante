import { getRequestConfig } from 'next-intl/server';

export const locales = ['pt-BR', 'en', 'es', 'ar'] as const;
export type Locale = (typeof locales)[number];
const defaultLocale: Locale = 'pt-BR';

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const normalizedLocale = requested?.split('/')[0];
  const locale = locales.includes(normalizedLocale as Locale)
    ? (normalizedLocale as Locale)
    : defaultLocale;

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default
  };
});
