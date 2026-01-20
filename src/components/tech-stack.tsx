'use client'

import { motion } from 'framer-motion'

const technologies = [
  { name: 'Docker', icon: '🐳' },
  { name: 'Kubernetes', icon: '☸️' },
  { name: 'Python', icon: '🐍' },
  { name: 'TypeScript', icon: '📘' },
  { name: 'Proxmox', icon: '🖥️' },
  { name: 'Cloudflare', icon: '☁️' },
  { name: 'Linux', icon: '🐧' },
  { name: 'Terraform', icon: '🏗️' },
]

export function TechStack() {
  return (
    <section className="py-24 px-6 border-y border-zinc-800/50">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-base text-zinc-500 uppercase tracking-wider mb-3">Technologies</p>
          <h3 className="text-3xl md:text-4xl font-semibold text-zinc-300">Built With Modern Tools</h3>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-6 md:gap-8">
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.1, y: -5 }}
              className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-zinc-900/30 border border-zinc-800/50 hover:border-zinc-700 transition-colors cursor-default"
            >
              <span className="text-5xl">{tech.icon}</span>
              <span className="text-base text-zinc-400">{tech.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
