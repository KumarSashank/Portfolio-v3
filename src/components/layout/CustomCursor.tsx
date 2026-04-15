'use client'

import { useEffect, useRef, useState } from 'react'

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLDivElement>(null)
  const pos = useRef({ x: 0, y: 0 })
  const ringPos = useRef({ x: 0, y: 0 })
  const [hovering, setHovering] = useState(false)
  const [label, setLabel] = useState('')
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Only show on pointer devices
    if (window.matchMedia('(pointer: coarse)').matches) return

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY }
      if (!visible) setVisible(true)
    }

    const onEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const interactive = target.closest(
        'a, button, .project-card, .exp-item, .skill-pill, .edu-card, [data-cursor]'
      )
      if (interactive) {
        setHovering(true)
        const cursorLabel = interactive.getAttribute('data-cursor')
        if (cursorLabel) setLabel(cursorLabel)
      }
    }

    const onLeave = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const interactive = target.closest(
        'a, button, .project-card, .exp-item, .skill-pill, .edu-card, [data-cursor]'
      )
      if (interactive) {
        setHovering(false)
        setLabel('')
      }
    }

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onEnter)
    document.addEventListener('mouseout', onLeave)

    let raf: number
    const animate = () => {
      ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.14
      ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.14

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%, -50%)`
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringPos.current.x}px, ${ringPos.current.y}px) translate(-50%, -50%)`
      }
      if (labelRef.current) {
        labelRef.current.style.transform = `translate(${ringPos.current.x}px, ${ringPos.current.y}px) translate(-50%, -50%)`
      }

      raf = requestAnimationFrame(animate)
    }
    raf = requestAnimationFrame(animate)

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onEnter)
      document.removeEventListener('mouseout', onLeave)
      cancelAnimationFrame(raf)
    }
  }, [visible])

  if (!visible) return null

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999]">
      {/* Dot */}
      <div
        ref={dotRef}
        className="absolute top-0 left-0 rounded-full bg-accent"
        style={{
          width: hovering ? 14 : 8,
          height: hovering ? 14 : 8,
          transition: 'width 0.3s, height 0.3s',
          mixBlendMode: 'difference',
        }}
      />
      {/* Ring */}
      <div
        ref={ringRef}
        className="absolute top-0 left-0 rounded-full border-[1.5px]"
        style={{
          width: hovering ? 56 : 36,
          height: hovering ? 56 : 36,
          borderColor: hovering ? 'var(--accent)' : 'rgba(255,59,0,0.5)',
          transition: 'width 0.3s, height 0.3s, border-color 0.3s',
          mixBlendMode: 'difference',
        }}
      />
      {/* Label */}
      {label && (
        <div
          ref={labelRef}
          className="absolute top-0 left-0 font-mono text-[9px] uppercase tracking-[0.14em] text-paper whitespace-nowrap"
          style={{ marginTop: 36 }}
        >
          {label}
        </div>
      )}
    </div>
  )
}
