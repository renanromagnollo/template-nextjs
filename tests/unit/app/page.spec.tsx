import React from 'react'
import { expect, it, describe } from 'vitest'
import { render, screen } from '@testing-library/react'

import Home from '@/app/page'

describe('Home', () => {
  it('should render Home component correctly', () => {
    render(<Home />)

    expect(screen.getByRole('main')).toBeDefined()
    expect(screen.getByRole('contentinfo')).toBeDefined()

    expect(screen.getByRole('link', { name: /Deploy now/i })).toBeDefined()
    expect(screen.getByRole('link', { name: /Read our docs/i })).toBeDefined()
    expect(screen.getByRole('link', { name: /Learn/i })).toBeDefined()
    expect(screen.getByRole('link', { name: /Examples/i })).toBeDefined()
    expect(screen.getByRole('link', { name: /Go to nextjs.org/i })).toBeDefined()
  })
})
