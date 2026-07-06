'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useTranslations } from 'next-intl';
import { ProcessStep } from '../ProcessStep';
import { Section } from '../Section';
import { SectionHeader } from '../SectionHeader';
import styles from './PrivateLabelProcess.module.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const stepKeys = ['1', '2', '3', '4'] as const;

export function PrivateLabelProcess() {
  const t = useTranslations('PrivateLabelPage.Process');
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP((context) => {
    const steps = context.selector?.('.process-step');
    const header = context.selector?.('.process-header');

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

    if (steps) {
      gsap.fromTo(steps, {
        y: 40,
        opacity: 0
      }, {
        scrollTrigger: {
          trigger: '.process-grid',
          start: 'top 75%',
        },
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out'
      });
    }
  }, { scope: sectionRef });

  return (
    <Section className={styles.section} ref={sectionRef}>
      <SectionHeader title={t('title')} className={`${styles.header} process-header`} />

      <div className={`${styles.grid} process-grid`}>
        {stepKeys.map((key, index) => (
          <ProcessStep
            key={key}
            className="process-step"
            number={key}
            title={t(`steps.${key}.title`)}
            description={t(`steps.${key}.desc`)}
            withConnector={index < stepKeys.length - 1}
          />
        ))}
      </div>
    </Section>
  );
}
