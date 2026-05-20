import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useBookingStore } from '../store/bookingStore'

function LegDisplay({ leg, code }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: 1 }}>
      <div style={{ textAlign: 'center', minWidth: 55 }}>
        <div style={{ fontSize: '1.25rem', fontWeight: 700, letterSpacing: '-0.02em' }}>{leg.dep}</div>
        <div style={{ fontSize: '0.7rem', color: 'var(--muted)' }}>{leg.depCode}</div>
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
        <div style={{ fontSize: '0.72rem', color: 'var(--muted)' }}>{leg.duration}</div>
        <div style={{ width: '100%', height: 1, background: 'var(--border)', position: 'relative' }}>
          <div style={{
            position: 'absolute', top: -3, left: '50%', transform: 'translateX(-50%)',
            width: 7, height: 7, borderRadius: '50%', background: 'var(--muted)',
          }} />
        </div>
        <div style={{ fontSize: '0.68rem', color: 'var(--muted)' }}>{leg.stopInfo}</div>
      </div>
      <div style={{ textAlign: 'center', minWidth: 55 }}>
        <div style={{ fontSize: '1.25rem', fontWeight: 700, letterSpacing: '-0.02em' }}>{leg.arr}</div>
        <div style={{ fontSize: '0.7rem', color: 'var(--muted)' }}>{leg.arrCode}</div>
      </div>
    </div>
  )
}

export default function FlightCard({ flight, index = 0 }) {
  const navigate = useNavigate()
  const setSelectedFlight = useBookingStore(s => s.setSelectedFlight)
  const [expanded, setExpanded] = useState(false)

  const handleSelect = () => {
    setSelectedFlight(flight)
    navigate('/booking')
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.07 }}
      style={{
        background: 'var(--card)',
        border: `1px solid ${flight.isBestValue ? 'var(--green)' : 'var(--border)'}`,
        borderRadius: 12, overflow: 'hidden',
        transition: 'border-color 0.2s, transform 0.2s, box-shadow 0.2s',
        position: 'relative',
      }}
      whileHover={{ y: -2, boxShadow: '0 8px 32px rgba(0,0,0,0.3)' }}
    >
      {flight.isBestValue && (
        <div style={{
          position: 'absolute', top: 0, left: 0,
          background: 'var(--green)', color: '#fff',
          fontSize: '0.62rem', fontWeight: 700,
          padding: '3px 10px', borderRadius: '0 0 8px 0',
          textTransform: 'uppercase', letterSpacing: '0.08em',
        }}>
          Best Value
        </div>
      )}

      {/* Outbound row */}
      <div style={{
        padding: '1rem 1.25rem',
        display: 'grid',
        gridTemplateColumns: '76px 1fr auto',
        gap: '1rem',
        alignItems: 'center',
        paddingTop: flight.isBestValue ? '1.5rem' : '1rem',
      }}>
        {/* Airline */}
        <div style={{
          background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)',
          borderRadius: 8, padding: '6px 8px', textAlign: 'center',
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          justifyContent: 'center', gap: 3, minHeight: 48,
        }}>
          <div style={{ fontSize: '1.1rem' }}>{flight.logo}</div>
          <div style={{ fontSize: '0.6rem', fontWeight: 700, color: 'var(--muted)', letterSpacing: '0.06em' }}>
            {flight.airlineCode}
          </div>
        </div>

        <LegDisplay leg={flight.outbound} />

        {/* Price + CTA */}
        <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
          <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--gold)', letterSpacing: '-0.02em' }}>
            {flight.currency}{flight.price}
          </div>
          <div style={{ fontSize: '0.68rem', color: 'var(--muted)' }}>per traveller</div>
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={handleSelect}
            style={{
              background: 'var(--gold)', color: '#000', border: 'none',
              padding: '7px 18px', borderRadius: 8, fontWeight: 700,
              fontSize: '0.83rem', cursor: 'pointer',
              fontFamily: "'DM Sans', sans-serif", marginTop: 2,
            }}
          >
            Select
          </motion.button>
          {flight.seatsLeft <= 5 && (
            <div style={{ fontSize: '0.65rem', color: 'var(--red)' }}>
              Only {flight.seatsLeft} seats left!
            </div>
          )}
        </div>
      </div>

      {/* Return row */}
      <div style={{
        borderTop: '1px dashed var(--border)',
        padding: '0.6rem 1.25rem',
        display: 'grid',
        gridTemplateColumns: '76px 1fr auto',
        gap: '1rem',
        alignItems: 'center',
      }}>
        <div style={{ fontSize: '0.62rem', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          Return
        </div>
        <LegDisplay leg={flight.inbound} />
        <div />
      </div>

      {/* Amenities + expand */}
      <div style={{
        padding: '0.5rem 1.25rem 0.75rem',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <div style={{ display: 'flex', gap: 6 }}>
          {flight.amenities?.map(a => (
            <span key={a} style={{
              background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)',
              borderRadius: 4, padding: '2px 7px', fontSize: '0.65rem', color: 'var(--muted)',
            }}>
              {a === 'wifi' ? '📶 WiFi' : a === 'meals' ? '🍽 Meals' : a === 'entertainment' ? '🎬 IFE' : a === 'lounge' ? '🛋 Lounge' : a}
            </span>
          ))}
        </div>
        <button
          onClick={() => setExpanded(!expanded)}
          style={{
            background: 'none', border: 'none', color: 'var(--accent)',
            fontSize: '0.72rem', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif",
          }}
        >
          {expanded ? 'Hide details ▲' : 'View details ▼'}
        </button>
      </div>

      {/* Expanded details */}
      {expanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          style={{
            borderTop: '1px solid var(--border)',
            padding: '0.75rem 1.25rem',
            display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem',
            fontSize: '0.8rem', color: 'var(--muted)',
          }}
        >
          <div>✈ Airline: <span style={{ color: 'var(--text)' }}>{flight.airline}</span></div>
          <div>💺 Class: <span style={{ color: 'var(--text)' }}>{flight.cabin}</span></div>
          <div>📅 Departs: <span style={{ color: 'var(--text)' }}>{flight.outbound.depDate}</span></div>
          <div>📅 Returns: <span style={{ color: 'var(--text)' }}>{flight.inbound.depDate}</span></div>
        </motion.div>
      )}
    </motion.div>
  )
}
