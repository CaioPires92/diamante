'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useTranslations } from 'next-intl';
import { Container } from './Container';
import styles from './PrivateLabelTeaser.module.css';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function PrivateLabelTeaser() {
  const t = useTranslations('PrivateLabel');
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useGSAP((context) => {
    // Parallax Effect
    if (bgRef.current) {
      gsap.to(bgRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
        y: '15%',
        ease: 'none',
      });
    }

    const content = context.selector?.('.pl-content');
    const visual = context.selector?.('.pl-visual');
    const features = context.selector?.('.pl-feature');

    if (content) {
      gsap.fromTo(content, {
        x: -50,
        opacity: 0,
      }, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
        x: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out'
      });
    }

    if (visual) {
      // Entrance
      gsap.fromTo(visual, {
        scale: 0.8,
        opacity: 0,
      }, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
        },
        scale: 1,
        opacity: 1,
        duration: 1.5,
        ease: 'elastic.out(1, 0.75)'
      });

      // Parallax
      gsap.to(visual, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
        y: -30,
        ease: 'none'
      });
    }

    if (features) {
      gsap.fromTo(features, {
        y: 20,
        opacity: 0,
      }, {
        scrollTrigger: {
          trigger: '.pl-features-container',
          start: 'top 80%',
        },
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        delay: 0.5
      });
    }
  }, { scope: sectionRef, dependencies: [] });

  return (
    <section id="private-label" className={styles.section} ref={sectionRef}>
      {/* Parallax Background */}
      <div className={styles.parallaxBg} ref={bgRef}>
        <Image 
          src="/imgs/private_label_parallax_bg.png"
          alt=""
          fill
          className={styles.parallaxImage}
          priority
        />
        <div className={styles.overlay} />
      </div>

      <Container>
        <div className={styles.grid}>
          <div className={`${styles.content} pl-content`}>
            <span className={styles.tagline}>{t('tagline')}</span>
            <h2 className={styles.title}>{t('title')}</h2>
            <p className={styles.description}>{t('description')}</p>

            <div className={`${styles.featuresGrid} pl-features-container`}>
              <div className={`${styles.feature} pl-feature`}>
                <div className={styles.featureIcon}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/>
                    <path d="M17 18h1"/><path d="M12 18h1"/><path d="M7 18h1"/>
                  </svg>
                </div>
                <span className={styles.featureTitle}>{t('features.manufacturing')}</span>
              </div>

              <div className={`${styles.feature} pl-feature`}>
                <div className={styles.featureIcon}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09Z"/>
                    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2Z"/>
                    <path d="M9 12H4s.5-1 1-4c1.5 0 3 0 4.5 1.5"/>
                    <path d="M15 11v5s1 .5 4 1c0-1.5 0-3-1.5-4.5"/>
                  </svg>
                </div>
                <span className={styles.featureTitle}>{t('features.formulas')}</span>
              </div>

              <div className={`${styles.feature} pl-feature`}>
                <div className={styles.featureIcon}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="14" x="2" y="3" rx="2"/><line x1="8" x2="16" y1="21" y2="21"/><line x1="12" x2="12" y1="17" y2="21"/>
                  </svg>
                </div>
                <span className={styles.featureTitle}>{t('features.design')}</span>
              </div>

              <div className={`${styles.feature} pl-feature`}>
                <div className={styles.featureIcon}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/>
                    <path d="m9 12 2 2 4-4"/>
                  </svg>
                </div>
                <span className={styles.featureTitle}>{t('features.quality')}</span>
              </div>
            </div>

            <button className={styles.cta}>
              {t('cta')}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
            </button>
          </div>

          <div className={`${styles.visual} pl-visual`}>
            <div className={styles.imageContainer}>
              <svg className={styles.luxuryIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 3h12l4 6-10 13L2 9Z"/>
                <path d="M11 3 8 9l4 13"/>
                <path d="M13 3l3 6-4 13"/>
                <path d="M2 9h20"/>
              </svg>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
