import { Metadata } from 'next'
import type { ReactNode } from 'react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Browser Organizer Privacy Policy | Lusk Technologies',
  description:
    'How the Browser Organizer browser extension handles your data.',
  alternates: { canonical: 'https://lusk.app/browser-organizer/privacy' },
}

const SECTIONS: { heading: string; body: ReactNode }[] = [
  {
    heading: 'Overview',
    body: (
      <p>
        Browser Organizer is a browser extension published by Lusk
        Technologies, Inc. It runs a small helper program on your own computer,
        which invokes the AI backend you choose — a local AI CLI or an
        OpenAI-compatible API endpoint that you configure. That backend
        transmits some data to its AI provider under your own subscription or
        key. Lusk Technologies receives none of this data and operates no server
        that stores it.
      </p>
    ),
  },
  {
    heading: 'What the extension accesses',
    body: (
      <ul className="list-disc pl-6 space-y-2 mt-4">
        <li>Open tab titles and URLs.</li>
        <li>Your bookmarks.</li>
        <li>Browsing-history visit times for bookmarked URLs.</li>
        <li>
          The HTTP status of bookmarked URLs, only if you enable dead-link
          checking.
        </li>
      </ul>
    ),
  },
  {
    heading: 'What is sent to your AI provider',
    body: (
      <p>
        Open tab titles and URLs are sent to the backend you selected to compute
        tab groupings, stale-tab suggestions, and bookmark recommendations.
        Before sending, query strings and fragments are stripped, embedded
        credentials are removed, and private or loopback hosts are reduced to
        their origin. This happens under your own AI subscription or key and is
        subject to that provider&apos;s policy.
      </p>
    ),
  },
  {
    heading: 'What stays on your device',
    body: (
      <p>
        Bookmarks, browsing history, and dead-link HTTP checks are processed
        entirely on your machine and are never sent anywhere.
      </p>
    ),
  },
  {
    heading: 'What we store',
    body: (
      <p>
        Your settings, tab-activity timestamps, and an undo log — all in the
        browser&apos;s local storage on your device.
      </p>
    ),
  },
  {
    heading: 'What we never do',
    body: (
      <p>
        We never sell your data, run analytics on it, or transmit it to Lusk
        Technologies. We operate no server that receives it.
      </p>
    ),
  },
  {
    heading: 'Contact',
    body: (
      <div className="mt-4 p-6 bg-zinc-900 rounded-xl border border-zinc-800">
        <p className="font-medium text-white">Lusk Technologies, Inc.</p>
        <p>Toronto, Ontario, Canada</p>
        <p className="mt-2">
          Email:{' '}
          <a
            href="mailto:hello@lusk.app"
            className="text-violet-400 hover:text-violet-300 underline"
          >
            hello@lusk.app
          </a>
        </p>
      </div>
    ),
  },
]

export default function BrowserOrganizerPrivacyPolicy() {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-300">
      <div className="mx-auto max-w-4xl px-6 py-24">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Browser Organizer — Privacy Policy
        </h1>
        <p className="text-zinc-500 mb-12">Last updated: July 12, 2026</p>

        <div className="prose prose-invert prose-zinc max-w-none space-y-8">
          {SECTIONS.map((section) => (
            <section key={section.heading}>
              <h2 className="text-2xl font-semibold text-white mb-4">
                {section.heading}
              </h2>
              {section.body}
            </section>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-zinc-800 flex gap-6">
          <Link
            href="/"
            className="text-violet-400 hover:text-violet-300 transition-colors"
          >
            ← Back to Home
          </Link>
          <Link
            href="/privacy"
            className="text-violet-400 hover:text-violet-300 transition-colors"
          >
            Site Privacy Policy
          </Link>
        </div>
      </div>
    </main>
  )
}
