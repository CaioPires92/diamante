import React from 'react';
import { Container } from '@/components/ui/Container';

interface PageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default async function ShopPage({ params }: PageProps) {
  const { locale } = await params;

  // Simple localized content map
  const content = {
    'pt-BR': {
      tagline: 'EM BREVE',
      title: 'Nossa Nova Loja Online está Chegando',
      subtitle: 'Estamos preparando uma experiência de e-commerce exclusiva para você. Enquanto nossa nova loja digital não é lançada, você pode adquirir todos os produtos originais Diamante Profissional diretamente através de nosso canal de atendimento oficial:',
      whatsapp: {
        title: 'WhatsApp Comercial',
        desc: 'Fale diretamente com nossa equipe comercial oficial, receba atendimento personalizado e faça seu pedido com frete facilitado.',
        btn: 'Falar no WhatsApp'
      },
      footer: 'Diamante Profissional — Onde a ciência encontra a sofisticação.'
    },
    'en': {
      tagline: 'COMING SOON',
      title: 'Our New Online Store is on the Way',
      subtitle: 'We are preparing an exclusive e-commerce experience for you. While our new digital flagship store is being polished, you can purchase all authentic Diamante Profissional products directly through our official service channel:',
      whatsapp: {
        title: 'Official WhatsApp',
        desc: 'Chat directly with our commercial support team, receive personalized assistance, and place your order with ease.',
        btn: 'Order via WhatsApp'
      },
      footer: 'Diamante Profissional — Where science meets sophistication.'
    },
    'es': {
      tagline: 'PRÓXIMAMENTE',
      title: 'Nuestra Nueva Tienda en Línea está en Camino',
      subtitle: 'Estamos preparando una experiencia de comercio electrónico exclusiva para usted. Mientras se lanza nuestra nueva tienda digital, puede comprar todos los productos originales de Diamante Profissional a través de nuestro canal de atención oficial:',
      whatsapp: {
        title: 'WhatsApp Comercial',
        desc: 'Hable directamente con nuestro equipo comercial, reciba atención personalizada y realice su pedido de forma rápida y sencilla.',
        btn: 'Comprar por WhatsApp'
      },
      footer: 'Diamante Profissional — Donde la ciencia se encuentra con la sofisticación.'
    }
  };

  const t = content[locale as keyof typeof content] || content['pt-BR'];

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#F8F4EF', paddingTop: '150px', paddingBottom: '80px', position: 'relative', overflow: 'hidden' }}>
      
      {/* Decorative luxury glowing orbs */}
      <div style={{ position: 'absolute', top: '-10%', right: '-10%', width: '40vw', height: '40vw', background: 'radial-gradient(circle, rgba(201,157,74,0.08) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'absolute', bottom: '-10%', left: '-10%', width: '40vw', height: '40vw', background: 'radial-gradient(circle, rgba(201,157,74,0.05) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />

      <Container style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 4rem auto' }}>
          <span style={{ color: '#c99d4a', textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '1rem' }}>
            {t.tagline}
          </span>
          <h1 style={{ fontFamily: 'var(--font-playfair)', fontSize: 'clamp(2rem, 4vw, 3.25rem)', color: '#2D2A26', lineHeight: '1.2', marginBottom: '1.5rem', fontWeight: 500 }}>
            {t.title}
          </h1>
          <p style={{ color: '#6B625A', fontSize: '1.1rem', lineHeight: '1.7', maxWidth: '700px', margin: '0 auto' }}>
            {t.subtitle}
          </p>
        </div>

        {/* Channels Container */}
        <div style={{ maxWidth: '500px', margin: '0 auto' }}>
          
          {/* WhatsApp Card */}
          <div style={{ background: '#FFFFFF', borderRadius: '16px', border: '1px solid rgba(201,157,74,0.15)', padding: '2.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'between', boxShadow: '0 10px 30px rgba(45,42,38,0.03)', transition: 'transform 0.3s ease' }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'rgba(201,157,74,0.08)', color: '#c99d4a', marginBottom: '1.5rem' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
              </div>
              <h3 style={{ fontFamily: 'var(--font-playfair)', fontSize: '1.5rem', color: '#2D2A26', marginBottom: '1rem', fontWeight: 500 }}>
                {t.whatsapp.title}
              </h3>
              <p style={{ color: '#6B625A', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '2rem' }}>
                {t.whatsapp.desc}
              </p>
            </div>
            <a 
              href="https://wa.me/551938176226?text=Olá!%20Gostaria%20de%20conhecer%20e%20comprar%20os%20produtos%20da%20Diamante%20Profissional."
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '48px', border: 'none', backgroundColor: '#2D2A26', color: '#FFFFFF', borderRadius: '8px', textDecoration: 'none', fontWeight: 600, fontSize: '0.95rem', letterSpacing: '0.05em', transition: 'background-color 0.3s ease', marginTop: 'auto' }}
            >
              {t.whatsapp.btn}
            </a>
          </div>

        </div>

        <div style={{ textAlign: 'center', marginTop: '5rem', color: '#8F857D', fontSize: '0.875rem', letterSpacing: '0.05em' }}>
          {t.footer}
        </div>
      </Container>
      
    </main>
  );
}
