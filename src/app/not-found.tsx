import Link from 'next/link'
import { Home, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <main className="min-h-screen bg-zinc-950 flex items-center justify-center px-6">
      {/* Background effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
      </div>

      <div className="text-center">
        <h1 className="text-8xl md:text-9xl font-bold bg-linear-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent mb-4">
          404
        </h1>
        <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">
          Page Not Found
        </h2>
        <p className="text-lg text-zinc-400 mb-8 max-w-md mx-auto">
          Looks like you&apos;ve ventured into uncharted territory. Let&apos;s get you back on track.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button size="lg" asChild>
            <Link href="/">
              <Home className="w-5 h-5 mr-2" />
              Back to Home
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/#projects">
              <ArrowLeft className="w-5 h-5 mr-2" />
              View Projects
            </Link>
          </Button>
        </div>
      </div>
    </main>
  )
}
