import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'

const NAV_LINKS = ['Flights', 'Hotels', 'Packages', 'Holidays', 'Visas', 'More']

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [location])

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: scrolled ? 'rgba(10,22,40,0.98)' : 'rgba(10,22,40,0.92)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid var(--border)',
        padding: '0 1.5rem',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        height: 60,
        transition: 'background 0.3s',
      }}
    >
      {/* Logo */}
      <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontSize: '1.5rem' }}>✈</span>
        <div>
          <div style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '1.1rem', color: 'var(--gold)', fontWeight: 600, lineHeight: 1.1,
          }}>FlightsTravel</div>
          <div style={{ fontSize: '0.65rem', color: 'var(--muted)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Elite</div>
        </div>
      </Link>

      {/* Desktop links */}
      <ul style={{
        display: 'flex', gap: '1.25rem', listStyle: 'none',
        '@media(max-width:768px)': { display: 'none' },
      }} className="nav-links-desktop">
        {NAV_LINKS.map(link => (
          <li key={link}>
            <Link
              to={link === 'Flights' ? '/flights' : '/'}
              style={{
                color: 'var(--muted)', fontSize: '0.85rem', textDecoration: 'none',
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => e.target.style.color = 'var(--gold)'}
              onMouseLeave={e => e.target.style.color = 'var(--muted)'}
            >
              {link}
            </Link>
          </li>
        ))}
      </ul>

      {/* Right side */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', gap: 1 }}>
          <div style={{ color: 'var(--gold)', fontSize: '0.7rem', letterSpacing: '0.05em' }}>
            ★★★★★
          </div>
          <div style={{ fontSize: '0.62rem', color: 'var(--muted)' }}>4.9/5 · 2,341 reviews</div>
        </div>
        <button style={{
          background: 'transparent', border: '1px solid var(--border)',
          color: 'var(--text)', padding: '6px 14px', borderRadius: 8,
          cursor: 'pointer', fontSize: '0.82rem', fontFamily: "'DM Sans', sans-serif",
          transition: 'all 0.2s',
        }}
          onMouseEnter={e => { e.target.style.borderColor = 'var(--gold)'; e.target.style.color = 'var(--gold)' }}
          onMouseLeave={e => { e.target.style.borderColor = 'var(--border)'; e.target.style.color = 'var(--text)' }}
        >
          Sign In
        </button>
      </div>
    </motion.nav>
  )
}
