'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import styles from './FluidBackground.module.css';

const FluidCanvas = dynamic(
  () => import('./FluidCanvas').then((mod) => mod.FluidCanvas),
  { ssr: false },
);

export function FluidBackground() {
  const [enableFluid, setEnableFluid] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(pointer: fine) and (min-width: 1024px)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    const update = () => {
      setEnableFluid(mediaQuery.matches && !reducedMotion.matches);
    };

    update();
    mediaQuery.addEventListener('change', update);
    reducedMotion.addEventListener('change', update);

    return () => {
      mediaQuery.removeEventListener('change', update);
      reducedMotion.removeEventListener('change', update);
    };
  }, []);

  return (
    <div className={styles.container} aria-hidden="true">
      <div className={styles.globalBg}>
        <Image
          src="/imgs/bg.png"
          alt=""
          fill
          priority
          className={styles.bgImage}
        />
      </div>

      {enableFluid && (
        <div className={styles.fluidLayer}>
          <FluidCanvas className={styles.canvas} />
        </div>
      )}
    </div>
  );
}
