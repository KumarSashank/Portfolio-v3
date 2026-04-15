'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function SvgConnections() {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!svgRef.current) return

    const paths = Array.from(svgRef.current.querySelectorAll('.connect-path'))
    const orbs = Array.from(svgRef.current.querySelectorAll('.connect-orb'))

    // Animate paths drawing in slowly
    gsap.fromTo(
      paths,
      { strokeDasharray: 1000, strokeDashoffset: 1000 },
      {
        strokeDashoffset: 0,
        duration: 8,
        ease: 'power1.inOut',
        stagger: 0.5,
        repeat: -1,
        yoyo: true,
      }
    )

    // Gentle float for the abstract orbital nodes
    orbs.forEach((orb, i) => {
      gsap.to(orb, {
        y: '+=20',
        x: i % 2 === 0 ? '+=15' : '-=15',
        duration: 4 + i,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      })
      
      gsap.to(orb, {
        opacity: 0.4,
        duration: 2 + i * 0.5,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      })
    })
  }, [])

  return (
    <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden opacity-40">
      <svg
        ref={svgRef}
        className="h-full w-full"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="path-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.2" />
            <stop offset="50%" stopColor="var(--sky)" stopOpacity="0.3" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </linearGradient>
          <radialGradient id="orb-grad-1" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.8" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="orb-grad-2" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="var(--sky)" stopOpacity="0.8" />
            <stop offset="100%" stopColor="var(--sky)" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Abstract structural paths */}
        <path
          className="connect-path"
          d="M -100 200 C 200 200, 300 400, 600 300 C 800 200, 900 600, 1100 500"
          stroke="url(#path-grad)"
          strokeWidth="1.5"
        />
        <path
          className="connect-path"
          d="M -50 600 C 300 500, 400 800, 700 600 C 900 400, 1000 900, 1150 700"
          stroke="url(#path-grad)"
          strokeWidth="1"
        />
        <path
          className="connect-path"
          d="M 200 -100 C 250 300, 500 200, 400 600 C 300 900, 800 800, 900 1100"
          stroke="url(#path-grad)"
          strokeWidth="2"
          opacity="0.6"
        />

        {/* Ambient floating orbs (glassy/blurred) */}
        <circle className="connect-orb" cx="300" cy="350" r="150" fill="url(#orb-grad-1)" filter="blur(60px)" opacity="0.6" />
        <circle className="connect-orb" cx="700" cy="650" r="200" fill="url(#orb-grad-2)" filter="blur(80px)" opacity="0.5" />
        <circle className="connect-orb" cx="800" cy="200" r="100" fill="url(#orb-grad-1)" filter="blur(50px)" opacity="0.4" />
      </svg>
    </div>
  )
}
