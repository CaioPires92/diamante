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

function FlaskIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M10 3h4" />
      <path d="M10 3v5l-4.5 7.5A3 3 0 0 0 8.07 20h7.86a3 3 0 0 0 2.57-4.5L14 8V3" />
      <path d="M8.5 14h7" />
    </svg>
  );
}

function GearIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 8.2a3.8 3.8 0 1 0 0 7.6 3.8 3.8 0 0 0 0-7.6Z" />
      <path d="M19.4 15a1 1 0 0 0 .2 1.1l.1.1a1.9 1.9 0 0 1 0 2.7 1.9 1.9 0 0 1-2.7 0l-.1-.1a1 1 0 0 0-1.1-.2 1 1 0 0 0-.6.9V20a2 2 0 0 1-4 0v-.2a1 1 0 0 0-.6-.9 1 1 0 0 0-1.1.2l-.1.1a1.9 1.9 0 0 1-2.7 0 1.9 1.9 0 0 1 0-2.7l.1-.1a1 1 0 0 0 .2-1.1 1 1 0 0 0-.9-.6H4a2 2 0 0 1 0-4h.2a1 1 0 0 0 .9-.6 1 1 0 0 0-.2-1.1l-.1-.1a1.9 1.9 0 0 1 0-2.7 1.9 1.9 0 0 1 2.7 0l.1.1a1 1 0 0 0 1.1.2 1 1 0 0 0 .6-.9V4a2 2 0 0 1 4 0v.2a1 1 0 0 0 .6.9 1 1 0 0 0 1.1-.2l.1-.1a1.9 1.9 0 0 1 2.7 0 1.9 1.9 0 0 1 0 2.7l-.1.1a1 1 0 0 0-.2 1.1 1 1 0 0 0 .9.6h.2a2 2 0 0 1 0 4h-.2a1 1 0 0 0-.9.6Z" />
    </svg>
  );
}

function BottleIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M10 3h4" />
      <path d="M10.5 3v3l-1.8 2.1a4 4 0 0 0-1 2.6V18a3 3 0 0 0 3 3h2.6a3 3 0 0 0 3-3v-7.3a4 4 0 0 0-1-2.6L13.5 6V3" />
      <path d="M8.5 13h7" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 3 5.5 5.6v5.7c0 4.3 2.7 8.2 6.5 9.7 3.8-1.5 6.5-5.4 6.5-9.7V5.6L12 3Z" />
      <path d="m9.5 12.2 1.8 1.8 3.5-4" />
    </svg>
  );
}

function PeopleIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M8.2 11.2a2.7 2.7 0 1 0 0-5.4 2.7 2.7 0 0 0 0 5.4Z" />
      <path d="M15.8 10.2a2.2 2.2 0 1 0 0-4.4 2.2 2.2 0 0 0 0 4.4Z" />
      <path d="M3.8 18.6a4.9 4.9 0 0 1 8.8-2.9" />
      <path d="M13.4 18.6a4 4 0 0 1 6.8-2.7" />
    </svg>
  );
}

const serviceIcons = {
  development: FlaskIcon,
  manufacturing: GearIcon,
  filling: BottleIcon,
} as const;

export function StructureServicesSection() {
  const t = useTranslations('StructureServices');
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
          <span className={styles.eyebrow}>{t('tagline')}</span>
          <h2 className={styles.title}>{t('title')}</h2>
          <p className={styles.description}>{t('description')}</p>

          <div className={styles.servicesList}>
            {serviceKeys.map((key, index) => {
              const Icon = serviceIcons[key];

              return (
                <div key={key} className={`${styles.serviceItem} services-item`}>
                  <div className={styles.serviceIconWrap}>
                    <span className={styles.serviceIcon}>
                      <Icon />
                    </span>
                    <span className={styles.serviceNumber}>{String(index + 1).padStart(2, '0')}.</span>
                  </div>

                  <div className={styles.serviceBody}>
                    <h3 className={styles.serviceTitle}>{t(`items.${key}.title`)}</h3>
                    <p className={styles.serviceDescription}>{t(`items.${key}.desc`)}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className={`${styles.supportCard} services-item`}>
            <span className={styles.supportIcon}>
              <ShieldIcon />
            </span>

            <div className={styles.supportBody}>
              <h3 className={styles.supportTitle}>{t('supportTitle')}</h3>
              <p className={styles.supportText}>{t('supportText')}</p>
            </div>
          </div>

          <div className={styles.ctaGroup}>
            <CTAButton
              href="https://wa.me/551938176226"
              variant="primary"
              className={styles.cta}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t('cta')}
              <span className={styles.ctaArrow} aria-hidden="true">
                →
              </span>
            </CTAButton>

            <div className={styles.supportNote}>
              <span className={styles.supportNoteIcon}>
                <PeopleIcon />
              </span>
              <p className={styles.supportNoteText}>{t('supportNote')}</p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
