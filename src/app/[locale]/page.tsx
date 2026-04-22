import { HeroSection } from '@/components/ui/HeroSection';
import { ProductSection } from '@/components/ui/ProductSection';

export default function HomePage() {
  return (
    <main>
      <HeroSection tagline="Premium Hair Care" />
      <ProductSection />
    </main>
  );
}
