'use client'

import GSAPProvider from '@/components/providers/GSAPProvider'
import SmoothScroll from '@/components/providers/SmoothScroll'
import CustomCursor from '@/components/layout/CustomCursor'
import SoundToggle from '@/components/ui/SoundToggle'

export default function CaseStudyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <GSAPProvider>
      <SmoothScroll>
        <CustomCursor />
        <SoundToggle />
        {children}
      </SmoothScroll>
    </GSAPProvider>
  )
}
