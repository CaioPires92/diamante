'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useTranslations } from 'next-intl';
import { Section } from './Section';
import styles from './PrivateLabelHighlightsSection.module.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const highlightKeys = ['exclusive', 'performance', 'speed', 'support', 'flexibility'] as const;

function FlaskIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M10 3h4" />
      <path d="M10 3v5l-4.5 7.5A3 3 0 0 0 8.07 20h7.86a3 3 0 0 0 2.57-4.5L14 8V3" />
      <path d="M8.5 14h7" />
    </svg>
  );
}

function SparkIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m12 3 1.9 4.7L18.7 9 14 10.9 12 16l-2-5.1L5.3 9l4.8-1.3L12 3Z" />
      <path d="M18 14.5 19 17l2.5 1-2.5 1L18 21.5 17 19l-2.5-1 2.5-1 1-2.5Z" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5v5l3 1.8" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 3 5.5 5.6v5.7c0 4.3 2.7 8.2 6.5 9.7 3.8-1.5 6.5-5.4 6.5-9.7V5.6L12 3Z" />
      <path d="m9.5 12.2 1.8 1.8 3.5-4" />
    </svg>
  );
}

function LayersIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m12 4 8 4-8 4-8-4 8-4Z" />
      <path d="m4 12 8 4 8-4" />
      <path d="m4 16 8 4 8-4" />
    </svg>
  );
}

const icons = {
  exclusive: FlaskIcon,
  performance: SparkIcon,
  speed: ClockIcon,
  support: ShieldIcon,
  flexibility: LayersIcon,
} as const;

export function PrivateLabelHighlightsSection() {
  const t = useTranslations('StructureHighlights');
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP((context) => {
    const items = context.selector?.('.highlight-item');

    if (items) {
      gsap.fromTo(items, { y: 24, opacity: 0 }, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 82%',
        },
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.08,
        ease: 'power3.out'
      });
    }
  }, { scope: sectionRef });

  return (
    <Section variant="dark" className={styles.section} innerClassName={styles.inner} ref={sectionRef}>
      <div className={styles.grid}>
        {highlightKeys.map((key) => {
          const Icon = icons[key];

          return (
            <div key={key} className={`${styles.item} highlight-item`}>
              <span className={styles.icon}>
                <Icon />
              </span>
              <p className={styles.label}>{t(`items.${key}`)}</p>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
