import React from 'react';
import { AboutHeroSection } from '@/components/ui/about/AboutHeroSection';
import { LaboratorySection } from '@/components/ui/about/LaboratorySection';
import { ManifestoSection } from '@/components/ui/about/ManifestoSection';
import { ValuesGrid } from '@/components/ui/about/ValuesGrid';
import { LapidacaoSection } from '@/components/ui/LapidacaoSection';

export default function AboutPage() {
  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#FAFAF8' }}>
      <AboutHeroSection />
      <ManifestoSection />
      <LaboratorySection />
      <ValuesGrid />
      <LapidacaoSection />
    </main>
  );
}
