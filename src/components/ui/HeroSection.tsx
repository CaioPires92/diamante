'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Container } from './Container';
import styles from './HeroSection.module.css';
import { Button } from './Button';
import { BadgeCheck, FlaskConical, Diamond, HandCoins } from 'lucide-react';
import { useTranslations } from 'next-intl';

gsap.registerPlugin(useGSAP);

export function HeroSection({
  tagline = "Premium Hair Care",
}: {
  tagline?: string;
}) {
  const t = useTranslations('Home');
  const common = useTranslations('Common');
  
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Select all animatable elements inside the content container
    const elements = gsap.utils.toArray('.anim-item', contentRef.current);
    
    gsap.from(elements, {
      y: 30,
      opacity: 0,
      duration: 1.2,
      stagger: 0.2,
      ease: "power3.out",
      delay: 0.1
    });
  }, { scope: contentRef });

  return (
    <section className={styles.hero}>
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

      <Container className={styles.content}>
        <div ref={contentRef} className={styles.textContent}>
          <div className="anim-item">
            {/* Tagline removed to match image style or hidden */}
          </div>

          <h1 className={`${styles.title} anim-item`}>
            Cabelo tratado<br />
            como em salão,<br />
            <span className={styles.highlight}>todos os dias.</span>
          </h1>

          <p className={`${styles.subtitle} anim-item`}>
            Cosméticos capilares de <strong>fabricação própria</strong>, desenvolvidos para salões e clientes que exigem <strong>resultado real</strong>.
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
              <BadgeCheck className={styles.badgeIcon} size={32} strokeWidth={1.5} />
              <span>FABRICAÇÃO<br/>PRÓPRIA</span>
            </div>
            <div className={styles.badgeDivider} />
            <div className={styles.badgeItem}>
              <FlaskConical className={styles.badgeIcon} size={32} strokeWidth={1.5} />
              <span>FÓRMULAS<br/>EXCLUSIVAS</span>
            </div>
            <div className={styles.badgeDivider} />
            <div className={styles.badgeItem}>
              <Diamond className={styles.badgeIcon} size={32} strokeWidth={1.5} />
              <span>QUALIDADE<br/>PROFISSIONAL</span>
            </div>
            <div className={styles.badgeDivider} />
            <div className={styles.badgeItem}>
              <HandCoins className={styles.badgeIcon} size={32} strokeWidth={1.5} />
              <span>PREÇO<br/>JUSTO</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
