'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { SiGithub } from '@icons-pack/react-simple-icons'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ContactModal } from '@/components/contact-modal'
import { cn } from '@/lib/utils'

const navLinks = [
  { label: 'Projects', href: '#projects' },
  { label: 'About', href: '#about' },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isContactOpen, setIsContactOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          isScrolled ? 'bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-800/50' : ''
        )}
      >
        <nav className="mx-auto max-w-7xl px-8 py-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-14 h-14 rounded-xl bg-linear-to-br from-violet-500 to-cyan-500 flex items-center justify-center transition-transform group-hover:scale-105">
                <span className="text-white font-bold text-2xl">L</span>
              </div>
              <span className="font-semibold text-white text-2xl hidden sm:block">lusk.app</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-12">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-lg text-zinc-400 hover:text-white transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* CTA */}
            <div className="hidden md:flex items-center gap-6">
              <Button variant="ghost" size="lg" asChild>
                <a href="https://github.com/lusky3" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                  <SiGithub className="w-6 h-6" aria-hidden="true" />
                </a>
              </Button>
              <Button 
                size="lg" 
                className="text-lg px-8 py-6"
                onClick={() => setIsContactOpen(true)}
              >
                Get in Touch
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-3 text-zinc-400 hover:text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="md:hidden mt-6 pb-6 border-t border-zinc-800 pt-6"
            >
              <div className="flex flex-col gap-6">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="text-xl text-zinc-400 hover:text-white transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                ))}
                <Button 
                  size="lg" 
                  className="w-full text-lg py-6"
                  onClick={() => {
                    setIsMobileMenuOpen(false)
                    setIsContactOpen(true)
                  }}
                >
                  Get in Touch
                </Button>
              </div>
            </motion.div>
          )}
        </nav>
      </motion.header>

      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </>
  )
}
