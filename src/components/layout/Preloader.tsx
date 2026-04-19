'use client'

import { useEffect, useState, useRef } from 'react'
import gsap from 'gsap'

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<SVGSVGElement>(null)

  const completeRef = useRef(onComplete)
  useEffect(() => {
    completeRef.current = onComplete
  }, [onComplete])

  useEffect(() => {
    // FAILSAFE 1: If it ever gets stuck beyond 3.5 seconds, forcefully rip it off the DOM.
    const failsafe = setTimeout(() => {
      console.warn("GSAP Preloader timed out. Forcing bypass.")
      completeRef.current()
    }, 3500)

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const loadDuration = reducedMotion ? 0.3 : 1.4
    const exitDelay = reducedMotion ? 0 : 0.18

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          clearTimeout(failsafe)
          completeRef.current()
        },
      })

      const obj = { val: 0 }
      tl.to(obj, {
        val: 100,
        duration: loadDuration,
        ease: 'power2.out',
        onUpdate: () => setProgress(Math.round(obj.val)),
      })

      if (logoRef.current) {
        const paths = logoRef.current.querySelectorAll('path')
        paths.forEach((path) => {
          let length = 0
          try {
            length = path.getTotalLength()
          } catch (e) {
            length = 100 // fallback if SVG API fails
          }
          gsap.set(path, {
            strokeDasharray: length,
            strokeDashoffset: length,
          })
          tl.to(
            path,
            {
              strokeDashoffset: 0,
              duration: loadDuration * 0.85,
              ease: 'power2.out',
            },
            0
          )
        })
      }

      tl.to(containerRef.current, {
        clipPath: 'inset(0 0 100% 0 round 24px)',
        yPercent: -8,
        opacity: 0,
        duration: reducedMotion ? 0.18 : 0.65,
        ease: 'power3.inOut',
        delay: exitDelay,
      })
    }, containerRef)

    return () => {
      clearTimeout(failsafe)
      ctx.revert()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center"
      style={{
        background:
          'radial-gradient(circle at 50% 35%, rgba(255,92,53,0.18), transparent 28%), linear-gradient(180deg, rgba(5,7,11,0.96) 0%, rgba(5,7,11,0.98) 100%)',
        clipPath: 'inset(0 round 0px)',
        backdropFilter: 'blur(12px)',
      }}
    >
      <div className="font-mono text-[11px] tracking-[0.32em] uppercase text-[rgba(245,239,229,0.52)] mb-5">
        Initializing Portfolio
      </div>
      <svg
        ref={logoRef}
        viewBox="0 0 120 50"
        className="w-32 mb-8"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10 40V10M10 25L30 10M10 25L30 40"
          stroke="var(--paper)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M45 25a3 3 0 1 0 6 0 3 3 0 1 0-6 0"
          stroke="var(--accent)"
          strokeWidth="3"
        />
        <path
          d="M70 16c-8 0-12 4-12 8s4 6 12 8 12 4 12 8-4 8-12 8"
          stroke="var(--paper)"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>

      <div className="w-[180px] h-px bg-[rgba(245,239,229,0.12)] overflow-hidden">
        <div
          className="h-full bg-accent transition-[width] duration-150"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="mt-4 font-mono text-sm tracking-[0.14em] text-muted">
        {progress}%
      </div>
    </div>
  )
}
