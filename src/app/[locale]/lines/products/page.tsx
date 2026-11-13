import { PremiumCatalogPage } from '@/components/ui/catalog/PremiumCatalogPage';

export const revalidate = 1800;

export default async function ProductCategoriesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  await params;

  return <PremiumCatalogPage />;
}
