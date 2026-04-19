import type { Metadata } from 'next'
import { Syne, DM_Mono, Fraunces } from 'next/font/google'
import './globals.css'
import { MotionPrefsProvider } from '@/lib/motion/prefs'

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'http://localhost:3000')

const syne = Syne({
  variable: '--font-sans',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
})

const dmMono = DM_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
  weight: ['300', '400', '500'],
})

const fraunces = Fraunces({
  variable: '--font-serif',
  subsets: ['latin'],
  weight: ['300', '700'],
  style: ['normal', 'italic'],
})

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Kumar Sashank — AI Product Engineer',
  description:
    'AI Product Engineer building GenAI pipelines, agentic systems, and full-stack products. Founding engineer at EONVERSE, Masters at Wilfrid Laurier, IEEE-published researcher.',
  keywords: [
    'Kumar Sashank',
    'AI Product Engineer',
    'AI engineer Canada',
    'portfolio',
    'Next.js portfolio',
    'GenAI engineer',
    'full-stack engineer',
    'founding engineer',
    'new grad software engineer Canada',
  ],
  authors: [{ name: 'Kumar Sashank' }],
  creator: 'Kumar Sashank',
  openGraph: {
    title: 'Kumar Sashank — AI Product Engineer',
    description:
      'AI products, agentic pipelines, and research-grade engineering. Selected work by Kumar Sashank.',
    type: 'website',
    siteName: 'Kumar Sashank Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kumar Sashank — AI Product Engineer',
    description:
      'Portfolio showcasing AI product engineering, agentic systems, and research-backed shipped work.',
  },
}

import CustomCursor from '@/components/layout/CustomCursor'
import { Analytics } from '@vercel/analytics/react'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${dmMono.variable} ${fraunces.variable} antialiased`}
    >
      <body className="min-h-screen bg-ink text-paper">
        <MotionPrefsProvider>
          <CustomCursor />
          {children}
          <Analytics />
        </MotionPrefsProvider>
      </body>
    </html>
  )
}
