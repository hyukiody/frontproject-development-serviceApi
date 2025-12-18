import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Portfolio from './Portfolio'

describe('Portfolio page', () => {
  it('renders Portfolio heading', () => {
    render(<Portfolio />)
    expect(screen.getByRole('heading', { name: /portfolio/i })).toBeInTheDocument()
  })
})
