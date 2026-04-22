'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useTranslations } from 'next-intl';
import { Container } from './Container';
import styles from './ProductSection.module.css';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const productsData = [
  {
    id: 'shampoo',
    image: '/imgs/product1.png',
  },
  {
    id: 'mask',
    image: '/imgs/product2.png',
  },
  {
    id: 'serum',
    image: '/imgs/product3.png',
  }
];

export function ProductSection() {
  const t = useTranslations('Products');
  const common = useTranslations('Common');
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    // Header animation
    gsap.from('.prod-header', {
      scrollTrigger: {
        trigger: '.prod-header',
        start: 'top 80%',
      },
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out'
    });

    // Cards staggered animation
    gsap.from('.prod-card', {
      scrollTrigger: {
        trigger: '.prod-grid',
        start: 'top 75%',
      },
      y: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power3.out'
    });
  }, { scope: sectionRef });

  return (
    <section id="products" className={styles.section} ref={sectionRef}>
      <div className={styles.glow} />
      
      <Container>
        <div className={`${styles.header} prod-header`}>
          <h2 className={styles.title}>{t('title')}</h2>
          <p className={styles.subtitle}>{t('subtitle')}</p>
        </div>

        <div className={`${styles.grid} prod-grid`}>
          {productsData.map((product) => (
            <div key={product.id} className={`${styles.card} prod-card`}>
              <div className={styles.imageWrapper}>
                <Image 
                  src={product.image} 
                  alt={t(`items.${product.id}.name`)} 
                  fill 
                  className={styles.image}
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className={styles.content}>
                <h3 className={styles.productName}>{t(`items.${product.id}.name`)}</h3>
                <p className={styles.productDesc}>{t(`items.${product.id}.desc`)}</p>
                <button className={styles.action}>
                  {common('learnMore')} <span>→</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
