import React from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Container } from './Container';
import styles from './Footer.module.css';

export function Footer({ locale }: { locale?: string }) {
  const t = useTranslations('Footer');
  const currentYear = new Date().getFullYear();
  const effectiveLocale = locale || 'pt-BR';
  const instagramUrl = 'https://www.instagram.com/diamante.profissional';
  const linkedInUrl = 'https://www.linkedin.com/in/mario-juliano-scavroni-14643a363/';
  const whatsAppUrl = 'https://wa.me/551938176156';
  const emailUrl = `mailto:${t('contact.email')}`;
  const mapsUrl = 'https://www.google.com/maps/search/?api=1&query=Rua+Treze+de+Maio,+17+Centro,+Amparo+SP';

  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.grid}>
          {/* Logo and Description */}
          <div className={styles.brand}>
            <div className={styles.logo}>
              <span className={styles.logoText}>Diamante</span>
              <span className={styles.logoSub}>Profissional</span>
            </div>
            <p className={styles.description}>
              {t('description')}
            </p>
            <div className={styles.social}>
              <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="Instagram">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>
              <a href={linkedInUrl} target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="LinkedIn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-12h4v2"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
                </svg>
              </a>
              <a href={whatsAppUrl} target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="WhatsApp">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-11.4 8.5 8.5 0 0 1 4.6 1.3L22 3l-1.5 5.5a8.38 8.38 0 0 1 1.3 4.5z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Menus */}
          <div className={styles.nav}>
            <div className={styles.navColumn}>
              <h4 className={styles.navTitle}>{t('links.institutional.title')}</h4>
              <ul className={styles.navList}>
                <li><Link href={`/${effectiveLocale}/about`}>{t('links.institutional.about')}</Link></li>
                <li><Link href={`/${effectiveLocale}/private-label`}>{t('links.institutional.privateLabel')}</Link></li>
                <li><Link href={`/${effectiveLocale}/servicos#processo`}>{t('links.institutional.process')}</Link></li>
                <li><Link href={`/${effectiveLocale}/contact`}>{t('links.institutional.contact')}</Link></li>
              </ul>
            </div>
            <div className={styles.navColumn}>
              <h4 className={styles.navTitle}>{t('links.support.title')}</h4>
              <ul className={styles.navList}>
                <li><Link href={`/${effectiveLocale}/politica-de-privacidade`}>{t('links.support.privacy')}</Link></li>
                <li><Link href={`/${effectiveLocale}/formas-de-pagamento`}>{t('links.support.payment')}</Link></li>
                <li><Link href={`/${effectiveLocale}/fretes-e-prazo`}>{t('links.support.shipping')}</Link></li>
                <li><Link href={`/${effectiveLocale}/trocas-e-devolucoes`}>{t('links.support.returns')}</Link></li>
              </ul>
            </div>
          </div>

          {/* Contact */}
          <div className={styles.contact}>
            <h4 className={styles.navTitle}>{t('contact.title')}</h4>
            <div className={styles.contactInfo}>
              <a href={whatsAppUrl} target="_blank" rel="noopener noreferrer" className={styles.contactLink}>
                <span className={styles.contactLabel}>{t('contact.labels.whatsapp')}</span>
                <span className={styles.phone}>{t('contact.phone')}</span>
              </a>
              <a href={emailUrl} className={styles.contactLink}>
                <span className={styles.contactLabel}>{t('contact.labels.email')}</span>
                <span className={styles.email}>{t('contact.email')}</span>
              </a>
              <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className={styles.contactLink}>
                <span className={styles.contactLabel}>{t('contact.labels.location')}</span>
                <span>{t('contact.address')}</span>
              </a>
              <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className={styles.contactLink}>
                <span className={styles.contactLabel}>{t('contact.labels.instagram')}</span>
                <span>{t('contact.instagram')}</span>
              </a>
              <a href={linkedInUrl} target="_blank" rel="noopener noreferrer" className={styles.contactLink}>
                <span className={styles.contactLabel}>{t('contact.labels.linkedin')}</span>
                <span>{t('contact.linkedin')}</span>
              </a>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copyright}>
            {t('rights', { year: currentYear })}
          </p>
          <div className={styles.legal}>
            <Link href={`/${effectiveLocale}/politica-de-privacidade`}>{t('links.support.privacy')}</Link>
            <Link href={`/${effectiveLocale}/termos-de-uso`}>{t('links.support.terms')}</Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
