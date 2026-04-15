'use client'

import { useEffect, useRef, type RefObject } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface Props {
  children: string
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'div' | 'span'
  className?: string
  style?: React.CSSProperties
  delay?: number
  splitBy?: 'chars' | 'words' | 'lines'
  trigger?: boolean // true = scroll trigger, false = immediate
  dangerouslySetInnerHTML?: boolean
}

export default function RevealText({
  children,
  as: Tag = 'div',
  className = '',
  style,
  delay = 0,
  splitBy = 'words',
  trigger = true,
}: Props) {
  const containerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const el = containerRef.current
    const text = el.textContent || ''

    // Split text into spans
    let parts: string[]
    if (splitBy === 'chars') {
      parts = text.split('')
    } else if (splitBy === 'words') {
      parts = text.split(' ')
    } else {
      parts = text.split('\n')
    }

    el.innerHTML = parts
      .map(
        (part) =>
          `<span style="display:inline-block;overflow:hidden;"><span class="reveal-inner" style="display:inline-block;">${part}</span></span>`
      )
      .join(splitBy === 'chars' ? '' : ' ')

    const inners = el.querySelectorAll('.reveal-inner')

    const config = {
      y: splitBy === 'chars' ? '110%' : '100%',
      opacity: 0,
      rotateX: splitBy === 'chars' ? 20 : 0,
      duration: splitBy === 'chars' ? 0.6 : 0.8,
      stagger: splitBy === 'chars' ? 0.02 : 0.04,
      ease: 'power3.out',
      delay,
    }

    if (trigger) {
      gsap.from(inners, {
        ...config,
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
        },
      })
    } else {
      gsap.from(inners, config)
    }

    return () => {
      ScrollTrigger.getAll()
        .filter((t) => t.trigger === el)
        .forEach((t) => t.kill())
    }
  }, [children, delay, splitBy, trigger])

  switch (Tag) {
    case 'h1':
      return (
        <h1 ref={containerRef as RefObject<HTMLHeadingElement>} className={className} style={style}>
          {children}
        </h1>
      )
    case 'h2':
      return (
        <h2 ref={containerRef as RefObject<HTMLHeadingElement>} className={className} style={style}>
          {children}
        </h2>
      )
    case 'h3':
      return (
        <h3 ref={containerRef as RefObject<HTMLHeadingElement>} className={className} style={style}>
          {children}
        </h3>
      )
    case 'p':
      return (
        <p ref={containerRef as RefObject<HTMLParagraphElement>} className={className} style={style}>
          {children}
        </p>
      )
    case 'span':
      return (
        <span ref={containerRef as RefObject<HTMLSpanElement>} className={className} style={style}>
          {children}
        </span>
      )
    default:
      return (
        <div ref={containerRef as RefObject<HTMLDivElement>} className={className} style={style}>
          {children}
        </div>
      )
  }
}
