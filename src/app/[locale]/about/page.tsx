import { useTranslations } from 'next-intl';
import { AboutHeroSection } from '@/components/ui/about/AboutHeroSection';
import { ManifestoSection } from '@/components/ui/about/ManifestoSection';
import { LaboratorySection } from '@/components/ui/about/LaboratorySection';
import { ValuesGrid } from '@/components/ui/about/ValuesGrid';
import { FinalCTA } from '@/components/ui/FinalCTA';

export default function AboutPage() {
  return (
    <main>
      <AboutHeroSection />
      <ManifestoSection />
      <LaboratorySection />
      <ValuesGrid />
      <FinalCTA />
    </main>
  );
}
