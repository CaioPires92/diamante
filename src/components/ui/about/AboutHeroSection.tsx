'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useTranslations } from 'next-intl';
import { Container } from '../Container';
import styles from './AboutHeroSection.module.css';

export function AboutHeroSection() {
  const t = useTranslations('About.Hero');
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP((context) => {
    const elements = context.selector?.('.hero-anim');
    
    if (elements) {
      gsap.fromTo(elements, {
        y: 40,
        opacity: 0
      }, {
        y: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.2,
        ease: 'power3.out',
        delay: 0.2
      });
    }
  }, { scope: sectionRef });

  return (
    <section className={styles.section} ref={sectionRef}>
      <div className={styles.heroBackground} aria-hidden="true">
        <Image
          src="/imgs/hero_final_v5.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className={styles.heroBackgroundImage}
        />
      </div>

      <Container size="wide" className={styles.heroContainer}>
        <div className={styles.layout}>
          <div className={styles.content}>
            <span className={`${styles.tagline} hero-anim`}>{t('tagline')}</span>
            <h1 className={`${styles.title} hero-anim`}>{t('title')}</h1>
            <p className={`${styles.subtitle} hero-anim`}>{t('subtitle')}</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
