'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Cookie, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { updateAnalyticsConsent } from '@/components/analytics'
import Link from 'next/link'

const CONSENT_KEY = 'lusk-cookie-consent'

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkConsent = async () => {
      // Check if user already made a choice
      const existingConsent = localStorage.getItem(CONSENT_KEY)
      if (existingConsent) {
        // Apply existing consent to analytics
        updateAnalyticsConsent(existingConsent === 'accepted')
        setIsLoading(false)
        return
      }

      // Check if user is in a region requiring consent
      try {
        const response = await fetch('/api/geo')
        const data = await response.json()
        
        if (data.requiresConsent) {
          setShowBanner(true)
        } else {
          // Non-regulated region: grant consent by default
          updateAnalyticsConsent(true)
        }
      } catch {
        // If geo check fails, don't show banner (fail open for better UX)
        console.warn('Geo check failed, skipping cookie consent')
        updateAnalyticsConsent(true)
      }
      
      setIsLoading(false)
    }

    checkConsent()
  }, [])

  const handleAccept = () => {
    localStorage.setItem(CONSENT_KEY, 'accepted')
    setShowBanner(false)
    updateAnalyticsConsent(true)
  }

  const handleReject = () => {
    localStorage.setItem(CONSENT_KEY, 'rejected')
    setShowBanner(false)
    updateAnalyticsConsent(false)
  }

  if (isLoading) return null

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
        >
          <div className="mx-auto max-w-4xl rounded-2xl border border-zinc-800 bg-zinc-950/95 backdrop-blur-xl p-6 shadow-2xl">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <div className="flex items-start gap-4 flex-1">
                <div className="p-2 rounded-xl bg-violet-500/10 text-violet-400 shrink-0">
                  <Cookie className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">Cookie Preferences</h3>
                  <p className="text-sm text-zinc-400">
                    We use cookies to analyze site traffic and improve your experience. 
                    See our{' '}
                    <Link href="/privacy" className="text-violet-400 hover:text-violet-300 underline">
                      Privacy Policy
                    </Link>{' '}
                    for details.
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 shrink-0">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleReject}
                  className="text-zinc-400 hover:text-white"
                >
                  Reject
                </Button>
                <Button
                  size="sm"
                  onClick={handleAccept}
                >
                  Accept
                </Button>
              </div>

              {/* Mobile close button */}
              <button
                onClick={handleReject}
                className="absolute top-4 right-4 md:hidden p-1 text-zinc-500 hover:text-white"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
