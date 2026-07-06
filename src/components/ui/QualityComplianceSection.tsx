'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useTranslations } from 'next-intl';
import { FeatureCard } from './FeatureCard';
import { Section } from './Section';
import { SectionHeader } from './SectionHeader';
import styles from './QualityComplianceSection.module.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const pointKeys = ['labeling', 'anvisa'] as const;

export function QualityComplianceSection() {
  const t = useTranslations('Compliance');
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP((context) => {
    const header = context.selector?.('.compliance-header');
    const cards = context.selector?.('.compliance-card');

    if (header) {
      gsap.fromTo(header, { y: 28, opacity: 0 }, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
        y: 0,
        opacity: 1,
        duration: 0.9,
        ease: 'power3.out'
      });
    }

    if (cards) {
      gsap.fromTo(cards, { y: 36, opacity: 0 }, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 74%',
        },
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out'
      });
    }
  }, { scope: sectionRef });

  return (
    <Section id="certifications" className={styles.section} ref={sectionRef}>
      <SectionHeader
        eyebrow={t('tagline')}
        title={t('title')}
        description={t('description')}
        className={`compliance-header ${styles.header}`}
      />

      <div className={styles.grid}>
        {pointKeys.map((key) => (
          <FeatureCard
            key={key}
            className={`compliance-card ${styles.card}`}
            variant="highlight"
            title={t(`points.${key}.title`)}
            description={t(`points.${key}.text`)}
            icon={
              key === 'labeling' ? (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15V6a2 2 0 0 0-2-2h-7l-9 9 7 7 9-9V15Z" />
                  <path d="M7.5 7.5h.01" />
                </svg>
              ) : (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              )
            }
          />
        ))}
      </div>
    </Section>
  );
}
