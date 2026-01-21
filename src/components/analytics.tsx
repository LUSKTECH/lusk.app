'use client'

import Script from 'next/script'
import { Analytics as VercelAnalytics } from '@vercel/analytics/next'

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

export function Analytics() {
  return (
    <>
      <VercelAnalytics />
      {GA_MEASUREMENT_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            strategy="lazyOnload"
          />
          <Script id="google-analytics" strategy="lazyOnload">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              
              // Default to denied for GDPR regions - will be updated by cookie consent
              gtag('consent', 'default', {
                'analytics_storage': 'denied',
                'ad_storage': 'denied',
              });
              
              gtag('config', '${GA_MEASUREMENT_ID}', {
                page_path: window.location.pathname,
                anonymize_ip: true,
              });
            `}
          </Script>
        </>
      )}
    </>
  )
}

// Helper to update consent (called from cookie-consent component)
export function updateAnalyticsConsent(granted: boolean) {
  globalThis.window?.gtag?.('consent', 'update', {
    'analytics_storage': granted ? 'granted' : 'denied',
  })
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    dataLayer?: unknown[]
  }
}
