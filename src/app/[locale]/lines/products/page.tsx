import { PremiumCatalogPage } from '@/components/ui/catalog/PremiumCatalogPage';

export default async function ProductCategoriesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  await params;

  return <PremiumCatalogPage />;
}
