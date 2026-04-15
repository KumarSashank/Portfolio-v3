'use client'

import { Canvas } from '@react-three/fiber'
import { Suspense, lazy } from 'react'
import { Preload } from '@react-three/drei'
import HeroEnvironment from './HeroEnvironment'
import ScrollCamera from './ScrollCamera'

const PostProcessing = lazy(() => import('./PostProcessing'))

export default function Scene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 60 }}
      dpr={[1, 2]}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      }}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
      }}
    >
      <Suspense fallback={null}>
        <HeroEnvironment />
        <ScrollCamera />
        <PostProcessing />
        <Preload all />
      </Suspense>
    </Canvas>
  )
}
