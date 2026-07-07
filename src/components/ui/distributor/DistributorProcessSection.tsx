'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useTranslations } from 'next-intl';
import { Section } from '../Section';
import { SectionHeader } from '../SectionHeader';
import styles from './DistributorProcessSection.module.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const stepKeys = ['1', '2', '3', '4', '5'] as const;
const whatsappPhone = '551938176156';

export function DistributorProcessSection() {
  const t = useTranslations('DistributorPage.Process');
  const sectionRef = useRef<HTMLElement>(null);

  const getWhatsAppUrl = (key: typeof stepKeys[number]) => {
    const title = t(`steps.${key}.title`);
    const action = t(`steps.${key}.action`);
    const message = `Olá! Quero falar sobre a etapa "${title}" da Diamante Profissional. Tenho interesse em "${action.toLowerCase()}".`;

    return `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(message)}`;
  };

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
      <div className={styles.layout}>
        <SectionHeader
          eyebrow={t('tagline')}
          title={t('title')}
          description={t('description')}
          align="left"
          className={`${styles.header} distributor-process-header`}
        />

        <div className={styles.grid}>
          {stepKeys.map((key) => (
            <article key={key} className={`${styles.step} distributor-process-step`}>
              <div className={styles.markerColumn}>
                <span className={styles.numberWrap}>
                  <span className={styles.number}>{key}</span>
                </span>
              </div>

              <div className={styles.card}>
                <h3 className={styles.title}>{t(`steps.${key}.title`)}</h3>
                <p className={styles.description}>{t(`steps.${key}.desc`)}</p>
                <a
                  href={getWhatsAppUrl(key)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.actionLabel}
                >
                  {t(`steps.${key}.action`)}
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </Section>
  );
}
