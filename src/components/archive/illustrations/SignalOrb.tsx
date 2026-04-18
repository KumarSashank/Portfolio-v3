'use client'

import { useEffect, useRef } from 'react'

/**
 * A soft radial-gradient orb that tracks the cursor with spring smoothing.
 * Sits behind the name and provides ambient "lighting" that makes the scene
 * feel alive. Pure CSS — no shader cost.
 */
export default function SignalOrb() {
  const orbRef = useRef<HTMLDivElement>(null)
  const raf = useRef<number>(0)

  useEffect(() => {
    const el = orbRef.current
    if (!el) return

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const current = { x: target.x, y: target.y }

    const onMove = (e: MouseEvent) => {
      target.x = e.clientX
      target.y = e.clientY
    }

    const tick = () => {
      current.x += (target.x - current.x) * 0.06
      current.y += (target.y - current.y) * 0.06
      el.style.transform = `translate3d(${current.x - 360}px, ${current.y - 360}px, 0)`
      raf.current = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', onMove)
    tick()

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf.current)
    }
  }, [])

  return (
    <>
      <div
        ref={orbRef}
        aria-hidden
        className="absolute pointer-events-none"
        style={{
          width: 720,
          height: 720,
          top: 0,
          left: 0,
          background:
            'radial-gradient(circle at center, rgba(255,59,0,0.18) 0%, rgba(255,59,0,0.08) 22%, rgba(201,168,76,0.05) 42%, transparent 68%)',
          filter: 'blur(30px)',
          willChange: 'transform',
          zIndex: 0,
        }}
      />
      {/* Static ambient blob — anchors the composition when mouse is idle */}
      <div
        aria-hidden
        className="absolute pointer-events-none"
        style={{
          width: 900,
          height: 900,
          bottom: -300,
          left: -200,
          background:
            'radial-gradient(circle at center, rgba(255,59,0,0.08) 0%, transparent 55%)',
          filter: 'blur(40px)',
          zIndex: 0,
          animation: 'orbDrift 18s ease-in-out infinite',
        }}
      />
      <style jsx>{`
        @keyframes orbDrift {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(60px, -40px); }
        }
      `}</style>
    </>
  )
}
