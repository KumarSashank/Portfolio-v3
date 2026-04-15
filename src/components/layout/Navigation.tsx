'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { navLinks } from '@/lib/constants'
import MagneticButton from '@/components/ui/MagneticButton'

gsap.registerPlugin(ScrollTrigger)

export default function Navigation() {
  const progressRef = useRef<HTMLDivElement>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        if (progressRef.current) {
          progressRef.current.style.width = `${self.progress * 100}%`
        }
        setScrolled(self.progress > 0.01)
      },
    })

    return () => trigger.kill()
  }, [])

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-[1000] px-5 pt-5 md:px-8">
        <div
          className="section-shell panel relative flex items-center justify-between rounded-full px-6 py-3.5 md:px-8"
          style={{
            background: scrolled ? 'rgba(8, 11, 18, 0.78)' : 'rgba(8, 11, 18, 0.52)',
            borderColor: scrolled ? 'var(--border-strong)' : 'var(--border)',
          }}
        >
          <div
            ref={progressRef}
            className="absolute inset-x-0 top-0 h-px rounded-full bg-accent"
            style={{ width: 0 }}
          />

          <a href="#hero" className="flex items-center gap-3 no-underline" aria-label="Go to top">
            <span
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[rgba(245,239,229,0.14)] bg-[rgba(255,255,255,0.03)] font-serif text-lg font-bold"
            >
              K
            </span>
            <div className="hidden sm:block">
              <div className="font-mono text-[10px] uppercase tracking-[0.24em] text-[rgba(245,239,229,0.5)]">
                Kumar Sashank
              </div>
              <div className="text-sm text-[rgba(245,239,229,0.82)]">Creative Engineer</div>
            </div>
          </a>

          <ul className="hidden list-none items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted transition-colors duration-200 hover:text-paper"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-4 lg:flex">
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[rgba(245,239,229,0.45)]">
              Open to work
            </div>
            <MagneticButton strength={0.18}>
              <a
                href="mailto:kumarsashank2003@gmail.com"
                className="inline-flex items-center gap-2 rounded-full border border-[rgba(255,92,53,0.35)] bg-accent px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.14em] text-paper no-underline transition-transform duration-200 hover:scale-[1.02]"
              >
                Start a project
              </a>
            </MagneticButton>
          </div>

          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(245,239,229,0.12)] bg-[rgba(255,255,255,0.02)] lg:hidden"
            onClick={() => setMobileOpen((value) => !value)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            <span className="relative block h-3.5 w-5">
              <span
                className="absolute left-0 top-0 block h-px w-5 bg-paper transition-all duration-300"
                style={{ transform: mobileOpen ? 'translateY(6px) rotate(45deg)' : 'none' }}
              />
              <span
                className="absolute left-0 top-[6px] block h-px w-5 bg-paper transition-all duration-300"
                style={{ opacity: mobileOpen ? 0 : 1 }}
              />
              <span
                className="absolute left-0 top-3 block h-px w-5 bg-paper transition-all duration-300"
                style={{ transform: mobileOpen ? 'translateY(-6px) rotate(-45deg)' : 'none' }}
              />
            </span>
          </button>
        </div>
      </nav>

      <div
        className="fixed inset-0 z-[999] bg-[rgba(5,7,11,0.94)] px-6 pb-8 pt-28 backdrop-blur-xl transition-all duration-300 lg:hidden"
        style={{
          opacity: mobileOpen ? 1 : 0,
          pointerEvents: mobileOpen ? 'auto' : 'none',
        }}
      >
        <div className="section-shell flex h-full flex-col justify-between">
          <div className="space-y-6">
            {navLinks.map((link, index) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block text-4xl font-bold tracking-tight text-paper no-underline"
                style={{
                  fontFamily: 'var(--font-serif)',
                  opacity: mobileOpen ? 1 : 0,
                  transform: mobileOpen ? 'translateY(0)' : 'translateY(18px)',
                  transition: `transform 280ms ease ${index * 50}ms, opacity 280ms ease ${index * 50}ms`,
                }}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="space-y-5 border-t border-[rgba(245,239,229,0.12)] pt-6">
            <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-[rgba(245,239,229,0.5)]">
              Available for internships, freelance, and product builds
            </div>
            <a
              href="mailto:kumarsashank2003@gmail.com"
              className="inline-flex rounded-full border border-[rgba(255,92,53,0.35)] bg-accent px-5 py-3 font-mono text-[11px] uppercase tracking-[0.16em] text-paper no-underline"
              onClick={() => setMobileOpen(false)}
            >
              Start a project
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
