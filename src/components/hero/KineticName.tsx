'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { T, Ease, Stag } from '@/lib/motion/tokens'
import { useMotionPrefs } from '@/lib/motion/prefs'

interface KineticNameProps {
  firstName: string
  lastName: string
  /** Delay before entrance animation starts (seconds) */
  delay?: number
}

/**
 * Premium fluid name entrance. Staggered reveal from the bottom
 * with an elegant magnetic/floating hover interaction.
 */
export default function KineticName({
  firstName,
  lastName,
  delay = 1.0,
}: KineticNameProps) {
  const containerRef = useRef<HTMLHeadingElement>(null)
  const { reducedMotion } = useMotionPrefs()

  useEffect(() => {
    const root = containerRef.current
    if (!root) return

    const chars = Array.from(root.querySelectorAll<HTMLElement>('.kin-char'))

    if (reducedMotion) {
      gsap.set(chars, { yPercent: 0, opacity: 1, rotateX: 0 })
      return
    }

    gsap.set(chars, { yPercent: 120, opacity: 0, rotateX: -20 })

    const tl = gsap.timeline({ delay })
    tl.to(chars, {
      yPercent: 0,
      opacity: 1,
      rotateX: 0,
      duration: T.signature,
      ease: Ease.outExpo,
      stagger: { amount: chars.length * Stag.char * 2, from: 'start' },
    })

    const floatTl = gsap.timeline({ repeat: -1, yoyo: true })
    chars.forEach((c, i) => {
      floatTl.to(c, {
        y: '-=4',
        duration: T.loopShort + (i % 3) * 0.5,
        ease: 'sine.inOut',
      }, i * 0.1)
    })

    const onMouseMove = (e: MouseEvent) => {
      const el = e.currentTarget as HTMLElement
      const rect = el.getBoundingClientRect()
      const relX = e.clientX - rect.left
      const relY = e.clientY - rect.top
      const xPercent = (relX / rect.width - 0.5) * 20
      const yPercent = (relY / rect.height - 0.5) * 20
      gsap.to(el, { x: xPercent, y: yPercent, duration: T.quick, ease: Ease.outSoft })
    }

    const onMouseLeave = (e: Event) => {
      const el = e.currentTarget as HTMLElement
      gsap.to(el, { x: 0, y: 0, duration: T.grand, ease: Ease.elasticSoft })
    }

    chars.forEach((c) => {
      c.addEventListener('mousemove', onMouseMove as unknown as EventListener)
      c.addEventListener('mouseleave', onMouseLeave)
    })

    return () => {
      tl.kill()
      floatTl.kill()
      chars.forEach((c) => {
        c.removeEventListener('mousemove', onMouseMove as unknown as EventListener)
        c.removeEventListener('mouseleave', onMouseLeave)
        gsap.killTweensOf(c)
      })
    }
  }, [delay, reducedMotion])

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
            transformOrigin: 'bottom center',
            padding: '10px 0' // Extends interaction area for hover
          }}
        >
          {ch}
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
      <div className="overflow-hidden block" style={{ perspective: 1200 }}>
        <div className="flex flex-wrap">{renderChars(firstName)}</div>
      </div>
      <div className="overflow-hidden block" style={{ perspective: 1200 }}>
        <div className="flex flex-wrap">{renderChars(lastName, true)}</div>
      </div>
    </h1>
  )
}
