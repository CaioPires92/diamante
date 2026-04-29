'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import styles from './ProductFilter.module.css';

export type Category = 'all' | 'treatment' | 'finishing' | 'wash';

interface ProductFilterProps {
  activeCategory: Category;
  onCategoryChange: (category: Category) => void;
}

export function ProductFilter({ activeCategory, onCategoryChange }: ProductFilterProps) {
  const t = useTranslations('Catalog.Filters');
  const categories: Category[] = ['all', 'treatment', 'finishing', 'wash'];

  return (
    <div className={styles.filterContainer}>
      <ul className={styles.filterList}>
        {categories.map((cat) => (
          <li key={cat} className={styles.filterItem}>
            <button
              className={`${styles.filterButton} ${activeCategory === cat ? styles.active : ''}`}
              onClick={() => onCategoryChange(cat)}
            >
              {t(cat)}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
