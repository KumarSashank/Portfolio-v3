'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import Particles from './Particles'
import GeometricShapes from './GeometricShapes'

export default function HeroEnvironment() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame(({ pointer }) => {
    if (!groupRef.current) return
    // Very subtle group rotation following mouse
    groupRef.current.rotation.y += (pointer.x * 0.05 - groupRef.current.rotation.y) * 0.02
    groupRef.current.rotation.x += (pointer.y * 0.03 - groupRef.current.rotation.x) * 0.02
  })

  return (
    <group ref={groupRef}>
      {/* Ambient light for subtle visibility */}
      <ambientLight intensity={0.1} />

      {/* Accent point lights */}
      <pointLight position={[5, 3, 5]} intensity={0.5} color="#ff3b00" />
      <pointLight position={[-5, -3, 3]} intensity={0.3} color="#c9a84c" />

      <Particles />
      <GeometricShapes />
    </group>
  )
}
