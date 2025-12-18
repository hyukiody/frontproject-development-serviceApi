import { describe, it, expect, vi } from 'vitest'
import { buildRawUrl, getGitReadme, type GitConfig } from './gitClient'

const baseCfg: GitConfig = {
  baseUrl: 'https://git.example.com',
  apiPath: '/api/v1/repos',
  owner: 'me',
  repo: 'demo',
  file: 'README.md',
}

describe('gitClient', () => {
  it('buildRawUrl without branch', () => {
    expect(buildRawUrl(baseCfg)).toBe('https://git.example.com/api/v1/repos/me/demo/raw/README.md')
  })

  it('buildRawUrl with branch adds ref', () => {
    const url = buildRawUrl({ ...baseCfg, branch: 'feature/x' })
    expect(url).toContain('raw/README.md?ref=feature%2Fx')
  })

  it('getGitReadme returns text on success', async () => {
    const mockFetch = vi.fn().mockResolvedValue({ ok: true, text: () => Promise.resolve('# Hello') })
    const text = await getGitReadme(baseCfg, mockFetch as any)
    expect(text).toBe('# Hello')
    expect(mockFetch).toHaveBeenCalledTimes(1)
  })

  it('getGitReadme throws on non-ok', async () => {
    const mockFetch = vi.fn().mockResolvedValue({ ok: false, status: 404, statusText: 'Not Found' })
    await expect(getGitReadme(baseCfg, mockFetch as any)).rejects.toThrow('Git API Error: 404 Not Found')
  })
})
