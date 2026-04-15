'use client'

import { useEffect, useRef } from 'react'

/**
 * Canvas-based "code rain" — columns of monospace characters fall from the top,
 * with developer-flavored glyphs (=>, {}, const, async, etc). Characters near
 * the cursor flicker to the accent color. Subtle by design — sets the mood
 * without stealing focus.
 */
export default function CodeRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number>(0)
  const mouseRef = useRef({ x: -9999, y: -9999 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const GLYPHS = [
      '0', '1', '{', '}', '(', ')', '[', ']', '<', '>', '/', '=', '+', '*',
      '&', '|', '!', '?', '~', ';', ':', '.', ',', '@', '#', '$', '%',
      '=>', 'const', 'let', 'fn', 'async', 'await', 'null', 'void', 'if',
      'map', 'use', 'gsap', 'k.s', 'web', '0x', 'sha', 'mint', 'three',
      'null', 'true', 'false', 'new', 'this', 'self', '//', '/*', '*/',
    ]

    let width = 0
    let height = 0
    let dpr = 1
    const fontSize = 13
    const columnGap = 22
    let columns: {
      x: number
      y: number
      speed: number
      char: string
      lifetime: number
      brightness: number
    }[] = []

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = canvas.clientWidth
      height = canvas.clientHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const cols = Math.ceil(width / columnGap)
      columns = Array.from({ length: cols }, (_, i) => ({
        x: i * columnGap + columnGap / 2,
        y: Math.random() * height,
        speed: 0.3 + Math.random() * 0.9,
        char: GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
        lifetime: Math.random() * 120,
        brightness: 0.08 + Math.random() * 0.18,
      }))
    }

    const onMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX
      mouseRef.current.y = e.clientY
    }
    const onLeave = () => {
      mouseRef.current.x = -9999
      mouseRef.current.y = -9999
    }

    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseleave', onLeave)
    resize()

    ctx.font = `${fontSize}px "DM Mono", ui-monospace, monospace`

    const draw = () => {
      // Fade previous frame — creates the trailing effect
      ctx.fillStyle = 'rgba(10, 10, 15, 0.18)'
      ctx.fillRect(0, 0, width, height)
      ctx.font = `${fontSize}px "DM Mono", ui-monospace, monospace`

      const mx = mouseRef.current.x
      const my = mouseRef.current.y

      for (const col of columns) {
        col.y += col.speed
        col.lifetime -= 1

        if (col.lifetime <= 0) {
          col.char = GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
          col.lifetime = 40 + Math.random() * 120
        }

        if (col.y > height + 20) {
          col.y = -20
          col.speed = 0.3 + Math.random() * 0.9
          col.brightness = 0.06 + Math.random() * 0.18
        }

        // Distance to cursor — reactivity
        const dx = col.x - mx
        const dy = col.y - my
        const dist = Math.sqrt(dx * dx + dy * dy)
        const proximity = Math.max(0, 1 - dist / 180)

        if (proximity > 0.05) {
          // Accent flicker near cursor
          const a = col.brightness + proximity * 0.9
          ctx.fillStyle = `rgba(255, 59, 0, ${Math.min(a, 1)})`
        } else {
          ctx.fillStyle = `rgba(244, 240, 232, ${col.brightness})`
        }

        ctx.fillText(col.char, col.x, col.y)
      }

      rafRef.current = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.55, mixBlendMode: 'screen' }}
    />
  )
}
