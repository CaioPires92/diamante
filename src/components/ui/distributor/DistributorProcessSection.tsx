'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useTranslations } from 'next-intl';
import { ProcessStep } from '../ProcessStep';
import { Section } from '../Section';
import { SectionHeader } from '../SectionHeader';
import styles from './DistributorProcessSection.module.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const stepKeys = ['1', '2', '3', '4', '5'] as const;

export function DistributorProcessSection() {
  const t = useTranslations('DistributorPage.Process');
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP((context) => {
    const steps = context.selector?.('.distributor-process-step');
    const header = context.selector?.('.distributor-process-header');

    if (header) {
      gsap.fromTo(header, { y: 28, opacity: 0 }, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 82%',
        },
        y: 0,
        opacity: 1,
        duration: 0.9,
        ease: 'power3.out'
      });
    }

    if (steps) {
      gsap.fromTo(steps, { y: 32, opacity: 0 }, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 76%',
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
    <Section className={styles.section} ref={sectionRef}>
      <SectionHeader
        eyebrow={t('tagline')}
        title={t('title')}
        description={t('description')}
        className={`${styles.header} distributor-process-header`}
      />

      <div className={styles.grid}>
        {stepKeys.map((key, index) => (
          <ProcessStep
            key={key}
            className="distributor-process-step"
            number={key}
            title={t(`steps.${key}.title`)}
            description={t(`steps.${key}.desc`)}
            actionLabel={t(`steps.${key}.action`)}
            withConnector={index < stepKeys.length - 1}
          />
        ))}
      </div>
    </Section>
  );
}
