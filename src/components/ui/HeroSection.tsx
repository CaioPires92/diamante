'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Container } from './Container';
import styles from './HeroSection.module.css';
import { Button } from './Button';
import { useTranslations } from 'next-intl';
import { HeroLeadModal } from './HeroLeadModal';

gsap.registerPlugin(useGSAP);

export function HeroSection() {
  const t = useTranslations('Home');
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);

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
          src="/imgs/hero_v1.new.png"
          alt="Diamante Background"
          fill
          priority
          className={styles.backgroundImage}
          sizes="100vw"
          quality={100}
        />
      </div>

      <div className={styles.shimmerOverlay} />

      <Container className={styles.content}>
        <div ref={contentRef} className={styles.textContent}>
          <h1 className={`${styles.title} anim-item`}>
            {t.rich('title', {
              highlight: (chunks) => <span className={styles.highlight}>{chunks}</span>
            })}
          </h1>

          <div className={`${styles.glowDivider} anim-item`} aria-hidden="true">
            <span className={styles.glowDividerSpark} />
          </div>

          <p className={`${styles.subtitle} anim-item`}>
            {t.rich('subtitle', {
              strong: (chunks) => <strong>{chunks}</strong>,
              highlight: (chunks) => <span className={styles.subtitleHighlight}>{chunks}</span>
            })}
          </p>

          <div className={`${styles.actions} anim-item`}>
            <Button
              type="button"
              variant="primary"
              className={styles.buyButton}
              onClick={() => setIsLeadModalOpen(true)}
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
              <span>{t('whatsAppCta')}</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={styles.arrowIcon}>
                <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
              </svg>
            </Button>
          </div>

          <div className={`${styles.trustBadges} anim-item`}>
            <div className={styles.badgeItem}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className={styles.badgeIcon}>
                <path d="M10 2v8L4.5 20.29A1 1 0 0 0 5.4 21.7h13.2a1 1 0 0 0 .9-1.41L14 10V2" />
                <path d="M8.5 2h7" />
              </svg>
              <span>{t('badges.development')}</span>
            </div>
            <div className={styles.badgeDivider} />
            <div className={styles.badgeItem}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className={styles.badgeIcon}>
                <path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
                <path d="M17 18h1" />
                <path d="M12 18h1" />
                <path d="M7 18h1" />
              </svg>
              <span>{t('badges.manufacturing')}</span>
            </div>
            <div className={styles.badgeDivider} />
            <div className={styles.badgeItem}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className={styles.badgeIcon}>
                <path d="m7.5 4.27 9 5.15" />
                <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
                <path d="m3.3 7 8.7 5 8.7-5" />
                <path d="M12 22V12" />
              </svg>
              <span>{t('badges.filling')}</span>
            </div>
            <div className={styles.badgeDivider} />
            <div className={styles.badgeItem}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className={styles.badgeIcon}>
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <path d="m9 12 2 2 4-4" />
              </svg>
              <span>{t('badges.quality')}</span>
            </div>
            <div className={styles.badgeDivider} />
            <div className={styles.badgeItem}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className={styles.badgeIcon}>
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <path d="M14 2v6h6" />
                <path d="m9 15 2 2 4-4" />
              </svg>
              <span>{t('badges.regulatory')}</span>
            </div>
          </div>
        </div>
      </Container>

      <HeroLeadModal
        isOpen={isLeadModalOpen}
        onClose={() => setIsLeadModalOpen(false)}
      />
    </section>
  );
}
