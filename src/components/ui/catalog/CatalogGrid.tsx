'use client';

import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useTranslations } from 'next-intl';
import { Container } from '../Container';
import { ProductCard } from '../ProductCard';
import { ProductFilter, Category } from './ProductFilter';
import styles from './CatalogGrid.module.css';

// Mock data (will be replaced by CMS data later)
const mockProducts = [
  { id: 'shampoo-supreme', slug: 'shampoo-supreme-caviar', image: '/imgs/product1.png', category: 'wash' },
  { id: 'mask-supreme', slug: 'mascara-supreme-tratamento', image: '/imgs/product2.png', category: 'treatment' },
  { id: 'serum-supreme', slug: 'serum-supreme-finish', image: '/imgs/product3.png', category: 'finishing' },
  { id: 'shampoo-supreme', slug: 'shampoo-supreme-caviar', image: '/imgs/product1.png', category: 'treatment' }, 
  { id: 'mask-supreme', slug: 'mascara-supreme-tratamento', image: '/imgs/product2.png', category: 'wash' },
  { id: 'serum-supreme', slug: 'serum-supreme-finish', image: '/imgs/product3.png', category: 'finishing' },
];

export function CatalogGrid() {
  const t = useTranslations('Products');
  const tCatalog = useTranslations('Catalog');
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const gridRef = useRef<HTMLDivElement>(null);

  const filteredProducts = mockProducts.filter(
    (product) => activeCategory === 'all' || product.category === activeCategory
  );

  useEffect(() => {
    // Animate products when category changes
    const cards = gridRef.current?.querySelectorAll('.cat-card');
    if (cards && cards.length > 0) {
      gsap.fromTo(cards, {
        y: 30,
        opacity: 0,
        scale: 0.95
      }, {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        clearProps: 'all'
      });
    }
  }, [activeCategory]);

  return (
    <section className={styles.section}>
      <Container>
        <ProductFilter activeCategory={activeCategory} onCategoryChange={setActiveCategory} />
        
        <div className={styles.gridContainer} ref={gridRef}>
          {filteredProducts.length > 0 ? (
            <div className={styles.grid}>
              {filteredProducts.map((product, index) => (
                <div key={`${product.id}-${index}`} className={`${styles.cardWrapper} cat-card`}>
                  <ProductCard
                    id={product.id}
                    slug={product.slug}
                    image={product.image}
                    name={t(`items.${product.id}.name`)}
                    description={t(`items.${product.id}.desc`)}
                    isFeatured={false} // Only highlight in Home
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <p>{tCatalog('EmptyState')}</p>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
