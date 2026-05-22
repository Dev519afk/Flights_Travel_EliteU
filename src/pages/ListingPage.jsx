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

const formatDate = (str) => {
  if (!str) return ''
  const d = new Date(str)
  if (isNaN(d)) return str
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}

const generateDates = (departureDateStr) => {
  const base = departureDateStr ? new Date(departureDateStr) : new Date()
  const days   = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  const mockPrices = [389, 352, 319, 329, 342]
  const lowestPrice = Math.min(...mockPrices)

  return Array.from({ length: 5 }, (_, i) => {
    const d = new Date(base)
    d.setDate(base.getDate() + (i - 2))
    return {
      day:      days[d.getDay()],
      date:     `${d.getDate()} ${months[d.getMonth()]}`,
      price:    mockPrices[i],
      label:    `£${mockPrices[i]}`,
      isLowest: mockPrices[i] === lowestPrice,
    }
  })
}

function Sidebar({ maxPrice, setMaxPrice, selectedAirlines, toggleAirline, selectedStops, toggleStop }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        background: '#ffffff', border: '1px solid #E2E2DC',
        borderRadius: 12, padding: '1.25rem',
        height: 'fit-content', textAlign: 'left'
      }}
    >
      <div style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: '1rem', color: '#1C2321' }}>Filters</div>

      {/* Stops Selection Checklist */}
      <div style={{ marginBottom: '1.25rem', borderBottom: '1px solid #E2E2DC', paddingBottom: '1.25rem' }}>
        <div style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.75rem', color: '#7A7A72' }}>
          Stops
        </div>
        {[
          { id: '0', name: 'Non Stop', price: '£319' },
          { id: '1', name: '1 Stop', price: '£389' },
          { id: '2', name: '2+ Stops', price: '£279' }
        ].map((stop) => (
          <label key={stop.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8, cursor: 'pointer' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.83rem', color: '#555550' }}>
              <input 
                type="checkbox" 
                checked={selectedStops.includes(stop.id)}
                onChange={() => toggleStop(stop.id)}
                style={{ accentColor: '#1C2321', cursor: 'pointer' }} 
              />
              {stop.name}
            </div>
            <span style={{ fontSize: '0.75rem', color: '#7A7A72' }}>{stop.price}</span>
          </label>
        ))}
      </div>

      {/* Price Range Slider */}
      <div style={{ marginBottom: '1.25rem', borderBottom: '1px solid #E2E2DC', paddingBottom: '1.25rem' }}>
        <div style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.75rem', color: '#7A7A72' }}>
          Price Range
        </div>
        <input
          type="range" min={100} max={800} step={10}
          value={maxPrice} onChange={e => setMaxPrice(+e.target.value)}
          style={{ width: '100%', marginBottom: 6, accentColor: '#1C2321', cursor: 'pointer' }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: '#7A7A72' }}>
          <span>£100</span>
          <span style={{ color: '#1C2321', fontWeight: 600 }}>£{maxPrice}</span>
        </div>
      </div>

      {/* Airlines Checklist */}
      <div style={{ marginBottom: '1.25rem', borderBottom: '1px solid #E2E2DC', paddingBottom: '1.25rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#7A7A72' }}>Airlines</div>
          <button 
            type="button"
            onClick={() => AIRLINES.forEach(a => { if(!selectedAirlines.includes(a.code)) toggleAirline(a.code) })}
            style={{ background: 'none', border: 'none', color: '#1C2321', fontSize: '0.72rem', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", fontWeight: 600 }}
          >
            Select all
          </button>
        </div>
        {AIRLINES.map(a => (
          <label key={a.code} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8, cursor: 'pointer' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.83rem', color: '#555550' }}>
              <input 
                type="checkbox" 
                checked={selectedAirlines.includes(a.code)} 
                onChange={() => toggleAirline(a.code)} 
                style={{ accentColor: '#1C2321', cursor: 'pointer' }} 
              />
              {a.name}
            </div>
            <span style={{ fontSize: '0.75rem', color: '#7A7A72' }}>{a.price}</span>
          </label>
        ))}
      </div>

      {/* Departure Time */}
      <div>
        <div style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.75rem', color: '#7A7A72' }}>
          Departure Time
        </div>
        <input type="range" min={0} max={24} defaultValue={24} style={{ width: '100%', marginBottom: 6, accentColor: '#1C2321', cursor: 'pointer' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: '#7A7A72' }}>
          <span>00:00</span><span>24:00</span>
        </div>
      </div>
    </motion.div>
  )
}

export default function ListingPage() {
  const { searchParams } = useBookingStore()
  const { sortBy, setSortBy } = useFlights()

  const [localMaxPrice, setLocalMaxPrice] = useState(800)
  const [localAirlines, setLocalAirlines] = useState(AIRLINES.map(a => a.code))
  const [localStops, setLocalStops] = useState(['0', '1', '2'])

  const dates = generateDates(searchParams.departure)
  const [activeIdx, setActiveIdx] = useState(2)

  const toggleAirline = (code) => {
    setLocalAirlines(prev => 
      prev.includes(code) ? prev.filter(c => c !== code) : [...prev, code]
    )
  }

  const toggleStop = (stopId) => {
    setLocalStops(prev => 
      prev.includes(stopId) ? prev.filter(s => s !== stopId) : [...prev, stopId]
    )
  }

  const filtered = MOCK_FLIGHTS.filter(f => {
    const matchesPrice = f.price <= localMaxPrice
    const matchesAirline = localAirlines.includes(f.airlineCode)
    
    const info = (f.outbound?.stopInfo || '').toLowerCase()
    let flightStops = '0'
    if (info.includes('1 stop')) flightStops = '1'
    if (info.includes('2 stop') || info.includes('2+')) flightStops = '2'
    
    const matchesStops = localStops.includes(flightStops)
    return matchesPrice && matchesAirline && matchesStops
  })

  const isOneWay = searchParams.tripType === 'One Way'

  return (
    <div style={{ background: '#FAF9F6', minHeight: '100vh', color: '#1C2321', fontFamily: "'DM Sans', sans-serif" }}>
      
      {/* Route Header */}
      <div style={{ background: '#ffffff', borderBottom: '1px solid #E2E2DC', padding: '1.25rem 1.5rem' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', textAlign: 'left' }}>
          <div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.4rem', fontWeight: 700, color: '#1C2321', margin: 0 }}>
              {searchParams.fromCode || 'MAN'} → {searchParams.toCode || 'JFK'}
            </h2>
            <div style={{ fontSize: '0.8rem', color: '#7A7A72', marginTop: 4 }}>
              {formatDate(searchParams.departure)}
              {!isOneWay && searchParams.returnDate && ` – ${formatDate(searchParams.returnDate)}`}
              {` · ${searchParams.travellers || 1} Traveller · ${searchParams.cabinClass || 'Economy'} (${searchParams.tripType || 'Return'})`}
            </div>
          </div>
          <button style={{ background: 'transparent', border: '1px solid #1C2321', color: '#1C2321', padding: '8px 16px', borderRadius: 8, fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer' }}>
            Change Search
          </button>
        </div>
      </div>

      {/* Date Price Matrix Bar */}
      <div style={{ maxWidth: 1200, margin: '1.5rem auto 0', padding: '0 1.5rem' }}>
        <div style={{ background: '#ffffff', border: '1px solid #E2E2DC', borderRadius: 12, overflow: 'hidden', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', overflowX: 'auto' }}>
            {dates.map((d, i) => (
              <div
                key={i}
                onClick={() => setActiveIdx(i)}
                style={{
                  flex: 1, minWidth: 100, padding: '1rem 0.5rem', textAlign: 'center', cursor: 'pointer',
                  borderRight: i < dates.length - 1 ? '1px solid #E2E2DC' : 'none',
                  borderBottom: i === activeIdx ? '3px solid #1C2321' : '3px solid transparent',
                  background: i === activeIdx ? '#FAF9F6' : 'transparent',
                  transition: 'background 0.2s',
                }}
              >
                <div style={{ fontSize: '0.7rem', color: '#7A7A72', textTransform: 'uppercase', fontWeight: 600, marginBottom: 2 }}>{d.day}</div>
                <div style={{ fontSize: '0.85rem', fontWeight: i === activeIdx ? 700 : 500, color: '#1C2321', marginBottom: 4 }}>
                  {d.date} {i === 2 && <span style={{ fontSize: '0.65rem', color: '#1C2321', marginLeft: 4 }}>✦</span>}
                </div>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: d.isLowest ? '#16a34a' : '#555550' }}>{d.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Two-Column Grid container with auto alignment execution */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '300px 1fr', 
        gap: '1.5rem', 
        maxWidth: 1200, 
        margin: '0 auto', 
        padding: '2rem 1.5rem 4rem',
        alignItems: 'start'
      }}>
        
        {/* Left Sidebar Filter Container */}
        <div style={{ width: '100%', position: 'sticky', top: '24px' }}>
          <Sidebar
            maxPrice={localMaxPrice}
            setMaxPrice={setLocalMaxPrice}
            selectedAirlines={localAirlines}
            toggleAirline={toggleAirline}
            selectedStops={localStops}
            toggleStop={toggleStop}
          />
        </div>

        {/* Right Flight Cards Result Feed Container */}
        <div style={{ width: '100%' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.85rem', color: '#7A7A72' }}>
              <strong style={{ color: '#1C2321' }}>{filtered.length}</strong> flights found
            </span>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              style={{ background: '#ffffff', border: '1px solid #E2E2DC', color: '#1C2321', padding: '6px 12px', borderRadius: 8, fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer', outline: 'none' }}
            >
              <option value="recommended">Recommended</option>
              <option value="price">Lowest Price</option>
              <option value="duration">Shortest Duration</option>
            </select>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {filtered.map((f, i) => (
              <FlightCard key={f.id} flight={f} index={i} />
            ))}
            {filtered.length === 0 && (
              <div style={{ textAlign: 'center', padding: '4rem 2rem', color: '#7A7A72', background: '#ffffff', borderRadius: 12, border: '1px solid #E2E2DC', fontSize: '0.9rem' }}>
                No flights found matching those filter selections. Try adjusting your parameters.
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  )
}