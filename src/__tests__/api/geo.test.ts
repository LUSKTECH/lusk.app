import { describe, it, expect } from 'vitest'
import { NextRequest } from 'next/server'
import { GET } from '@/app/api/geo/route'

describe('Geo API Route', () => {
  it('returns requiresConsent true for EU countries', async () => {
    const request = new NextRequest('http://localhost/api/geo', {
      headers: { 'x-vercel-ip-country': 'DE' },
    })

    const response = await GET(request)
    const data = await response.json()

    expect(data.country).toBe('DE')
    expect(data.requiresConsent).toBe(true)
  })

  it('returns requiresConsent true for UK', async () => {
    const request = new NextRequest('http://localhost/api/geo', {
      headers: { 'x-vercel-ip-country': 'GB' },
    })

    const response = await GET(request)
    const data = await response.json()

    expect(data.country).toBe('GB')
    expect(data.requiresConsent).toBe(true)
  })

  it('returns requiresConsent true for Brazil', async () => {
    const request = new NextRequest('http://localhost/api/geo', {
      headers: { 'x-vercel-ip-country': 'BR' },
    })

    const response = await GET(request)
    const data = await response.json()

    expect(data.country).toBe('BR')
    expect(data.requiresConsent).toBe(true)
  })

  it('returns requiresConsent false for US', async () => {
    const request = new NextRequest('http://localhost/api/geo', {
      headers: { 'x-vercel-ip-country': 'US' },
    })

    const response = await GET(request)
    const data = await response.json()

    expect(data.country).toBe('US')
    expect(data.requiresConsent).toBe(false)
  })

  it('returns requiresConsent false for Canada', async () => {
    const request = new NextRequest('http://localhost/api/geo', {
      headers: { 'x-vercel-ip-country': 'CA' },
    })

    const response = await GET(request)
    const data = await response.json()

    expect(data.country).toBe('CA')
    expect(data.requiresConsent).toBe(false)
  })

  it('handles Cloudflare header', async () => {
    const request = new NextRequest('http://localhost/api/geo', {
      headers: { 'cf-ipcountry': 'FR' },
    })

    const response = await GET(request)
    const data = await response.json()

    expect(data.country).toBe('FR')
    expect(data.requiresConsent).toBe(true)
  })

  it('returns requiresConsent false when no country header', async () => {
    const request = new NextRequest('http://localhost/api/geo')

    const response = await GET(request)
    const data = await response.json()

    expect(data.country).toBeNull()
    expect(data.requiresConsent).toBe(false)
  })

  it('handles all EU member states', async () => {
    const euCountries = ['AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR',
      'DE', 'GR', 'HU', 'IE', 'IT', 'LV', 'LT', 'LU', 'MT', 'NL',
      'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'SE']

    for (const country of euCountries) {
      const request = new NextRequest('http://localhost/api/geo', {
        headers: { 'x-vercel-ip-country': country },
      })

      const response = await GET(request)
      const data = await response.json()

      expect(data.requiresConsent).toBe(true)
    }
  })

  it('handles EEA countries', async () => {
    const eeaCountries = ['IS', 'LI', 'NO']

    for (const country of eeaCountries) {
      const request = new NextRequest('http://localhost/api/geo', {
        headers: { 'x-vercel-ip-country': country },
      })

      const response = await GET(request)
      const data = await response.json()

      expect(data.requiresConsent).toBe(true)
    }
  })
})
