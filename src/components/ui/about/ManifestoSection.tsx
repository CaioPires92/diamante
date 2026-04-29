'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useTranslations } from 'next-intl';
import { Container } from '../Container';
import styles from './ManifestoSection.module.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function ManifestoSection() {
  const t = useTranslations('About.Manifesto');
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP((context) => {
    const textBlocks = context.selector?.('.manif-anim');
    
    if (textBlocks) {
      gsap.fromTo(textBlocks, {
        y: 40,
        opacity: 0
      }, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
        y: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.2,
        ease: 'power3.out'
      });
    }
  }, { scope: sectionRef });

  return (
    <section className={styles.section} ref={sectionRef}>
      <Container>
        <div className={styles.content}>
          <h2 className={`${styles.title} manif-anim`}>{t('title')}</h2>
          <div className={styles.textContainer}>
            <p className={`${styles.paragraph} manif-anim`}>{t('paragraph1')}</p>
            <p className={`${styles.paragraph} manif-anim`}>{t('paragraph2')}</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
