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

const categories = [
  {
    id: 'powder',
    image: '/images/products/coloracao/p-descolorante-azul.png',
  },
  {
    id: 'peroxide',
    image: '/images/products/coloracao/p-descolorante-branco.png',
  },
  {
    id: 'masks',
    image: '/images/products/matizadores/prod_8.png',
  },
  {
    id: 'schedule',
    image: '/imgs/lapidacao_4steps.webp',
  },
] as const;

const categoryKeys = ['creams', 'shampoos', 'serums', 'makeup'] as const;

export function ProductSection() {
  const t = useTranslations('Products');
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP((context) => {
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
        stagger: 0.12,
        ease: 'power3.out'
      });
    }

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
          {categories.map((category) => (
            <div key={category.id} className={styles.cardWrapper}>
              <article className={styles.card}>
                <div className={styles.imageWrap}>
                  <Image
                    src={category.image}
                    alt={t(`items.${category.id}.name`)}
                    fill
                    className={styles.image}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                </div>
                <div className={styles.cardContent}>
                  <span className={styles.cardLabel}>{t('cardLabel')}</span>
                  <h3 className={styles.cardTitle}>{t(`items.${category.id}.name`)}</h3>
                  <p className={styles.cardDescription}>{t(`items.${category.id}.desc`)}</p>
                </div>
              </article>
            </div>
          ))}
        </div>

        <div className={styles.categoryPanel}>
          <div className={styles.categoryHeader}>
            <span className={styles.categoryEyebrow}>{t('categories.eyebrow')}</span>
            <h3 className={styles.categoryTitle}>{t('categories.title')}</h3>
            <p className={styles.categorySubtitle}>{t('categories.subtitle')}</p>
          </div>

          <div className={styles.categoryGrid}>
            {categoryKeys.map((key) => (
              <article key={key} className={styles.categoryCard}>
                <h4 className={styles.categoryCardTitle}>{t(`categories.items.${key}.name`)}</h4>
                <p className={styles.categoryCardDescription}>{t(`categories.items.${key}.desc`)}</p>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
