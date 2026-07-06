'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Canvas } from '@react-three/fiber';
import { EffectComposer } from '@react-three/postprocessing';
import { Fluid } from '@whatisjery/react-fluid-distortion';
import styles from './FluidBackground.module.css';

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
          <Canvas
            dpr={[1, 1.5]}
            gl={{ alpha: true, antialias: true, powerPreference: 'low-power' }}
            camera={{ position: [0, 0, 1], fov: 45 }}
            className={styles.canvas}
          >
            <EffectComposer>
              <Fluid
                fluidColor="#d8b56a"
                backgroundColor="#000000"
                showBackground={false}
                rainbow={false}
                intensity={1.4}
                force={0.8}
                distortion={0.18}
                radius={0.22}
                curl={8}
                swirl={3}
                blend={1.5}
                pressure={0.72}
                densityDissipation={0.98}
                velocityDissipation={0.995}
              />
            </EffectComposer>
          </Canvas>
        </div>
      )}
    </div>
  );
}
