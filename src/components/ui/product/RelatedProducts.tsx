'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Container } from '../Container';
import { ProductCard } from '../ProductCard';
import { ProductDetail } from '@/lib/constants/products-data';
import styles from './RelatedProducts.module.css';

interface RelatedProductsProps {
  products: ProductDetail[];
}

export function RelatedProducts({ products }: RelatedProductsProps) {
  const t = useTranslations('ProductDetail.labels');
  const tProduct = useTranslations('Products');

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
              name={tProduct(`items.${product.id}.name`)}
              description={tProduct(`items.${product.id}.desc`)}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
