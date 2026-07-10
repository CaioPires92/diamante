import { HeroSection } from '@/components/ui/HeroSection';
import { ProductSection } from '@/components/ui/ProductSection';
import { PrivateLabelTeaser } from '@/components/ui/PrivateLabelTeaser';
import { ImpactNumbers } from '@/components/ui/ImpactNumbers';
import { StructureServicesSection } from '@/components/ui/StructureServicesSection';
import { PrivateLabelHighlightsSection } from '@/components/ui/PrivateLabelHighlightsSection';
import { DreamsBannerSection } from '@/components/ui/DreamsBannerSection';
import { FinalCTA } from '@/components/ui/FinalCTA';

export default function Home() {
  return (
    <main>
      <HeroSection />
      <ImpactNumbers />
      <PrivateLabelTeaser />
      <StructureServicesSection />
      <ProductSection />
      <DreamsBannerSection />
      <PrivateLabelHighlightsSection />
      <FinalCTA />
    </main>
  );
}
