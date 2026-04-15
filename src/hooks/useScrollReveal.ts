'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

/**
 * Attaches an IntersectionObserver to all [data-reveal] elements
 * within the scoped ref. On intersection, animates with GSAP.
 */
export function useScrollReveal() {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!ref.current) return

    const elements = Array.from(ref.current.querySelectorAll('[data-reveal]'))
    if (elements.length === 0) return

    // Set initial hidden state
    gsap.set(elements, { opacity: 0, y: 40 })

    const revealElement = (el: Element) => {
      const htmlEl = el as HTMLElement
      const delay = parseFloat(htmlEl.dataset.revealDelay || '0') * 0.1
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        delay,
        ease: 'power3.out',
        overwrite: true,
      })
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            revealElement(entry.target)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.05 }
    )

    // Use requestAnimationFrame to let the browser settle layout,
    // then observe. Elements already in viewport will trigger immediately.
    requestAnimationFrame(() => {
      elements.forEach((el) => observer.observe(el))
    })

    return () => observer.disconnect()
  }, [])

  return ref
}
