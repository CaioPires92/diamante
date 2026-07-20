'use client';

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Container } from './Container';
import styles from './Header.module.css';

gsap.registerPlugin(useGSAP);

export function Header({ locale, lines = [] }: { locale: string; lines?: { name: string; slug: string }[] }) {
  const headerRef = useRef<HTMLDivElement>(null);
  const t = useTranslations('Header');
  const router = useRouter();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const showCommerceActions = false;
  const menuRef = useRef<HTMLDivElement>(null);
  const navLinksRef = useRef<HTMLDivElement>(null);
  const homeHref = `/${locale}`;
  const servicesHref = `/${locale}/servicos`;
  const processHref = `/${locale}/como-funciona`;
  const distributorHref = `/${locale}/distribuidor`;
  const careersHref = `/${locale}/trabalhe-conosco`;
  const categoriesHref = `/${locale}/lines/products`;
  const certificationsHref = `/${locale}/certificacoes`;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLocaleChange = (newLocale: string) => {
    const currentPath = pathname || '/';
    
    // Replace the current locale segment with the new locale
    // e.g., /pt-BR/about -> /en/about
    let newPath = currentPath;
    if (currentPath.startsWith(`/${locale}`)) {
      newPath = currentPath.replace(`/${locale}`, `/${newLocale}`);
    } else {
      newPath = `/${newLocale}${currentPath}`;
    }
    
    router.push(newPath);
    if (isMenuOpen) setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isMenuOpen]);

  useGSAP(() => {
    // Entrance Animation
    gsap.fromTo(headerRef.current, { y: -24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' });

    const shimmer = headerRef.current?.querySelector(`.${styles.borderShimmer}`);
    if (shimmer) {
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 6 });
      tl.fromTo(shimmer, 
        { left: '-100%' }, 
        { left: '150%', duration: 4.5, ease: "power1.inOut" }
      );
    }
  }, { scope: headerRef, dependencies: [] });

  useGSAP(() => {
    if (isMenuOpen) {
      gsap.to(menuRef.current, {
        clipPath: 'circle(150% at 100% 0%)',
        duration: 0.8,
        ease: 'power3.inOut',
      });
      gsap.fromTo(navLinksRef.current?.children || [], 
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out', delay: 0.3 }
      );
    } else {
      gsap.to(menuRef.current, {
        clipPath: 'circle(0% at 100% 0%)',
        duration: 0.6,
        ease: 'power3.inOut',
      });
    }
  }, { dependencies: [isMenuOpen] });

  const darkPageSegments = [
    '/private-label',
    '/terceirizacao-de-comesticos-private-label',
    '/terceirizacao-de-cosmeticos-private-label'
  ];
  const isHomePage = pathname === `/${locale}` || pathname === `/${locale}/` || pathname === '/';
  const isDarkPage = isHomePage || darkPageSegments.some((segment) => pathname?.includes(segment));

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''} ${isDarkPage && !isScrolled ? styles.darkHeader : ''}`} ref={headerRef}>
      <div className={styles.topBar}>
        <Container size="wide" className={styles.topBarContainer}>
          <div className={styles.topBarItem}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#c99d4a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="12 2 2 7 12 22 22 7 12 2" />
              <polyline points="2 7 12 7 22 7" />
              <polyline points="12 22 12 7" />
            </svg>
            <div className={styles.topBarText}>
              <span className={styles.topBarTitle}>+ 15 ANOS DE EXCELÊNCIA</span>
              <span className={styles.topBarSub}>Referência em cosméticos profissionais</span>
            </div>
          </div>
          <div className={styles.topBarItem}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#c99d4a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 2v7.31" />
              <path d="M14 9.3V1.99" />
              <path d="M8.5 2h7" />
              <path d="M14 9.3a6.5 6.5 0 1 1-4 0" />
              <path d="M5.52 16h12.96" />
            </svg>
            <div className={styles.topBarText}>
              <span className={styles.topBarTitle}>TECNOLOGIA E INOVAÇÃO</span>
              <span className={styles.topBarSub}>Fórmulas de alta performance</span>
            </div>
          </div>
          <div className={styles.topBarItem}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#c99d4a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
              <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
            </svg>
            <div className={styles.topBarText}>
              <span className={styles.topBarTitle}>BELEZA QUE TRANSFORMA</span>
              <span className={styles.topBarSub}>Resultados que inspiram</span>
            </div>
          </div>
        </Container>
      </div>
      <Container size="wide" className={styles.headerContainer}>
        {/* Lado Esquerdo: Logo */}
        <div className={styles.logoWrapper}>
          <Link href={`/${locale}`} className={styles.logoContainer}>
            <Image
              src="/images/logo-diamante-preto.svg"
              alt="Diamante Profissional"
              width={142}
              height={43}
              className={styles.logoImage}
              priority
            />
          </Link>
        </div>

        {/* Centro: Menu */}
        <nav className={styles.nav}>
          <Link href={homeHref} className={styles.navLink}>{t('home')}</Link>
          <Link href={`/${locale}/about`} className={styles.navLink}>{t('about')}</Link>
          <Link href={servicesHref} className={styles.navLink}>{t('services')}</Link>
          <div className={styles.dropdownContainer}>
            <Link href={categoriesHref} className={`${styles.navLink} ${styles.dropdownToggle}`}>
              {t('categories')}
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '4px' }}>
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </Link>
            <div className={styles.dropdownMenu} data-lenis-prevent>
              <Link href={categoriesHref} className={styles.dropdownItem}>
                {t('allCategories')}
              </Link>
              {lines.map((line) => (
                <Link key={line.slug} href={`/${locale}/lines/${line.slug}`} className={styles.dropdownItem}>
                  {line.name}
                </Link>
              ))}
            </div>
          </div>
          <Link href={processHref} className={styles.navLink}>{t('process')}</Link>
          <Link href={certificationsHref} className={styles.navLink}>{t('certifications')}</Link>
          <Link href={`/${locale}/contact`} className={styles.navLink}>{t('contact')}</Link>
          <div className={styles.dropdownContainer}>
            <button type="button" className={`${styles.navLink} ${styles.dropdownToggle}`} aria-label="Mais opções">
              {t('more')}
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '4px' }}>
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
            <div className={styles.dropdownMenu} data-lenis-prevent>
              <Link href={distributorHref} className={styles.dropdownItem}>{t('distributor')}</Link>
              <Link href={careersHref} className={styles.dropdownItem}>{t('careers')}</Link>
            </div>
          </div>
        </nav>

        {/* Lado Direito: Ações */}
        <div className={styles.actions}>
          <div className={styles.iconActions}>
            {showCommerceActions && (
              <>
                <button aria-label="Search" className={styles.iconButton} disabled title="Em breve">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.3-4.3"></path>
                  </svg>
                </button>
                <button aria-label="Account" className={styles.iconButton} disabled title="Em breve">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </button>
                <div className={styles.divider}></div>
              </>
            )}
            <div className={styles.dropdownContainer}>
              <button className={styles.langToggle}>
                {locale === 'pt-BR' ? 'PT' : locale.toUpperCase()}
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '2px' }}>
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </button>
              <div className={styles.langMenu} data-lenis-prevent>
                <button onClick={() => handleLocaleChange('pt-BR')} className={styles.langItem}>Português (PT)</button>
                <button onClick={() => handleLocaleChange('en')} className={styles.langItem}>English (EN)</button>
                <button onClick={() => handleLocaleChange('es')} className={styles.langItem}>Español (ES)</button>
                <button onClick={() => handleLocaleChange('ar')} className={styles.langItem}>العربية (AR)</button>
              </div>
            </div>
          </div>

          <button 
            className={`${styles.hamburger} ${isMenuOpen ? styles.menuActive : ''}`}
            onClick={toggleMenu}
            aria-label="Toggle Menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </Container>
      
      {/* Mobile Menu Overlay */}
      <div
        className={`${styles.mobileMenu} ${isMenuOpen ? styles.mobileMenuOpen : ''}`}
        ref={menuRef}
        data-lenis-prevent
      >
        <Container className={styles.mobileMenuContainer}>
          <div className={styles.mobileNav} ref={navLinksRef}>
            <Link href={homeHref} className={styles.mobileNavLink} onClick={() => setIsMenuOpen(false)}>
              {t('home')}
            </Link>
            <Link href={`/${locale}/about`} className={styles.mobileNavLink} onClick={() => setIsMenuOpen(false)}>
              {t('about')}
            </Link>
            <Link href={servicesHref} className={styles.mobileNavLink} onClick={() => setIsMenuOpen(false)}>
              {t('services')}
            </Link>
            <div className={styles.mobileCollapseContainer}>
              <button 
                className={styles.mobileNavLink} 
                onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
                style={{ display: 'flex', alignItems: 'center', gap: '8px', border: 'none', background: 'none', padding: 0, cursor: 'pointer' }}
              >
                {t('categories')}
                <svg 
                  width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
                  style={{ transform: isCategoriesOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease' }}
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </button>
              
              <div 
                className={styles.mobileCollapseContent}
                style={{ 
                  maxHeight: isCategoriesOpen ? '2000px' : '0px',
                  opacity: isCategoriesOpen ? 1 : 0,
                  pointerEvents: isCategoriesOpen ? 'all' : 'none'
                }}
              >
                <div className={styles.mobileCollapseInner}>
                  <Link href={categoriesHref} className={styles.mobileSubNavLink} onClick={() => setIsMenuOpen(false)}>
                    {t('allCategories')}
                  </Link>
                  {lines.map((line) => (
                    <Link key={line.slug} href={`/${locale}/lines/${line.slug}`} className={styles.mobileSubNavLink} onClick={() => setIsMenuOpen(false)}>
                      {line.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <Link href={processHref} className={styles.mobileNavLink} onClick={() => setIsMenuOpen(false)}>
              {t('process')}
            </Link>
            <Link href={distributorHref} className={styles.mobileNavLink} onClick={() => setIsMenuOpen(false)}>
              {t('distributor')}
            </Link>
            <Link href={careersHref} className={styles.mobileNavLink} onClick={() => setIsMenuOpen(false)}>
              {t('careers')}
            </Link>
            <Link href={certificationsHref} className={styles.mobileNavLink} onClick={() => setIsMenuOpen(false)}>
              {t('certifications')}
            </Link>
            <Link href={`/${locale}/contact`} className={styles.mobileNavLink} onClick={() => setIsMenuOpen(false)}>
              {t('contact')}
            </Link>
          </div>
        </Container>
      </div>
      
      <div className={styles.borderShimmer} />
    </header>
  );
}
