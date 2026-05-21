import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import SearchBox from '../components/SearchBox'
import { DESTINATIONS } from '../api/flights'
import { useBookingStore } from '../store/bookingStore'

const TESTIMONIALS = [
  { text: 'Genuinely the best booking experience. Found the cheapest Tokyo flight in minutes. Will never use another site.', author: 'Sarah J.', loc: 'Manchester, UK', stars: 5 },
  { text: 'Booked Paris for my anniversary. Seamless from search to boarding pass. The seat picker is brilliant.', author: 'Mike R.', loc: 'London, UK', stars: 5 },
  { text: 'Best price guarantee actually works — got refunded the difference automatically when prices dropped. Incredible.', author: 'Priya K.', loc: 'Birmingham, UK', stars: 5 },
]

const CERTS = ['IATA Certified', 'ABTA Member', 'ATOL Protected', 'Trustpilot Excellent ★★★★★']

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay },
})

export default function HomePage() {
  const navigate = useNavigate()
  const setSearchParams = useBookingStore(s => s.setSearchParams)

  const handleDestClick = (dest) => {
    setSearchParams({ to: `${dest.name} (${dest.code})`, toCode: dest.code })
    navigate('/flights')
  }

  return (
    <div>
      {/* ── HERO ─────────────────────────────────────────────────── */}
      <div style={{
        position: 'relative', minHeight: '92vh',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden',
      }}>
        {/* Background layers */}
        <div style={{
          position: 'absolute', inset: 0,
         backgroundImage: 'url("https://images.unsplash.com/photo-1568607689150-17e625c1586e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse at 65% 35%, rgba(240,165,0,0.07) 0%, transparent 60%)',
        }} />
        {/* Stars texture */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.18) 1px, transparent 1px)',
          backgroundSize: '44px 44px', opacity: 0.35,
        }} />
        {/* Plane decoration */}
        <div style={{
          position: 'absolute', top: '14%', right: '12%',
          fontSize: '4rem', opacity: 0.08, transform: 'rotate(-25deg)',
          pointerEvents: 'none',
        }}>
          ✈
        </div>
        <div style={{
          position: 'absolute', bottom: '20%', left: '8%',
          fontSize: '2rem', opacity: 0.06, transform: 'rotate(15deg)',
          pointerEvents: 'none',
        }}>
          ✈
        </div>

        {/* Content */}
        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '2rem 1rem', width: '100%', maxWidth: 920 }}>
          <motion.div {...fadeUp(0.1)}>
            <div style={{
              display: 'inline-block', background: 'rgba(240,165,0,0.1)',
              border: '1px solid rgba(240,165,0,0.25)', borderRadius: 20,
              padding: '5px 16px', fontSize: '0.75rem', color: 'var(--gold)',
              marginBottom: '1.25rem', letterSpacing: '0.08em', textTransform: 'uppercase',
            }}>
              ✈ Trusted by 2.3M+ travellers
            </div>
          </motion.div>

          <motion.h1
            {...fadeUp(0.2)}
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(2.4rem, 6vw, 4.5rem)',
              fontWeight: 700, lineHeight: 1.1, marginBottom: '1rem',
            }}
          >
            Journeys that{' '}
            <em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>stay with you</em>
          </motion.h1>

          <motion.p {...fadeUp(0.3)} style={{ color: 'var(--muted)', fontSize: '1rem', marginBottom: '2.5rem', maxWidth: 460, margin: '0 auto 2.5rem' }}>
            Discover the world with comfort, luxury and unforgettable experiences.
          </motion.p>

          <SearchBox />
        </div>
      </div>

      {/* ── DESTINATIONS ─────────────────────────────────────────── */}
      <div style={{ padding: '4rem 2rem', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '2rem' }}>
          <motion.h2
            initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.4 }}
            style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.8rem' }}
          >
            Where will your next adventure take you?
          </motion.h2>
          <button
            onClick={() => navigate('/flights')}
            style={{ background: 'none', border: 'none', color: 'var(--gold)', fontSize: '0.85rem', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}
          >
            View all →
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(190px, 1fr))', gap: '1rem' }}>
          {DESTINATIONS.map((dest, i) => (
            <motion.div
              key={dest.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              whileHover={{ y: -5 }}
              onClick={() => handleDestClick(dest)}
              style={{
                background: 'var(--card)', border: '1px solid var(--border)',
                borderRadius: 12, overflow: 'hidden', cursor: 'pointer',
                transition: 'border-color 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(240,165,0,0.5)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
            >
              <div style={{
                height: 130, display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundImage: `url(${dest.img})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  position: 'relative',
               // fontSize: '3.8rem', position: 'relative', overflow: 'hidden',
              }}>
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 60%)',
                }} />
                <span style={{ filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.4))' }}>{dest.emoji}</span>
              </div>
              <div style={{ padding: '0.75rem 1rem' }}>
                <div style={{ fontWeight: 600, marginBottom: 2 }}>{dest.name}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>
                  From{' '}
                  <span style={{ color: 'var(--gold)', fontWeight: 600 }}>{dest.currency}{dest.price}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── TESTIMONIALS ─────────────────────────────────────────── */}
      <div style={{ padding: '0 2rem 4rem', maxWidth: 1200, margin: '0 auto' }}>
        <motion.h2
          initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.8rem', marginBottom: '2rem' }}
        >
          Why travellers choose us
        </motion.h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              style={{
                background: 'var(--card)', border: '1px solid var(--border)',
                borderRadius: 12, padding: '1.25rem',
              }}
            >
              <div style={{ color: 'var(--gold)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                {'★'.repeat(t.stars)}
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--muted)', marginBottom: '1rem', lineHeight: 1.7 }}>
                "{t.text}"
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{
                  width: 36, height: 36, borderRadius: '50%',
                  background: 'var(--navy3)', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', fontWeight: 600, fontSize: '0.78rem', color: 'var(--gold)',
                }}>
                  {t.author.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 500 }}>{t.author}</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--muted)' }}>{t.loc}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust certs */}
        <div style={{
          display: 'flex', justifyContent: 'center', gap: '2.5rem', flexWrap: 'wrap',
          padding: '2rem', background: 'var(--card)',
          borderRadius: 12, border: '1px solid var(--border)',
        }}>
          {CERTS.map(c => (
            <div key={c} style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'var(--muted)', fontSize: '0.82rem' }}>
              <div style={{
                width: 38, height: 38, background: 'rgba(240,165,0,0.08)',
                border: '1px solid rgba(240,165,0,0.2)', borderRadius: 8,
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem',
              }}>🏅</div>
              {c}
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer style={{
        background: 'var(--card)', borderTop: '1px solid var(--border)',
        padding: '2rem', textAlign: 'center', color: 'var(--muted)', fontSize: '0.8rem',
      }}>
        © 2026 FlightsTravel Elite · Book with confidence · All rights reserved
      </footer>
    </div>
  )
}
