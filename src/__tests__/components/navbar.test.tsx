import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Navbar } from '@/components/navbar'

// Mock the ContactModal
vi.mock('@/components/contact-modal', () => ({
  ContactModal: ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => 
    isOpen ? <div data-testid="contact-modal"><button onClick={onClose}>Close</button></div> : null
}))

describe('Navbar', () => {
  it('renders the logo', () => {
    render(<Navbar />)
    expect(screen.getByText('L')).toBeInTheDocument()
    expect(screen.getByText('lusk.app')).toBeInTheDocument()
  })

  it('renders navigation links', () => {
    render(<Navbar />)
    expect(screen.getByRole('link', { name: /projects/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /about/i })).toBeInTheDocument()
  })

  it('renders GitHub link', () => {
    render(<Navbar />)
    const githubLinks = screen.getAllByRole('link', { name: '' })
    const githubLink = githubLinks.find(link => link.getAttribute('href')?.includes('github.com'))
    expect(githubLink).toHaveAttribute('href', 'https://github.com/lusky3')
  })

  it('renders Get in Touch button', () => {
    render(<Navbar />)
    expect(screen.getByRole('button', { name: /get in touch/i })).toBeInTheDocument()
  })

  it('opens contact modal when Get in Touch is clicked', () => {
    render(<Navbar />)
    const button = screen.getByRole('button', { name: /get in touch/i })
    fireEvent.click(button)
    expect(screen.getByTestId('contact-modal')).toBeInTheDocument()
  })

  it('renders mobile menu button', () => {
    render(<Navbar />)
    expect(screen.getByRole('button', { name: /toggle menu/i })).toBeInTheDocument()
  })

  it('toggles mobile menu when button is clicked', () => {
    render(<Navbar />)
    const menuButton = screen.getByRole('button', { name: /toggle menu/i })
    
    // Open menu
    fireEvent.click(menuButton)
    // Mobile menu should show navigation links
    const projectLinks = screen.getAllByText(/projects/i)
    expect(projectLinks.length).toBeGreaterThan(1)
  })
})
