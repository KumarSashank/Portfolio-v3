'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

interface KineticNameProps {
  firstName: string
  lastName: string
  /** Delay before entrance animation starts (seconds) */
  delay?: number
}

/**
 * Kinetic name with per-character entrance, idle breathing, and
 * RGB-split glitch on hover. The second line renders as hollow (outline) type
 * with a subtle stroke-width oscillation.
 */
export default function KineticName({
  firstName,
  lastName,
  delay = 2.5,
}: KineticNameProps) {
  const containerRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const root = containerRef.current
    if (!root) return

    const chars = Array.from(root.querySelectorAll<HTMLElement>('.kin-char'))

    // Initial state
    gsap.set(chars, { yPercent: 110, opacity: 0, rotateX: 35 })

    const tl = gsap.timeline({ delay })
    tl.to(chars, {
      yPercent: 0,
      opacity: 1,
      rotateX: 0,
      duration: 1.1,
      ease: 'power4.out',
      stagger: { each: 0.035, from: 'start' },
    })

    // Ambient per-character breathing — very subtle
    chars.forEach((c, i) => {
      gsap.to(c, {
        y: '-=3',
        duration: 2.4 + (i % 5) * 0.25,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: delay + 1 + i * 0.04,
      })
    })

    // Hover glitch on each character
    const onEnter = (e: Event) => {
      const el = e.currentTarget as HTMLElement
      const r = el.querySelector<HTMLElement>('.rgb-r')
      const b = el.querySelector<HTMLElement>('.rgb-b')
      gsap.killTweensOf([r, b, el])
      gsap.to(r, { x: -4, y: -1, opacity: 0.9, duration: 0.18, ease: 'power2.out' })
      gsap.to(b, { x: 4, y: 1, opacity: 0.9, duration: 0.18, ease: 'power2.out' })
      gsap.to(el, {
        y: -6,
        duration: 0.25,
        ease: 'back.out(3)',
      })
    }
    const onLeave = (e: Event) => {
      const el = e.currentTarget as HTMLElement
      const r = el.querySelector<HTMLElement>('.rgb-r')
      const b = el.querySelector<HTMLElement>('.rgb-b')
      gsap.to([r, b], { x: 0, y: 0, opacity: 0, duration: 0.35, ease: 'power2.out' })
      gsap.to(el, { y: 0, duration: 0.4, ease: 'power2.out' })
    }

    chars.forEach((c) => {
      c.addEventListener('mouseenter', onEnter)
      c.addEventListener('mouseleave', onLeave)
    })

    return () => {
      tl.kill()
      chars.forEach((c) => {
        c.removeEventListener('mouseenter', onEnter)
        c.removeEventListener('mouseleave', onLeave)
        gsap.killTweensOf(c)
      })
    }
  }, [delay])

  const renderChars = (text: string, outline = false) =>
    Array.from(text).map((ch, i) => {
      const key = `${text}-${i}`
      const isSpace = ch === ' '
      if (isSpace) return <span key={key} style={{ display: 'inline-block', width: '0.35em' }} />
      return (
        <span
          key={key}
          className="kin-char relative inline-block will-change-transform"
          style={{
            color: outline ? 'transparent' : undefined,
            WebkitTextStroke: outline ? '1.5px var(--paper)' : undefined,
            fontStyle: outline ? 'italic' : undefined,
          }}
        >
          {/* RGB split copies (absolute, invisible by default) */}
          <span
            className="rgb-r absolute inset-0 pointer-events-none"
            aria-hidden
            style={{
              color: outline ? 'transparent' : '#ff3b00',
              WebkitTextStroke: outline ? '1.5px #ff3b00' : undefined,
              mixBlendMode: 'screen',
              opacity: 0,
            }}
          >
            {ch}
          </span>
          <span
            className="rgb-b absolute inset-0 pointer-events-none"
            aria-hidden
            style={{
              color: outline ? 'transparent' : '#00e6ff',
              WebkitTextStroke: outline ? '1.5px #00e6ff' : undefined,
              mixBlendMode: 'screen',
              opacity: 0,
            }}
          >
            {ch}
          </span>
          <span className="relative">{ch}</span>
        </span>
      )
    })

  return (
    <h1
      ref={containerRef}
      className="relative z-[2]"
      style={{
        fontFamily: 'var(--font-serif)',
        fontSize: 'clamp(64px, 9.5vw, 140px)',
        fontWeight: 700,
        lineHeight: 0.9,
        letterSpacing: '-0.035em',
      }}
      aria-label={`${firstName} ${lastName}`}
    >
      <div className="overflow-hidden block" style={{ perspective: 800 }}>
        <div className="flex flex-wrap">{renderChars(firstName)}</div>
      </div>
      <div className="overflow-hidden block" style={{ perspective: 800 }}>
        <div className="flex flex-wrap">{renderChars(lastName, true)}</div>
      </div>
    </h1>
  )
}
