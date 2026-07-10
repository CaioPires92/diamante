'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Container } from '../Container';
import styles from './DistributorHero.module.css';

export function DistributorHero() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP((context) => {
    const elements = context.selector?.('.hero-anim');
    
    if (elements) {
      gsap.fromTo(elements, {
        y: 40,
        opacity: 0
      }, {
        y: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.2,
        ease: 'power3.out',
        delay: 0.2
      });
    }
  }, { scope: sectionRef });

  return (
    <section className={styles.section} ref={sectionRef}>
      <div className={styles.heroBackground} aria-hidden="true">
        <Image
          src="/imgs/hero_final_v5.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className={styles.heroBackgroundImage}
        />
      </div>

      <Container size="wide" className={styles.heroContainer}>
        <div className={styles.layout}>
          <div className={styles.content}>
            <span className={`${styles.tagline} hero-anim`}>Parceria B2B</span>
            <h1 className={`${styles.title} hero-anim`}>
              Seja um distribuidor<br />
              <span className={styles.highlight}>Diamante Profissional</span>
            </h1>
            <p className={`${styles.subtitle} hero-anim`}>
              Represente uma das marcas de cosméticos que mais cresce no Brasil. A Diamante Profissional está expandindo sua rede de distribuidores por todo o país. Oferecemos uma oportunidade real de negócio para quem quer atuar no mercado de beleza com uma marca sólida, portfólio completo com fabricação própria e regulamentação ANVISA integral.
            </p>

            <div className={`${styles.badges} hero-anim`}>
              <div className={styles.badgeItem}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={styles.badgeIcon}>
                  <path d="M9 2h6"></path>
                  <path d="M10 2v6.5L4.2 19.1A2 2 0 0 0 6 22h12a2 2 0 0 0 1.8-2.9L14 8.5V2"></path>
                  <path d="M7.5 15h9"></path>
                </svg>
                <div className={styles.badgeText}>
                  <h4>Desenvolvimento de fórmulas exclusivas</h4>
                </div>
              </div>

              <div className={styles.badgeItem}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={styles.badgeIcon}>
                  <path d="M12 3l1.8 4.5L18 9.2l-4.2 1.7L12 16l-1.8-5.1L6 9.2l4.2-1.7L12 3z"></path>
                  <path d="M19 14l.9 2.1L22 17l-2.1.9L19 20l-.9-2.1L16 17l2.1-.9L19 14z"></path>
                </svg>
                <div className={styles.badgeText}>
                  <h4>Produtos de alta performance</h4>
                </div>
              </div>

              <div className={styles.badgeItem}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={styles.badgeIcon}>
                  <rect x="1" y="3" width="15" height="13"></rect>
                  <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                  <circle cx="5.5" cy="18.5" r="2.5"></circle>
                  <circle cx="18.5" cy="18.5" r="2.5"></circle>
                </svg>
                <div className={styles.badgeText}>
                  <h4>Rapidez na entrega</h4>
                </div>
              </div>

              <div className={styles.badgeItem}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={styles.badgeIcon}>
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
                <div className={styles.badgeText}>
                  <h4>Suporte regulatório</h4>
                </div>
              </div>

              <div className={styles.badgeItem}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={styles.badgeIcon}>
                  <path d="M12 2l8 4-8 4-8-4 8-4z"></path>
                  <path d="M4 10l8 4 8-4"></path>
                  <path d="M4 14l8 4 8-4"></path>
                </svg>
                <div className={styles.badgeText}>
                  <h4>Flexibilidade de produção</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
