import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Lusk Technologies - Building the Future of Tech'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#09090b',
          backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(139, 92, 246, 0.15) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(6, 182, 212, 0.15) 0%, transparent 50%)',
        }}
      >
        {/* Logo */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 120,
            height: 120,
            borderRadius: 24,
            background: 'linear-gradient(135deg, #8b5cf6 0%, #06b6d4 100%)',
            marginBottom: 40,
          }}
        >
          <span style={{ fontSize: 64, fontWeight: 'bold', color: 'white' }}>L</span>
        </div>

        {/* Title */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <span
            style={{
              fontSize: 64,
              fontWeight: 'bold',
              background: 'linear-gradient(90deg, #ffffff 0%, #a1a1aa 100%)',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            Lusk Technologies
          </span>
          <span
            style={{
              fontSize: 32,
              color: '#71717a',
              marginTop: 16,
            }}
          >
            Building the Future of Tech
          </span>
        </div>

        {/* URL */}
        <div
          style={{
            position: 'absolute',
            bottom: 40,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <span style={{ fontSize: 24, color: '#8b5cf6' }}>lusk.app</span>
        </div>
      </div>
    ),
    { ...size }
  )
}
