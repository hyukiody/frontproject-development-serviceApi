import { useState } from 'react'
import type { GitConfig } from '../lib/gitClient'
import { getGitReadme } from '../lib/gitClient'

type Props = {
  config: GitConfig
  autoLoad?: boolean
  fetchFn?: typeof fetch
}

export default function SelfHostedReadme({ config, autoLoad = false, fetchFn }: Props) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'loaded' | 'error'>('idle')
  const [error, setError] = useState<string | null>(null)
  const [text, setText] = useState<string>('')

  async function load() {
    setStatus('loading')
    setError(null)
    try {
      const content = await getGitReadme(config, fetchFn)
      setText(content)
      setStatus('loaded')
    } catch (e: any) {
      setError(e?.message ?? 'Unknown error')
      setStatus('error')
    }
  }

  if (autoLoad && status === 'idle') {
    // fire-and-forget, React will ignore state update warnings since guarded by condition
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    load()
  }

  return (
    <section aria-labelledby="self-hosted-readme-title">
      <h2 id="self-hosted-readme-title">Self-Hosted Git README</h2>
      <p>Click to fetch README from your self-hosted Git instance.</p>
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem' }}>
        <button 
          className="button" 
          onClick={load} 
          disabled={status === 'loading'}
          style={{ 
            cursor: status === 'loading' ? 'not-allowed' : 'pointer',
            opacity: status === 'loading' ? 0.6 : 1,
            transition: 'opacity 0.2s ease'
          }}
        >
          {status === 'loading' ? 'Loading…' : 'Load README'}
        </button>
      </div>
      <div aria-live="polite" aria-busy={status === 'loading'}>
        {status === 'error' && (
          <div className="card" role="alert">
            Failed to load: {error}
          </div>
        )}
        {status === 'loaded' && (
          <pre style={{ whiteSpace: 'pre-wrap', background: '#18181a', color: '#fff', padding: '12px', borderRadius: 8 }}>
            {text}
          </pre>
        )}
      </div>
    </section>
  )
}
