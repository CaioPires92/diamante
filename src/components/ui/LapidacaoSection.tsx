'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useTranslations } from 'next-intl';
import { Container } from './Container';
import styles from './LapidacaoSection.module.css';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function LapidacaoSection() {
  const t = useTranslations('Lapidacao');
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP((context) => {
    const content = context.selector?.('.lap-content');
    const image = context.selector?.('.lap-image');
    const steps = context.selector?.('.lap-step');

    if (image) {
      // Entrance
      gsap.fromTo(image, {
        x: -60,
        opacity: 0,
      }, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
        x: 0,
        opacity: 1,
        duration: 1.2,
        ease: 'power3.out'
      });

      // Continuous Parallax
      gsap.to(image, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
        y: 60,
        ease: 'none'
      });
    }

    if (content) {
      gsap.fromTo(content, {
        x: 60,
        opacity: 0,
      }, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
        },
        x: 0,
        opacity: 1,
        duration: 1.2,
        ease: 'power3.out'
      });
    }

    if (steps) {
      gsap.fromTo(steps, {
        x: 30,
        opacity: 0,
      }, {
        scrollTrigger: {
          trigger: '.lap-steps-container',
          start: 'top 95%', // Even earlier
        },
        x: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
        clearProps: 'all'
      });
    }
  }, { scope: sectionRef, dependencies: [] });

  return (
    <section id="lapidacao" className={styles.section} ref={sectionRef}>
      <Container>
        <div className={styles.grid}>
          <div className={`${styles.imageContainer} lap-image`}>
            <div style={{ position: 'relative', width: '100%', height: '100%' }}>
              <Image 
                src="/imgs/lapidacao_4steps.png" 
                alt={t('title')}
                fill
                className={styles.image}
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
          </div>

          <div className={`${styles.content} lap-content`}>
            <span className={styles.tagline}>{t('tagline')}</span>
            <h2 className={styles.title}>{t('title')}</h2>
            <p className={styles.description}>{t('description')}</p>

            <div className={`${styles.steps} lap-steps-container`}>
              {[1, 2, 3, 4].map((num) => (
                <div key={num} className={`${styles.step} lap-step`}>
                  <div className={styles.stepNumber}>0{num}</div>
                  <div className={styles.stepContent}>
                    <h4>{t(`steps.step${num}.title`)}</h4>
                    <p>{t(`steps.step${num}.description`)}</p>
                  </div>
                </div>
              ))}
            </div>

            <button className={styles.cta}>
              {t('cta')}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}
