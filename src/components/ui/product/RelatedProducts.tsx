'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Container } from '../Container';
import { ProductCard } from '../ProductCard';
import styles from './RelatedProducts.module.css';

interface RelatedProductsProps {
  products: Array<{
    id: string;
    slug: string;
    image: string;
    name: string;
    description: string;
    lojaIntegradaId?: string;
  }>;
}

export function RelatedProducts({ products }: RelatedProductsProps) {
  const t = useTranslations('ProductDetail.labels');

  if (products.length === 0) return null;

  return (
    <section className={styles.section}>
      <Container>
        <h2 className={styles.title}>{t('related')}</h2>
        
        <div className={styles.grid}>
          {products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              slug={product.slug}
              image={product.image}
              name={product.name}
              description={product.description}
              lojaIntegradaId={product.lojaIntegradaId}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
