import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useBookingStore } from '../store/bookingStore'

const TRIP_TYPES = ['One Way', 'Round Trip', 'Multi City']

export default function SearchBox({ compact = false }) {
  const navigate = useNavigate()
  const { searchParams, setSearchParams } = useBookingStore()
  
  // Tab control state to toggle between Flights and Hotels search options
  const [searchMode, setSearchMode] = useState('flights') // 'flights' | 'hotels'
  const [tripType, setTripType] = useState(searchParams.tripType || 'Round Trip')
  const [hotelParams, setHotelParams] = useState({ destination: '', checkIn: '', checkOut: '', guests: '2 Guests' })

  const handleSwap = () => {
    setSearchParams({
      from: searchParams.to,
      fromCode: searchParams.toCode,
      to: searchParams.from,
      toCode: searchParams.fromCode,
    })
  }

  const handleSearch = () => {
    if (searchMode === 'flights') {
      setSearchParams({ tripType })
      navigate('/flights')
    } else {
      // Hotel routing fallback
      navigate('/')
    }
  }

  // Premium light theme input styling configuration
  const inputStyle = {
    background: '#FAF9F6',
    border: '1px solid #E2E2DC',
    borderRadius: 10,
    padding: '11px 14px',
    color: '#1C2321',
    fontSize: '0.95rem',
    fontFamily: "'DM Sans', sans-serif",
    outline: 'none',
    width: '100%',
    transition: 'border-color 0.2s',
  }

  const labelStyle = {
    fontSize: '0.68rem',
    color: '#7A7A72',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.35 }}
      style={{
        background: '#ffffff',
        backdropFilter: 'blur(20px)',
        border: '1px solid #E2E2DC',
        borderRadius: 20,
        padding: '1.75rem 2rem',
        width: '100%',
        maxWidth: 860,
        margin: '0 auto',
        boxShadow: '0 24px 60px rgba(28,35,33,0.06)',
      }}
    >
      {/* ── CORE SWITCH OPTIONS (FLIGHTS vs HOTELS) ──────────── */}
      {!compact && (
        <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1.25rem', borderBottom: '1px solid #FAF9F6', paddingBottom: '0.5rem' }}>
          <button
            onClick={() => setSearchMode('flights')}
            style={{
              background: 'none', border: 'none', paddingBottom: '0.5rem', cursor: 'pointer',
              fontFamily: "'DM Sans', sans-serif", fontSize: '0.9rem', fontWeight: 700,
              color: searchMode === 'flights' ? '#1C2321' : '#7A7A72',
              borderBottom: searchMode === 'flights' ? '2px solid #1C2321' : '2px solid transparent'
            }}
          >
            ✈ Flights
          </button>
          <button
            onClick={() => setSearchMode('hotels')}
            style={{
              background: 'none', border: 'none', paddingBottom: '0.5rem', cursor: 'pointer',
              fontFamily: "'DM Sans', sans-serif", fontSize: '0.9rem', fontWeight: 700,
              color: searchMode === 'hotels' ? '#1C2321' : '#7A7A72',
              borderBottom: searchMode === 'hotels' ? '2px solid #1C2321' : '2px solid transparent'
            }}
          >
            🏨 Hotels
          </button>
        </div>
      )}

      {/* Trip type sub-tabs (Only visible for Flight mode) */}
      {searchMode === 'flights' && !compact && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          marginBottom: '1.5rem',
          borderRadius: 10,
          overflow: 'hidden',
          border: '1px solid #E2E2DC',
        }}>
          {TRIP_TYPES.map(t => (
            <button
              key={t}
              onClick={() => setTripType(t)}
              style={{
                padding: '10px 0',
                border: 'none',
                background: tripType === t ? '#1C2321' : 'transparent',
                color: tripType === t ? '#FAF9F6' : '#7A7A72',
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

      {/* ── SEARCH FIELDS CONTAINER INTERCHANGEABLE FLOWS ────── */}
      {searchMode === 'flights' ? (
        /* FLIGHT SEARCH OPTION PANEL */
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
              value={searchParams.from || ''}
              onChange={e => setSearchParams({ from: e.target.value })}
              placeholder="City or airport"
              style={inputStyle}
              onFocus={e => e.target.style.borderColor = '#1C2321'}
              onBlur={e => e.target.style.borderColor = '#E2E2DC'}
            />
          </div>

          {/* Swap */}
          <button
            onClick={handleSwap}
            aria-label="Swap origin and destination"
            style={{
              width: 40, height: 40, borderRadius: '50%',
              background: 'transparent',
              border: '1px solid #1C2321',
              color: '#1C2321', fontSize: '1rem',
              cursor: 'pointer', display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              alignSelf: 'flex-end', flexShrink: 0,
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#1C2321'; e.currentTarget.style.color = '#FAF9F6' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#1C2321' }}
          >
            ⇄
          </button>

          {/* TO */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <label style={labelStyle}>To</label>
            <input
              value={searchParams.to || ''}
              onChange={e => setSearchParams({ to: e.target.value })}
              placeholder="City or airport"
              style={inputStyle}
              onFocus={e => e.target.style.borderColor = '#1C2321'}
              onBlur={e => e.target.style.borderColor = '#E2E2DC'}
            />
          </div>

          {/* DEPARTURE */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <label style={labelStyle}>Departure</label>
            <input
              type="date"
              value={searchParams.departure || ''}
              onChange={e => setSearchParams({ departure: e.target.value })}
              style={inputStyle}
              onFocus={e => e.target.style.borderColor = '#1C2321'}
              onBlur={e => e.target.style.borderColor = '#E2E2DC'}
            />
          </div>

          {/* RETURN */}
          {tripType !== 'One Way' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <label style={labelStyle}>Return</label>
              <input
                type="date"
                value={searchParams.returnDate || ''}
                onChange={e => setSearchParams({ returnDate: e.target.value })}
                style={inputStyle}
                onFocus={e => e.target.style.borderColor = '#1C2321'}
                onBlur={e => e.target.style.borderColor = '#E2E2DC'}
              />
            </div>
          )}

          {/* SEARCH ACTIONS BUTTON */}
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={handleSearch}
            style={{
              background: '#1C2321', color: '#FAF9F6',
              border: 'none', borderRadius: 12,
              padding: '12px 24px', fontWeight: 700,
              fontSize: '0.95rem', cursor: 'pointer',
              whiteSpace: 'nowrap',
              fontFamily: "'DM Sans', sans-serif",
              alignSelf: 'flex-end',
              display: 'flex', alignItems: 'center', gap: 6,
              boxShadow: '0 4px 16px rgba(28,35,33,0.15)',
            }}
          >
            🔍 Search
          </motion.button>
        </div>
      ) : (
        /* HOTEL SEARCH OPTION PANEL */
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.5fr 1fr 1fr 1fr auto',
          gap: '0.75rem',
          alignItems: 'end',
        }}>
          {/* DESTINATION */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <label style={labelStyle}>Going To</label>
            <input
              value={hotelParams.destination}
              onChange={e => setHotelParams({ ...hotelParams, destination: e.target.value })}
              placeholder="Destination or hotel name"
              style={inputStyle}
              onFocus={e => e.target.style.borderColor = '#1C2321'}
              onBlur={e => e.target.style.borderColor = '#E2E2DC'}
            />
          </div>

          {/* CHECK IN */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <label style={labelStyle}>Check-In</label>
            <input
              type="date"
              value={hotelParams.checkIn}
              onChange={e => setHotelParams({ ...hotelParams, checkIn: e.target.value })}
              style={inputStyle}
              onFocus={e => e.target.style.borderColor = '#1C2321'}
              onBlur={e => e.target.style.borderColor = '#E2E2DC'}
            />
          </div>

          {/* CHECK OUT */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <label style={labelStyle}>Check-Out</label>
            <input
              type="date"
              value={hotelParams.checkOut}
              onChange={e => setHotelParams({ ...hotelParams, checkOut: e.target.value })}
              style={inputStyle}
              onFocus={e => e.target.style.borderColor = '#1C2321'}
              onBlur={e => e.target.style.borderColor = '#E2E2DC'}
            />
          </div>

          {/* GUESTS */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <label style={labelStyle}>Guests</label>
            <input
              value={hotelParams.guests}
              onChange={e => setHotelParams({ ...hotelParams, guests: e.target.value })}
              style={inputStyle}
              onFocus={e => e.target.style.borderColor = '#1C2321'}
              onBlur={e => e.target.style.borderColor = '#E2E2DC'}
            />
          </div>

          {/* HOTEL SEARCH TRIGGER */}
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={handleSearch}
            style={{
              background: '#1C2321', color: '#FAF9F6',
              border: 'none', borderRadius: 12,
              padding: '12px 24px', fontWeight: 700,
              fontSize: '0.95rem', cursor: 'pointer',
              whiteSpace: 'nowrap',
              fontFamily: "'DM Sans', sans-serif",
              alignSelf: 'flex-end',
              display: 'flex', alignItems: 'center', gap: 6,
              boxShadow: '0 4px 16px rgba(28,35,33,0.15)',
            }}
          >
            🔍 Search
          </motion.button>
        </div>
      )}

      {/* Trust badges */}
      {!compact && (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '1.75rem',
          paddingTop: '1.25rem',
          marginTop: '1.25rem',
          borderTop: '1px solid #E2E2DC',
          flexWrap: 'wrap',
        }}>
          {['Best Price Guarantee', '24/7 Support', 'Flexible Booking', 'Secure Payments'].map(t => (
            <div key={t} style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              fontSize: '0.78rem',
              color: '#7A7A72',
            }}>
              <span style={{ color: 'emerald', fontWeight: 700 }}>✓</span>
              {t}
            </div>
          ))}
        </div>
      )}
    </motion.div>
  )
}