import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Hero } from '@/components/hero'

describe('Hero', () => {
  it('renders the main heading', () => {
    render(<Hero />)
    expect(screen.getByText(/building the/i)).toBeInTheDocument()
    expect(screen.getByText(/future of tech/i)).toBeInTheDocument()
  })

  it('renders the subtitle', () => {
    render(<Hero />)
    expect(screen.getByText(/crafting innovative solutions/i)).toBeInTheDocument()
  })

  it('renders the Open Source Projects badge', () => {
    render(<Hero />)
    expect(screen.getByText(/open source projects/i)).toBeInTheDocument()
  })

  it('renders CTA buttons', () => {
    render(<Hero />)
    expect(screen.getByRole('link', { name: /explore projects/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /view github/i })).toBeInTheDocument()
  })

  it('renders stats section', () => {
    render(<Hero />)
    expect(screen.getByText('50+')).toBeInTheDocument()
    expect(screen.getByText(/repositories/i)).toBeInTheDocument()
    expect(screen.getByText('7+')).toBeInTheDocument()
    expect(screen.getByText(/years active/i)).toBeInTheDocument()
  })

  it('links to correct destinations', () => {
    render(<Hero />)
    const projectsLink = screen.getByRole('link', { name: /explore projects/i })
    const githubLink = screen.getByRole('link', { name: /view github/i })
    
    expect(projectsLink).toHaveAttribute('href', '#projects')
    expect(githubLink).toHaveAttribute('href', 'https://github.com/lusky3')
  })
})
