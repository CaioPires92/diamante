import { CatalogHero } from '@/components/ui/catalog/CatalogHero';
import { CatalogGrid } from '@/components/ui/catalog/CatalogGrid';
import { FinalCTA } from '@/components/ui/FinalCTA';

export default function ProductsPage() {
  return (
    <main>
      <CatalogHero />
      <CatalogGrid />
      <FinalCTA />
    </main>
  );
}
