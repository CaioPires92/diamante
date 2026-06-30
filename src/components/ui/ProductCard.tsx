'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import styles from './ProductCard.module.css';

export interface ProductCardProps {
  id: string;
  slug?: string;
  image: string;
  name: string;
  description: string;
  isFeatured?: boolean;
  lojaIntegradaId?: string;
  externalUrl?: string;
}

export function ProductCard({
  id,
  slug,
  image,
  name,
  description,
  isFeatured = false,
  lojaIntegradaId,
  externalUrl,
}: ProductCardProps) {
  const common = useTranslations('Common');
  const pathname = usePathname();
  const locale = pathname?.split('/')[1] || 'pt-BR';
  const detailHref = externalUrl || (slug ? `/${locale}/products/${slug}` : '#');
  const isExternal = Boolean(externalUrl);
  const cardClassName = `${styles.card} ${isFeatured ? styles.featured : ''}`;
  const content = (
    <>
      <div className={styles.imageWrapper}>
        <Image 
          src={image} 
          alt={name} 
          fill 
          className={styles.image}
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      <div className={styles.content}>
        <h3 className={styles.productName}>{name}</h3>
        <p className={styles.productDesc}>{description}</p>
        <span className={styles.action}>
          {lojaIntegradaId ? 'Comprar' : common('learnMore')} 
          {lojaIntegradaId ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path>
              <path d="M3 6h18"></path>
              <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
            </svg>
          )}
        </span>
      </div>
    </>
  );

  if (isExternal) {
    return (
      <a href={detailHref} className={cardClassName} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }

  return (
    <Link href={detailHref} className={cardClassName}>
      {content}
    </Link>
  );
}
