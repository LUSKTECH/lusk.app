import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { CookieConsent } from '@/components/cookie-consent'

// Mock the analytics module
vi.mock('@/components/analytics', () => ({
  updateAnalyticsConsent: vi.fn(),
}))

describe('CookieConsent', () => {
  beforeEach(() => {
    vi.mocked(global.fetch).mockReset()
    vi.mocked(window.localStorage.getItem).mockReturnValue(null)
  })

  it('does not show banner when consent already given', async () => {
    vi.mocked(window.localStorage.getItem).mockReturnValue('accepted')
    
    render(<CookieConsent />)
    
    await waitFor(() => {
      expect(screen.queryByText(/cookie preferences/i)).not.toBeInTheDocument()
    })
  })

  it('shows banner for EU users', async () => {
    vi.mocked(global.fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ requiresConsent: true, country: 'DE' }),
    } as Response)

    render(<CookieConsent />)
    
    await waitFor(() => {
      expect(screen.getByText(/cookie preferences/i)).toBeInTheDocument()
    })
  })

  it('does not show banner for non-EU users', async () => {
    vi.mocked(global.fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ requiresConsent: false, country: 'US' }),
    } as Response)

    render(<CookieConsent />)
    
    await waitFor(() => {
      expect(screen.queryByText(/cookie preferences/i)).not.toBeInTheDocument()
    })
  })

  it('saves consent when Accept is clicked', async () => {
    vi.mocked(global.fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ requiresConsent: true, country: 'DE' }),
    } as Response)

    render(<CookieConsent />)
    
    await waitFor(() => {
      expect(screen.getByText(/cookie preferences/i)).toBeInTheDocument()
    })

    fireEvent.click(screen.getByRole('button', { name: /accept/i }))
    
    expect(window.localStorage.setItem).toHaveBeenCalledWith('lusk-cookie-consent', 'accepted')
  })

  it('saves rejection when Reject is clicked', async () => {
    vi.mocked(global.fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ requiresConsent: true, country: 'DE' }),
    } as Response)

    render(<CookieConsent />)
    
    await waitFor(() => {
      expect(screen.getByText(/cookie preferences/i)).toBeInTheDocument()
    })

    fireEvent.click(screen.getByRole('button', { name: /reject/i }))
    
    expect(window.localStorage.setItem).toHaveBeenCalledWith('lusk-cookie-consent', 'rejected')
  })

  it('links to privacy policy', async () => {
    vi.mocked(global.fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ requiresConsent: true, country: 'DE' }),
    } as Response)

    render(<CookieConsent />)
    
    await waitFor(() => {
      expect(screen.getByRole('link', { name: /privacy policy/i })).toHaveAttribute('href', '/privacy')
    })
  })

  it('handles geo check failure gracefully', async () => {
    vi.mocked(global.fetch).mockRejectedValueOnce(new Error('Network error'))

    render(<CookieConsent />)
    
    // Should not show banner on error (fail open)
    await waitFor(() => {
      expect(screen.queryByText(/cookie preferences/i)).not.toBeInTheDocument()
    })
  })
})
