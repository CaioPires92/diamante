import { Metadata, Viewport } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Header } from '@/components/ui/Header';
import { Footer } from '@/components/ui/Footer';
import { SmoothScroll } from '@/components/ui/SmoothScroll';
import { FluidBackground } from '@/components/ui/FluidBackground';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';
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

import { client } from '@/sanity/lib/client';
import { groq } from 'next-sanity';

async function getLines() {
  if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    try {
      const query = groq`*[_type == "line"]{ title, "slug": slug.current } | order(title asc)`;
      const sanityLines = await client.fetch(query, {}, { cache: 'no-store' });
      if (sanityLines && sanityLines.length > 0) {
        return sanityLines.map((l: any) => ({ name: l.title, slug: l.slug }));
      }
    } catch (e) {
      console.error(e);
    }
  }
  
  // Fallback
  const defaultLines = ['Caviar', 'Liso', 'Cachos', 'Matizadores', 'Home Care', 'Babosa', 'Lapidação', 'Profissional', 'Sequestrante', 'Coloração', 'Masculina'];
  return defaultLines.map(name => ({
    name,
    slug: name.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(' ', '-')
  }));
}

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
      <body className={`${playfair.variable} ${inter.variable}`}>
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
