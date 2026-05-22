import React from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Container } from './Container';
import styles from './Footer.module.css';

export function Footer({ locale }: { locale?: string }) {
  const t = useTranslations('Footer');
  const currentYear = new Date().getFullYear();
  const effectiveLocale = locale || 'pt-BR';

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
              <a href="https://www.facebook.com/DIAMANTEPROFISSIONAL" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="Facebook">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
              <a href="https://www.instagram.com/diamante.profissional" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="Instagram">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>
              <a href="https://wa.me/551938176156" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="WhatsApp">
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
                <li><Link href={`/${effectiveLocale}/contact`}>{t('links.institutional.contact')}</Link></li>
                <li><Link href={`/${effectiveLocale}/distributor`}>{t('links.institutional.distributor')}</Link></li>
              </ul>
            </div>
            <div className={styles.navColumn}>
              <h4 className={styles.navTitle}>{t('links.support.title')}</h4>
              <ul className={styles.navList}>
                <li><Link href="/faq">{t('links.support.faq')}</Link></li>
                <li><Link href={`/${effectiveLocale}/policies/payment`}>{t('links.support.payment')}</Link></li>
                <li><Link href="/shipping">{t('links.support.shipping')}</Link></li>
                <li><Link href={`/${effectiveLocale}/policies/returns`}>{t('links.support.returns')}</Link></li>
              </ul>
            </div>
          </div>

          {/* Contact */}
          <div className={styles.contact}>
            <h4 className={styles.navTitle}>{t('contact.title')}</h4>
            <div className={styles.contactInfo}>
              <p>{t('contact.address')}</p>
              <p className={styles.email}>{t('contact.email')}</p>
              <p className={styles.phone}>{t('contact.phone')}</p>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copyright}>
            {t('rights', { year: currentYear })}
          </p>
          <div className={styles.legal}>
            <Link href="/privacy">Privacidade</Link>
            <Link href="/terms">Termos</Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
