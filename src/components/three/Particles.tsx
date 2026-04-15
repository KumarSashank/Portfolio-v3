'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface ParticleLayerProps {
  count: number
  color: string
  size: number
  opacity: number
  spread: [number, number, number]
  speedFactor?: number
}

function ParticleLayer({
  count,
  color,
  size,
  opacity,
  spread,
  speedFactor = 1,
}: ParticleLayerProps) {
  const ref = useRef<THREE.Points>(null)
  const mouseRef = useRef({ x: 0, y: 0 })

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const random = createSeededRandom(
      count + spread[0] * 17 + spread[1] * 31 + spread[2] * 47
    )

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (random() - 0.5) * spread[0]
      pos[i * 3 + 1] = (random() - 0.5) * spread[1]
      pos[i * 3 + 2] = (random() - 0.5) * spread[2]
    }

    return pos
  }, [count, spread])

  useFrame(({ clock, pointer }) => {
    if (!ref.current) return
    const t = clock.getElapsedTime() * 0.2 * speedFactor

    // Smooth mouse tracking with spring physics
    mouseRef.current.x += (pointer.x - mouseRef.current.x) * 0.05
    mouseRef.current.y += (pointer.y - mouseRef.current.y) * 0.05

    ref.current.rotation.y = t * 0.15 + mouseRef.current.x * 0.3
    ref.current.rotation.x = mouseRef.current.y * 0.15
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color={color}
        size={size}
        transparent
        opacity={opacity}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

function createSeededRandom(seed: number) {
  let value = seed >>> 0

  return () => {
    value = (value + 0x6d2b79f5) | 0
    let t = Math.imul(value ^ (value >>> 15), 1 | value)
    t ^= t + Math.imul(t ^ (t >>> 7), 61 | t)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export default function Particles() {
  return (
    <group>
      <ParticleLayer
        count={3000}
        color="#ff3b00"
        size={0.025}
        opacity={0.6}
        spread={[22, 16, 12]}
        speedFactor={1}
      />
      <ParticleLayer
        count={1000}
        color="#c9a84c"
        size={0.04}
        opacity={0.35}
        spread={[18, 14, 10]}
        speedFactor={0.7}
      />
    </group>
  )
}
