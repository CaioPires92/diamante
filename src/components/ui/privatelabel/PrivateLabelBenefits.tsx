'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useTranslations } from 'next-intl';
import { Container } from '../Container';
import styles from './PrivateLabelBenefits.module.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const benefitKeys = ['profit', 'quality', 'support'] as const;

export function PrivateLabelBenefits() {
  const t = useTranslations('PrivateLabelPage.Benefits');
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP((context) => {
    const cards = context.selector?.('.benefit-card');
    const header = context.selector?.('.benefit-header');

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
          trigger: '.benefits-grid',
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
        <div className={`${styles.header} benefit-header`}>
          <h2 className={styles.title}>{t('title')}</h2>
        </div>

        <div className={styles.panel}>
          <div className={`${styles.grid} benefits-grid`}>
            {benefitKeys.map((key, index) => (
              <article key={key} className={`${styles.card} benefit-card`}>
                <span className={styles.cardIndex}>{`0${index + 1}`}</span>
                <div className={styles.cardLine} />
                <h3 className={styles.cardTitle}>{t(`items.${key}.title`)}</h3>
                <p className={styles.cardDesc}>{t(`items.${key}.desc`)}</p>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
