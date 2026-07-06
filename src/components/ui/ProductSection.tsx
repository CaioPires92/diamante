'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useTranslations } from 'next-intl';
import { Section } from './Section';
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

export function ProductSection() {
  const t = useTranslations('Products');
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const catalogUrl = `https://wa.me/551938176156?text=${encodeURIComponent(
    'Olá! Gostaria de receber o catálogo completo da Diamante Profissional.'
  )}`;

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % categories.length);
    }, 3500);

    return () => window.clearInterval(interval);
  }, []);

  useGSAP((context) => {
    const products = context.selector?.(`.${styles.productItem}`);
    const visual = context.selector?.(`.${styles.visualPanel}`);

    if (products) {
      gsap.fromTo(products, {
        x: -30,
        opacity: 0,
      }, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 78%',
          once: true,
        },
        x: 0,
        opacity: 1,
        duration: 0.9,
        stagger: 0.12,
        ease: 'power3.out'
      });
    }

    if (visual) {
      gsap.fromTo(visual, {
        x: 34,
        opacity: 0,
      }, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 76%',
          once: true,
        },
        x: 0,
        opacity: 1,
        duration: 1,
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
    <Section id="products" className={styles.section} ref={sectionRef}>
      <div className={styles.glow} />

      <div className={styles.layout}>
        <div className={`${styles.contentPanel} prod-header`}>
          <h2 className={styles.title}>{t('title')}</h2>
          <ul className={styles.productList}>
            {categories.map((category, index) => (
              <li key={category.id}>
                <button
                  type="button"
                  className={`${styles.productItem} ${index === activeIndex ? styles.productItemActive : ''}`}
                  onClick={() => setActiveIndex(index)}
                >
                  <span className={styles.productIndex}>{String(index + 1).padStart(2, '0')}</span>
                  <span className={styles.productName}>{t(`items.${category.id}.name`)}</span>
                </button>
              </li>
            ))}
          </ul>

          <div className={styles.catalogNote}>
            <p className={styles.catalogText}>{t('catalogText')}</p>
            <Link
              href={catalogUrl}
              className={styles.catalogLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t('catalogCta')}
            </Link>
          </div>
        </div>

        <div className={styles.visualPanel}>
          <div className={styles.visualFrame}>
            {categories.map((category, index) => (
              <div
                key={category.id}
                className={`${styles.slide} ${index === activeIndex ? styles.slideActive : ''}`}
                aria-hidden={index !== activeIndex}
              >
                <div className={styles.imageWrap}>
                  <Image
                    src={category.image}
                    alt={t(`items.${category.id}.name`)}
                    fill
                    className={styles.image}
                    sizes="(max-width: 1024px) 100vw, 40vw"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className={styles.carouselDots}>
            {categories.map((category, index) => (
              <button
                key={category.id}
                type="button"
                className={`${styles.dot} ${index === activeIndex ? styles.dotActive : ''}`}
                onClick={() => setActiveIndex(index)}
                aria-label={t(`items.${category.id}.name`)}
              />
            ))}
          </div>
        </div>
      </div>

      <div className={styles.highlightLine}>
        <p className={styles.highlightText}>{t('highlight')}</p>
      </div>
    </Section>
  );
}
