import React from 'react';
import { AboutHeroSection } from '@/components/ui/about/AboutHeroSection';
import { InstitutionalProofSection } from '@/components/ui/InstitutionalProofSection';

export default function AboutPage() {
  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#FAFAF8' }}>
      <AboutHeroSection />
      <InstitutionalProofSection />
    </main>
  );
}
