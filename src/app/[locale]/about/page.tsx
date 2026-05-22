import React from 'react';
import { Container } from '@/components/ui/Container';
import { LapidacaoSection } from '@/components/ui/LapidacaoSection';

import { getTranslations } from 'next-intl/server';

export default async function AboutPage() {
  const t = await getTranslations('About');

  return (
    <main style={{ paddingTop: '120px', minHeight: '100vh', backgroundColor: '#FAFAF8' }}>
      <Container>
        <div style={{ textAlign: 'center', marginBottom: '4rem', maxWidth: '800px', margin: '0 auto 4rem auto' }}>
          <h1 style={{ fontFamily: 'var(--font-playfair)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: '#2D2A26', marginBottom: '1.5rem' }}>
            {t('Hero.title')}
          </h1>
          <p style={{ color: '#6B625A', fontSize: '1.125rem', lineHeight: '1.8' }}>
            {t('Manifesto.paragraph1')}
          </p>
          <br/>
          <p style={{ color: '#6B625A', fontSize: '1.125rem', lineHeight: '1.8' }}>
            {t('Manifesto.paragraph2')}
          </p>
        </div>
      </Container>
      
      {/* Reutilizando a seção que mostra a jornada/lapidação para a página Sobre */}
      <LapidacaoSection />
      
    </main>
  );
}
