import { HeroSection } from '@/components/ui/HeroSection';
import { ProductSection } from '@/components/ui/ProductSection';
import { FeaturesSection } from '@/components/ui/FeaturesSection';
import { LapidacaoSection } from '@/components/ui/LapidacaoSection';
import { PrivateLabelTeaser } from '@/components/ui/PrivateLabelTeaser';
import { ImpactNumbers } from '@/components/ui/ImpactNumbers';
import { FinalCTA } from '@/components/ui/FinalCTA';

export default function Home() {
  return (
    <main>
      <HeroSection />
      <ProductSection />
      <FeaturesSection />
      <LapidacaoSection />
      <PrivateLabelTeaser />
      <ImpactNumbers />
      <FinalCTA />
    </main>
  );
}
