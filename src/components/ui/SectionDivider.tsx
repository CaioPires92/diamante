'use client';

import React from 'react';
import styles from './SectionDivider.module.css';

export function SectionDivider() {
  return (
    <div className={styles.divider} aria-hidden="true">
      <div className={styles.glow} />
    </div>
  );
}
