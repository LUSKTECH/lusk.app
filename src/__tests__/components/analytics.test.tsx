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

  it('renders Vercel Analytics even when GA_MEASUREMENT_ID is not set', () => {
    const { container } = render(<Analytics />)
    // Component now always renders Vercel Analytics
    expect(container.firstChild).not.toBeNull()
  })

  it('does not render Google Analytics scripts when GA_MEASUREMENT_ID is not set', () => {
    const { container } = render(<Analytics />)
    // Should not have any script tags for GA
    const scripts = container.querySelectorAll('script')
    expect(scripts.length).toBe(0)
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
