import { NextRequest, NextResponse } from 'next/server'

// Countries requiring cookie consent
// EU (GDPR), UK (UK GDPR), Brazil (LGPD), California handled separately via CCPA
const CONSENT_REQUIRED_COUNTRIES = new Set([
  // EU Member States
  'AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR',
  'DE', 'GR', 'HU', 'IE', 'IT', 'LV', 'LT', 'LU', 'MT', 'NL',
  'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'SE',
  // EEA
  'IS', 'LI', 'NO',
  // UK (post-Brexit, still has UK GDPR)
  'GB',
  // Brazil (LGPD)
  'BR',
  // Switzerland
  'CH',
])

export async function GET(request: NextRequest) {
  // Vercel provides geo data in headers
  const country = request.headers.get('x-vercel-ip-country') ||
                  request.headers.get('cf-ipcountry') || // Cloudflare
                  null

  const requiresConsent = country ? CONSENT_REQUIRED_COUNTRIES.has(country) : false

  return NextResponse.json({
    country,
    requiresConsent,
  })
}
