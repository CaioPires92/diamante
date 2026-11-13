'use client';

import { ReactNode, useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reducedMotion.matches) {
      return;
    }

    // Inicializa o Lenis
    const lenis = new Lenis({
      duration: 1.5, // Duração da animação (mais lento = mais luxuoso)
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Curva de suavização
      smoothWheel: true,
      wheelMultiplier: 1.1,
      touchMultiplier: 2,
    });

    // Sincroniza o Lenis com o ScrollTrigger do GSAP
    lenis.on('scroll', ScrollTrigger.update);

    // Adiciona o Lenis ao Ticker do GSAP
    const tick = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tick);

    // Desativa lagSmoothing do GSAP para evitar conflitos com Lenis
    gsap.ticker.lagSmoothing(0);

    // Limpeza ao desmontar
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
