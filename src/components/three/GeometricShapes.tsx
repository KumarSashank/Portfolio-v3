'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface WireShapeProps {
  geometry: THREE.BufferGeometry
  position: [number, number, number]
  color?: string
  rotationSpeed: { x: number; y: number; z: number }
}

function WireShape({ geometry, position, color = '#c9a84c', rotationSpeed }: WireShapeProps) {
  const ref = useRef<THREE.Mesh>(null)
  const mouseRef = useRef({ x: 0, y: 0 })

  useFrame(({ clock, pointer }) => {
    if (!ref.current) return
    const t = clock.getElapsedTime()

    mouseRef.current.x += (pointer.x - mouseRef.current.x) * 0.03
    mouseRef.current.y += (pointer.y - mouseRef.current.y) * 0.03

    ref.current.rotation.x = t * rotationSpeed.x
    ref.current.rotation.y = t * rotationSpeed.y
    ref.current.rotation.z = t * rotationSpeed.z

    // Subtle parallax
    ref.current.position.x = position[0] + mouseRef.current.x * 0.3
    ref.current.position.y = position[1] + mouseRef.current.y * 0.3
  })

  return (
    <mesh ref={ref} position={position} geometry={geometry}>
      <meshBasicMaterial
        color={color}
        wireframe
        transparent
        opacity={0.15}
      />
    </mesh>
  )
}

export default function GeometricShapes() {
  return (
    <group>
      <WireShape
        geometry={new THREE.TorusGeometry(1.5, 0.28, 12, 40)}
        position={[2.8, 0.6, -2.5]}
        rotationSpeed={{ x: 0.35, y: 0.28, z: 0 }}
      />
      <WireShape
        geometry={new THREE.IcosahedronGeometry(1, 1)}
        position={[-2.8, -0.4, -1.5]}
        color="#ff3b00"
        rotationSpeed={{ x: 0, y: 0.45, z: 0.2 }}
      />
      <WireShape
        geometry={new THREE.OctahedronGeometry(0.65, 0)}
        position={[1.2, -1.9, -0.5]}
        rotationSpeed={{ x: 0.55, y: 0, z: 0.25 }}
      />
      <WireShape
        geometry={new THREE.DodecahedronGeometry(0.8, 0)}
        position={[-1, 1.5, -3]}
        rotationSpeed={{ x: 0.18, y: 0.32, z: 0 }}
      />
      {/* Additional shapes for depth */}
      <WireShape
        geometry={new THREE.TetrahedronGeometry(0.5, 0)}
        position={[3.5, -1.2, -4]}
        color="#ff3b00"
        rotationSpeed={{ x: 0.4, y: 0.2, z: 0.15 }}
      />
      <WireShape
        geometry={new THREE.TorusKnotGeometry(0.4, 0.12, 64, 8)}
        position={[-3.2, 1.8, -3.5]}
        rotationSpeed={{ x: 0.15, y: 0.35, z: 0.1 }}
      />
    </group>
  )
}
