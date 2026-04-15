import { ImageResponse } from 'next/og'

export const alt = 'Kumar Sashank portfolio'

export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default function Image() {
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
            'radial-gradient(circle at top left, rgba(255,92,53,0.22), transparent 28%), radial-gradient(circle at bottom right, rgba(131,183,255,0.18), transparent 26%), linear-gradient(180deg, #05070b 0%, #0a1020 100%)',
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

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 14,
            }}
          >
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: 999,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid rgba(245,239,229,0.14)',
                background: 'rgba(255,255,255,0.03)',
                fontSize: 28,
                fontWeight: 700,
              }}
            >
              K
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ fontSize: 16, letterSpacing: 4, textTransform: 'uppercase', color: 'rgba(245,239,229,0.56)' }}>
                Kumar Sashank
              </div>
              <div style={{ fontSize: 22 }}>Creative Engineer</div>
            </div>
          </div>
          <div
            style={{
              borderRadius: 999,
              border: '1px solid rgba(255,92,53,0.32)',
              padding: '12px 18px',
              fontSize: 16,
              letterSpacing: 3,
              textTransform: 'uppercase',
              color: '#ff5c35',
              background: 'rgba(255,92,53,0.08)',
            }}
          >
            Portfolio
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div
            style={{
              fontSize: 78,
              lineHeight: 0.95,
              maxWidth: 900,
              letterSpacing: -3.5,
              fontWeight: 700,
            }}
          >
            Product systems with cinematic presence.
          </div>
          <div
            style={{
              fontSize: 28,
              lineHeight: 1.4,
              maxWidth: 860,
              color: 'rgba(245,239,229,0.72)',
            }}
          >
            Full-stack engineering, motion-led interfaces, AI prototyping, and research-backed craft.
          </div>
        </div>

        <div style={{ display: 'flex', gap: 18 }}>
          {['Product engineering', 'Creative development', 'AI prototyping'].map((item) => (
            <div
              key={item}
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
              {item}
            </div>
          ))}
        </div>
      </div>
    ),
    size
  )
}
