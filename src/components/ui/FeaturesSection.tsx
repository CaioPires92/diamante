'use client';
import Image from 'next/image';
import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useTranslations } from 'next-intl';
import { Container } from './Container';
import styles from './FeaturesSection.module.css';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const features = [
  {
    id: 'factory',
    image: '/images/differentials/factory.png',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/><path d="M17 18h1"/><path d="M12 18h1"/><path d="M7 18h1"/>
      </svg>
    )
  },
  {
    id: 'tech',
    image: '/images/differentials/laboratory.png',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 2v7.31"/><path d="M14 9.3V2"/><path d="M8.5 2h7"/><path d="M14 9.3a6.5 6.5 0 1 1-4 0"/><path d="M5.52 16h12.96"/>
      </svg>
    )
  },
  {
    id: 'anvisa',
    image: '/images/differentials/anvisa.png',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/>
      </svg>
    )
  },
  {
    id: 'intl',
    image: '/images/differentials/world.png',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>
      </svg>
    )
  },
  {
    id: 'portfolio',
    image: '/images/differentials/products.png',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/>
      </svg>
    )
  },
  {
    id: 'premium',
    image: '/images/differentials/diamond.png',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 3h12l4 6-10 12L2 9Z"/><path d="M11 3 8 9l4 12 4-12-3-6"/><path d="M2 9h20"/>
      </svg>
    )
  }
];

export function FeaturesSection() {
  const t = useTranslations('Features');
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP((context) => {
    const header = context.selector?.('.feature-header');
    const cards = context.selector?.('.feature-card');
    const highlights = context.selector?.('.highlight-item');

    if (header) {
      gsap.fromTo(header, 
        { y: 30, opacity: 0 },
        { scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }, y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
      );
    }

    if (cards) {
      gsap.fromTo(cards, 
        { y: 40, opacity: 0 },
        { scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' }, y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out' }
      );
    }

    if (highlights) {
      gsap.fromTo(highlights,
        { y: 20, opacity: 0 },
        { scrollTrigger: { trigger: context.selector?.('.bottom-highlights'), start: 'top 85%' }, y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out' }
      );
    }
  }, { scope: sectionRef, dependencies: [] });

  return (
    <section id="features" className={styles.section} ref={sectionRef}>
      <Container size="wide">
        <div className={`${styles.header} feature-header`}>
          <span className={styles.tagline}>{t('tagline')}</span>
          <h2 className={styles.title}>{t('title')}</h2>
          <p className={styles.description}>{t('description')}</p>
        </div>

        <div className={styles.grid}>
          {features.map((feature) => (
            <div key={feature.id} className={`${styles.card} feature-card`}>
              <div className={styles.cardContent}>
                <div className={styles.iconWrapper}>
                  {feature.icon}
                </div>
                <div className={styles.cardText}>
                  <h3 className={styles.cardTitle}>{t(`items.${feature.id}.title`)}</h3>
                  <p className={styles.cardDesc}>{t(`items.${feature.id}.desc`)}</p>
                </div>
              </div>
              <div className={styles.cardImagePlaceholder}>
                <Image src={feature.image} alt={t(`items.${feature.id}.title`)} fill className={styles.cardImage} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
                <div className={styles.cardImageGradientFade} />
              </div>
            </div>
          ))}
        </div>

        <div className={`${styles.bottomHighlights} bottom-highlights`}>
          {['actives', 'safety', 'results', 'innovation'].map((highlight) => (
            <div key={highlight} className={`${styles.highlightItem} highlight-item`}>
              <div className={styles.highlightIcon}>
                {highlight === 'actives' && <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>}
                {highlight === 'safety' && <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/></svg>}
                {highlight === 'results' && <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>}
                {highlight === 'innovation' && <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/></svg>}
              </div>
              <div className={styles.highlightText}>
                <h4>{t(`highlights.${highlight}.title`)}</h4>
                <p>{t(`highlights.${highlight}.desc`)}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
