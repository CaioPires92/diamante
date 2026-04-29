'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useTranslations } from 'next-intl';
import { Container } from '../Container';
import styles from './LaboratorySection.module.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function LaboratorySection() {
  const t = useTranslations('About.Laboratory');
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP((context) => {
    const content = context.selector?.('.lab-content');
    const stats = context.selector?.('.lab-stat');
    
    if (content) {
      gsap.fromTo(content, {
        x: -40,
        opacity: 0
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
    }

    if (stats) {
      gsap.fromTo(stats, {
        y: 20,
        opacity: 0
      }, {
        scrollTrigger: {
          trigger: '.lab-stats-container',
          start: 'top 85%',
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
        <div className={styles.grid}>
          <div className={`${styles.content} lab-content`}>
            <span className={styles.tagline}>{t('tagline')}</span>
            <h2 className={styles.title}>{t('title')}</h2>
            <p className={styles.description}>{t('description')}</p>
          </div>
          <div className={`${styles.statsContainer} lab-stats-container`}>
            {['production', 'quality', 'tech'].map((key, index) => (
              <div key={key} className={`${styles.stat} lab-stat`}>
                <div className={styles.statLine}></div>
                <div className={styles.statNumber}>0{index + 1}</div>
                <div className={styles.statText}>{t(`stats.${key}`)}</div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
