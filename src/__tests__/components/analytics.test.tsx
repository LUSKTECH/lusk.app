import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render } from '@testing-library/react'
import { Analytics, updateAnalyticsConsent } from '@/components/analytics'

// Unmock next/script for this test
vi.unmock('next/script')

describe('Analytics', () => {
  const originalEnv = process.env

  beforeEach(() => {
    vi.resetModules()
    process.env = { ...originalEnv }
    delete process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
    window.gtag = undefined
    window.dataLayer = undefined
  })

  afterAll(() => {
    process.env = originalEnv
  })

  it('returns null when GA_MEASUREMENT_ID is not set', () => {
    const { container } = render(<Analytics />)
    expect(container.firstChild).toBeNull()
  })

  it('updateAnalyticsConsent does nothing when gtag is not defined', () => {
    expect(() => updateAnalyticsConsent(true)).not.toThrow()
    expect(() => updateAnalyticsConsent(false)).not.toThrow()
  })

  it('updateAnalyticsConsent calls gtag when defined', () => {
    const mockGtag = vi.fn()
    window.gtag = mockGtag

    updateAnalyticsConsent(true)
    expect(mockGtag).toHaveBeenCalledWith('consent', 'update', {
      'analytics_storage': 'granted',
    })

    mockGtag.mockClear()

    updateAnalyticsConsent(false)
    expect(mockGtag).toHaveBeenCalledWith('consent', 'update', {
      'analytics_storage': 'denied',
    })
  })
})
