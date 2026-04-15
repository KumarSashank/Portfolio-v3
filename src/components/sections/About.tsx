'use client'

import { useRef } from 'react'
import { aboutData, operatingPrinciples } from '@/lib/data'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)>([])
  const sectionRef = useScrollReveal()

  const items = [
    {
      id: 'intro',
      content: (
        <div className="w-full lg:px-8">
          <p className="text-[24px] md:text-[32px] leading-[1.5] text-paper font-medium tracking-tight max-w-xl">
            {aboutData.intro}
          </p>
          <p className="mt-8 text-[16px] md:text-[18px] leading-[1.8] text-[rgba(245,239,229,0.65)] max-w-lg">
            {aboutData.text}
          </p>
        </div>
      )
    },
    ...operatingPrinciples.map(p => ({
      id: p.id,
      content: (
        <div className="w-full relative flex flex-col items-start lg:px-8">
          <div className="flex items-center gap-4">
            <div className="h-[1px] w-12 bg-[rgba(255,92,53,0.5)]"></div>
            <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-[rgba(255,92,53,0.9)]">
              Principle 0{p.id}
            </div>
          </div>
          <h3 className="mt-8 text-[32px] md:text-[44px] font-bold leading-[1.05] tracking-[-0.03em] text-paper max-w-xl" style={{ fontFamily: 'var(--font-serif)' }}>
            {p.title}
          </h3>
          <p className="mt-6 text-[16px] leading-[1.8] text-[rgba(245,239,229,0.65)] md:text-[18px] max-w-lg">
            {p.description}
          </p>
        </div>
      )
    }))
  ]

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger)

    // @ts-ignore
    const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[]
    if (cards.length === 0) return

    // Position securely
    gsap.set(cards, { top: '50%', yPercent: -50, opacity: 0, y: 150 })
    // First setup
    gsap.set(cards[0], { opacity: 1, y: 0 })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'center center',
        end: `+=${cards.length * 100}%`,
        pin: true,
        scrub: 1,
      }
    })

    cards.forEach((card, index) => {
      if (index === 0) {
        tl.to(card, { y: 0, opacity: 1, duration: 2 }) // pause
        tl.to(card, { y: -150, opacity: 0, duration: 1.5, ease: 'power2.inOut' })
      } else {
        tl.to(card, { y: 0, opacity: 1, duration: 1.5, ease: 'power2.out' }, '<+=0.5')
        tl.to(card, { y: 0, duration: 2 })
        
        if (index < cards.length - 1) {
          tl.to(card, { y: -150, opacity: 0, duration: 1.5, ease: 'power2.inOut' })
        }
      }
    })
  }, { scope: containerRef })

  return (
    <section ref={sectionRef} id="craft" className="relative pt-24 md:pt-40">
      
      {/* ── Pinned GSAP Section ── */}
      <div ref={containerRef} className="w-full relative z-[2]">
        <div className="section-shell w-full">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24 relative w-full">
            
            {/* Left Fixed Column */}
            <div className="lg:w-1/2 flex flex-col justify-center shrink-0">
              <div>
                <div className="section-label" data-reveal="">
                  Craft
                </div>
                <h2
                  data-reveal=""
                  data-reveal-delay="1"
                  className="mt-6 text-balance text-[clamp(44px,6vw,84px)] font-bold leading-[0.95] tracking-[-0.03em]"
                  style={{ fontFamily: 'var(--font-serif)' }}
                >
                  Building <span className="text-gold">things</span> that matter.
                </h2>
              </div>
            </div>

            {/* Right Scrolling/Fading Cards */}
            <div className="lg:w-1/2 relative h-[50vh] w-full">
              {items.map((item, index) => (
                <div 
                  key={item.id} 
                  // @ts-ignore
                  ref={(el) => (cardsRef.current[index] = el)}
                  className="absolute w-full left-0 z-10"
                >
                  {item.content}
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>

      {/* ── Capability Map (Scrolls up normally after pin ends) ── */}
      <div className="section-shell my-32 md:my-48 relative z-[2]">
        <div className="pt-16 md:pt-24 border-t border-[rgba(245,239,229,0.08)]">
          <div className="section-label mb-12" data-reveal="">
            Capability Map
          </div>
          
          <div className="border-t border-[rgba(245,239,229,0.12)]">
            {aboutData.skills.map((skill, index) => (
              <div
                key={skill.category}
                className="group flex flex-col gap-4 border-b border-[rgba(245,239,229,0.12)] py-8 transition-colors duration-300 hover:bg-[rgba(245,239,229,0.02)] md:flex-row md:items-center md:gap-12 md:py-10"
                data-reveal=""
                data-reveal-delay={0}
              >
                <div className="w-full shrink-0 md:w-1/3 lg:w-1/4 md:pl-6">
                  <h4 className="text-[17px] font-medium tracking-[-0.01em] text-paper">
                    {skill.category}
                  </h4>
                </div>
                <div className="w-full">
                  <p className="font-mono text-[13px] leading-relaxed text-[rgba(245,239,229,0.5)] transition-colors duration-300 group-hover:text-[rgba(245,239,229,0.8)] md:pr-6">
                    {skill.items}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </section>
  )
}
