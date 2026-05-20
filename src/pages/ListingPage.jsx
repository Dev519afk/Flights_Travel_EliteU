import React, { useState } from 'react'
import { motion } from 'framer-motion'
import FlightCard from '../components/FlightCard'
import { useFlights } from '../hooks/useFlights'
import { useBookingStore } from '../store/bookingStore'
import { MOCK_FLIGHTS } from '../api/flights'

const AIRLINES = [
  { code: 'QR', name: 'Qatar Airways',   price: '£389' },
  { code: 'EK', name: 'Emirates',        price: '£419' },
  { code: 'TK', name: 'Turkish Airlines',price: '£459' },
  { code: 'BA', name: 'British Airways', price: '£489' },
  { code: 'AF', name: 'Air France',      price: '£499' },
]

// "2026-05-24" → "24 May 2026"
const formatDate = (str) => {
  if (!str) return ''
  const d = new Date(str)
  if (isNaN(d)) return str
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}

// Generate 5 date slots centered on the user's chosen departure date
const generateDates = (departureDateStr) => {
  const base = departureDateStr ? new Date(departureDateStr) : new Date()
  const days   = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  const mockPrices = [389, 352, 319, 329, 342]
  const lowestPrice = Math.min(...mockPrices)

  return Array.from({ length: 5 }, (_, i) => {
    const d = new Date(base)
    d.setDate(base.getDate() + (i - 2)) // 2 before, selected, 2 after
    return {
      day:      days[d.getDay()],
      date:     `${d.getDate()} ${months[d.getMonth()]}`,
      price:    mockPrices[i],
      label:    `£${mockPrices[i]}`,
      isLowest: mockPrices[i] === lowestPrice,
    }
  })
}

function Sidebar({ maxPrice, setMaxPrice, toggleAirline }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      style={{
        background: 'var(--card)', border: '1px solid var(--border)',
        borderRadius: 12, padding: '1.25rem',
        height: 'fit-content', position: 'sticky', top: 80,
      }}
    >
      <div style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: '1rem' }}>Filters</div>

      {/* Stops */}
      <div style={{ marginBottom: '1.25rem', borderBottom: '1px solid var(--border)', paddingBottom: '1.25rem' }}>
        <div style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.75rem' }}>
          Stops
        </div>
        {[['Non Stop','£319'],['1 Stop','£389'],['2+ Stops','£279']].map(([l, p]) => (
          <label key={l} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8, cursor: 'pointer' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.83rem', color: 'var(--muted)' }}>
              <input type="checkbox" defaultChecked={l === '1 Stop'} />
              {l}
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>{p}</span>
          </label>
        ))}
      </div>

      {/* Price range */}
      <div style={{ marginBottom: '1.25rem', borderBottom: '1px solid var(--border)', paddingBottom: '1.25rem' }}>
        <div style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.75rem' }}>
          Price Range
        </div>
        <input
          type="range" min={100} max={800} step={10}
          value={maxPrice} onChange={e => setMaxPrice(+e.target.value)}
          style={{ width: '100%', marginBottom: 6 }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: 'var(--muted)' }}>
          <span>£100</span>
          <span style={{ color: 'var(--gold)', fontWeight: 600 }}>£{maxPrice}</span>
        </div>
      </div>

      {/* Airlines */}
      <div style={{ marginBottom: '1.25rem', borderBottom: '1px solid var(--border)', paddingBottom: '1.25rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Airlines</div>
          <button style={{ background: 'none', border: 'none', color: 'var(--accent)', fontSize: '0.72rem', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>
            Select all
          </button>
        </div>
        {AIRLINES.map(a => (
          <label key={a.code} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8, cursor: 'pointer' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.83rem', color: 'var(--muted)' }}>
              <input type="checkbox" defaultChecked onChange={() => toggleAirline(a.code)} />
              {a.name}
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>{a.price}</span>
          </label>
        ))}
      </div>

      {/* Departure time */}
      <div>
        <div style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.75rem' }}>
          Departure Time
        </div>
        <input type="range" min={0} max={24} defaultValue={24} style={{ width: '100%', marginBottom: 6 }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: 'var(--muted)' }}>
          <span>00:00</span><span>24:00</span>
        </div>
      </div>
    </motion.div>
  )
}

export default function ListingPage() {
  const { searchParams } = useBookingStore()
  const { maxPrice, setMaxPrice, airlines, toggleAirline, sortBy, setSortBy } = useFlights()

  // ✅ Generate dates dynamically from the user's chosen departure date
  const dates = generateDates(searchParams.departure)

  // ✅ Active index always starts at 2 = the user's chosen date (center slot)
  const [activeIdx, setActiveIdx] = useState(2)

  // Apply price filter on mock flights
  const filtered = MOCK_FLIGHTS.filter(f => f.price <= maxPrice)

  return (
    <div>
      {/* ── Route header ── */}
      <div style={{
        background: 'var(--card2)', borderBottom: '1px solid var(--border)',
        padding: '1rem 2rem',
      }}>
        <div style={{
          maxWidth: 1200, margin: '0 auto',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexWrap: 'wrap', gap: '0.5rem',
        }}>
          <div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.3rem', fontWeight: 600 }}>
              {searchParams.fromCode || 'MAN'} → {searchParams.toCode || 'JFK'}
            </h2>
            {/* ✅ Shows real dates from store */}
            <div style={{ fontSize: '0.78rem', color: 'var(--muted)' }}>
              {formatDate(searchParams.departure)} – {formatDate(searchParams.returnDate)} · {searchParams.travellers || 1} Traveller · {searchParams.cabinClass || 'Economy'}
            </div>
          </div>
          <button style={{
            background: 'transparent', border: '1px solid var(--border)',
            color: 'var(--muted)', padding: '6px 14px', borderRadius: 8,
            fontSize: '0.78rem', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif",
          }}>
            Change Search
          </button>
        </div>
      </div>

      {/* ── Date price bar ── */}
      <div style={{ maxWidth: 1200, margin: '1rem auto 0', padding: '0 2rem' }}>
        <div style={{
          background: 'var(--card)', border: '1px solid var(--border)',
          borderRadius: 12, overflow: 'hidden', marginBottom: '1.25rem',
        }}>
          <div style={{ display: 'flex', overflowX: 'auto' }}>
            {dates.map((d, i) => (
              <div
                key={i}
                onClick={() => setActiveIdx(i)}
                style={{
                  flex: 1, minWidth: 90, padding: '0.85rem 0.5rem',
                  textAlign: 'center', cursor: 'pointer',
                  borderRight: i < dates.length - 1 ? '1px solid var(--border)' : 'none',
                  borderBottom: i === activeIdx ? '2px solid var(--gold)' : '2px solid transparent',
                  background: i === activeIdx ? 'rgba(240,165,0,0.07)' : 'transparent',
                  transition: 'background 0.2s',
                }}
              >
                <div style={{ fontSize: '0.68rem', color: 'var(--muted)', marginBottom: 2 }}>{d.day}</div>
                {/* ✅ Shows real date generated from user's pick */}
                <div style={{ fontSize: '0.85rem', fontWeight: i === activeIdx ? 600 : 400, marginBottom: 3 }}>
                  {d.date}
                  {i === 2 && (
                    <span style={{ fontSize: '0.6rem', color: 'var(--gold)', marginLeft: 4 }}>✦</span>
                  )}
                </div>
                <div style={{
                  fontSize: '0.8rem', fontWeight: 600,
                  color: d.isLowest ? 'var(--green)' : 'var(--gold)',
                }}>
                  {d.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Main layout ── */}
      <div style={{
        display: 'grid', gridTemplateColumns: '260px 1fr',
        gap: '1.5rem', maxWidth: 1200, margin: '0 auto',
        padding: '0 2rem 3rem',
      }}>
        <Sidebar
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
          selectedAirlines={airlines}
          toggleAirline={toggleAirline}
        />

        <div>
          {/* Sort bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>
              <strong style={{ color: 'var(--text)' }}>{filtered.length}</strong> flights found
            </span>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              style={{
                background: 'var(--card)', border: '1px solid var(--border)',
                color: 'var(--text)', padding: '6px 12px', borderRadius: 8,
                fontSize: '0.82rem', fontFamily: "'DM Sans', sans-serif", cursor: 'pointer',
              }}
            >
              <option value="recommended">Recommended</option>
              <option value="price">Lowest Price</option>
              <option value="duration">Shortest Duration</option>
            </select>
          </div>

          {/* Flight cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {filtered.map((f, i) => (
              <FlightCard key={f.id} flight={f} index={i} />
            ))}
            {filtered.length === 0 && (
              <div style={{
                textAlign: 'center', padding: '3rem',
                color: 'var(--muted)', background: 'var(--card)',
                borderRadius: 12, border: '1px solid var(--border)',
              }}>
                No flights found for this price range. Try increasing the maximum price.
              </div>
            )}
          </div>

          {filtered.length > 0 && (
            <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
              <button style={{
                background: 'transparent', border: '1px solid var(--border)',
                color: 'var(--muted)', padding: '10px 28px', borderRadius: 8,
                fontSize: '0.85rem', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif",
              }}>
                Load more flights
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}