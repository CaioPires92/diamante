'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useTranslations, useLocale } from 'next-intl';
import { CTAButton } from './CTAButton';
import { Section } from './Section';
import { SectionHeader } from './SectionHeader';
import styles from './FinalCTA.module.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function FinalCTA() {
  const t = useTranslations('FinalCTA');
  const locale = useLocale();
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP((context) => {
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
    <Section variant="dark" className={styles.section} ref={sectionRef} fullBleed>
      <div className={styles.bgWrap} aria-hidden="true">
        <Image
          src="/imgs/final_cta_parallax_bg.png"
          alt=""
          fill
          sizes="100vw"
          className={styles.bgImage}
          priority
        />
      </div>

      <div className={styles.content}>
        <SectionHeader
          title={t('title')}
          description={t('description')}
          theme="inverse"
          className={`cta-animate ${styles.header}`}
        />

        <div className={`${styles.buttonGroup} cta-animate`}>
          <CTAButton href={`/${locale}/private-label`} variant="primary">
            {t('ctaPrimary')}
          </CTAButton>
          <CTAButton href={`/${locale}/contact`} variant="outline-light">
            {t('ctaSecondary')}
          </CTAButton>
        </div>
      </div>
    </Section>
  );
}
