'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useTranslations } from 'next-intl';
import { Container } from './Container';
import styles from './ImpactNumbers.module.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function ImpactNumbers() {
  const t = useTranslations('Impact');
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP((context) => {
    const cards = context.selector?.(`.${styles.statCard}`);
    const numbers = context.selector?.(`.${styles.number}`);

    if (cards) {
      gsap.fromTo(cards, {
        y: 20,
        opacity: 0,
      }, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 90%', // Earlier trigger
        },
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        clearProps: 'all' // Ensures opacity is fully reset to 1 after animation
      });
    }

    if (numbers) {
      numbers.forEach((num: HTMLElement) => {
        const val = parseInt(num.innerText);
        gsap.fromTo(num, 
          { innerText: 0 },
          {
            innerText: val,
            duration: 2,
            snap: { innerText: 1 },
            scrollTrigger: {
              trigger: num,
              start: 'top 90%',
            },
            ease: 'power1.inOut'
          }
        );
      });
    }
  }, { scope: sectionRef, dependencies: [] });

  const stats = ['products', 'countries', 'clients', 'years'];

  return (
    <section className={styles.section} ref={sectionRef}>
      <Container>
        <h2 className={styles.title}>{t('title')}</h2>
        <div className={styles.grid}>
          {stats.map((key) => (
            <div key={key} className={styles.statCard}>
              <div className={styles.numberWrapper}>
                <span className={styles.number}>{t(`stats.${key}.value`)}</span>
                <span className={styles.suffix}>{t(`stats.${key}.suffix`)}</span>
              </div>
              <span className={styles.label}>{t(`stats.${key}.label`)}</span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
