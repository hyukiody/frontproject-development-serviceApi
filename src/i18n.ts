import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const resources = {
  en: {
    translation: {
      nav: { home: 'Home', docs: 'Vite Docs', en: 'EN', ja: 'JA' },
      portfolio: {
        title: 'Portfolio',
        intro: 'Orange-themed, accessible portfolio landing page.',
        aboutTitle: 'About',
        aboutBody: 'Hi, I build modern frontend apps. This site is powered by React + Vite and deployed via GitHub Pages.',
        projectsTitle: 'Projects',
        proj1: 'Orange App: Vite + React starter with a11y.',
        proj2: 'Service API: Frontend integration and docs.',
        contactTitle: 'Contact',
        contactBody: 'Reach me on',
        github: 'GitHub',
      },
    },
  },
  ja: {
    translation: {
      nav: { home: 'ホーム', docs: 'Viteドキュメント', en: '英', ja: '日' },
      portfolio: {
        title: 'ポートフォリオ',
        intro: 'オレンジテーマのアクセシブルなポートフォリオページ。',
        aboutTitle: '概要',
        aboutBody: 'モダンなフロントエンドアプリを作っています。このサイトはReact + Viteで構築し、GitHub Pagesにデプロイしています。',
        projectsTitle: 'プロジェクト',
        proj1: 'Orange App：Vite + Reactのa11yスターター。',
        proj2: 'Service API：フロントエンド統合とドキュメント。',
        contactTitle: '問い合わせ',
        contactBody: 'こちらから連絡してください',
        github: 'GitHub',
      },
    },
  },
}

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
})

export default i18n
