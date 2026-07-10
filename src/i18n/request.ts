import { getRequestConfig } from 'next-intl/server';

export const locales = ['pt-BR', 'en', 'es', 'ar'] as const;
export type Locale = (typeof locales)[number];
const defaultLocale: Locale = 'pt-BR';

type Messages = Record<string, unknown>;

function mergeMessages(base: Messages, override: Messages): Messages {
  const messages: Messages = { ...override };

  return Object.entries(base).reduce<Messages>((mergedMessages, [key, value]) => {
    const overrideValue = override[key];

    if (
      value &&
      overrideValue &&
      typeof value === 'object' &&
      typeof overrideValue === 'object' &&
      !Array.isArray(value) &&
      !Array.isArray(overrideValue)
    ) {
      mergedMessages[key] = mergeMessages(value as Messages, overrideValue as Messages);
      return mergedMessages;
    }

    mergedMessages[key] = overrideValue ?? value;
    return mergedMessages;
  }, messages);
}

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const normalizedLocale = requested?.split('/')[0];
  const locale = locales.includes(normalizedLocale as Locale)
    ? (normalizedLocale as Locale)
    : defaultLocale;
  const defaultMessages = (await import(`./messages/${defaultLocale}.json`)).default;
  const localeMessages = locale === defaultLocale
    ? defaultMessages
    : (await import(`./messages/${locale}.json`)).default;

  return {
    locale,
    messages: locale === defaultLocale
      ? defaultMessages
      : mergeMessages(defaultMessages, localeMessages)
  };
});
