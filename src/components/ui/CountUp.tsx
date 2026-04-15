'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface Props {
  end: number
  duration?: number
  className?: string
}

export default function CountUp({ end, duration = 2, className = '' }: Props) {
  const ref = useRef<HTMLSpanElement>(null)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    if (!ref.current || hasAnimated) return

    const obj = { val: 0 }

    ScrollTrigger.create({
      trigger: ref.current,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        setHasAnimated(true)
        gsap.to(obj, {
          val: end,
          duration,
          ease: 'power2.out',
          onUpdate: () => {
            if (ref.current) {
              ref.current.textContent = Math.round(obj.val).toString()
            }
          },
        })
      },
    })
  }, [end, duration, hasAnimated])

  return <span ref={ref} className={className}>0</span>
}
