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
  { id: 'shampoo-supreme', slug: 'shampoo-supreme-caviar', image: '/imgs/product1.png', category: 'wash', lojaIntegradaId: '91860541' },
  { id: 'mask-supreme', slug: 'mascara-supreme-tratamento', image: '/imgs/product2.png', category: 'treatment', lojaIntegradaId: '184150772' },
  { id: 'serum-supreme', slug: 'serum-supreme-finish', image: '/imgs/product3.png', category: 'finishing', lojaIntegradaId: '184150400' },
  { id: 'shampoo-supreme', slug: 'shampoo-supreme-caviar', image: '/imgs/product1.png', category: 'treatment', lojaIntegradaId: '91860541' }, 
  { id: 'mask-supreme', slug: 'mascara-supreme-tratamento', image: '/imgs/product2.png', category: 'wash', lojaIntegradaId: '184150772' },
  { id: 'serum-supreme', slug: 'serum-supreme-finish', image: '/imgs/product3.png', category: 'finishing', lojaIntegradaId: '184150400' },
];

export function CatalogGrid() {
  const t = useTranslations('Products');
  const tCatalog = useTranslations('Catalog');
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch('/api/loja-integrada/products');
        if (res.ok) {
          const data = await res.json();
          // The API returns { objects: [...] }
          if (data && data.objects) {
            setProducts(data.objects);
          }
        }
      } catch (error) {
        console.error('Error fetching products from API:', error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const filteredProducts = products; // Filtering logic can be updated later based on real categories

  useEffect(() => {
    // Animate products when category changes
    const cards = gridRef.current?.querySelectorAll('.cat-card');
    if (cards && cards.length > 0 && !isLoading) {
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
                    lojaIntegradaId={product.lojaIntegradaId}
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
