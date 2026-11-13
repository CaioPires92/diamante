'use client';

import { Canvas } from '@react-three/fiber';
import { EffectComposer } from '@react-three/postprocessing';
import { Fluid } from '@whatisjery/react-fluid-distortion';

export function FluidCanvas({ className }: { className?: string }) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{ alpha: true, antialias: true, powerPreference: 'low-power' }}
      camera={{ position: [0, 0, 1], fov: 45 }}
      className={className}
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
  );
}
