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

export function Header({ locale }: { locale: string }) {
  const headerRef = useRef<HTMLDivElement>(null);
  const t = useTranslations('Header');
  const router = useRouter();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

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
  };

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

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`} ref={headerRef}>
      <Container size="wide" className={styles.headerContainer}>
        {/* Lado Esquerdo: Logo */}
        <div className={styles.logoWrapper}>
          <Link href={`/${locale}`} className={styles.logo}>
            Diamante <span>Profissional</span>
          </Link>
        </div>

        {/* Centro: Menu */}
        <nav className={styles.nav}>
          <Link href={`/${locale}/products`} className={styles.navLink}>
            {t('products')}
          </Link>
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
        </div>
      </Container>
      <div className={styles.borderShimmer} />
    </header>
  );
}
