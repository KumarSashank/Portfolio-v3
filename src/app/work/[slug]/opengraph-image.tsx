import { ImageResponse } from 'next/og'
import { getCaseStudy } from '@/lib/case-studies'

export const alt = 'Kumar Sashank case study'

export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

type ImageProps = {
  params: Promise<{ slug: string }>
}

export default async function Image({ params }: ImageProps) {
  const { slug } = await params
  const study = getCaseStudy(slug)

  const title = study?.title ?? 'Case Study'
  const subtitle = study?.subtitle ?? 'Selected work by Kumar Sashank'
  const tags = study?.tags.slice(0, 3) ?? ['Portfolio', 'Engineering', 'Design']

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          position: 'relative',
          overflow: 'hidden',
          background:
            'radial-gradient(circle at top right, rgba(131,183,255,0.22), transparent 24%), radial-gradient(circle at bottom left, rgba(255,92,53,0.2), transparent 28%), linear-gradient(180deg, #05070b 0%, #0b1018 100%)',
          color: '#f5efe5',
          padding: 56,
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 24,
            borderRadius: 32,
            border: '1px solid rgba(245,239,229,0.12)',
          }}
        />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: 18, letterSpacing: 4, textTransform: 'uppercase', color: '#ff5c35' }}>
            Kumar Sashank / Case Study
          </div>
          <div
            style={{
              borderRadius: 999,
              border: '1px solid rgba(245,239,229,0.12)',
              padding: '12px 18px',
              fontSize: 16,
              letterSpacing: 3,
              textTransform: 'uppercase',
              color: 'rgba(245,239,229,0.62)',
            }}
          >
            Selected Work
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div
            style={{
              fontSize: 74,
              lineHeight: 0.95,
              maxWidth: 980,
              letterSpacing: -3.2,
              fontWeight: 700,
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: 28,
              lineHeight: 1.35,
              maxWidth: 900,
              color: 'rgba(245,239,229,0.72)',
            }}
          >
            {subtitle}
          </div>
        </div>

        <div style={{ display: 'flex', gap: 18 }}>
          {tags.map((tag) => (
            <div
              key={tag}
              style={{
                borderRadius: 999,
                border: '1px solid rgba(245,239,229,0.12)',
                padding: '12px 18px',
                fontSize: 16,
                letterSpacing: 2,
                textTransform: 'uppercase',
                color: 'rgba(245,239,229,0.68)',
              }}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    ),
    size
  )
}
