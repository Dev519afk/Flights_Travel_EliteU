import React, { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { useBookingStore } from '../store/bookingStore'

const COLS = ['A', 'B', 'C', 'D', 'E', 'F']
const ROWS = 7

function generateSeats() {
  const seats = []
  for (let r = 1; r <= ROWS; r++) {
    const row = []
    for (let c = 0; c < 6; c++) {
      const id = `${r}${COLS[c]}`
      const taken = [
        '1B','1E','2A','2D','3C','3F','4B','4E','5A','5D','6C','7B'
      ].includes(id)
      const extraLegroom = r <= 2
      row.push({ id, row: r, col: COLS[c], taken, extraLegroom })
    }
    seats.push(row)
  }
  return seats
}

const SEAT_DATA = generateSeats()

export default function SeatMap() {
  const { selectedSeat, setSelectedSeat } = useBookingStore()
  const [hoveredSeat, setHoveredSeat] = useState(null)

  const handleSeat = (seat) => {
    if (seat.taken) return
    setSelectedSeat(selectedSeat?.id === seat.id ? null : seat)
  }

  const getSeatStyle = (seat) => {
    const isSelected = selectedSeat?.id === seat.id
    const isHovered = hoveredSeat === seat.id

    if (seat.taken) return {
      background: 'rgba(255,255,255,0.04)', borderColor: 'var(--border)', cursor: 'not-allowed', color: 'transparent',
    }
    if (isSelected) return {
      background: 'var(--gold)', borderColor: 'var(--gold)', color: '#000', cursor: 'pointer',
    }
    if (seat.extraLegroom) return {
      background: isHovered ? 'rgba(240,165,0,0.25)' : 'rgba(240,165,0,0.08)',
      borderColor: isHovered ? 'var(--gold)' : 'rgba(240,165,0,0.35)',
      color: 'var(--gold)', cursor: 'pointer',
    }
    return {
      background: isHovered ? 'rgba(26,115,232,0.25)' : 'rgba(26,115,232,0.1)',
      borderColor: isHovered ? 'var(--accent)' : 'rgba(26,115,232,0.35)',
      color: 'var(--accent)', cursor: 'pointer',
    }
  }

  return (
    <div>
      {/* Legend */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
        {[
          { label: 'Available', bg: 'rgba(26,115,232,0.1)', border: 'rgba(26,115,232,0.35)', color: 'var(--accent)' },
          { label: 'Extra Legroom (+£45)', bg: 'rgba(240,165,0,0.08)', border: 'rgba(240,165,0,0.35)', color: 'var(--gold)' },
          { label: 'Selected', bg: 'var(--gold)', border: 'var(--gold)', color: '#000' },
          { label: 'Taken', bg: 'rgba(255,255,255,0.04)', border: 'var(--border)', color: 'transparent' },
        ].map(l => (
          <div key={l.label} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.75rem', color: 'var(--muted)' }}>
            <div style={{
              width: 14, height: 14, borderRadius: 3,
              background: l.bg, border: `1px solid ${l.border}`,
            }} />
            {l.label}
          </div>
        ))}
      </div>

      {/* Plane nose */}
      <div style={{ textAlign: 'center', marginBottom: '0.5rem', fontSize: '1.5rem', opacity: 0.4 }}>✈</div>

      {/* Column headers */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 6, paddingLeft: 30 }}>
        {['A','B','C','','D','E','F'].map((c, i) => (
          <div key={i} style={{
            width: c === '' ? 20 : 30, textAlign: 'center',
            fontSize: '0.68rem', color: 'var(--muted)', fontWeight: 600,
          }}>
            {c}
          </div>
        ))}
      </div>

      {/* Seats */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
        {SEAT_DATA.map((row, ri) => (
          <div key={ri} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            {/* Row number */}
            <div style={{ width: 22, textAlign: 'center', fontSize: '0.68rem', color: 'var(--muted)' }}>
              {row[0].row}
            </div>

            {/* Left seats */}
            {row.slice(0, 3).map(seat => (
              <motion.div
                key={seat.id}
                whileTap={!seat.taken ? { scale: 0.9 } : {}}
                onClick={() => handleSeat(seat)}
                onMouseEnter={() => setHoveredSeat(seat.id)}
                onMouseLeave={() => setHoveredSeat(null)}
                title={seat.id}
                style={{
                  width: 30, height: 30, borderRadius: '5px 5px 3px 3px',
                  border: '1px solid', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', fontSize: '0.58rem', fontWeight: 700,
                  transition: 'all 0.15s', userSelect: 'none',
                  ...getSeatStyle(seat),
                }}
              >
                {!seat.taken && seat.col}
              </motion.div>
            ))}

            {/* Aisle */}
            <div style={{ width: 20 }} />

            {/* Right seats */}
            {row.slice(3).map(seat => (
              <motion.div
                key={seat.id}
                whileTap={!seat.taken ? { scale: 0.9 } : {}}
                onClick={() => handleSeat(seat)}
                onMouseEnter={() => setHoveredSeat(seat.id)}
                onMouseLeave={() => setHoveredSeat(null)}
                title={seat.id}
                style={{
                  width: 30, height: 30, borderRadius: '5px 5px 3px 3px',
                  border: '1px solid', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', fontSize: '0.58rem', fontWeight: 700,
                  transition: 'all 0.15s', userSelect: 'none',
                  ...getSeatStyle(seat),
                }}
              >
                {!seat.taken && seat.col}
              </motion.div>
            ))}
          </div>
        ))}
      </div>

      {selectedSeat && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            marginTop: '1rem', padding: '0.75rem 1rem',
            background: 'rgba(240,165,0,0.08)', border: '1px solid rgba(240,165,0,0.25)',
            borderRadius: 8, fontSize: '0.83rem', color: 'var(--gold)',
          }}
        >
          ✓ Seat <strong>{selectedSeat.id}</strong> selected
          {selectedSeat.extraLegroom && ' · Extra Legroom (+£45)'}
        </motion.div>
      )}
    </div>
  )
}
