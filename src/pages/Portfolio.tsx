export default function Portfolio() {
  return (
    <main id="main" className="app" role="main" aria-labelledby="portfolio-title">
      <section className="card">
        <h1 id="portfolio-title">Portfolio</h1>
        <p>Orange-themed, accessible portfolio landing page.</p>

        <section aria-labelledby="about-title">
          <h2 id="about-title">About</h2>
          <p>
            Hi, I build modern frontend apps. This site is powered by React + Vite
            and deployed via GitHub Pages.
          </p>
        </section>

        <section aria-labelledby="projects-title">
          <h2 id="projects-title">Projects</h2>
          <ul>
            <li><strong>Orange App:</strong> Vite + React starter with a11y.</li>
            <li><strong>Service API:</strong> Frontend integration and docs.</li>
          </ul>
        </section>

        <section aria-labelledby="contact-title">
          <h2 id="contact-title">Contact</h2>
          <p>
            Reach me on <a className="button" href="https://github.com/hyukiody" target="_blank" rel="noopener noreferrer">GitHub</a>.
          </p>
        </section>
      </section>
    </main>
  )
}
