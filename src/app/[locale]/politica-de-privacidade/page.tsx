import React from 'react';
import { getTranslations } from 'next-intl/server';
import { Container } from '@/components/ui/Container';

export default async function PrivacyPolicyPage() {
  const t = await getTranslations('Policies.Privacy');

  return (
    <main style={{ paddingTop: '120px', paddingBottom: '80px', minHeight: '100vh', backgroundColor: '#FAFAF8' }}>
      <Container>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{ fontFamily: 'var(--font-playfair)', fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#2D2A26', marginBottom: '2rem' }}>
            {t('title')}
          </h1>
          <div style={{ color: '#6B625A', fontSize: '1.125rem', lineHeight: '1.8', whiteSpace: 'pre-wrap' }}>
            {t('content')}
          </div>
        </div>
      </Container>
    </main>
  );
}
