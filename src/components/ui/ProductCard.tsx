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
}

export function ProductCard({ id, slug, image, name, description, isFeatured = false }: ProductCardProps) {
  const common = useTranslations('Common');
  const pathname = usePathname();
  const locale = pathname?.split('/')[1] || 'pt-BR';
  
  const detailHref = slug ? `/${locale}/products/${slug}` : '#';

  return (
    <Link href={detailHref} className={`${styles.card} ${isFeatured ? styles.featured : ''}`}>
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
          {common('learnMore')} 
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
          </svg>
        </span>
      </div>
    </Link>
  );
}
