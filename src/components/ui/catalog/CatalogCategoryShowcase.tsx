import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

import { Container } from '../Container';
import { ProductCard } from '../ProductCard';
import { getCatalogProducts, type CatalogProduct } from '@/lib/loja-integrada-catalog';
import styles from './CatalogCategoryShowcase.module.css';

const whatsappPhone = '551938176156';

const sectionOrder = [
  'shampoos',
  'creams',
  'serums',
  'perfumes',
  'makeup',
  'technical',
  'others',
] as const;

const ctaKeys = ['manufacture', 'quote', 'brand'] as const;
const technicalLineSlugs = new Set(['coloracao', 'profissional', 'matizadores']);

const categoryMatchers = {
  perfumes: [
    'perfume',
    'colonia',
    'body splash',
    'deo colonia',
    'fragrancia',
    'fragrance',
    'perfumaria',
  ],
  makeup: [
    'maquiagem',
    'batom',
    'base liquida',
    'base compacta',
    'po compacto',
    'sombra',
    'blush',
    'delineador',
    'mascara de cilios',
    'máscara de cílios',
  ],
  serums: [
    'serum',
    'gloss',
    'leave in',
    'leave-in',
    'reparador de pontas',
    'silicone',
    'pomada',
    'modelador',
    'spray finalizador',
    'fluido',
  ],
  shampoos: [
    'shampoo',
    'condicionador',
  ],
  creams: [
    'mascara',
    'creme',
    'hidratante',
    'hidratacao',
    'nutricao',
    'reconstrucao',
    'umectacao',
    'ativador de cachos',
    'tratamento',
    'ampola',
  ],
  technical: [
    'po descolorante',
    'oxidante',
    'ox ',
    'agua oxigenada',
    'coloracao',
    'tonalizante',
    'matizador',
    'regulador de ph',
    'anti residuo',
    'step',
    'passo ',
  ],
} as const;

function normalizeText(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

function buildWhatsAppUrl(message: string) {
  return `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(message)}`;
}

function includesOneOf(value: string, keywords: readonly string[]) {
  return keywords.some((keyword) => value.includes(normalizeText(keyword)));
}

function classifyProduct(product: CatalogProduct) {
  const title = normalizeText(product.title);
  const description = normalizeText(product.description);
  const line = normalizeText(product.line);
  const haystack = `${title} ${description} ${line}`;

  if (includesOneOf(haystack, categoryMatchers.perfumes)) {
    return 'perfumes';
  }

  if (includesOneOf(haystack, categoryMatchers.makeup)) {
    return 'makeup';
  }

  if (includesOneOf(title, categoryMatchers.serums) || includesOneOf(description, categoryMatchers.serums)) {
    return 'serums';
  }

  if (includesOneOf(title, categoryMatchers.shampoos)) {
    return 'shampoos';
  }

  if (includesOneOf(title, categoryMatchers.creams) || includesOneOf(description, categoryMatchers.creams)) {
    return 'creams';
  }

  if (
    includesOneOf(haystack, categoryMatchers.technical) ||
    technicalLineSlugs.has(product.lineSlug)
  ) {
    return 'technical';
  }

  return 'others';
}

function sortProducts(products: CatalogProduct[]) {
  return [...products].sort((a, b) => a.title.localeCompare(b.title, 'pt-BR'));
}

export async function CatalogCategoryShowcase() {
  const t = await getTranslations('Catalog.Showcase');
  const products = await getCatalogProducts();
  const sectionMap = new Map<string, CatalogProduct[]>();

  for (const product of products) {
    const sectionId = classifyProduct(product);
    const current = sectionMap.get(sectionId) || [];
    current.push(product);
    sectionMap.set(sectionId, current);
  }

  const sections = sectionOrder
    .map((id) => ({
      id,
      items: sortProducts(sectionMap.get(id) || []),
    }))
    .filter((section) => section.items.length > 0);

  return (
    <section className={styles.section}>
      <Container size="wide">
        <div className={styles.header}>
          <span className={styles.eyebrow}>{t('eyebrow')}</span>
          <h2 className={styles.title}>{t('title')}</h2>
          <p className={styles.description}>{t('description')}</p>
        </div>

        <div className={styles.stack}>
          {sections.map((section, index) => (
            <section key={section.id} className={styles.categorySection}>
              <div className={styles.infoCard}>
                <span className={styles.counter}>{String(index + 1).padStart(2, '0')}</span>
                <h3 className={styles.categoryTitle}>{t(`sections.${section.id}.title`)}</h3>
                <p className={styles.categoryDescription}>{t(`sections.${section.id}.description`)}</p>

                <div className={styles.actions}>
                  {ctaKeys.map((ctaKey) => {
                    const label = t(`buttons.${ctaKey}`);
                    const message = t(`messages.${ctaKey}`, {
                      category: t(`sections.${section.id}.title`),
                    });

                    return (
                      <Link
                        key={ctaKey}
                        href={buildWhatsAppUrl(message)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${styles.actionButton} ${ctaKey === 'manufacture' ? styles.actionButtonPrimary : ''}`}
                      >
                        {label}
                      </Link>
                    );
                  })}
                </div>
              </div>

              <div className={styles.productRail}>
                <div className={styles.productTrack}>
                  {section.items.map((product) => (
                    <div key={product.id} className={styles.productSlot}>
                      <ProductCard
                        id={product.id}
                        slug={product.slug}
                        image={product.image}
                        name={product.name}
                        description={product.description}
                        lojaIntegradaId={product.lojaIntegradaId}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </section>
          ))}
        </div>
      </Container>
    </section>
  );
}
