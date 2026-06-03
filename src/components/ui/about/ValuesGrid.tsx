'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useTranslations } from 'next-intl';
import { Container } from '../Container';
import styles from './ValuesGrid.module.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const valueKeys = ['quality', 'fairPrice', 'compliance', 'partnership'] as const;

export function ValuesGrid() {
  const t = useTranslations('About.Values');
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP((context) => {
    const header = context.selector?.('.val-header');
    const cards = context.selector?.('.val-card');
    
    if (header) {
      gsap.fromTo(header, {
        y: 30,
        opacity: 0
      }, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out'
      });
    }

    if (cards) {
      gsap.fromTo(cards, {
        y: 40,
        opacity: 0
      }, {
        scrollTrigger: {
          trigger: '.val-grid-container',
          start: 'top 75%',
        },
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out'
      });
    }
  }, { scope: sectionRef });

  return (
    <section className={styles.section} ref={sectionRef}>
      <Container>
        <div className={`${styles.header} val-header`}>
          <span className={styles.tagline}>{t('tagline')}</span>
          <h2 className={styles.title}>{t('title')}</h2>
        </div>

        <div className={`${styles.grid} val-grid-container`}>
          {valueKeys.map((key) => (
            <div key={key} className={`${styles.card} val-card`}>
              <div className={styles.iconWrapper}>
                <div className={styles.dot}></div>
              </div>
              <h3 className={styles.cardTitle}>{t(`items.${key}.title`)}</h3>
              <p className={styles.cardDesc}>{t(`items.${key}.desc`)}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
