'use client'

import { useRef, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'

export default function ScrollCamera() {
  const { camera } = useThree()
  const scrollProgress = useRef(0)
  const targetY = useRef(0)
  const targetZ = useRef(6)

  useEffect(() => {
    const onScroll = () => {
      const heroHeight = window.innerHeight
      const scrollY = window.scrollY
      // Progress from 0 to 1 as user scrolls through hero section
      scrollProgress.current = Math.min(scrollY / heroHeight, 1)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useFrame(() => {
    const p = scrollProgress.current

    // Camera pulls back and up as user scrolls past hero
    targetY.current = p * 2
    targetZ.current = 6 + p * 4

    // Smooth interpolation
    const nextY = camera.position.y + (targetY.current - camera.position.y) * 0.05
    const nextZ = camera.position.z + (targetZ.current - camera.position.z) * 0.05
    camera.position.set(camera.position.x, nextY, nextZ)

    // Camera looks slightly down as it rises
    camera.rotation.set(-p * 0.15, camera.rotation.y, camera.rotation.z)
  })

  return null
}
