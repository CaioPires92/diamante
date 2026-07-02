'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { Container } from './Container';
import styles from './FinalCTA.module.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function FinalCTA() {
  const t = useTranslations('FinalCTA');
  const locale = useLocale();
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

    // Text Reveal
    const elements = context.selector?.('.cta-animate');
    if (elements) {
      gsap.fromTo(elements, {
        y: 40,
        opacity: 0,
      }, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out'
      });
    }
  }, { scope: sectionRef, dependencies: [] });

  return (
    <section className={styles.section} ref={sectionRef}>
      {/* Parallax Background */}
      <div className={styles.parallaxBg} ref={bgRef}>
        <Image 
          src="/imgs/final_cta_parallax_bg.png"
          alt=""
          fill
          className={styles.parallaxImage}
          priority
        />
        <div className={styles.overlay} />
      </div>

      <Container>
        <div className={styles.content}>
          <h2 className={`${styles.title} cta-animate`}>{t('title')}</h2>
          <p className={`${styles.description} cta-animate`}>{t('description')}</p>
          
          <div className={`${styles.buttonGroup} cta-animate`}>
            <Link href={`/${locale}/private-label`} className={styles.btnPrimary}>
              {t('ctaPrimary')}
            </Link>
            <Link href={`/${locale}/contact`} className={styles.btnSecondary}>
              {t('ctaSecondary')}
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
