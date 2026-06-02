'use client';

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
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
  const menuRef = useRef<HTMLDivElement>(null);
  const navLinksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLocaleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLocale = e.target.value;
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

  const isDarkPage = pathname?.includes('/distributor') || pathname?.includes('/private-label');

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''} ${isDarkPage && !isScrolled ? styles.darkHeader : ''}`} ref={headerRef}>
      <Container size="wide" className={styles.headerContainer}>
        {/* Lado Esquerdo: Logo */}
        <div className={styles.logoWrapper}>
          <Link href={`/${locale}`} className={styles.logo}>
            Diamante <span>Profissional</span>
          </Link>
        </div>

        {/* Centro: Menu */}
        <nav className={styles.nav}>
          <div className={styles.dropdownContainer}>
            <button className={`${styles.navLink} ${styles.dropdownToggle}`}>
              LINHAS
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '4px' }}>
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
            <div className={styles.dropdownMenu} data-lenis-prevent>
              {lines.map((line) => (
                <Link key={line.slug} href={`/${locale}/lines/${line.slug}`} className={styles.dropdownItem}>
                  {line.name}
                </Link>
              ))}
            </div>
          </div>
          <Link href={`/${locale}/about`} className={styles.navLink}>
            {t('about')}
          </Link>
          <Link href={`/${locale}/private-label`} className={styles.navLink}>
            {t('privateLabel')}
          </Link>
          <Link href={`/${locale}/contact`} className={styles.navLink}>
            {t('contact')}
          </Link>
        </nav>

        {/* Lado Direito: Ações */}
        <div className={styles.actions}>
          <button 
            className={styles.cta}
            onMouseEnter={(e) => {
              const target = e.currentTarget;
              gsap.to(target, { 
                scale: 1.05, 
                backgroundColor: 'rgba(201, 157, 74, 0.1)',
                duration: 0.4, 
                ease: "power2.out" 
              });
              const shimmer = target.querySelector(`.${styles.ctaShimmer}`);
              if (shimmer) {
                gsap.fromTo(shimmer, 
                  { left: '-100%' }, 
                  { left: '150%', duration: 1, ease: "power1.inOut" }
                );
              }
            }}
            onMouseLeave={(e) => {
              gsap.to(e.currentTarget, { 
                scale: 1, 
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                duration: 0.4, 
                ease: "power2.out" 
              });
            }}
          >
            <div className={styles.ctaShimmer} />
            Compre Agora
          </button>
          
          <div className={styles.langWrapper}>
            <select 
              value={locale} 
              onChange={handleLocaleChange}
              className={styles.lang}
              aria-label="Select Language"
            >
              <option value="pt-BR">PT</option>
              <option value="en">EN</option>
              <option value="es">ES</option>
            </select>
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
      <div className={`${styles.mobileMenu} ${isMenuOpen ? styles.mobileMenuOpen : ''}`} ref={menuRef}>
        <Container className={styles.mobileMenuContainer}>
          <div className={styles.mobileNav} ref={navLinksRef}>
            <Link href={`/${locale}/products`} className={styles.mobileNavLink} onClick={() => setIsMenuOpen(false)}>
              {t('products')}
            </Link>
            <Link href={`/${locale}/about`} className={styles.mobileNavLink} onClick={() => setIsMenuOpen(false)}>
              {t('about')}
            </Link>
            <Link href={`/${locale}/private-label`} className={styles.mobileNavLink} onClick={() => setIsMenuOpen(false)}>
              {t('privateLabel')}
            </Link>
            <Link href={`/${locale}/contact`} className={styles.mobileNavLink} onClick={() => setIsMenuOpen(false)}>
              {t('contact')}
            </Link>
            
            <div className={styles.mobileActions}>
              <button className={styles.mobileCta}>
                Compre Agora
              </button>
            </div>
          </div>
        </Container>
      </div>
      
      <div className={styles.borderShimmer} />
    </header>
  );
}
