'use client'

import { useEffect, useRef } from 'react'

export function useScrollProgress() {
  const progress = useRef(0)
  const velocity = useRef(0)
  const lastScroll = useRef(0)

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY
      const maxScroll = document.body.scrollHeight - window.innerHeight
      progress.current = maxScroll > 0 ? scrollY / maxScroll : 0
      velocity.current = Math.abs(scrollY - lastScroll.current)
      lastScroll.current = scrollY
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return { progress, velocity }
}
