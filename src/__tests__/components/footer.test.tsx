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
    const githubLink = links.find(link => link.getAttribute('href')?.includes('github.com'))
    const linkedinLink = links.find(link => link.getAttribute('href')?.includes('linkedin.com'))
    const emailLink = links.find(link => link.getAttribute('href')?.includes('mailto:'))
    
    expect(githubLink).toBeInTheDocument()
    expect(linkedinLink).toHaveAttribute('href', 'https://www.linkedin.com/company/lusktechnologies/')
    expect(emailLink).toHaveAttribute('href', 'mailto:hello@lusk.app')
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
