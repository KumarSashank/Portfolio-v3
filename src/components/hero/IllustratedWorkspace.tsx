'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

/**
 * Hand-drawn SVG illustration of a developer's workspace.
 *
 * Composition (front-view, loose isometric feel):
 *   - Ambient orbital rings (slow rotation)
 *   - Monitor with animated "typing" code bars + blinking cursor
 *   - Keyboard
 *   - Coffee cup with rising steam (continuous loop)
 *   - Potted plant (leaves sway subtly)
 *   - Stack of books
 *   - Mouse on pad
 *   - Floating code glyphs orbiting the scene
 *
 * On mount: all strokes draw in via stroke-dashoffset, staggered.
 * Parallax: layers translate at different rates from mouse + scroll.
 */
export default function IllustratedWorkspace() {
  const rootRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const layersRef = useRef<{
    orbits: SVGGElement | null
    back: SVGGElement | null
    mid: SVGGElement | null
    front: SVGGElement | null
  }>({ orbits: null, back: null, mid: null, front: null })

  // Stroke draw + ambient loops + parallax
  useEffect(() => {
    const svg = svgRef.current
    if (!svg) return

    // ─────────────────────────────────────────────── draw-on
    const drawables = Array.from(
      svg.querySelectorAll<SVGPathElement | SVGLineElement | SVGRectElement | SVGEllipseElement>(
        '[data-draw]'
      )
    )
    drawables.forEach((el) => {
      const length =
        'getTotalLength' in el && typeof (el as SVGPathElement).getTotalLength === 'function'
          ? (el as SVGPathElement).getTotalLength()
          : 300
      gsap.set(el, {
        strokeDasharray: length,
        strokeDashoffset: length,
        opacity: 1,
      })
    })

    const drawTl = gsap.timeline({ delay: 2.6 })
    drawTl.to(drawables, {
      strokeDashoffset: 0,
      duration: 1.6,
      ease: 'power2.out',
      stagger: { each: 0.03, from: 'start' },
    })

    // Reveal fills after strokes draw
    const fills = Array.from(svg.querySelectorAll<SVGElement>('[data-fill]'))
    gsap.set(fills, { opacity: 0 })
    drawTl.to(
      fills,
      { opacity: 1, duration: 0.6, stagger: 0.02, ease: 'power2.out' },
      '-=0.9'
    )

    // ─────────────────────────────────────────────── ambient loops
    // Blinking cursor
    const cursor = svg.querySelector<SVGRectElement>('#dev-cursor')
    if (cursor) {
      gsap.to(cursor, {
        opacity: 0,
        duration: 0.01,
        repeat: -1,
        yoyo: true,
        repeatDelay: 0.5,
      })
    }

    // Animated typing — cycle code bars visibility
    const codeLines = Array.from(svg.querySelectorAll<SVGRectElement>('[data-code]'))
    gsap.set(codeLines, { scaleX: 0, transformOrigin: 'left center' })
    const typeTl = gsap.timeline({ repeat: -1, delay: 4 })
    typeTl
      .to(codeLines, {
        scaleX: 1,
        duration: 0.25,
        stagger: 0.18,
        ease: 'none',
      })
      .to({}, { duration: 2.5 })
      .to(codeLines, {
        scaleX: 0,
        duration: 0.5,
        ease: 'power2.in',
      })
      .to({}, { duration: 0.6 })

    // Steam — 3 wisps rising
    const steamPaths = Array.from(svg.querySelectorAll<SVGPathElement>('[data-steam]'))
    steamPaths.forEach((p, i) => {
      gsap.fromTo(
        p,
        { y: 0, opacity: 0 },
        {
          y: -28,
          opacity: 0.6,
          duration: 2.4,
          ease: 'sine.out',
          delay: 3 + i * 0.6,
          repeat: -1,
          repeatDelay: 0.4,
          onRepeat: () => {
            gsap.set(p, { opacity: 0 })
          },
        }
      )
    })

    // Plant leaves sway
    const leaves = svg.querySelector<SVGGElement>('#dev-leaves')
    if (leaves) {
      gsap.to(leaves, {
        rotation: 2,
        transformOrigin: '50% 100%',
        duration: 3.2,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
      })
    }

    // Orbital rings slow rotation
    const orbits = svg.querySelector<SVGGElement>('#dev-orbits')
    if (orbits) {
      gsap.to(orbits, {
        rotation: 360,
        transformOrigin: '50% 50%',
        duration: 90,
        repeat: -1,
        ease: 'none',
      })
    }

    // Floating code glyphs — orbit + breathe
    const glyphs = Array.from(svg.querySelectorAll<SVGGElement>('[data-glyph]'))
    glyphs.forEach((g, i) => {
      gsap.to(g, {
        y: i % 2 ? 10 : -10,
        duration: 3 + i * 0.4,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      })
    })

    // ─────────────────────────────────────────────── parallax
    const pointer = { x: 0, y: 0 }
    const onMove = (e: MouseEvent) => {
      const { innerWidth: w, innerHeight: h } = window
      pointer.x = (e.clientX / w - 0.5) * 2 // -1..1
      pointer.y = (e.clientY / h - 0.5) * 2
    }
    window.addEventListener('mousemove', onMove)

    const raf = { id: 0 }
    const state = { x: 0, y: 0 }
    const tick = () => {
      state.x += (pointer.x - state.x) * 0.05
      state.y += (pointer.y - state.y) * 0.05
      const { orbits, back, mid, front } = layersRef.current
      if (orbits) orbits.style.transform = `translate(${state.x * -6}px, ${state.y * -4}px)`
      if (back) back.style.transform = `translate(${state.x * -10}px, ${state.y * -6}px)`
      if (mid) mid.style.transform = `translate(${state.x * -16}px, ${state.y * -10}px)`
      if (front) front.style.transform = `translate(${state.x * -22}px, ${state.y * -14}px)`
      raf.id = requestAnimationFrame(tick)
    }
    tick()

    return () => {
      drawTl.kill()
      typeTl.kill()
      gsap.killTweensOf(svg.querySelectorAll('*'))
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf.id)
    }
  }, [])

  const PAPER = 'rgba(244,240,232,0.78)'
  const PAPER_DIM = 'rgba(244,240,232,0.35)'
  const ACCENT = '#ff3b00'
  const GOLD = '#c9a84c'

  return (
    <div
      ref={rootRef}
      className="relative flex items-center justify-end pointer-events-none z-[1] w-full max-w-[650px]"
    >
      <svg
        ref={svgRef}
        viewBox="0 0 600 600"
        className="w-full h-auto max-md:opacity-60"
        fill="none"
        stroke={PAPER}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        {/* ─── LAYER: Orbits ─── */}
        <g ref={(el) => { layersRef.current.orbits = el }} style={{ transition: 'transform 0.1s linear' }}>
          <g id="dev-orbits" opacity="0.8">
            <ellipse
              data-draw
              cx="300"
              cy="330"
              rx="260"
              ry="70"
              stroke={PAPER_DIM}
              strokeWidth="0.6"
              strokeDasharray="2 4"
            />
            <ellipse
              data-draw
              cx="300"
              cy="330"
              rx="200"
              ry="54"
              stroke={PAPER_DIM}
              strokeWidth="0.6"
            />
            {/* Orbital nodes */}
            <circle data-fill cx="560" cy="330" r="2.5" fill={ACCENT} stroke="none" />
            <circle data-fill cx="40" cy="330" r="1.5" fill={GOLD} stroke="none" />
            <circle data-fill cx="500" cy="276" r="1.5" fill={PAPER_DIM} stroke="none" />
          </g>
        </g>

        {/* ─── LAYER: Back (window, wall details) ─── */}
        <g ref={(el) => { layersRef.current.back = el }} style={{ transition: 'transform 0.1s linear' }}>
          {/* Window frame */}
          <rect data-draw x="70" y="80" width="170" height="130" rx="2" stroke={PAPER_DIM} />
          <line data-draw x1="155" y1="80" x2="155" y2="210" stroke={PAPER_DIM} />
          <line data-draw x1="70" y1="145" x2="240" y2="145" stroke={PAPER_DIM} />
          {/* Moon dot */}
          <circle data-fill cx="210" cy="105" r="6" fill={GOLD} stroke="none" opacity="0.8" />
          <circle data-draw cx="210" cy="105" r="10" stroke={GOLD} strokeWidth="0.6" opacity="0.4" />
          {/* Hanging poster on wall */}
          <rect data-draw x="370" y="95" width="90" height="62" stroke={PAPER_DIM} />
          <line data-draw x1="380" y1="112" x2="445" y2="112" stroke={PAPER_DIM} />
          <line data-draw x1="380" y1="124" x2="430" y2="124" stroke={PAPER_DIM} />
          <line data-draw x1="380" y1="136" x2="440" y2="136" stroke={PAPER_DIM} />
          {/* Shelf */}
          <line data-draw x1="370" y1="200" x2="500" y2="200" stroke={PAPER_DIM} />
          <rect data-draw x="385" y="178" width="6" height="22" stroke={PAPER_DIM} />
          <rect data-draw x="395" y="172" width="6" height="28" stroke={PAPER_DIM} />
          <rect data-draw x="405" y="180" width="6" height="20" stroke={PAPER_DIM} />
          <circle data-draw cx="450" cy="188" r="10" stroke={PAPER_DIM} />
        </g>

        {/* ─── LAYER: Mid (desk, monitor, keyboard) ─── */}
        <g ref={(el) => { layersRef.current.mid = el }} style={{ transition: 'transform 0.1s linear' }}>
          {/* Desk surface */}
          <line data-draw x1="20" y1="440" x2="580" y2="440" />
          <line data-draw x1="20" y1="444" x2="580" y2="444" stroke={PAPER_DIM} strokeWidth="0.6" />

          {/* Monitor stand */}
          <path data-draw d="M288 410 L288 430 L312 430 L312 410" />
          <line data-draw x1="270" y1="440" x2="330" y2="440" strokeWidth="2" />

          {/* Monitor body */}
          <rect data-draw x="200" y="240" width="200" height="170" rx="5" />
          <rect data-draw x="210" y="250" width="180" height="140" rx="2" stroke={PAPER_DIM} />

          {/* Screen content — code window chrome */}
          <line data-draw x1="210" y1="266" x2="390" y2="266" stroke={PAPER_DIM} strokeWidth="0.6" />
          <circle data-fill cx="220" cy="258" r="2.2" fill={ACCENT} stroke="none" />
          <circle data-fill cx="230" cy="258" r="2.2" fill={GOLD} stroke="none" />
          <circle data-fill cx="240" cy="258" r="2.2" fill="rgba(244,240,232,0.4)" stroke="none" />

          {/* Code lines (animated typing) */}
          <g>
            <rect data-code x="220" y="278" width="60" height="2.5" fill={ACCENT} stroke="none" opacity="0.9" />
            <rect data-code x="220" y="288" width="100" height="2.5" fill={PAPER} stroke="none" opacity="0.85" />
            <rect data-code x="232" y="298" width="70" height="2.5" fill={GOLD} stroke="none" opacity="0.85" />
            <rect data-code x="232" y="308" width="120" height="2.5" fill={PAPER} stroke="none" opacity="0.7" />
            <rect data-code x="232" y="318" width="55" height="2.5" fill={PAPER} stroke="none" opacity="0.7" />
            <rect data-code x="220" y="328" width="90" height="2.5" fill={ACCENT} stroke="none" opacity="0.85" />
            <rect data-code x="220" y="338" width="110" height="2.5" fill={PAPER} stroke="none" opacity="0.7" />
            <rect data-code x="232" y="348" width="45" height="2.5" fill={GOLD} stroke="none" opacity="0.85" />
            <rect data-code x="232" y="358" width="130" height="2.5" fill={PAPER} stroke="none" opacity="0.7" />
            <rect data-code x="220" y="368" width="75" height="2.5" fill={PAPER} stroke="none" opacity="0.7" />
            {/* Cursor */}
            <rect id="dev-cursor" x="300" y="368" width="5" height="8" fill={ACCENT} stroke="none" />
          </g>

          {/* Keyboard */}
          <rect data-draw x="240" y="456" width="120" height="26" rx="2" />
          <line data-draw x1="248" y1="463" x2="352" y2="463" stroke={PAPER_DIM} strokeWidth="0.6" />
          <line data-draw x1="248" y1="470" x2="352" y2="470" stroke={PAPER_DIM} strokeWidth="0.6" />
          <line data-draw x1="270" y1="475" x2="330" y2="475" stroke={PAPER_DIM} strokeWidth="1.5" />

          {/* Mouse */}
          <rect data-draw x="390" y="460" width="50" height="30" rx="18" stroke={PAPER_DIM} />
          <ellipse data-draw cx="414" cy="473" rx="14" ry="18" />
          <line data-draw x1="414" y1="465" x2="414" y2="478" stroke={PAPER_DIM} strokeWidth="0.6" />
        </g>

        {/* ─── LAYER: Front (coffee, plant, books) ─── */}
        <g ref={(el) => { layersRef.current.front = el }} style={{ transition: 'transform 0.1s linear' }}>
          {/* Books stack */}
          <rect data-draw x="60" y="398" width="80" height="10" rx="1" />
          <line data-draw x1="60" y1="404" x2="140" y2="404" stroke={PAPER_DIM} strokeWidth="0.6" />
          <rect data-draw x="66" y="408" width="70" height="10" rx="1" stroke={PAPER_DIM} />
          <rect data-draw x="62" y="418" width="76" height="10" rx="1" />
          <line data-draw x1="62" y1="424" x2="138" y2="424" stroke={PAPER_DIM} strokeWidth="0.6" />
          {/* Bookmark ribbon on top book */}
          <rect data-fill x="125" y="398" width="3" height="16" fill={ACCENT} stroke="none" />

          {/* Coffee cup */}
          <g>
            <path data-draw d="M150 430 L160 404 L195 404 L205 430 Z" />
            <ellipse data-draw cx="177.5" cy="404" rx="17.5" ry="4" />
            {/* Handle */}
            <path data-draw d="M205 410 Q220 410 220 420 Q220 430 205 430" />
            {/* Coffee surface */}
            <ellipse data-fill cx="177.5" cy="404" rx="14" ry="3" fill={GOLD} stroke="none" opacity="0.35" />
            {/* Steam */}
            <g opacity="0.7">
              <path
                data-steam
                d="M168 390 Q164 380 170 374 Q176 368 172 358"
                stroke={PAPER_DIM}
                strokeWidth="1"
              />
              <path
                data-steam
                d="M178 388 Q182 378 176 372 Q170 366 174 356"
                stroke={PAPER_DIM}
                strokeWidth="1"
              />
              <path
                data-steam
                d="M188 390 Q184 380 190 374 Q196 368 192 358"
                stroke={PAPER_DIM}
                strokeWidth="1"
              />
            </g>
          </g>

          {/* Plant */}
          <g>
            <path data-draw d="M450 432 L455 405 L495 405 L500 432 Z" />
            <line data-draw x1="448" y1="405" x2="502" y2="405" />
            {/* Leaves group */}
            <g id="dev-leaves">
              <path
                data-draw
                d="M475 405 C465 380, 453 362, 462 335"
                stroke={PAPER}
              />
              <path
                data-draw
                d="M475 405 C485 382, 495 365, 488 345"
                stroke={PAPER}
              />
              <path
                data-draw
                d="M475 405 C472 385, 472 370, 478 355"
                stroke={PAPER}
              />
              {/* Leaf blobs */}
              <ellipse data-fill cx="460" cy="340" rx="8" ry="14" fill="rgba(201,168,76,0.25)" stroke={PAPER} strokeWidth="0.8" transform="rotate(-20 460 340)" />
              <ellipse data-fill cx="490" cy="352" rx="8" ry="14" fill="rgba(201,168,76,0.2)" stroke={PAPER} strokeWidth="0.8" transform="rotate(22 490 352)" />
              <ellipse data-fill cx="478" cy="360" rx="7" ry="12" fill="rgba(201,168,76,0.22)" stroke={PAPER} strokeWidth="0.8" />
            </g>
          </g>

          {/* Sticky note */}
          <g transform="rotate(-6 540 420)">
            <rect data-draw x="520" y="405" width="40" height="38" stroke={PAPER_DIM} />
            <line data-draw x1="525" y1="415" x2="550" y2="415" stroke={PAPER_DIM} strokeWidth="0.6" />
            <line data-draw x1="525" y1="422" x2="555" y2="422" stroke={PAPER_DIM} strokeWidth="0.6" />
            <line data-draw x1="525" y1="429" x2="545" y2="429" stroke={PAPER_DIM} strokeWidth="0.6" />
          </g>

          {/* Floating code glyphs */}
          <g data-glyph style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 14, fill: ACCENT }}>
            <text data-fill x="100" y="260" stroke="none" fill={ACCENT} opacity="0.75">{'{ }'}</text>
          </g>
          <g data-glyph style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 13, fill: GOLD }}>
            <text data-fill x="460" y="220" stroke="none" fill={GOLD} opacity="0.7">{'</>'}</text>
          </g>
          <g data-glyph style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 12, fill: PAPER_DIM }}>
            <text data-fill x="510" y="280" stroke="none" fill={PAPER_DIM}>{'=>'}</text>
          </g>
          <g data-glyph style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 12, fill: PAPER_DIM }}>
            <text data-fill x="70" y="340" stroke="none" fill={PAPER_DIM}>{'0x'}</text>
          </g>
        </g>
      </svg>
    </div>
  )
}
