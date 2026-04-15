'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

/**
 * Reliable scroll reveal that works with or without Lenis.
 * Uses IntersectionObserver as the trigger instead of GSAP ScrollTrigger,
 * ensuring elements always become visible when scrolled into view.
 */
export function useReveal(
  selector: string,
  from: gsap.TweenVars = { y: 50, opacity: 0 },
  options?: { stagger?: number; duration?: number; delay?: number }
) {
  const scopeRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!scopeRef.current) return

    const elements = scopeRef.current.querySelectorAll(selector)
    if (elements.length === 0) return

    const stagger = options?.stagger ?? 0.1
    const duration = options?.duration ?? 0.9
    const delay = options?.delay ?? 0

    // Set initial state
    gsap.set(elements, from)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Find index for stagger
            const idx = Array.from(elements).indexOf(entry.target as Element)
            gsap.to(entry.target, {
              ...Object.fromEntries(
                Object.keys(from).map((key) => [key, key === 'opacity' ? 1 : 0])
              ),
              opacity: 1,
              x: 0,
              y: 0,
              scale: 1,
              rotateX: 0,
              duration,
              delay: delay + idx * stagger,
              ease: 'power3.out',
              overwrite: true,
            })
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 }
    )

    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [selector, from, options])

  return scopeRef
}
