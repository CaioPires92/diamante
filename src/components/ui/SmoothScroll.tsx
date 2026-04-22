'use client';

import { ReactNode, useEffect } from 'react';
import Lenis from 'lenis';

export function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    // Inicializa o Lenis
    const lenis = new Lenis({
      duration: 1.5, // Duração da animação (mais lento = mais luxuoso)
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Curva de suavização
      smoothWheel: true,
      wheelMultiplier: 1.1,
      touchMultiplier: 2,
    });

    // Loop de animação (RAF)
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Limpeza ao desmontar
    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
