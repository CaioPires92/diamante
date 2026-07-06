import { HeroSection } from '@/components/ui/HeroSection';
import { ProductSection } from '@/components/ui/ProductSection';
import { PrivateLabelTeaser } from '@/components/ui/PrivateLabelTeaser';
import { ImpactNumbers } from '@/components/ui/ImpactNumbers';
import { FinalCTA } from '@/components/ui/FinalCTA';
import { PrivateLabelProcess } from '@/components/ui/privatelabel/PrivateLabelProcess';
import { StructureServicesSection } from '@/components/ui/StructureServicesSection';
import { InstitutionalProofSection } from '@/components/ui/InstitutionalProofSection';
import { QualityComplianceSection } from '@/components/ui/QualityComplianceSection';
import { DreamsBannerSection } from '@/components/ui/DreamsBannerSection';

export default function Home() {
  return (
    <main>
      <HeroSection />
      <ImpactNumbers />
      <PrivateLabelTeaser />
      <ProductSection />
      <DreamsBannerSection />
      <StructureServicesSection />
      <QualityComplianceSection />
      <InstitutionalProofSection />
      <PrivateLabelProcess />
      <FinalCTA />
    </main>
  );
}
