'use client'

import { Mail, Heart, Linkedin } from 'lucide-react'
import { SiGithub } from '@icons-pack/react-simple-icons'

const socialLinks = [
  { icon: SiGithub, href: 'https://github.com/lusky3', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/company/lusktechnologies/', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:hello@lusk.app', label: 'Email' },
]

const footerLinks = [
  { label: 'Projects', href: '#projects' },
  { label: 'About', href: '#about' },
  { label: 'GitHub', href: 'https://github.com/lusky3' },
  { label: 'Privacy', href: '/privacy' },
  { label: 'lusk.tech', href: 'https://www.lusk.tech' },
]

export function Footer() {
  return (
    <footer className="border-t border-zinc-800/50 py-20 px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Logo & Copyright */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-linear-to-br from-violet-500 to-cyan-500 flex items-center justify-center">
                <span className="text-white font-bold text-xl">L</span>
              </div>
              <span className="font-semibold text-white text-xl">Lusk Technologies</span>
            </div>
            <p className="text-lg text-zinc-500">
              © {new Date().getFullYear()} Lusk Technologies, Inc. All rights reserved.
            </p>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap justify-center gap-10">
            {footerLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-lg text-zinc-400 hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Social Links */}
          <div className="flex items-center gap-6">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all"
                aria-label={social.label}
              >
                <social.icon className="w-7 h-7" />
              </a>
            ))}
          </div>
        </div>

        {/* Made with love */}
        <div className="mt-12 pt-12 border-t border-zinc-800/50 text-center">
          <p className="text-lg text-zinc-500 flex items-center justify-center gap-2">
            Made with <Heart className="w-6 h-6 text-red-500 fill-red-500" /> in Toronto
          </p>
        </div>
      </div>
    </footer>
  )
}
