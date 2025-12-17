import { useTranslation } from 'react-i18next'
import SelfHostedReadme from '../components/SelfHostedReadme'
import type { GitConfig } from '../lib/gitClient'

export default function Portfolio() {
  const { t } = useTranslation()
  const sampleConfig: GitConfig = {
    baseUrl: 'https://git.your-domain.com',
    apiPath: '/api/v1/repos',
    owner: 'username',
    repo: 'project-name',
    file: 'README.md',
    branch: 'main',
  }
  return (
    <main id="main" className="app" role="main" aria-labelledby="portfolio-title">
      <section className="card">
        <h1 id="portfolio-title">{t('portfolio.title')}</h1>
        <p>{t('portfolio.intro')}</p>

        <section aria-labelledby="about-title">
          <h2 id="about-title">{t('portfolio.aboutTitle')}</h2>
          <p>{t('portfolio.aboutBody')}</p>
        </section>

        <section aria-labelledby="projects-title">
          <h2 id="projects-title">{t('portfolio.projectsTitle')}</h2>
          <ul>
            <li>{t('portfolio.proj1')}</li>
            <li>{t('portfolio.proj2')}</li>
          </ul>
        </section>

        <section aria-labelledby="contact-title">
          <h2 id="contact-title">{t('portfolio.contactTitle')}</h2>
          <p>
            {t('portfolio.contactBody')} <a className="button" href="https://github.com/hyukiody" target="_blank" rel="noopener noreferrer">{t('portfolio.github')}</a>.
          </p>
        </section>

        <section aria-labelledby="git-title" style={{ marginTop: '1rem' }}>
          <SelfHostedReadme config={sampleConfig} />
        </section>
      </section>
    </main>
  )
}
