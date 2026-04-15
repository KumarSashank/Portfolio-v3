'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import gsap from 'gsap'

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const overlayRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [displayChildren, setDisplayChildren] = useState(children)
  const isFirstRender = useRef(true)

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    const overlay = overlayRef.current
    const content = contentRef.current
    if (!overlay || !content) return

    // Transition out
    const tl = gsap.timeline()
    tl.set(overlay, { scaleY: 0, transformOrigin: 'bottom' })
      .to(overlay, {
        scaleY: 1,
        duration: 0.5,
        ease: 'power3.inOut',
      })
      .add(() => {
        setDisplayChildren(children)
        window.scrollTo(0, 0)
      })
      .set(overlay, { transformOrigin: 'top' })
      .to(overlay, {
        scaleY: 0,
        duration: 0.5,
        ease: 'power3.inOut',
        delay: 0.1,
      })
      .from(content, {
        opacity: 0,
        y: 30,
        duration: 0.6,
        ease: 'power3.out',
      }, '-=0.3')
  }, [children, pathname])

  useEffect(() => {
    setDisplayChildren(children)
  }, [children])

  return (
    <>
      <div ref={contentRef}>{displayChildren}</div>
      <div
        ref={overlayRef}
        className="fixed inset-0 z-[9999] pointer-events-none"
        style={{
          background: 'var(--accent)',
          transform: 'scaleY(0)',
          transformOrigin: 'bottom',
        }}
      />
    </>
  )
}
