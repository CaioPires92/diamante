import React from 'react';
import { Container } from '@/components/ui/Container';
import { ContactForm } from '@/components/ui/ContactForm';
import { PrivateLabelTeaser } from '@/components/ui/PrivateLabelTeaser';

export default function DistributorPage() {
  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#FAFAF8' }}>
      
      {/* Hero Section para Distribuidores */}
      <section style={{ paddingTop: '160px', paddingBottom: '80px', background: 'linear-gradient(135deg, #1A1A1A 0%, #2D2A26 100%)', color: 'white', textAlign: 'center' }}>
        <Container>
          <span style={{ color: '#C59441', textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: '0.875rem', fontWeight: 600 }}>Parceria B2B</span>
          <h1 style={{ fontFamily: 'var(--font-playfair)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', margin: '1rem 0', color: '#FAFAF8' }}>
            Seja um Distribuidor Oficial
          </h1>
          <p style={{ color: '#D1D1D1', fontSize: '1.125rem', maxWidth: '600px', margin: '0 auto', lineHeight: '1.6' }}>
            Junte-se à marca que está redefinindo o padrão de qualidade no mercado de cosméticos profissionais. Oferecemos margens atrativas e suporte completo.
          </p>
        </Container>
      </section>

      {/* Reaproveitando PrivateLabelTeaser como proof of concept */}
      <PrivateLabelTeaser />

      {/* Formulário de Aplicação */}
      <section style={{ padding: '80px 0', backgroundColor: '#F8F4EF' }}>
        <Container size="narrow">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontFamily: 'var(--font-playfair)', fontSize: '2.5rem', color: '#2D2A26' }}>Formulário de Aplicação</h2>
            <p style={{ color: '#6B625A', marginTop: '1rem' }}>Preencha os dados abaixo para nossa equipe comercial analisar seu perfil.</p>
          </div>
          <ContactForm />
        </Container>
      </section>

    </main>
  );
}
