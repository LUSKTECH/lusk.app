import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Footer } from '@/components/footer'

describe('Footer', () => {
  it('renders the company name', () => {
    render(<Footer />)
    expect(screen.getByText('Lusk Technologies')).toBeInTheDocument()
  })

  it('renders copyright notice with current year', () => {
    render(<Footer />)
    const currentYear = new Date().getFullYear()
    expect(screen.getByText(new RegExp(`© ${currentYear}`))).toBeInTheDocument()
  })

  it('renders navigation links', () => {
    render(<Footer />)
    expect(screen.getByRole('link', { name: /projects/i })).toHaveAttribute('href', '#projects')
    expect(screen.getByRole('link', { name: /about/i })).toHaveAttribute('href', '#about')
    expect(screen.getByRole('link', { name: /privacy/i })).toHaveAttribute('href', '/privacy')
  })

  it('renders social links', () => {
    render(<Footer />)
    const links = screen.getAllByRole('link')
    const githubLink = links.find(link => link.getAttribute('href') === 'https://github.com/lusky3')
    const linkedinLink = links.find(link => link.getAttribute('href') === 'https://www.linkedin.com/company/lusktechnologies/')
    const emailLink = links.find(link => link.getAttribute('href') === 'mailto:hello@lusk.app')
    
    expect(githubLink).toBeInTheDocument()
    expect(linkedinLink).toBeInTheDocument()
    expect(emailLink).toBeInTheDocument()
  })

  it('renders Made with love in Toronto', () => {
    render(<Footer />)
    expect(screen.getByText(/made with/i)).toBeInTheDocument()
    expect(screen.getByText(/toronto/i)).toBeInTheDocument()
  })

  it('renders external links with proper attributes', () => {
    render(<Footer />)
    const externalLinks = screen.getAllByRole('link').filter(
      link => link.getAttribute('target') === '_blank'
    )
    
    externalLinks.forEach(link => {
      expect(link).toHaveAttribute('rel', 'noopener noreferrer')
    })
  })
})
