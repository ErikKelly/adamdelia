import { useEffect, useState } from 'react'
import { site } from '../content'

const links = [
  { href: '#services', label: 'Services' },
  { href: '#about', label: 'About' },
  { href: '#schedule', label: 'Schedule' },
  { href: '#areas', label: 'Areas' },
  { href: '#contact', label: 'Contact' },
]

export function Header() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <>
      <header className="header">
        <div className="container header__inner">
          <a href="#top" className="logo">
            {site.name}
          </a>
          <button
            className="menu-toggle"
            aria-expanded={open}
            aria-controls="nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((o) => !o)}
          >
            <span />
            <span />
            <span />
          </button>
          <nav id="nav" className={`nav ${open ? 'nav--open' : ''}`}>
            {links.map((l) => (
              <a key={l.href} href={l.href} onClick={close}>
                {l.label}
              </a>
            ))}
            <a href="#contact" className="btn btn--small" onClick={close}>
              Book a session
            </a>
          </nav>
        </div>
      </header>
      {/* Outside the header: its backdrop-filter would trap a fixed child */}
      <div className={`menu-backdrop ${open ? 'menu-backdrop--open' : ''}`} onClick={close} />
    </>
  )
}
