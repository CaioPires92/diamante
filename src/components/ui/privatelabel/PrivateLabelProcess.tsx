'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useTranslations } from 'next-intl';
import { Container } from '../Container';
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
    <section className={styles.section} ref={sectionRef}>
      <Container>
        <div className={`${styles.header} process-header`}>
          <h2 className={styles.title}>{t('title')}</h2>
        </div>

        <div className={`${styles.grid} process-grid`}>
          {stepKeys.map((key) => (
            <div key={key} className={`${styles.step} process-step`}>
              <div className={styles.numberWrapper}>
                <span className={styles.number}>{key}</span>
              </div>
              <div className={styles.content}>
                <h3 className={styles.stepTitle}>{t(`steps.${key}.title`)}</h3>
                <p className={styles.stepDesc}>{t(`steps.${key}.desc`)}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
