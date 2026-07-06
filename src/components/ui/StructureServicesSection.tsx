'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useTranslations } from 'next-intl';
import { CTAButton } from './CTAButton';
import { Section } from './Section';
import styles from './StructureServicesSection.module.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const serviceKeys = ['development', 'manufacturing', 'filling'] as const;
const highlightKeys = ['exclusive', 'performance', 'speed', 'support', 'flexibility'] as const;

export function StructureServicesSection() {
  const t = useTranslations('StructureServices');
  const common = useTranslations('Common');
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP((context) => {
    const visual = context.selector?.('.services-visual');
    const content = context.selector?.('.services-content');
    const items = context.selector?.('.services-item');

    if (visual) {
      gsap.fromTo(visual, { x: -30, opacity: 0 }, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 78%',
        },
        x: 0,
        opacity: 1,
        duration: 0.9,
        ease: 'power3.out'
      });
    }

    if (content) {
      gsap.fromTo(content, { x: 30, opacity: 0 }, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 78%',
        },
        x: 0,
        opacity: 1,
        duration: 0.9,
        ease: 'power3.out'
      });
    }

    if (items) {
      gsap.fromTo(items, { y: 18, opacity: 0 }, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 72%',
        },
        y: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.08,
        ease: 'power2.out'
      });
    }
  }, { scope: sectionRef });

  return (
    <Section
      id="services"
      variant="soft"
      className={styles.section}
      innerClassName={styles.inner}
      ref={sectionRef}
    >
      <div className={styles.layout}>
        <div className={`${styles.visualColumn} services-visual`}>
          <span className={styles.eyebrow}>{t('tagline')}</span>
          <h2 className={styles.title}>{t('title')}</h2>

          <div className={styles.imageWrap}>
            <Image
              src="/images/differentials/laboratory.png"
              alt={t('title')}
              fill
              className={styles.image}
              sizes="(max-width: 1024px) 100vw, 42vw"
            />
          </div>
        </div>

        <div className={`${styles.contentColumn} services-content`}>
          <p className={styles.description}>{t('description')}</p>

          <span className={styles.servicesLabel}>{t('servicesLabel')}</span>
          <div className={styles.servicesList}>
            {serviceKeys.map((key) => (
              <div key={key} className={`${styles.serviceItem} services-item`}>
                <h3 className={styles.serviceTitle}>{t(`items.${key}.title`)}</h3>
              </div>
            ))}
          </div>

          <div className={styles.deliveryBlock}>
            <span className={styles.deliveryLabel}>{t('deliveryLabel')}</span>
            <p className={styles.deliveryText}>{t('deliveryText')}</p>
          </div>

          <div className={styles.complianceBlock}>
            <span className={styles.complianceLabel}>{t('complianceLabel')}</span>
            <p className={styles.complianceText}>{t('complianceText')}</p>
          </div>

          <div className={styles.highlightsBlock}>
            <span className={styles.highlightsLabel}>{t('highlightsLabel')}</span>
            <div className={styles.highlightsList}>
              {highlightKeys.map((key) => (
                <span key={key} className={styles.highlightItem}>
                  {t(`highlights.${key}.title`)}
                </span>
              ))}
            </div>
          </div>

          <CTAButton
            href="https://wa.me/551938176156"
            variant="secondary"
            className={styles.cta}
            target="_blank"
            rel="noopener noreferrer"
          >
            {common('whatsapp')}
          </CTAButton>
        </div>
      </div>
    </Section>
  );
}
