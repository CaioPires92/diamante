import { notFound } from 'next/navigation';
import { ProductHero } from '@/components/ui/product/ProductHero';
import { ProductTechnicalInfo } from '@/components/ui/product/ProductTechnicalInfo';
import { RelatedProducts } from '@/components/ui/product/RelatedProducts';
import { FinalCTA } from '@/components/ui/FinalCTA';
import { getRelatedStoreProducts, getStoreProductBySlug } from '@/lib/loja-integrada-catalog';

interface PageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = await getStoreProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const related = await getRelatedStoreProducts(product.lineSlug, product.id);

  return (
    <main>
      <ProductHero 
        product={{
          id: product.id,
          name: product.name,
          description: product.description,
          line: product.line,
          gallery: product.gallery,
          features: product.features,
          lojaIntegradaId: product.lojaIntegradaId,
          price: product.price,
          available: product.available,
          quantityAvailable: product.quantityAvailable,
        }} 
      />
      <ProductTechnicalInfo 
        howToUse={product.howToUse || 'Consulte o modo de uso no atendimento.'}
        benefits={product.benefits || product.description}
        ingredients={product.ingredients || 'Consulte a embalagem do produto para a composição completa.'}
      />
      <RelatedProducts products={related} />
      <FinalCTA />
    </main>
  );
}
