'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Container } from './Container';
import styles from './HeroSection.module.css';
import { Button } from './Button';
import { useTranslations } from 'next-intl';

gsap.registerPlugin(useGSAP);

export function HeroSection() {
  const t = useTranslations('Home');
  const common = useTranslations('Common');
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP((context) => {
    // Background Image Zoom Entrance
    const heroImage = context.selector?.(`.${styles.backgroundImage}`)[0];
    if (heroImage) {
      gsap.fromTo(heroImage, { scale: 1.08, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.6, ease: 'power3.out' });
    }

    // Shimmer sweep animation
    const sweep = context.selector?.(`.${styles.shimmerOverlay}`)[0];
    if (sweep) {
      gsap.to(sweep, {
        left: '120%',
        duration: 4,
        repeat: -1,
        repeatDelay: 3,
        ease: "power1.inOut"
      });
    }

    // Advanced Text Reveal
    const elements = gsap.utils.toArray('.anim-item', sectionRef.current);
    gsap.fromTo(elements, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1, stagger: 0.16, ease: 'power3.out' });
  }, { scope: sectionRef, dependencies: [] });

  return (
    <section className={styles.hero} ref={sectionRef}>
      <div className={styles.background}>
        <Image 
          src="/imgs/hero_v1.png" 
          alt="Diamante Background" 
          width={1920}
          height={1080}
          priority
          className={styles.backgroundImage}
          quality={100}
        />

      </div>

      <div className={styles.shimmerOverlay} />

      <Container className={styles.content}>
        <div ref={contentRef} className={styles.textContent}>
          <div className="anim-item">
            {/* Tagline removed to match image style or hidden */}
          </div>

          <h1 className={`${styles.title} anim-item`}>
            {t.rich('title', {
              highlight: (chunks) => <span className={styles.highlight}>{chunks}</span>
            })}
          </h1>

          <p className={`${styles.subtitle} anim-item`}>
            {t.rich('subtitle', {
              strong: (chunks) => <strong>{chunks}</strong>
            })}
          </p>

          <div className={`${styles.actions} anim-item`}>
            <Button 
              variant="primary" 
              className={styles.buyButton}
              onMouseEnter={(e) => {
                const target = e.currentTarget;
                gsap.to(target, { scale: 1.05, duration: 0.4, ease: "power2.out" });
                const shimmer = target.querySelector(`.${styles.shimmer}`);
                if (shimmer) {
                  gsap.fromTo(shimmer, { left: '-100%' }, { left: '150%', duration: 1, ease: "power1.inOut" });
                }
              }}
              onMouseLeave={(e) => {
                gsap.to(e.currentTarget, { scale: 1, duration: 0.4, ease: "power2.out" });
              }}
            >
              <div className={styles.shimmer} />
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={styles.bagIcon}>
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
              <span>{common('buyNow')}</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={styles.arrowIcon}>
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
            </Button>
            <Button 
              variant="secondary" 
              className={styles.secondaryButton}
              onMouseEnter={(e) => {
                gsap.to(e.currentTarget, { scale: 1.05, duration: 0.4, ease: "power2.out" });
              }}
              onMouseLeave={(e) => {
                gsap.to(e.currentTarget, { scale: 1, duration: 0.4, ease: "power2.out" });
              }}
            >
              <span>{t('viewCollection')}</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={styles.goldArrow}>
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
            </Button>
          </div>

          <div className={`${styles.trustBadges} anim-item`}>
            <div className={styles.badgeItem}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={styles.badgeIcon}>
                <path d="M3.85 8.62a4 4 0 0 1 4.77-4.77 4 4 0 0 1 6.76 0 4 4 0 0 1 4.77 4.77 4 4 0 0 1 0 6.76 4 4 0 0 1-4.77 4.77 4 4 0 0 1-6.76 0 4 4 0 0 1-4.77-4.77 4 4 0 0 1 0-6.76Z" />
                <path d="m9 12 2 2 4-4" />
              </svg>
              <span>{t('badges.manufacturing')}</span>
            </div>
            <div className={styles.badgeDivider} />
            <div className={styles.badgeItem}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={styles.badgeIcon}>
                <path d="M10 2v8L4.5 20.29A1 1 0 0 0 5.4 21.7h13.2a1 1 0 0 0 .9-1.41L14 10V2" />
                <path d="M8.5 2h7" />
              </svg>
              <span>{t('badges.exclusive')}</span>
            </div>
            <div className={styles.badgeDivider} />
            <div className={styles.badgeItem}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className={styles.badgeIcon}>
                <path d="M6 3h12l4 6-10 12L2 9Z" />
                <path d="M11 3 8 9l3 12" />
                <path d="M13 3l3 6-3 12" />
                <path d="M5 9h14" />
                <path d="M2 9l9-6 2 0 9 6" />
              </svg>
              <span>{t('badges.quality')}</span>
            </div>
            <div className={styles.badgeDivider} />
            <div className={styles.badgeItem}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className={styles.badgeIcon}>
                <path d="M11 15h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 17" />
                <path d="m7 21 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-5.4a2 2 0 0 0-2.8-2.8L15 13" />
              </svg>
              <span>{t('badges.price')}</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
