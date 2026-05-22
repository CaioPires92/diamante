import React from 'react';
import { Container } from '@/components/ui/Container';
import { ContactForm } from '@/components/ui/ContactForm';
import { useTranslations } from 'next-intl';

export default function ContactPage() {
  const t = useTranslations('Header'); // Or specific namespace if exists

  return (
    <main style={{ paddingTop: '120px', paddingBottom: '120px', minHeight: '100vh', backgroundColor: '#F8F4EF' }}>
      <Container size="narrow">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h1 style={{ fontFamily: 'var(--font-playfair)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: '#2D2A26', marginBottom: '1rem' }}>
            Entre em Contato
          </h1>
          <p style={{ color: '#6B625A', fontSize: '1.125rem', maxWidth: '600px', margin: '0 auto', lineHeight: '1.6' }}>
            Estamos aqui para ajudar. Preencha o formulário abaixo e nossa equipe retornará o mais breve possível.
          </p>
        </div>
        
        <ContactForm />
        
        <div style={{ marginTop: '4rem', display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'center' }}>
          <div style={{ textAlign: 'center', flex: '1', minWidth: '250px' }}>
            <h3 style={{ fontFamily: 'var(--font-playfair)', fontSize: '1.5rem', marginBottom: '0.5rem', color: '#1a1614' }}>E-mail</h3>
            <p style={{ color: '#6B625A' }}>contato@diamanteprofissional.com</p>
          </div>
          <div style={{ textAlign: 'center', flex: '1', minWidth: '250px' }}>
            <h3 style={{ fontFamily: 'var(--font-playfair)', fontSize: '1.5rem', marginBottom: '0.5rem', color: '#1a1614' }}>WhatsApp</h3>
            <p style={{ color: '#6B625A' }}>+55 (11) 99999-9999</p>
          </div>
        </div>
      </Container>
    </main>
  );
}
