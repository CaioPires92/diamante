import { HeroSection } from '@/components/ui/HeroSection';
import { ProductSection } from '@/components/ui/ProductSection';
import { PrivateLabelTeaser } from '@/components/ui/PrivateLabelTeaser';
import { ImpactNumbers } from '@/components/ui/ImpactNumbers';
import { FinalCTA } from '@/components/ui/FinalCTA';
import { PrivateLabelProcess } from '@/components/ui/privatelabel/PrivateLabelProcess';
import { StructureServicesSection } from '@/components/ui/StructureServicesSection';
import { InstitutionalProofSection } from '@/components/ui/InstitutionalProofSection';

export default function Home() {
  return (
    <main>
      <HeroSection />
      <ImpactNumbers />
      <PrivateLabelTeaser />
      <ProductSection />
      <StructureServicesSection />
      <InstitutionalProofSection />
      <PrivateLabelProcess />
      <FinalCTA />
    </main>
  );
}
