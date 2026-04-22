'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Container } from './Container';
import styles from './Header.module.css';

export function Header({ locale }: { locale: string }) {
  const t = useTranslations('Header');
  const router = useRouter();
  const pathname = usePathname();

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

  return (
    <header className={styles.header}>
      <Container className={styles.nav}>
        <Link href={`/${locale}`} className={styles.logo}>
          Diamante <span>Profissional</span>
        </Link>

        <nav className={styles.links}>
          <Link href={`/${locale}/#products`} className={styles.link}>
            {t('products')}
          </Link>
          <Link href={`/${locale}/#about`} className={styles.link}>
            {t('about')}
          </Link>
          <Link href={`/${locale}/#contact`} className={styles.link}>
            {t('contact')}
          </Link>
        </nav>

        <div className={styles.controls}>
          <select 
            value={locale} 
            onChange={handleLocaleChange}
            className={styles.langSwitcher}
            aria-label="Select Language"
          >
            <option value="pt-BR">PT</option>
            <option value="en">EN</option>
            <option value="es">ES</option>
          </select>
        </div>
      </Container>
    </header>
  );
}
