import { useEffect, useState } from 'react'
import { LanguageSwitcher } from './LanguageSwitcher'

/** Ссылка команды. Меняйте вместе с team-109 в ../index.html */
export const REGISTER_URL = 'https://ventorme.ai/register?utm_source=hacknext&utm_campaign=team-109'

const THEME_KEY = 'ventorme-theme'
type Theme = 'light' | 'dark'

function currentTheme(): Theme {
  const attr = document.documentElement.getAttribute('data-theme')
  if (attr === 'light' || attr === 'dark') return attr
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(() => currentTheme())
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])
  const next: Theme = theme === 'dark' ? 'light' : 'dark'
  return (
    <button
      type="button"
      className="vt-theme"
      aria-label={next === 'dark' ? 'Тёмная тема' : 'Светлая тема'}
      title={next === 'dark' ? 'Тёмная тема' : 'Светлая тема'}
      onClick={() => {
        setTheme(next)
        try {
          localStorage.setItem(THEME_KEY, next)
        } catch {
          /* ignore */
        }
      }}
    >
      {theme === 'dark' ? (
        <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4.5" fill="currentColor" /><g stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></g></svg>
      ) : (
        <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M20.5 14.6A8.5 8.5 0 0 1 9.4 3.5a8.5 8.5 0 1 0 11.1 11.1z" /></svg>
      )}
    </button>
  )
}

/** Шапка Ventorme: логотип (на главную лендинга), раздел, язык, тема, регистрация. */
export function VtBrand({ onHome }: { onHome?: () => void }) {
  return (
    <>
      <a className="brand" href="../" aria-label="Ventorme — на главную">
        <span className="vt-logo">V</span>
        Ventorme
      </a>
      <button type="button" className="vt-section" onClick={onHome}>
        Подбор вузов
      </button>
      <LanguageSwitcher />
      <ThemeToggle />
      <a className="vt-cta" href={REGISTER_URL}>
        Регистрация
      </a>
    </>
  )
}
