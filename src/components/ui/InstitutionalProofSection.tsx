'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useTranslations } from 'next-intl';
import { FeatureCard } from './FeatureCard';
import { Section } from './Section';
import { SectionHeader } from './SectionHeader';
import styles from './InstitutionalProofSection.module.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const pillarKeys = ['quality', 'compliance', 'partnership'] as const;

export function InstitutionalProofSection() {
  const lab = useTranslations('About.Laboratory');
  const manifesto = useTranslations('About.Manifesto');
  const values = useTranslations('About.Values');
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP((context) => {
    const header = context.selector?.('.inst-header');
    const cards = context.selector?.('.inst-card');
    const media = context.selector?.('.inst-media');

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
        <div className={`${styles.content} inst-header`}>
          <SectionHeader
            eyebrow={lab('tagline')}
            title={lab('title')}
            description={lab('description')}
            align="left"
            className={styles.header}
          />

          <div className={styles.storyBlock}>
            <p className={styles.storyLead}>{manifesto('paragraph1')}</p>
            <p className={styles.storyText}>{manifesto('paragraph4')}</p>
          </div>
        </div>

        <div className={`${styles.mediaPanel} inst-media`}>
          <div className={styles.mainImageCard}>
            <div className={styles.mainImageWrap}>
              <Image
                src="/images/differentials/factory.png"
                alt={lab('title')}
                fill
                className={styles.mainImage}
                sizes="(max-width: 1024px) 100vw, 42vw"
              />
            </div>
          </div>
          <div className={styles.secondaryImageCard}>
            <div className={styles.secondaryImageWrap}>
              <Image
                src="/images/differentials/laboratory.png"
                alt={lab('tagline')}
                fill
                className={styles.secondaryImage}
                sizes="(max-width: 1024px) 100vw, 18vw"
              />
            </div>
          </div>
        </div>
      </div>

      <div className={styles.pillarsGrid}>
        {pillarKeys.map((key) => (
          <FeatureCard
            key={key}
            className={`${styles.pillarCard} inst-card`}
            variant="compact"
            title={values(`items.${key}.title`)}
            description={values(`items.${key}.desc`)}
          />
        ))}
      </div>
    </Section>
  );
}
