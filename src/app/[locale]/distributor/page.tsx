import React from 'react';
import { Container } from '@/components/ui/Container';
import { PrivateLabelTeaser } from '@/components/ui/PrivateLabelTeaser';
import { DistributorHero } from '@/components/ui/distributor/DistributorHero';
import { DistributorForm } from '@/components/ui/distributor/DistributorForm';
import { DistributorProcessSection } from '@/components/ui/distributor/DistributorProcessSection';

export default function DistributorPage() {
  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#FAFAF8' }}>
      
      {/* Hero Section para Distribuidores */}
      <DistributorHero />

      {/* Reaproveitando PrivateLabelTeaser como proof of concept */}
      <PrivateLabelTeaser />

      <DistributorProcessSection />

      {/* Formulário de Aplicação */}
      <section style={{ padding: '80px 0', backgroundColor: '#F8F4EF' }}>
        <Container size="narrow">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontFamily: 'var(--font-playfair)', fontSize: '2.5rem', color: '#2D2A26' }}>Formulário de Aplicação</h2>
            <p style={{ color: '#6B625A', marginTop: '1rem' }}>Preencha os dados abaixo para nossa equipe comercial analisar seu perfil de distribuidor comercial.</p>
          </div>
          <DistributorForm />
        </Container>
      </section>

    </main>
  );
}
