import { Header } from '@/components/ui/Header';
import { HeroSection } from '@/components/ui/HeroSection';
import { ProductSection } from '@/components/ui/ProductSection';
import { Footer } from '@/components/ui/Footer';

export default function Home() {
  return (
    <main>
      <Header />
      <HeroSection />
      <ProductSection />
      <Footer />
    </main>
  );
}
