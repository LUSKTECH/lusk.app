import { NextRequest, NextResponse } from 'next/server'

// Rate limiting map (in production, use Redis or similar)
const rateLimitMap = new Map<string, { count: number; timestamp: number }>()
const RATE_LIMIT_WINDOW = 60 * 1000 // 1 minute
const MAX_REQUESTS = 3 // 3 requests per minute

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const record = rateLimitMap.get(ip)
  
  if (!record || now - record.timestamp > RATE_LIMIT_WINDOW) {
    rateLimitMap.set(ip, { count: 1, timestamp: now })
    return false
  }
  
  if (record.count >= MAX_REQUESTS) {
    return true
  }
  
  record.count++
  return false
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || 
               request.headers.get('x-real-ip') || 
               'unknown'
    
    // Check rate limit
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      )
    }

    const body = await request.json()
    const { name, email, message, honeypot, timestamp } = body

    // Bot protection: honeypot check
    if (honeypot) {
      // Silently accept but don't send
      return NextResponse.json({ success: true })
    }

    // Bot protection: timestamp check (form submitted too fast)
    if (timestamp && Date.now() - timestamp < 3000) {
      return NextResponse.json({ success: true })
    }

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate email format (simple, non-backtracking validation)
    const atIndex = email.indexOf('@')
    const lastDotIndex = email.lastIndexOf('.')
    if (
      atIndex < 1 ||
      lastDotIndex < atIndex + 2 ||
      lastDotIndex >= email.length - 1 ||
      email.includes(' ')
    ) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Sanitize inputs
    const sanitizedName = name.slice(0, 100).trim()
    const sanitizedEmail = email.slice(0, 254).trim()
    const sanitizedMessage = message.slice(0, 5000).trim()

    // Check if Resend API key is configured
    const resendApiKey = process.env.RESEND_API_KEY
    
    if (!resendApiKey) {
      // Log the contact submission if email not configured
      console.log('Contact form submission (email not configured):', {
        name: sanitizedName,
        email: sanitizedEmail,
        message: sanitizedMessage,
        timestamp: new Date().toISOString(),
      })
      
      // Still return success - you can set up email later
      return NextResponse.json({ success: true })
    }

    // Send email using Resend
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Lusk.app Contact <noreply@lusk.app>',
        to: ['hello@lusk.app'],
        reply_to: sanitizedEmail,
        subject: `Contact Form: ${sanitizedName}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${sanitizedName}</p>
          <p><strong>Email:</strong> ${sanitizedEmail}</p>
          <p><strong>Message:</strong></p>
          <p>${sanitizedMessage.replaceAll(/\n/g, '<br>')}</p>
          <hr>
          <p style="color: #666; font-size: 12px;">
            Sent from lusk.app contact form at ${new Date().toISOString()}
          </p>
        `,
        text: `
New Contact Form Submission

Name: ${sanitizedName}
Email: ${sanitizedEmail}

Message:
${sanitizedMessage}

---
Sent from lusk.app contact form at ${new Date().toISOString()}
        `,
      }),
    })

    if (!response.ok) {
      const error = await response.json()
      console.error('Resend API error:', error)
      throw new Error('Failed to send email')
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Failed to send message. Please try again.' },
      { status: 500 }
    )
  }
}
