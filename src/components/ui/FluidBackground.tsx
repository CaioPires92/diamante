'use client';

import React from 'react';
import Image from 'next/image';
import styles from './FluidBackground.module.css';

export function FluidBackground() {
  return (
    <div className={styles.container} aria-hidden="true">
      {/* Background Global (bg.png) */}
      <div className={styles.globalBg}>
        <Image 
          src="/imgs/bg.png" 
          alt="" 
          fill
          priority
          className={styles.bgImage}
        />
      </div>
      
      {/* Overlay sutil para garantir legibilidade */}
      <div className={styles.overlay} />
    </div>
  );
}
