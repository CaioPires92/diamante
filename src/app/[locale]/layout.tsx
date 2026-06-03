import { Metadata, Viewport } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Header } from '@/components/ui/Header';
import { Footer } from '@/components/ui/Footer';
import { SmoothScroll } from '@/components/ui/SmoothScroll';
import { FluidBackground } from '@/components/ui/FluidBackground';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';
import { getLines } from '@/lib/lines';
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

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
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
  const lines = await getLines();

  return (
    <html lang={locale} data-scroll-behavior="smooth" suppressHydrationWarning>
      <body className={`${playfair.variable} ${inter.variable}`} suppressHydrationWarning>
        <NextIntlClientProvider messages={messages}>
          <SmoothScroll>
            <FluidBackground />
            <Header locale={locale} lines={lines} />
            {children}
            <Footer locale={locale} />
            <WhatsAppButton />
          </SmoothScroll>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
