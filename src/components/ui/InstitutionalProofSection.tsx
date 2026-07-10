'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useTranslations } from 'next-intl';
import { Section } from './Section';
import styles from './InstitutionalProofSection.module.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const pillarKeys = ['quality', 'compliance', 'partnership', 'delivery'] as const;

const stats = [
  { value: '2010', label: 'Fundação em Amparo/SP' },
  { value: '200+', label: 'Produtos no portfólio' },
  { value: '15+', label: 'Anos de experiência' },
  { value: '4', label: 'Países com exportação' },
];

export function InstitutionalProofSection() {
  const lab = useTranslations('About.Laboratory');
  const manifesto = useTranslations('About.Manifesto');
  const values = useTranslations('About.Values');
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP((context) => {
    const content = context.selector?.('.inst-content');
    const cards = context.selector?.('.inst-card');
    const media = context.selector?.('.inst-media');

    if (content) {
      gsap.fromTo(content, { y: 30, opacity: 0 }, {
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

    if (media) {
      gsap.fromTo(media, { scale: 0.96, opacity: 0 }, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
        scale: 1,
        opacity: 1,
        duration: 1.1,
        ease: 'power3.out'
      });
    }

    if (cards) {
      gsap.fromTo(cards, { y: 36, opacity: 0 }, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 72%',
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
    <Section variant="soft" className={styles.section} ref={sectionRef}>
      <div className={styles.layout}>
        <div className={`${styles.content} inst-content`}>
          <span className={styles.eyebrow}>{lab('tagline')}</span>
          <h2 className={styles.title}>{lab('title')}</h2>
          <p className={styles.description}>{lab('description')}</p>

          <div className={styles.storyBlock}>
            <p className={styles.storyLead}>{manifesto('paragraph1')}</p>
            <p className={styles.storyText}>{manifesto('paragraph2')}</p>
            <p className={styles.storyText}>{manifesto('paragraph4')}</p>
          </div>

          <div className={styles.statsRow}>
            {stats.map((stat) => (
              <div key={stat.label} className={styles.statItem}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={`${styles.mediaPanel} inst-media`}>
          <Image
            src="/images/differentials/factory.png"
            alt={lab('title')}
            fill
            className={styles.mainImage}
            sizes="(max-width: 1024px) 100vw, 46vw"
          />
        </div>
      </div>

      <div className={styles.pillarsGrid}>
        {pillarKeys.map((key) => (
          <article
            key={key}
            className={`${styles.pillarCard} inst-card`}
          >
            <span className={styles.pillarNumber}>{String(pillarKeys.indexOf(key) + 1).padStart(2, '0')}</span>
            <h3>{values(`items.${key}.title`)}</h3>
            <p>{values(`items.${key}.desc`)}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}
