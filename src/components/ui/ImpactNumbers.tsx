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

const stats = ['products', 'countries', 'clients', 'years'] as const;

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

  return (
    <section className={styles.section} ref={sectionRef}>
      <Container>
        <div className={styles.grid}>
          {stats.map((key) => (
              <article key={key} className={styles.statCard}>
                <div className={styles.iconWrap}>
                  {key === 'products' && (
                    <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={styles.icon}>
                      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
                      <path d="m3.3 7 8.7 5 8.7-5" />
                      <path d="M12 22V12" />
                    </svg>
                  )}
                  {key === 'countries' && (
                    <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={styles.icon}>
                      <path d="M12 3v4" />
                      <path d="M12 17v4" />
                      <path d="M4.93 4.93l2.83 2.83" />
                      <path d="M16.24 16.24l2.83 2.83" />
                      <path d="M3 12h4" />
                      <path d="M17 12h4" />
                      <path d="M4.93 19.07l2.83-2.83" />
                      <path d="M16.24 7.76l2.83-2.83" />
                      <circle cx="12" cy="12" r="5" />
                    </svg>
                  )}
                  {key === 'clients' && (
                    <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={styles.icon}>
                      <path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
                      <path d="M17 18h1" />
                      <path d="M12 18h1" />
                      <path d="M7 18h1" />
                    </svg>
                  )}
                  {key === 'years' && (
                    <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={styles.icon}>
                      <rect x="3" y="3" width="7" height="7" rx="1.5" />
                      <rect x="14" y="3" width="7" height="7" rx="1.5" />
                      <rect x="14" y="14" width="7" height="7" rx="1.5" />
                      <rect x="3" y="14" width="7" height="7" rx="1.5" />
                    </svg>
                  )}
                </div>
                <div className={styles.numberWrapper}>
                  <span className={styles.number}>{t(`stats.${key}.value`)}</span>
                  <span className={styles.suffix}>{t(`stats.${key}.suffix`)}</span>
                </div>
                <div className={styles.miniLine} />
                <span className={styles.label}>{t(`stats.${key}.label`)}</span>
                <p className={styles.description}>{t(`stats.${key}.description`)}</p>
              </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
