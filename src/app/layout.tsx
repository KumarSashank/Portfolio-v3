import type { Metadata } from 'next'
import { Syne, DM_Mono, Fraunces } from 'next/font/google'
import './globals.css'

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
  title: 'Kumar Sashank — Creative Engineer',
  description:
    'Creative engineer blending full-stack systems, AI prototyping, and motion-led interfaces into product experiences with cinematic polish.',
  keywords: [
    'Kumar Sashank',
    'creative engineer',
    'portfolio',
    'Next.js portfolio',
    'full-stack engineer',
    'AI prototyping',
    'interactive developer',
  ],
  authors: [{ name: 'Kumar Sashank' }],
  creator: 'Kumar Sashank',
  openGraph: {
    title: 'Kumar Sashank — Creative Engineer',
    description:
      'Product systems, immersive interfaces, research-led thinking, and selected engineering work by Kumar Sashank.',
    type: 'website',
    siteName: 'Kumar Sashank Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kumar Sashank — Creative Engineer',
    description:
      'Portfolio showcasing interactive product engineering, AI experiments, and research-backed design thinking.',
  },
}

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
        {children}
      </body>
    </html>
  )
}
