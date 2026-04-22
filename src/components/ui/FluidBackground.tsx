'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import styles from './FluidBackground.module.css';

export function FluidBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Movimento lento e flutuante
    gsap.to('.fluid-shape-1', {
      y: '+=30',
      x: '+=20',
      rotation: 5,
      duration: 10,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    gsap.to('.fluid-shape-2', {
      y: '-=40',
      x: '-=15',
      rotation: -3,
      duration: 12,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: 1
    });
  }, { scope: containerRef });

  return (
    <div className={styles.container} ref={containerRef} aria-hidden="true">
      <div className={`${styles.shape} fluid-shape-1`} style={{ top: '10%', right: '-5%', opacity: 0.35 }}>
        <Image 
          src="/imgs/fluid-gold.png" 
          alt="" 
          width={800} 
          height={600} 
          className={styles.image}
        />
      </div>
      
      <div className={`${styles.shape} fluid-shape-2`} style={{ bottom: '20%', left: '-10%', opacity: 0.25, transform: 'scale(1.5) rotate(180deg)' }}>
        <Image 
          src="/imgs/fluid-gold.png" 
          alt="" 
          width={1000} 
          height={800} 
          className={styles.image}
        />
      </div>

      <div className={styles.overlay} />
    </div>
  );
}
