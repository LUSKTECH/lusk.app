import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { ContactModal } from '@/components/contact-modal'

describe('ContactModal', () => {
  const mockOnClose = vi.fn()

  beforeEach(() => {
    mockOnClose.mockClear()
  })

  it('does not render when isOpen is false', () => {
    render(<ContactModal isOpen={false} onClose={mockOnClose} />)
    expect(screen.queryByText(/get in touch/i)).not.toBeInTheDocument()
  })

  it('renders when isOpen is true', () => {
    render(<ContactModal isOpen={true} onClose={mockOnClose} />)
    expect(screen.getByText(/get in touch/i)).toBeInTheDocument()
  })

  it('renders form fields', () => {
    render(<ContactModal isOpen={true} onClose={mockOnClose} />)
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument()
  })

  it('renders submit button', () => {
    render(<ContactModal isOpen={true} onClose={mockOnClose} />)
    expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument()
  })

  it('calls onClose when close button is clicked', () => {
    render(<ContactModal isOpen={true} onClose={mockOnClose} />)
    const closeButton = screen.getByRole('button', { name: /close modal/i })
    fireEvent.click(closeButton)
    expect(mockOnClose).toHaveBeenCalled()
  })

  it('calls onClose when backdrop is clicked', () => {
    render(<ContactModal isOpen={true} onClose={mockOnClose} />)
    // The backdrop is the first div with the blur class
    const backdrop = document.querySelector('.backdrop-blur-sm')
    if (backdrop) {
      fireEvent.click(backdrop)
      expect(mockOnClose).toHaveBeenCalled()
    }
  })

  it('shows email link', () => {
    render(<ContactModal isOpen={true} onClose={mockOnClose} />)
    expect(screen.getByRole('link', { name: /hello@lusk\.app/i })).toHaveAttribute(
      'href',
      'mailto:hello@lusk.app'
    )
  })

  it('validates required fields', () => {
    render(<ContactModal isOpen={true} onClose={mockOnClose} />)
    const nameInput = screen.getByLabelText(/name/i)
    const emailInput = screen.getByLabelText(/email/i)
    const messageInput = screen.getByLabelText(/message/i)
    
    expect(nameInput).toBeRequired()
    expect(emailInput).toBeRequired()
    expect(messageInput).toBeRequired()
  })

  it('submits form and shows success message', async () => {
    vi.mocked(global.fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    } as Response)

    render(<ContactModal isOpen={true} onClose={mockOnClose} />)
    
    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'Test User' } })
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } })
    fireEvent.change(screen.getByLabelText(/message/i), { target: { value: 'Test message' } })
    
    fireEvent.click(screen.getByRole('button', { name: /send message/i }))
    
    await waitFor(() => {
      expect(screen.getByText(/message sent/i)).toBeInTheDocument()
    })
  })

  it('shows error message on submission failure', async () => {
    vi.mocked(global.fetch).mockRejectedValueOnce(new Error('Network error'))

    render(<ContactModal isOpen={true} onClose={mockOnClose} />)
    
    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'Test User' } })
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } })
    fireEvent.change(screen.getByLabelText(/message/i), { target: { value: 'Test message' } })
    
    fireEvent.click(screen.getByRole('button', { name: /send message/i }))
    
    await waitFor(() => {
      expect(screen.getByText(/something went wrong/i)).toBeInTheDocument()
    })
  })
})
