'use client'

/**
 * Custom cursor — Showcase 04 from MOTION.md.
 *
 * Three behaviors compose:
 *   1. Dot follows instant; ring trails with GSAP quickTo inertia.
 *   2. Magnetic proximity: nearest [data-magnetic] within MAGNETIC_RADIUS
 *      pulls toward the cursor AND the ring bends toward the element
 *      (mutual magnetism). Strength is distance-weighted.
 *   3. Contextual morph: ring scales on generic links; on elements with
 *      [data-cursor="label"] the ring becomes a pill carrying the label.
 *
 * Gated by useMotionPrefs().canShowCursor — hidden on touch AND
 * reduced-motion users.
 */

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { T, Ease } from '@/lib/motion/tokens'
import { useMotionPrefs } from '@/lib/motion/prefs'

const MAGNETIC_RADIUS = 120
const MAG_ELEMENT_STRENGTH = 0.35
const MAG_CURSOR_STRENGTH = 0.25

const INTERACTIVE_SELECTOR =
  'a, button, .project-card, .exp-item, .skill-pill, .edu-card, [data-cursor]'

type Morph = 'default' | 'link' | 'pill'

export default function CustomCursor() {
  const { canShowCursor } = useMotionPrefs()
  const rootRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [label, setLabel] = useState('')
  const [morph, setMorph] = useState<Morph>('default')

  useEffect(() => {
    if (!canShowCursor) return

    const root = rootRef.current
    const dot = dotRef.current
    const ring = ringRef.current
    if (!root || !dot || !ring) return

    gsap.set([dot, ring], { xPercent: -50, yPercent: -50, x: -100, y: -100 })

    const setDotX = gsap.quickTo(dot, 'x', { duration: 0.05, ease: 'power1.out' })
    const setDotY = gsap.quickTo(dot, 'y', { duration: 0.05, ease: 'power1.out' })
    const setRingX = gsap.quickTo(ring, 'x', { duration: 0.35, ease: 'power3' })
    const setRingY = gsap.quickTo(ring, 'y', { duration: 0.35, ease: 'power3' })

    let visible = false
    let currentAttractor: HTMLElement | null = null

    const releaseAttractor = (el: HTMLElement | null) => {
      if (!el) return
      gsap.to(el, { x: 0, y: 0, duration: T.grand, ease: Ease.elasticSoft })
    }

    const onMove = (e: MouseEvent) => {
      if (!visible) {
        gsap.to(root, { autoAlpha: 1, duration: T.quick, ease: Ease.outSoft })
        visible = true
      }

      let ringX = e.clientX
      let ringY = e.clientY

      const magnets = document.querySelectorAll<HTMLElement>('[data-magnetic]')
      let closest: HTMLElement | null = null
      let closestDist = Infinity
      let closestDx = 0
      let closestDy = 0

      magnets.forEach((m) => {
        const r = m.getBoundingClientRect()
        const cx = r.left + r.width / 2
        const cy = r.top + r.height / 2
        const dx = e.clientX - cx
        const dy = e.clientY - cy
        const dist = Math.hypot(dx, dy)
        if (dist < MAGNETIC_RADIUS && dist < closestDist) {
          closest = m
          closestDist = dist
          closestDx = dx
          closestDy = dy
        }
      })

      if (currentAttractor && currentAttractor !== closest) {
        releaseAttractor(currentAttractor)
        currentAttractor = null
      }

      if (closest) {
        currentAttractor = closest
        gsap.to(closest, {
          x: closestDx * MAG_ELEMENT_STRENGTH,
          y: closestDy * MAG_ELEMENT_STRENGTH,
          duration: T.quick,
          ease: Ease.outSoft,
        })
        ringX = e.clientX - closestDx * MAG_CURSOR_STRENGTH
        ringY = e.clientY - closestDy * MAG_CURSOR_STRENGTH
      }

      setDotX(e.clientX)
      setDotY(e.clientY)
      setRingX(ringX)
      setRingY(ringY)
    }

    const onOver = (e: Event) => {
      const target = e.target as HTMLElement | null
      if (!target?.closest) return
      const interactive = target.closest<HTMLElement>(INTERACTIVE_SELECTOR)
      if (!interactive) return
      const cursorLabel = interactive.getAttribute('data-cursor')
      if (cursorLabel) {
        setLabel(cursorLabel)
        setMorph('pill')
      } else {
        setLabel('')
        setMorph('link')
      }
    }

    const onOut = (e: Event) => {
      const target = e.target as HTMLElement | null
      if (!target?.closest) return
      const interactive = target.closest<HTMLElement>(INTERACTIVE_SELECTOR)
      if (!interactive) return
      setLabel('')
      setMorph('default')
    }

    const onDocLeave = () => {
      gsap.to(root, { autoAlpha: 0, duration: T.quick, ease: Ease.outSoft })
      visible = false
    }

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout', onOut)
    document.addEventListener('mouseleave', onDocLeave)

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout', onOut)
      document.removeEventListener('mouseleave', onDocLeave)
      releaseAttractor(currentAttractor)
      gsap.killTweensOf([dot, ring, root])
    }
  }, [canShowCursor])

  if (!canShowCursor) return null

  const ringDims =
    morph === 'pill'
      ? { width: 112, height: 34, radius: 17 }
      : morph === 'link'
        ? { width: 54, height: 54, radius: 999 }
        : { width: 34, height: 34, radius: 999 }

  return (
    <div
      ref={rootRef}
      className="pointer-events-none fixed inset-0 z-[9999]"
      style={{ opacity: 0, visibility: 'hidden' }}
    >
      <div
        ref={dotRef}
        className="absolute top-0 left-0 rounded-full bg-accent"
        style={{ width: 6, height: 6, mixBlendMode: 'difference' }}
      />
      <div
        ref={ringRef}
        className="absolute top-0 left-0 flex items-center justify-center border-[1.5px]"
        style={{
          width: ringDims.width,
          height: ringDims.height,
          borderRadius: ringDims.radius,
          borderColor: morph === 'default' ? 'rgba(255,59,0,0.55)' : 'var(--accent)',
          transition:
            'width 0.28s cubic-bezier(0.22,1,0.36,1), height 0.28s cubic-bezier(0.22,1,0.36,1), border-radius 0.28s cubic-bezier(0.22,1,0.36,1), border-color 0.22s',
          mixBlendMode: 'difference',
        }}
      >
        {morph === 'pill' && label && (
          <span
            className="font-mono text-[9px] uppercase tracking-[0.14em] text-paper whitespace-nowrap"
            style={{ mixBlendMode: 'difference' }}
          >
            {label}
          </span>
        )}
      </div>
    </div>
  )
}
