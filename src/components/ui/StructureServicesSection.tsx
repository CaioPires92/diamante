'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useTranslations } from 'next-intl';
import { Container } from './Container';
import styles from './StructureServicesSection.module.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const serviceKeys = ['development', 'manufacturing', 'filling', 'regulatory', 'design'] as const;
const highlightKeys = ['exclusive', 'performance', 'speed', 'support', 'flexibility'] as const;

export function StructureServicesSection() {
  const t = useTranslations('StructureServices');
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP((context) => {
    const header = context.selector?.('.structure-header');
    const cards = context.selector?.('.structure-card');

    if (header) {
      gsap.fromTo(header, { y: 30, opacity: 0 }, {
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
      gsap.fromTo(cards, { y: 40, opacity: 0 }, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 72%',
        },
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out'
      });
    }
  }, { scope: sectionRef });

  return (
    <section id="services" className={styles.section} ref={sectionRef}>
      <Container>
        <div className={`${styles.header} structure-header`}>
          <span className={styles.tagline}>{t('tagline')}</span>
          <h2 className={styles.title}>{t('title')}</h2>
          <p className={styles.description}>{t('description')}</p>
        </div>

        <div className={styles.panel}>
          <div className={styles.panelGlow} />
          <div className={styles.grid}>
            {serviceKeys.map((key) => (
              <article key={key} className={`${styles.card} structure-card`}>
                <div className={styles.cardAccent} aria-hidden="true">
                  <span className={styles.cardAccentLine} />
                </div>
                <h3 className={styles.cardTitle}>{t(`items.${key}.title`)}</h3>
                <p className={styles.cardDescription}>{t(`items.${key}.desc`)}</p>
              </article>
            ))}
          </div>
        </div>

        <div className={styles.highlightBlock}>
          <div className={styles.highlightHeader}>
            <span className={styles.highlightLabel}>{t('highlightsLabel')}</span>
          </div>

          <div className={styles.highlightGrid}>
            {highlightKeys.map((key) => (
              <article key={key} className={styles.highlightCard}>
                <h3 className={styles.highlightTitle}>{t(`highlights.${key}.title`)}</h3>
                <p className={styles.highlightDescription}>{t(`highlights.${key}.desc`)}</p>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
