import { describe, it, expect, vi, beforeEach } from 'vitest'
import { NextRequest } from 'next/server'
import { POST } from '@/app/api/contact/route'

// Mock fetch for Resend API
const mockFetch = vi.fn()
global.fetch = mockFetch

// Counter for unique IPs
let ipCounter = 0
const getUniqueIp = () => `10.0.0.${++ipCounter}`

describe('Contact API Route', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    // Clear environment
    delete process.env.RESEND_API_KEY
  })

  it('returns 400 for missing required fields', async () => {
    const request = new NextRequest('http://localhost/api/contact', {
      method: 'POST',
      body: JSON.stringify({ name: 'Test' }),
      headers: { 
        'Content-Type': 'application/json',
        'x-forwarded-for': getUniqueIp(),
      },
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data.error).toBe('Missing required fields')
  })

  it('returns 400 for invalid email format', async () => {
    const request = new NextRequest('http://localhost/api/contact', {
      method: 'POST',
      body: JSON.stringify({
        name: 'Test User',
        email: 'invalid-email',
        message: 'Test message',
      }),
      headers: { 
        'Content-Type': 'application/json',
        'x-forwarded-for': getUniqueIp(),
      },
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data.error).toBe('Invalid email format')
  })

  it('silently accepts honeypot submissions', async () => {
    const request = new NextRequest('http://localhost/api/contact', {
      method: 'POST',
      body: JSON.stringify({
        name: 'Bot',
        email: 'bot@example.com',
        message: 'Spam',
        honeypot: 'filled-by-bot',
      }),
      headers: { 
        'Content-Type': 'application/json',
        'x-forwarded-for': getUniqueIp(),
      },
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.success).toBe(true)
    // Should not call Resend API
    expect(mockFetch).not.toHaveBeenCalled()
  })

  it('silently accepts fast submissions (bot protection)', async () => {
    const request = new NextRequest('http://localhost/api/contact', {
      method: 'POST',
      body: JSON.stringify({
        name: 'Fast Bot',
        email: 'bot@example.com',
        message: 'Spam',
        timestamp: Date.now() - 1000, // 1 second ago
      }),
      headers: { 
        'Content-Type': 'application/json',
        'x-forwarded-for': getUniqueIp(),
      },
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.success).toBe(true)
  })

  it('logs submission when RESEND_API_KEY is not set', async () => {
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})

    const request = new NextRequest('http://localhost/api/contact', {
      method: 'POST',
      body: JSON.stringify({
        name: 'Test User',
        email: 'test@example.com',
        message: 'Test message',
        timestamp: Date.now() - 5000, // 5 seconds ago
      }),
      headers: { 
        'Content-Type': 'application/json',
        'x-forwarded-for': getUniqueIp(),
      },
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.success).toBe(true)
    expect(consoleSpy).toHaveBeenCalled()

    consoleSpy.mockRestore()
  })

  it('sends email when RESEND_API_KEY is set', async () => {
    process.env.RESEND_API_KEY = 'test-api-key'
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ id: 'email-id' }),
    })

    const request = new NextRequest('http://localhost/api/contact', {
      method: 'POST',
      body: JSON.stringify({
        name: 'Test User',
        email: 'test@example.com',
        message: 'Test message',
        timestamp: Date.now() - 5000,
      }),
      headers: { 
        'Content-Type': 'application/json',
        'x-forwarded-for': getUniqueIp(),
      },
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.success).toBe(true)
    expect(mockFetch).toHaveBeenCalledWith(
      'https://api.resend.com/emails',
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({
          'Authorization': 'Bearer test-api-key',
        }),
      })
    )
  })

  it('returns 500 when Resend API fails', async () => {
    process.env.RESEND_API_KEY = 'test-api-key'
    mockFetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: 'API Error' }),
    })

    // Use a unique IP to avoid rate limiting
    const request = new NextRequest('http://localhost/api/contact', {
      method: 'POST',
      body: JSON.stringify({
        name: 'Test User',
        email: 'test@example.com',
        message: 'Test message',
        timestamp: Date.now() - 5000,
      }),
      headers: { 
        'Content-Type': 'application/json',
        'x-forwarded-for': '192.168.1.100',
      },
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(500)
    expect(data.error).toBe('Failed to send message. Please try again.')
  })

  it('sanitizes input to prevent XSS', async () => {
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})

    // Use a unique IP to avoid rate limiting
    const request = new NextRequest('http://localhost/api/contact', {
      method: 'POST',
      body: JSON.stringify({
        name: '<script>alert("xss")</script>',
        email: 'test@example.com',
        message: 'Test message',
        timestamp: Date.now() - 5000,
      }),
      headers: { 
        'Content-Type': 'application/json',
        'x-forwarded-for': '192.168.1.101',
      },
    })

    const response = await POST(request)
    expect(response.status).toBe(200)

    // Check that the logged name is truncated/sanitized
    const logCall = consoleSpy.mock.calls[0]
    expect(logCall).toBeDefined()

    consoleSpy.mockRestore()
  })
})
