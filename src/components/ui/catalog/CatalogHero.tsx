'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useTranslations } from 'next-intl';
import { Container } from '../Container';
import styles from './CatalogHero.module.css';

export function CatalogHero() {
  const t = useTranslations('Catalog.Hero');
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP((context) => {
    const elements = context.selector?.('.hero-anim');
    
    if (elements) {
      gsap.fromTo(elements, {
        y: 30,
        opacity: 0
      }, {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out',
        delay: 0.1
      });
    }
  }, { scope: sectionRef });

  return (
    <section className={styles.section} ref={sectionRef}>
      <div className={styles.backgroundGlow} />
      <div className={styles.texture} />
      <Container size="wide">
        <div className={styles.layout}>
          <div className={styles.content}>
            <span className={`${styles.tagline} hero-anim`}>{t('tagline')}</span>
            <h1 className={`${styles.title} hero-anim`}>{t('title')}</h1>
            <p className={`${styles.subtitle} hero-anim`}>{t('subtitle')}</p>
          </div>

          <div className={`${styles.visual} hero-anim`} aria-hidden="true">
            <div className={styles.visualGlow} />
            <Image
              src="/imgs/products_bg.png"
              alt=""
              fill
              priority
              sizes="(max-width: 900px) 90vw, 44vw"
              className={styles.visualTexture}
            />
            <Image
              src="/imgs/product1.png"
              alt=""
              width={420}
              height={560}
              priority
              className={`${styles.productImage} ${styles.productOne}`}
            />
            <Image
              src="/imgs/product2.png"
              alt=""
              width={420}
              height={560}
              priority
              className={`${styles.productImage} ${styles.productTwo}`}
            />
            <Image
              src="/imgs/product3.png"
              alt=""
              width={420}
              height={560}
              priority
              className={`${styles.productImage} ${styles.productThree}`}
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
