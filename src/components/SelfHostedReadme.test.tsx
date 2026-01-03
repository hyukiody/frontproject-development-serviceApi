import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import SelfHostedReadme from './SelfHostedReadme'

const cfg = {
  baseUrl: 'https://git.example.com',
  apiPath: '/api/v1/repos',
  owner: 'me',
  repo: 'demo',
  file: 'README.md',
}

describe('SelfHostedReadme', () => {
  it('loads and renders readme text on click', async () => {
    const mockFetch = async () => ({ ok: true, text: async () => '# Title' } as any)
    render(<SelfHostedReadme config={cfg as any} fetchFn={mockFetch as any} />)
    fireEvent.click(screen.getByRole('button', { name: /load readme/i }))
    await waitFor(() => expect(screen.getByText('# Title')).toBeInTheDocument())
  })

  it('shows error on failure', async () => {
    const mockFetch = async () => ({ ok: false, status: 500, statusText: 'Server Error' } as any)
    render(<SelfHostedReadme config={cfg as any} fetchFn={mockFetch as any} />)
    fireEvent.click(screen.getByRole('button', { name: /load readme/i }))
    await waitFor(() => expect(screen.getByRole('alert')).toHaveTextContent('Failed to load'))
  })
})
