'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useTranslations } from 'next-intl';
import { Container } from '../Container';
import styles from './PrivateLabelHero.module.css';

export function PrivateLabelHero() {
  const t = useTranslations('PrivateLabelPage.Hero');
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP((context) => {
    const elements = context.selector?.('.hero-anim');
    
    if (elements) {
      gsap.fromTo(elements, {
        y: 30,
        opacity: 0
      }, {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out',
        delay: 0.2
      });
    }
  }, { scope: sectionRef });

  return (
    <section className={styles.section} ref={sectionRef}>
      <Image
        src="/imgs/private_label_parallax_bg.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className={styles.backgroundImage}
      />
      <div className={styles.overlay} />
      <Container size="wide">
        <div className={styles.layout}>
          <div className={styles.content}>
            <span className={`${styles.tagline} hero-anim`}>{t('tagline')}</span>
            <h1 className={`${styles.title} hero-anim`}>{t('title')}</h1>
            <p className={`${styles.subtitle} hero-anim`}>{t('subtitle')}</p>
          </div>

          <div className={`${styles.formulaPanel} hero-anim`} aria-hidden="true">
            <div className={styles.panelLine} />
            <div className={styles.panelCircle} />
          </div>
        </div>
      </Container>
    </section>
  );
}
