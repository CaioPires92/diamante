'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useTranslations } from 'next-intl';
import { Container } from '../Container';
import styles from './PrivateLabelCTA.module.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function PrivateLabelCTA() {
  const t = useTranslations('PrivateLabelPage.CTA');
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

    const elements = context.selector?.('.cta-anim');
    
    if (elements) {
      gsap.fromTo(elements, {
        y: 30,
        opacity: 0
      }, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
        },
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out'
      });
    }
  }, { scope: sectionRef, dependencies: [] });

  return (
    <section className={styles.section} ref={sectionRef}>
      {/* Parallax Background */}
      <div className={styles.parallaxBg} ref={bgRef}>
        <Image 
          src="/imgs/private_label_parallax_bg.png"
          alt=""
          fill
          className={styles.parallaxImage}
          priority
        />
        <div className={styles.overlay} />
      </div>

      <div className={styles.glow} />
      <Container>
        <div className={styles.content}>
          <h2 className={`${styles.title} cta-anim`}>{t('title')}</h2>
          <p className={`${styles.subtitle} cta-anim`}>{t('subtitle')}</p>
          <div className="cta-anim">
            <a 
              href="https://wa.me/551938176156" 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.button}
            >
              {t('button')}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
