import '@testing-library/jest-dom/vitest'
import { vi } from 'vitest'
import React from 'react'

// Mock Next.js router
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
    back: vi.fn(),
  }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
}))

// Mock Next.js Link
vi.mock('next/link', () => ({
  default: function MockLink({ children, href }: { children: React.ReactNode; href: string }) {
    return React.createElement('a', { href }, children)
  },
}))

// Mock Next.js Script
vi.mock('next/script', () => ({
  default: () => null,
}))

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: function MockDiv({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
      return React.createElement('div', props, children)
    },
    header: function MockHeader({ children, ...props }: React.HTMLAttributes<HTMLElement>) {
      return React.createElement('header', props, children)
    },
    section: function MockSection({ children, ...props }: React.HTMLAttributes<HTMLElement>) {
      return React.createElement('section', props, children)
    },
    span: function MockSpan({ children, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
      return React.createElement('span', props, children)
    },
    p: function MockP({ children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
      return React.createElement('p', props, children)
    },
  },
  AnimatePresence: function MockAnimatePresence({ children }: { children: React.ReactNode }) {
    return React.createElement(React.Fragment, null, children)
  },
}))

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
}
Object.defineProperty(window, 'localStorage', { value: localStorageMock })

// Mock fetch
global.fetch = vi.fn()

// Reset mocks between tests
beforeEach(() => {
  vi.clearAllMocks()
  localStorageMock.getItem.mockReturnValue(null)
})
