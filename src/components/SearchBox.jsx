import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useBookingStore } from '../store/bookingStore'

const TRIP_TYPES = ['One Way', 'Round Trip', 'Multi City']

export default function SearchBox({ compact = false }) {
  const navigate = useNavigate()
  const { searchParams, setSearchParams } = useBookingStore()
  const [tripType, setTripType] = useState(searchParams.tripType || 'Round Trip')

  const handleSwap = () => {
    setSearchParams({
      from: searchParams.to,
      fromCode: searchParams.toCode,
      to: searchParams.from,
      toCode: searchParams.fromCode,
    })
  }

  const handleSearch = () => {
    // ✅ Save tripType into store before navigating
    setSearchParams({ tripType })
    navigate('/flights')
  }

  const inputStyle = {
    background: 'rgba(255,255,255,0.07)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: 10,
    padding: '11px 14px',
    color: '#fff',
    fontSize: '0.95rem',
    fontFamily: "'DM Sans', sans-serif",
    outline: 'none',
    width: '100%',
    transition: 'border-color 0.2s',
    colorScheme: 'dark',
  }

  const labelStyle = {
    fontSize: '0.68rem',
    color: 'rgba(255,255,255,0.4)',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.35 }}
      style={{
        background: 'rgba(13,25,50,0.92)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 20,
        padding: '1.75rem 2rem',
        width: '100%',
        maxWidth: 860,
        margin: '0 auto',
        boxShadow: '0 24px 60px rgba(0,0,0,0.35)',
      }}
    >
      {/* Trip type tabs */}
      {!compact && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          marginBottom: '1.5rem',
          borderRadius: 10,
          overflow: 'hidden',
          border: '1px solid rgba(255,255,255,0.07)',
        }}>
          {TRIP_TYPES.map(t => (
            <button
              key={t}
              onClick={() => setTripType(t)}
              style={{
                padding: '10px 0',
                border: 'none',
                background: tripType === t ? 'var(--gold)' : 'transparent',
                color: tripType === t ? '#000' : 'rgba(255,255,255,0.5)',
                fontWeight: tripType === t ? 700 : 400,
                fontSize: '0.9rem',
                cursor: 'pointer',
                fontFamily: "'DM Sans', sans-serif",
                transition: 'all 0.2s',
              }}
            >
              {t}
            </button>
          ))}
        </div>
      )}

      {/* Search fields */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: tripType === 'One Way'
          ? '1fr auto 1fr 1fr auto'
          : '1fr auto 1fr 1fr 1fr auto',
        gap: '0.75rem',
        alignItems: 'end',
      }}>
        {/* FROM */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <label style={labelStyle}>From</label>
          <input
            value={searchParams.from}
            onChange={e => setSearchParams({ from: e.target.value })}
            placeholder="City or airport"
            style={inputStyle}
            onFocus={e => e.target.style.borderColor = 'var(--gold)'}
            onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
          />
        </div>

        {/* Swap */}
        <button
          onClick={handleSwap}
          aria-label="Swap origin and destination"
          style={{
            width: 40, height: 40, borderRadius: '50%',
            background: 'transparent',
            border: '2px solid var(--gold)',
            color: 'var(--gold)', fontSize: '1rem',
            cursor: 'pointer', display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            alignSelf: 'flex-end', flexShrink: 0,
            transition: 'background 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(240,165,0,0.15)'}
          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
        >
          ⇄
        </button>

        {/* TO */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <label style={labelStyle}>To</label>
          <input
            value={searchParams.to}
            onChange={e => setSearchParams({ to: e.target.value })}
            placeholder="City or airport"
            style={inputStyle}
            onFocus={e => e.target.style.borderColor = 'var(--gold)'}
            onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
          />
        </div>

        {/* DEPARTURE — ✅ stored as YYYY-MM-DD, native date input */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <label style={labelStyle}>Departure</label>
          <input
            type="date"
            value={searchParams.departure}
            onChange={e => setSearchParams({ departure: e.target.value })}
            style={inputStyle}
            onFocus={e => e.target.style.borderColor = 'var(--gold)'}
            onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
          />
        </div>

        {/* RETURN — only shown for Round Trip */}
        {tripType !== 'One Way' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <label style={labelStyle}>Return</label>
            <input
              type="date"
              value={searchParams.returnDate}
              onChange={e => setSearchParams({ returnDate: e.target.value })}
              style={inputStyle}
              onFocus={e => e.target.style.borderColor = 'var(--gold)'}
              onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
            />
          </div>
        )}

        {/* SEARCH */}
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={handleSearch}
          style={{
            background: 'var(--gold)', color: '#000',
            border: 'none', borderRadius: 12,
            padding: '12px 24px', fontWeight: 700,
            fontSize: '0.95rem', cursor: 'pointer',
            whiteSpace: 'nowrap',
            fontFamily: "'DM Sans', sans-serif",
            alignSelf: 'flex-end',
            display: 'flex', alignItems: 'center', gap: 6,
            boxShadow: '0 4px 16px rgba(240,165,0,0.35)',
          }}
        >
          🔍 Search
        </motion.button>
      </div>

      {/* Trust badges */}
      {!compact && (
        <div style={{
          display: 'flex', justifyContent: 'center',
          gap: '1.75rem', paddingTop: '1.25rem', marginTop: '1.25rem',
          borderTop: '1px solid rgba(255,255,255,0.07)', flexWrap: 'wrap',
        }}>
          {['Best Price Guarantee','24/7 Support','Flexible Booking','Secure Payments'].map(t => (
            <div key={t} style={{
              display: 'flex', alignItems: 'center',
              gap: 6, fontSize: '0.78rem', color: 'rgba(255,255,255,0.55)',
            }}>
              <span style={{ color: 'var(--green)', fontWeight: 700 }}>✓</span>
              {t}
            </div>
          ))}
        </div>
      )}
    </motion.div>
  )
}