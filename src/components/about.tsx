'use client'

import { motion } from 'framer-motion'
import { MapPin, Calendar, Code2, Server } from 'lucide-react'

const aboutItems = [
  { id: 'location', icon: MapPin, label: 'Toronto, Ontario' },
  { id: 'since', icon: Calendar, label: 'Since 2016' },
  { id: 'opensource', icon: Code2, label: 'Open Source First' },
  { id: 'infra', icon: Server, label: 'Infrastructure Focus' },
]

export function About() {
  return (
    <section id="about" className="py-32 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8">
              <span className="bg-linear-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                About Lusk Technologies
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-zinc-400 leading-relaxed mb-6">
              Based in Toronto, Ontario, we specialize in building robust infrastructure 
              solutions and developer tools. Our focus is on containerization, automation, 
              and creating tools that make developers&apos; lives easier.
            </p>
            <p className="text-lg text-zinc-400 leading-relaxed mb-10">
              From Docker images for enterprise software to TUI applications for 
              container management, every project is crafted with attention to detail 
              and a commitment to open source principles.
            </p>

            <div className="grid grid-cols-2 gap-6">
              {aboutItems.map((item) => (
                <div key={item.id} className="flex items-center gap-4 text-lg text-zinc-400">
                  <item.icon className="w-6 h-6 text-violet-400" />
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-square rounded-3xl bg-linear-to-br from-violet-500/20 via-cyan-500/20 to-emerald-500/20 p-1">
              <div className="w-full h-full rounded-3xl bg-zinc-900 flex items-center justify-center overflow-hidden">
                <div className="text-center p-12">
                  <div className="text-9xl mb-6">🚀</div>
                  <p className="text-xl text-zinc-400 italic">
                    &quot;I used to be an adventurer like you...&quot;
                  </p>
                  <p className="text-lg text-zinc-500 mt-3">— Cody</p>
                </div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-violet-500/20 rounded-full blur-2xl" />
            <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-cyan-500/20 rounded-full blur-2xl" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
