import { notFound } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { getProductBySlug, getRelatedProducts } from '@/lib/constants/products-data';
import { ProductHero } from '@/components/ui/product/ProductHero';
import { ProductTechnicalInfo } from '@/components/ui/product/ProductTechnicalInfo';
import { RelatedProducts } from '@/components/ui/product/RelatedProducts';
import { FinalCTA } from '@/components/ui/FinalCTA';

interface PageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const related = getRelatedProducts(product.id, product.line);

  return (
    <main>
      <ProductHero 
        product={{
          id: product.id,
          line: product.line,
          gallery: product.gallery,
          features: product.features
        }} 
      />
      <ProductTechnicalInfo 
        howToUse={product.howToUse}
        benefits={product.benefits}
        ingredients={product.ingredients}
      />
      <RelatedProducts products={related} />
      <FinalCTA />
    </main>
  );
}
