'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Container } from '../Container';
import { ProductActions } from './ProductActions';
import styles from './ProductHero.module.css';

interface ProductHeroProps {
  product: {
    id: string;
    name: string;
    description: string;
    line: string;
    gallery: string[];
    features: string[];
    lojaIntegradaId?: string;
    price?: string;
    available?: boolean;
    quantityAvailable?: number;
  };
}

export function ProductHero({ product }: ProductHeroProps) {
  const t = useTranslations('ProductDetail.labels');
  const [activeImage, setActiveImage] = useState(0);
  const productName = product.name;
  const productDesc = product.description;

  const handleWhatsAppClick = () => {
    const phone = '551938176156';
    const message = encodeURIComponent(`Olá! Tenho interesse no produto: ${productName} da linha ${product.line}.`);
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
  };

  return (
    <section className={styles.section}>
      <Container>
        <div className={styles.grid}>
          {/* Gallery Side */}
          <div className={styles.gallerySide}>
            <div className={styles.mainImageWrapper}>
              <Image 
                src={product.gallery[activeImage]} 
                alt={productName} 
                fill 
                className={styles.mainImage}
                priority
              />
            </div>
            {product.gallery.length > 1 && (
              <div className={styles.thumbnails}>
                {product.gallery.map((img, idx) => (
                  <button 
                    key={idx} 
                    className={`${styles.thumbnail} ${idx === activeImage ? styles.activeThumb : ''}`}
                    onClick={() => setActiveImage(idx)}
                  >
                    <Image src={img} alt={`${productName} thumb ${idx}`} fill className={styles.thumbImg} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info Side */}
          <div className={styles.infoSide}>
            <div className={styles.breadcrumb}>
              <span>{product.line}</span>
            </div>
            <h1 className={styles.title}>{productName}</h1>
            <p className={styles.description}>{productDesc}</p>
            
            <div className={styles.features}>
              <h4 className={styles.featuresTitle}>{t('features')}</h4>
              <ul className={styles.featuresList}>
                {product.features.map((f, i) => (
                  <li key={i} className={styles.featureItem}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            <ProductActions 
              lojaIntegradaId={product.lojaIntegradaId} 
              productTitle={productName} 
              price={product.price || "R$ 0,00"}
              available={product.available}
              quantityAvailable={product.quantityAvailable}
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
