'use client';

import { ReactNode, useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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

    // Sincroniza o Lenis com o ScrollTrigger do GSAP
    lenis.on('scroll', ScrollTrigger.update);

    // Adiciona o Lenis ao Ticker do GSAP
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    // Desativa lagSmoothing do GSAP para evitar conflitos com Lenis
    gsap.ticker.lagSmoothing(0);

    // Limpeza ao desmontar
    return () => {
      gsap.ticker.remove((time) => {
        lenis.raf(time * 1000);
      });
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
