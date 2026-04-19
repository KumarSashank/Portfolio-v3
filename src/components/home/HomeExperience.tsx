'use client'

import { useState, useCallback, useLayoutEffect } from 'react'

import GSAPProvider from '@/components/providers/GSAPProvider'
import SmoothScroll from '@/components/providers/SmoothScroll'
import Preloader from '@/components/layout/Preloader'
import Navigation from '@/components/layout/Navigation'
import SoundToggle from '@/components/ui/SoundToggle'

import Hero from '@/components/sections/Hero'
import Marquee from '@/components/sections/Marquee'
import About from '@/components/sections/About'
import Experience from '@/components/sections/Experience'
import Projects from '@/components/sections/Projects'
import Research from '@/components/sections/Research'
import Achievements from '@/components/sections/Achievements'
import Contact from '@/components/sections/Contact'

export default function HomeExperience() {
  // Both server AND client start with false → no hydration mismatch.
  const [loaded, setLoaded] = useState(false)

  // useLayoutEffect fires synchronously AFTER hydration but BEFORE
  // the browser paints. If we've already visited, we flip loaded=true
  // before the Preloader's own useEffect ever fires, so its GSAP
  // timeline never starts and it unmounts cleanly on the very first
  // committed render.
  useLayoutEffect(() => {
    try {
      if (window.localStorage.getItem('portfolio-preloaded') === 'true') {
        setLoaded(true)
      }
    } catch {
      // localStorage blocked — let preloader play
    }
  }, [])

  const handlePreloaderComplete = useCallback(() => {
    try {
      window.localStorage.setItem('portfolio-preloaded', 'true')
    } catch { /* localStorage unavailable */ }
    setLoaded(true)
  }, [])

  return (
    <GSAPProvider>
      <SmoothScroll>
        {!loaded && <Preloader onComplete={handlePreloaderComplete} />}
        <a href="#content" className="sr-only-focusable">
          Skip to content
        </a>
        <Navigation />
        <SoundToggle />

        <main id="content">
          <Hero />
          <Marquee />
          <About />
          <Experience />
          <Projects />
          <Research />
          <Achievements />
          <Contact />
        </main>

      </SmoothScroll>
    </GSAPProvider>
  )
}

