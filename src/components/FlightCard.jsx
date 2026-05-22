import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useBookingStore } from '../store/bookingStore'

// Helper mapping to translate airport strings into clean circular CDN country flags
const getFlagUrl = (airportCode) => {
  const code = (airportCode || '').toUpperCase().trim()
  let countryCode = 'gb' // Default fallback to UK flag
  
  if (code === 'JFK' || code === 'LAX' || code === 'MIA') countryCode = 'us'
  if (code === 'DXB') countryCode = 'ae'
  if (code === 'DOH') countryCode = 'qa'
  if (code === 'NRT' || code === 'HND') countryCode = 'jp'
  if (code === 'CDG') countryCode = 'fr'
  if (code === 'IST') countryCode = 'tr'

  return `https://flagcdn.com/w40/${countryCode}.png`
}

function LegDisplay({ leg }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: 1, textAlign: 'left' }}>
      {/* Departure Side + Flag */}
      <div style={{ textAlign: 'center', minWidth: 65 }}>
        <div style={{ fontSize: '1.25rem', fontWeight: 700, letterSpacing: '-0.02em', color: '#1C2321' }}>{leg.dep}</div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4, mt: 1 }}>
          <img 
            src={getFlagUrl(leg.depCode)} 
            alt="Origin Country" 
            style={{ width: 14, height: 10, borderRadius: 2, objectFit: 'cover', border: '1px solid #E2E2DC' }} 
          />
          <span style={{ fontSize: '0.7rem', color: '#7A7A72', fontWeight: 600 }}>{leg.depCode}</span>
        </div>
      </div>

      {/* Connection Indicator Line */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
        <div style={{ fontSize: '0.72rem', color: '#7A7A72', fontWeight: 500 }}>{leg.duration}</div>
        <div style={{ width: '100%', height: 1, background: '#E2E2DC', position: 'relative' }}>
          <div style={{
            position: 'absolute', top: -3, left: '50%', transform: 'translateX(-50%)',
            width: 7, height: 7, borderRadius: '50%', background: '#7A7A72',
          }} />
        </div>
        <div style={{ fontSize: '0.68rem', color: '#7A7A72' }}>{leg.stopInfo}</div>
      </div>

      {/* Arrival Side + Flag */}
      <div style={{ textAlign: 'center', minWidth: 65 }}>
        <div style={{ fontSize: '1.25rem', fontWeight: 700, letterSpacing: '-0.02em', color: '#1C2321' }}>{leg.arr}</div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4, mt: 1 }}>
          <img 
            src={getFlagUrl(leg.arrCode)} 
            alt="Destination Country" 
            style={{ width: 14, height: 10, borderRadius: 2, objectFit: 'cover', border: '1px solid #E2E2DC' }} 
          />
          <span style={{ fontSize: '0.7rem', color: '#7A7A72', fontWeight: 600 }}>{leg.arrCode}</span>
        </div>
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
        background: '#ffffff',
        border: `1px solid ${flight.isBestValue ? '#16a34a' : '#E2E2DC'}`,
        borderRadius: 12, overflow: 'hidden',
        transition: 'border-color 0.2s, transform 0.2s, box-shadow 0.2s',
        position: 'relative',
      }}
      whileHover={{ y: -2, boxShadow: '0 8px 24px rgba(28,35,33,0.04)' }}
    >
      {flight.isBestValue && (
        <div style={{
          position: 'absolute', top: 0, left: 0,
          background: '#16a34a', color: '#fff',
          fontSize: '0.62rem', fontWeight: 700,
          padding: '4px 10px', borderRadius: '0 0 8px 0',
          textTransform: 'uppercase', letterSpacing: '0.08em',
          zIndex: 1
        }}>
          Best Value
        </div>
      )}

      {/* Outbound Row */}
      <div style={{
        padding: '1rem 1.25rem',
        display: 'grid',
        gridTemplateColumns: '76px 1fr auto',
        gap: '1rem',
        alignItems: 'center',
        paddingTop: flight.isBestValue ? '1.75rem' : '1rem',
      }}>
        {/* Airline Logo */}
        <div style={{
          background: '#FAF9F6', border: '1px solid #E2E2DC',
          borderRadius: 8, padding: '6px 8px', textAlign: 'center',
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          justifyContent: 'center', gap: 3, minHeight: 48,
        }}>
          <div style={{ fontSize: '1.1rem' }}>{flight.logo}</div>
          <div style={{ fontSize: '0.6rem', fontWeight: 700, color: '#7A7A72', letterSpacing: '0.06em' }}>
            {flight.airlineCode}
          </div>
        </div>

        <LegDisplay leg={flight.outbound} />

        {/* Pricing Actions Block */}
        <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 2 }}>
          <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1C2321', letterSpacing: '-0.02em' }}>
            {flight.currency}{flight.price}
          </div>
          <div style={{ fontSize: '0.68rem', color: '#7A7A72', marginBottom: 2 }}>per traveller</div>
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={handleSelect}
            style={{
              background: '#1C2321', color: '#FAF9F6', border: 'none',
              padding: '7px 20px', borderRadius: 8, fontWeight: 700,
              fontSize: '0.83rem', cursor: 'pointer',
              whiteSpace: 'nowrap',
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            Select
          </motion.button>
          {flight.seatsLeft <= 5 && (
            <div style={{ fontSize: '0.65rem', color: '#dc2626', fontWeight: 600, marginTop: 4 }}>
              Only {flight.seatsLeft} seats left!
            </div>
          )}
        </div>
      </div>

      {/* Return Row */}
      <div style={{
        borderTop: '1px dashed #E2E2DC',
        padding: '0.75rem 1.25rem',
        display: 'grid',
        gridTemplateColumns: '76px 1fr auto',
        gap: '1rem',
        alignItems: 'center',
      }}>
        <div style={{ fontSize: '0.62rem', color: '#7A7A72', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 700, textAlign: 'left' }}>
          Return
        </div>
        <LegDisplay leg={flight.inbound} />
        <div />
      </div>

      {/* Amenities Panel */}
      <div style={{
        padding: '0.5rem 1.25rem 0.75rem',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        borderTop: '1px solid #FAF9F6'
      }}>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {flight.amenities?.map(a => (
            <span key={a} style={{
              background: '#FAF9F6', border: '1px solid #E2E2DC',
              borderRadius: 4, padding: '2px 7px', fontSize: '0.65rem', color: '#555550', fontWeight: 500
            }}>
              {a === 'wifi' ? '📶 WiFi' : a === 'meals' ? '🍽 Meals' : a === 'entertainment' ? '🎬 IFE' : a === 'lounge' ? '🛋 Lounge' : a}
            </span>
          ))}
        </div>
        <button
          onClick={() => setExpanded(!expanded)}
          style={{
            background: 'none', border: 'none', color: '#1C2321',
            fontSize: '0.72rem', fontWeight: 600, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif",
            textDecoration: 'underline'
          }}
        >
          {expanded ? 'Hide details ▲' : 'View details ▼'}
        </button>
      </div>

      {/* Expanded Block */}
      {expanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          style={{
            borderTop: '1px solid #E2E2DC',
            padding: '0.75rem 1.25rem',
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '0.5rem',
            fontSize: '0.8rem', color: '#555550', textAlign: 'left', background: '#FAF9F6'
          }}
        >
          <div>✈ Airline: <span style={{ color: '#1C2321', fontWeight: 600 }}>{flight.airline}</span></div>
          <div>💺 Class: <span style={{ color: '#1C2321', fontWeight: 600 }}>{flight.cabin}</span></div>
          <div>📅 Departs: <span style={{ color: '#1C2321', fontWeight: 600 }}>{flight.outbound.depDate}</span></div>
          <div>📅 Returns: <span style={{ color: '#1C2321', fontWeight: 600 }}>{flight.inbound.depDate}</span></div>
        </motion.div>
      )}
    </motion.div>
  )
}