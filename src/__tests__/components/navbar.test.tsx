import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, act } from '@testing-library/react'
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
    const githubLink = screen.getByRole('link', { name: 'GitHub' })
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

  it('closes mobile menu when a link is clicked', () => {
    render(<Navbar />)
    const menuButton = screen.getByRole('button', { name: /toggle menu/i })
    
    // Open menu
    fireEvent.click(menuButton)
    
    // Click a mobile nav link
    const mobileLinks = screen.getAllByText(/projects/i)
    fireEvent.click(mobileLinks[mobileLinks.length - 1])
    
    // Menu should close - only desktop link should remain
    const projectLinksAfter = screen.getAllByText(/projects/i)
    expect(projectLinksAfter.length).toBe(1)
  })

  it('opens contact modal from mobile menu and closes menu', () => {
    render(<Navbar />)
    const menuButton = screen.getByRole('button', { name: /toggle menu/i })
    
    // Open menu
    fireEvent.click(menuButton)
    
    // Click mobile Get in Touch button
    const mobileButtons = screen.getAllByRole('button', { name: /get in touch/i })
    fireEvent.click(mobileButtons[mobileButtons.length - 1])
    
    // Modal should open
    expect(screen.getByTestId('contact-modal')).toBeInTheDocument()
  })

  it('applies scrolled styles when scrolled', () => {
    render(<Navbar />)
    
    // Simulate scroll
    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 100, writable: true })
      window.dispatchEvent(new Event('scroll'))
    })
    
    // Header should have scrolled class
    const header = screen.getByRole('banner')
    expect(header.className).toContain('backdrop-blur')
  })

  it('removes scroll listener on unmount', () => {
    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener')
    const { unmount } = render(<Navbar />)
    
    unmount()
    
    expect(removeEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function))
    removeEventListenerSpy.mockRestore()
  })
})
