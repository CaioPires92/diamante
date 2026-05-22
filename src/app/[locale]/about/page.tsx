import React from 'react';
import { Container } from '@/components/ui/Container';
import { LapidacaoSection } from '@/components/ui/LapidacaoSection';

export default function AboutPage() {
  return (
    <main style={{ paddingTop: '120px', minHeight: '100vh', backgroundColor: '#FAFAF8' }}>
      <Container>
        <div style={{ textAlign: 'center', marginBottom: '4rem', maxWidth: '800px', margin: '0 auto 4rem auto' }}>
          <h1 style={{ fontFamily: 'var(--font-playfair)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: '#2D2A26', marginBottom: '1.5rem' }}>
            A Essência da Diamante Profissional
          </h1>
          <p style={{ color: '#6B625A', fontSize: '1.125rem', lineHeight: '1.8' }}>
            Nossa jornada começou com um objetivo simples: trazer o nível de excelência dos cosméticos de luxo internacionais para o mercado profissional brasileiro. Combinamos ciência avançada, ativos nobres e testes rigorosos para entregar produtos que realmente transformam a saúde capilar.
          </p>
        </div>
      </Container>
      
      {/* Reutilizando a seção que mostra a jornada/lapidação para a página Sobre */}
      <LapidacaoSection />
      
    </main>
  );
}
