'use client'

import { useState } from 'react'

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
  const [loaded, setLoaded] = useState(false)

  return (
    <GSAPProvider>
      <SmoothScroll>
        {!loaded && <Preloader onComplete={() => setLoaded(true)} />}
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
