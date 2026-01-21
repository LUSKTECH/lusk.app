'use client'

import { motion } from 'framer-motion'
import { ExternalLink, ChevronRight } from 'lucide-react'
import { SiGithub } from '@icons-pack/react-simple-icons'
import { Button } from '@/components/ui/button'
import { AnimatedGroup } from '@/components/animated-group'

const transitionVariants = {
  item: {
    hidden: {
      opacity: 0,
      filter: 'blur(12px)',
      y: 12,
    },
    visible: {
      opacity: 1,
      filter: 'blur(0px)',
      y: 0,
      transition: {
        type: 'spring' as const,
        bounce: 0.3,
        duration: 1.5,
      },
    },
  },
}

const stats = [
  { id: 'repos', value: '50+', label: 'Repositories' },
  { id: 'years', value: '7+', label: 'Years Active' },
  { id: 'stars', value: '10+', label: 'Stars' },
  { id: 'passion', value: '∞', label: 'Passion' },
]

export function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-linear-to-br from-violet-500/10 via-transparent to-cyan-500/10" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-violet-500/5 to-transparent rounded-full" />
      </div>

      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 -z-10 opacity-30"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />

      <div className="mx-auto max-w-7xl px-6 pt-40 pb-24">
        <AnimatedGroup
          variants={{
            container: {
              visible: {
                transition: {
                  staggerChildren: 0.08,
                  delayChildren: 0.3,
                },
              },
            },
            ...transitionVariants,
          }}
          className="flex flex-col items-center text-center"
        >
          {/* Badge */}
          <output className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-10">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
            <span className="text-base text-zinc-300">Open Source Projects</span>
            <ChevronRight className="w-5 h-5 text-zinc-400" aria-hidden="true" />
          </output>

          {/* Main heading */}
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight mb-8">
            <span className="bg-linear-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
              Building the
            </span>
            <br />
            <span className="bg-linear-to-r from-violet-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              Future of Tech
            </span>
          </h1>

          {/* Subtitle */}
          <p className="max-w-3xl text-xl md:text-2xl text-zinc-400 mb-12 leading-relaxed">
            Crafting innovative solutions through open source. Docker containers, 
            developer tools, and infrastructure automation — all built with passion.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-5">
            <Button size="lg" className="group text-lg px-8 py-6 h-auto" asChild>
              <a href="#projects">
                Explore Projects
                <ExternalLink className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </a>
            </Button>
            <Button size="lg" variant="outline" className="group text-lg px-8 py-6 h-auto" asChild>
              <a href="https://github.com/lusky3" target="_blank" rel="noopener noreferrer">
                <SiGithub className="mr-2 w-6 h-6" aria-hidden="true" />
                View GitHub
              </a>
            </Button>
          </div>
        </AnimatedGroup>

        {/* Stats */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-28 grid grid-cols-2 md:grid-cols-4 gap-12"
        >
          {stats.map((stat) => (
            <div key={stat.id} className="text-center">
              <div className="text-4xl md:text-5xl lg:text-6xl font-bold bg-linear-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                {stat.value}
              </div>
              <div className="text-base md:text-lg text-zinc-400 mt-2">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        role="presentation"
        aria-hidden="true"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-6 h-10 rounded-full border-2 border-zinc-600 flex items-start justify-center p-2"
        >
          <div className="w-1 h-2 rounded-full bg-zinc-400" />
        </motion.div>
      </motion.div>
    </section>
  )
}
