export interface GitConfig {
  baseUrl: string
  apiPath: string
  owner: string
  repo: string
  file: string
  branch?: string
  token?: string
}

export function buildRawUrl(cfg: GitConfig): string {
  const base = `${cfg.baseUrl}${cfg.apiPath}/${cfg.owner}/${cfg.repo}/raw/${cfg.file}`
  const ref = cfg.branch ? `?ref=${encodeURIComponent(cfg.branch)}` : ''
  return `${base}${ref}`
}

export async function getGitReadme(cfg: GitConfig, fetchFn: typeof fetch = fetch): Promise<string> {
  const url = buildRawUrl(cfg)
  const headers: Record<string, string> = { Accept: 'text/plain' }
  if (cfg.token) headers['Authorization'] = `token ${cfg.token}`

  const res = await fetchFn(url, { method: 'GET', headers })
  if (!res.ok) throw new Error(`Git API Error: ${res.status} ${res.statusText}`)
  return res.text()
}
