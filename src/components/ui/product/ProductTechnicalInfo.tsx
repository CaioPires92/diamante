'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Container } from '../Container';
import styles from './ProductTechnicalInfo.module.css';

interface ProductTechnicalInfoProps {
  howToUse: string;
  benefits: string;
  ingredients: string;
}

export function ProductTechnicalInfo({ howToUse, benefits, ingredients }: ProductTechnicalInfoProps) {
  const t = useTranslations('ProductDetail.labels');
  const [activeTab, setActiveTab] = useState<'benefits' | 'howToUse' | 'ingredients'>('benefits');

  const tabs = [
    { id: 'benefits', label: t('benefits') },
    { id: 'howToUse', label: t('howToUse') },
    { id: 'ingredients', label: t('ingredients') },
  ] as const;

  const content = {
    benefits,
    howToUse,
    ingredients,
  };

  return (
    <section className={styles.section}>
      <Container>
        <div className={styles.tabsWrapper}>
          <div className={styles.tabList}>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`${styles.tabButton} ${activeTab === tab.id ? styles.activeTab : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className={styles.contentArea}>
            <div className={styles.content}>
              <p>{content[activeTab]}</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
