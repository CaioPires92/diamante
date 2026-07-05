'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useTranslations } from 'next-intl';
import { Section } from './Section';
import { SectionHeader } from './SectionHeader';
import styles from './PrivateLabelTeaser.module.css';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function PrivateLabelTeaser() {
  const t = useTranslations('PrivateLabel');
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP((context) => {
    const phrase = context.selector?.('.pl-phrase');

    if (phrase) {
      gsap.fromTo(phrase, {
        y: 28,
        opacity: 0,
      }, {
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
  }, { scope: sectionRef, dependencies: [] });

  return (
    <Section id="private-label" variant="soft" className={styles.section} ref={sectionRef}>
      <SectionHeader
        title={t('title')}
        className={`pl-phrase ${styles.header}`}
      />
    </Section>
  );
}
