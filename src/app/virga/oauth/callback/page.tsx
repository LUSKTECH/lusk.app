import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Virga Sign-In | Lusk Technologies',
  description: 'OAuth redirect handler for the Virga app.',
  // This is a machine-facing redirect target, not a page to surface in search.
  robots: { index: false, follow: false },
}

/**
 * OAuth redirect fallback for the Virga Android app.
 *
 * Virga registers this exact URL (https://lusk.app/virga/oauth/callback) as a
 * verified Android App Link, so on a correctly-configured device the OS hands
 * the redirect — authorization code and all — straight to the app and this
 * page is never rendered. It exists as a graceful fallback for the cases where
 * the link is NOT captured by the app: an unverified/!installed build, an
 * in-app browser that ignores App Links, or verification that hasn't propagated
 * yet. The PKCE code exchange happens inside the app, never here, so we only
 * report status and point the user back to Virga.
 */
const first = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v)

export default async function VirgaOAuthCallback({
  searchParams,
}: {
  readonly searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const params = await searchParams
  const error = first(params.error)
  const errorDescription = first(params.error_description)
  const succeeded = !error && typeof first(params.code) === 'string'

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-300 flex items-center justify-center px-6">
      <div className="w-full max-w-md text-center">
        {error ? (
          <>
            <h1 className="text-3xl font-bold text-white mb-4">Sign-in didn&apos;t complete</h1>
            <p className="text-zinc-400 mb-2">
              The authorization was cancelled or failed. You can close this page and try connecting
              the remote again from inside Virga.
            </p>
            <p className="text-sm text-zinc-600 mb-8">
              {error}
              {errorDescription ? `: ${errorDescription}` : ''}
            </p>
          </>
        ) : (
          <>
            <h1 className="text-3xl font-bold text-white mb-4">
              {succeeded ? 'Almost done' : 'Return to Virga'}
            </h1>
            <p className="text-zinc-400 mb-2">
              Virga should have reopened automatically to finish connecting your account.
            </p>
            <p className="text-zinc-500 mb-8">
              If it didn&apos;t, switch back to the Virga app and start the connection again — no
              need to copy anything from this page.
            </p>
          </>
        )}

        <Link
          href="/"
          className="inline-block rounded-xl bg-zinc-900 border border-zinc-800 px-6 py-3 text-white hover:border-violet-500/50 transition-all"
        >
          Back to lusk.app
        </Link>
      </div>
    </main>
  )
}
