'use client'

import { motion } from 'framer-motion'
import { Star, ExternalLink } from 'lucide-react'
import { SiGithub } from '@icons-pack/react-simple-icons'
import { Button } from '@/components/ui/button'

interface Project {
  name: string
  description: string
  stars: number
  language: string
  url: string
  topics: string[]
}

const featuredProjects: Project[] = [
  {
    name: 'Key-Manager-Plus',
    description: 'Docker Image for ManageEngine\'s Key Manager Plus. Simplify SSH key and SSL certificate management with containerized deployment.',
    stars: 7,
    language: 'Dockerfile',
    url: 'https://github.com/lusky3/Key-Manager-Plus',
    topics: ['docker', 'ssh-key-manager', 'ssl-certificate-manager'],
  },
  {
    name: 'privoxy-docker',
    description: 'Docker images for Privoxy, a non-caching web proxy with advanced filtering capabilities for enhanced privacy.',
    stars: 2,
    language: 'Dockerfile',
    url: 'https://github.com/lusky3/privoxy-docker',
    topics: ['docker', 'privacy', 'proxy'],
  },
  {
    name: 'lxc-tui',
    description: 'A terminal user interface for managing LXC containers on Proxmox. Streamline your container operations.',
    stars: 0,
    language: 'Python',
    url: 'https://github.com/lusky3/lxc-tui',
    topics: ['lxc', 'proxmox', 'python', 'tui'],
  },
  {
    name: 'my-dash',
    description: 'A developer-friendly dashboard for monitoring self-hosted services with a clean and modern UI.',
    stars: 1,
    language: 'Shell',
    url: 'https://github.com/lusky3/my-dash',
    topics: ['dashboard', 'self-hosted', 'monitoring'],
  },
  {
    name: 'overseerr-requests',
    description: 'A native mobile client for Overseerr. Request movies and TV shows on the go.',
    stars: 0,
    language: 'Kotlin',
    url: 'https://github.com/lusky3/overseerr-requests',
    topics: ['overseerr', 'android', 'mobile'],
  },
  {
    name: 'onesignal-proxy',
    description: 'Proxy OneSignal resources through a custom domain using Cloudflare Workers for enhanced control.',
    stars: 0,
    language: 'JavaScript',
    url: 'https://github.com/lusky3/onesignal-proxy',
    topics: ['cloudflare-workers', 'onesignal', 'proxy'],
  },
]

const languageColors: Record<string, string> = {
  Dockerfile: 'bg-blue-500',
  Python: 'bg-yellow-500',
  Shell: 'bg-green-500',
  Kotlin: 'bg-purple-500',
  JavaScript: 'bg-yellow-400',
  TypeScript: 'bg-blue-400',
  PHP: 'bg-indigo-500',
}

export function Projects() {
  return (
    <section id="projects" className="py-32 px-6">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
            <span className="bg-linear-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
              Featured Projects
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-zinc-400 max-w-3xl mx-auto">
            A curated selection of open source projects focused on Docker, infrastructure, 
            and developer tooling.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block h-full"
              >
                <div className="h-full p-8 rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-violet-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-violet-500/10">
                  <div className="flex items-start justify-between mb-5">
                    <div className="flex items-center gap-3">
                      <SiGithub className="w-6 h-6 text-zinc-400" />
                      <h3 className="text-xl font-semibold text-white group-hover:text-violet-400 transition-colors">
                        {project.name}
                      </h3>
                    </div>
                    <ExternalLink className="w-5 h-5 text-zinc-500 group-hover:text-violet-400 transition-colors" />
                  </div>
                  
                  <p className="text-base text-zinc-400 mb-5 line-clamp-3 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-5">
                    {project.topics.slice(0, 3).map((topic) => (
                      <span
                        key={topic}
                        className="px-3 py-1.5 text-sm rounded-full bg-zinc-800 text-zinc-400"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-5 text-base text-zinc-500">
                    <div className="flex items-center gap-2">
                      <span className={`w-3.5 h-3.5 rounded-full ${languageColors[project.language] || 'bg-zinc-500'}`} />
                      <span>{project.language}</span>
                    </div>
                    {project.stars > 0 && (
                      <div className="flex items-center gap-1.5">
                        <Star className="w-5 h-5" />
                        <span>{project.stars}</span>
                      </div>
                    )}
                  </div>
                </div>
              </a>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <Button variant="outline" size="lg" className="text-lg px-8 py-6 h-auto" asChild>
            <a href="https://github.com/lusky3?tab=repositories" target="_blank" rel="noopener noreferrer">
              View All Repositories
              <ExternalLink className="ml-2 w-5 h-5" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
