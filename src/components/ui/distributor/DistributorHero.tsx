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
      <div className={styles.backgroundGlow} />
      <Container size="wide">
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
                  <line x1="12" y1="1" x2="12" y2="23"></line>
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                </svg>
                <div className={styles.badgeText}>
                  <h4>Desenvolvimento de fórmulas exclusivas</h4>
                  <p>Soluções personalizadas para criar linhas com identidade própria</p>
                </div>
              </div>

              <div className={styles.badgeItem}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={styles.badgeIcon}>
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
                <div className={styles.badgeText}>
                  <h4>Produtos de alta performance</h4>
                  <p>Formulações desenvolvidas para resultado, qualidade e consistência</p>
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
                  <p>Operação estruturada para dar mais agilidade ao projeto</p>
                </div>
              </div>

              <div className={styles.badgeItem}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={styles.badgeIcon}>
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
                <div className={styles.badgeText}>
                  <h4>Suporte regulatório</h4>
                  <p>Apoio em rótulos, embalagens, notificações e registros</p>
                </div>
              </div>

              <div className={styles.badgeItem}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={styles.badgeIcon}>
                  <path d="M8 3H5a2 2 0 0 0-2 2v3"></path>
                  <path d="M16 3h3a2 2 0 0 1 2 2v3"></path>
                  <path d="M8 21H5a2 2 0 0 1-2-2v-3"></path>
                  <path d="M16 21h3a2 2 0 0 0 2-2v-3"></path>
                  <path d="M9 9h6v6H9z"></path>
                </svg>
                <div className={styles.badgeText}>
                  <h4>Flexibilidade de produção</h4>
                  <p>Estrutura adaptável para diferentes demandas e formatos de linha</p>
                </div>
              </div>
            </div>
          </div>

          <div className={`${styles.imagePanel} hero-anim`} aria-hidden="true">
            <Image
              src="/imgs/distributor_salon.png"
              alt="Distribuidor Diamante Profissional - Linha Premium em Salão de Luxo"
              fill
              priority
              sizes="(max-width: 900px) 90vw, 42vw"
              className={styles.image}
            />
            <div className={styles.imageOverlay} />
          </div>
        </div>
      </Container>
    </section>
  );
}
