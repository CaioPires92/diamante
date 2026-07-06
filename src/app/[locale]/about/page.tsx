import React from 'react';
import { AboutHeroSection } from '@/components/ui/about/AboutHeroSection';
import { LaboratorySection } from '@/components/ui/about/LaboratorySection';
import { ManifestoSection } from '@/components/ui/about/ManifestoSection';
import { ValuesGrid } from '@/components/ui/about/ValuesGrid';
import { LapidacaoSection } from '@/components/ui/LapidacaoSection';
import { PrivateLabelProcess } from '@/components/ui/privatelabel/PrivateLabelProcess';
import { InstitutionalProofSection } from '@/components/ui/InstitutionalProofSection';

export default function AboutPage() {
  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#FAFAF8' }}>
      <AboutHeroSection />
      <ManifestoSection />
      <InstitutionalProofSection />
      <LaboratorySection />
      <ValuesGrid />
      <PrivateLabelProcess />
      <LapidacaoSection />
    </main>
  );
}
