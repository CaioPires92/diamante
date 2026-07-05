'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useTranslations } from 'next-intl';
import { FeatureCard } from './FeatureCard';
import { Section } from './Section';
import { SectionHeader } from './SectionHeader';
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
    <Section id="services" variant="soft" className={styles.section} ref={sectionRef}>
      <SectionHeader
        eyebrow={t('tagline')}
        title={t('title')}
        description={t('description')}
        className={`${styles.header} structure-header`}
      />

      <div className={styles.panel}>
        <div className={styles.grid}>
          {serviceKeys.map((key) => (
            <FeatureCard
              key={key}
              className={`${styles.card} structure-card`}
              variant="default"
              accent
              title={t(`items.${key}.title`)}
              description={t(`items.${key}.desc`)}
            />
          ))}
        </div>
      </div>

      <div className={styles.highlightBlock}>
        <SectionHeader
          eyebrow={t('highlightsLabel')}
          className={styles.highlightHeader}
        />

        <div className={styles.highlightGrid}>
          {highlightKeys.map((key) => (
            <FeatureCard
              key={key}
              variant="compact"
              className={styles.highlightCard}
              title={t(`highlights.${key}.title`)}
              description={t(`highlights.${key}.desc`)}
            />
          ))}
        </div>
      </div>
    </Section>
  );
}
