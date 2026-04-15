'use client'

import { useEffect, useState } from 'react'

/**
 * Top status rail — frames the page with a "live system" feel:
 *   [● ONLINE]  LAT 43.47°N / LON 80.52°W   UTC 14:32:05   BUILD 7f3a9c   [SCROLL 00%]
 *
 * Real UTC clock, real scroll %, real viewport size. The build hash is seeded
 * once per load for stability.
 */
export default function StatusHUD() {
  const [time, setTime] = useState('')
  const [scroll, setScroll] = useState(0)
  const [viewport, setViewport] = useState({ w: 0, h: 0 })
  const [buildHash, setBuildHash] = useState('000000')

  useEffect(() => {
    const buildFrame = requestAnimationFrame(() => {
      setBuildHash(
        Math.floor((performance.timeOrigin * 9301 + 49297) % 16777216)
          .toString(16)
          .padStart(6, '0')
      )
    })

    // Clock
    const tick = () => {
      const d = new Date()
      const hh = String(d.getUTCHours()).padStart(2, '0')
      const mm = String(d.getUTCMinutes()).padStart(2, '0')
      const ss = String(d.getUTCSeconds()).padStart(2, '0')
      setTime(`${hh}:${mm}:${ss}`)
    }
    tick()
    const id = setInterval(tick, 1000)

    // Viewport
    const onResize = () =>
      setViewport({ w: window.innerWidth, h: window.innerHeight })
    onResize()
    window.addEventListener('resize', onResize)

    // Scroll progress of the hero section
    const onScroll = () => {
      const max = window.innerHeight
      const pct = Math.min(100, Math.max(0, (window.scrollY / max) * 100))
      setScroll(pct)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      cancelAnimationFrame(buildFrame)
      clearInterval(id)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <div className="absolute bottom-5 left-0 right-0 z-[3] pointer-events-none max-md:bottom-3">
      {/* Hairline divider above the rail */}
      <div
        className="mx-12 mb-3 h-px max-md:mx-6 max-md:mb-2"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, rgba(244,240,232,0.12) 20%, rgba(244,240,232,0.12) 80%, transparent 100%)',
        }}
      />
      <div className="flex items-center justify-between px-12 max-md:px-6 font-mono text-[10px] tracking-[0.14em] uppercase text-[rgba(244,240,232,0.55)]">
        <div className="flex items-center gap-5 max-md:gap-3">
          <span className="flex items-center gap-2">
            <span className="relative inline-block w-1.5 h-1.5 rounded-full bg-accent">
              <span className="absolute inset-0 rounded-full bg-accent animate-ping opacity-75" />
            </span>
            <span className="text-accent">Online</span>
          </span>
          <span className="hidden md:inline">Lat 43.47°N</span>
          <span className="hidden md:inline">Lon 80.52°W</span>
        </div>

        <div className="flex items-center gap-5 max-md:gap-3">
          <span className="hidden md:inline">
            {viewport.w}×{viewport.h}
          </span>
          <span className="hidden md:inline text-[rgba(244,240,232,0.35)]">Build {buildHash}</span>
          <span>UTC {time || '--:--:--'}</span>
          <span className="flex items-center gap-2">
            <span className="text-[rgba(244,240,232,0.35)]">Scroll</span>
            <span className="tabular-nums">{String(Math.round(scroll)).padStart(2, '0')}%</span>
          </span>
        </div>
      </div>
    </div>
  )
}
