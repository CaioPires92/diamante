'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useTranslations } from 'next-intl';
import { Container } from './Container';
import { ProductCard } from './ProductCard';
import styles from './ProductSection.module.css';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const productsData = [
  {
    id: 'shampoo-supreme',
    slug: 'shampoo-supreme-caviar',
    image: '/images/products/caviar/prod_2.png',
  },
  {
    id: 'mask-supreme',
    slug: 'mascara-supreme-tratamento',
    image: '/images/products/caviar/prod_3.png',
  },
  {
    id: 'serum-supreme',
    slug: 'serum-supreme-finish',
    image: '/images/products/caviar/prod_4.png',
  }
];

export function ProductSection() {
  const t = useTranslations('Products');
  const common = useTranslations('Common');
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP((context) => {
    // Reveal animation on scroll
    const cards = context.selector?.(`.${styles.cardWrapper}`);
    
    if (cards) {
      gsap.fromTo(cards, {
        y: 60,
        opacity: 0,
      }, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          once: true,
        },
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.1,
        ease: 'power3.out'
      });
    }

    // Header reveal
    gsap.fromTo('.prod-header', {
      y: 30,
      opacity: 0,
    }, {
      scrollTrigger: {
        trigger: '.prod-header',
        start: 'top 90%',
      },
      y: 0,
      opacity: 1,
      duration: 1,
      ease: 'power3.out'
    });
  }, { scope: sectionRef, dependencies: [] });

  return (
    <section id="products" className={styles.section} ref={sectionRef}>
      <div className={styles.glow} />
      
      <Container>
        <div className={`${styles.header} prod-header`}>
          <h2 className={styles.title}>{t('title')}</h2>
          <p className={styles.subtitle}>{t('subtitle')}</p>
        </div>

        <div className={`${styles.grid} prod-grid`}>
          {productsData.map((product, index) => (
            <div key={product.id} className={styles.cardWrapper}>
              <ProductCard
                id={product.id}
                slug={product.slug}
                image={product.image}
                name={t(`items.${product.id}.name`)}
                description={t(`items.${product.id}.desc`)}
                isFeatured={index === 1}
              />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
