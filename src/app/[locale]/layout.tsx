import { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Header } from '@/components/ui/Header';
import { SmoothScroll } from '@/components/ui/SmoothScroll';
import '../globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-playfair',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: {
    template: '%s | Diamante Profissional',
    default: 'Diamante Profissional — Cosméticos Capilares de Alta Performance',
  },
  description: 'Cosméticos capilares profissionais com fabricação própria. Presente em +4 países e aprovados pela ANVISA — para profissionais que exigem resultado e consumidores que valorizam qualidade.',
  icons: {
    icon: '/favicon.ico',
  },
};

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={`${playfair.variable} ${inter.variable}`}>
        <NextIntlClientProvider messages={messages}>
          <SmoothScroll>
            <Header locale={locale} />
            {children}
          </SmoothScroll>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
