import React, { useState } from 'react'
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

export default function SeatMap({ activePassengerId }) {
  const { selectedSeats, setSelectedSeatForPassenger, passengers } = useBookingStore()
  const [hoveredSeat, setHoveredSeat] = useState(null)

  // Find all seats chosen across the entire booking party group
  const assignedSeatIds = Object.values(selectedSeats).map(s => s?.id)
  const currentPassengerSeat = selectedSeats[activePassengerId]
  const activePassenger = passengers.find(p => p.id === activePassengerId)

  const handleSeat = (seat) => {
    if (seat.taken) return
    
    // Safety check: Prevent booking the exact same seat for multiple people in your group
    if (assignedSeatIds.includes(seat.id) && currentPassengerSeat?.id !== seat.id) {
      alert("This seat has already been selected by another traveler in your group.")
      return
    }
    setSelectedSeatForPassenger(activePassengerId, seat)
  }

  const getSeatStyle = (seat) => {
    const isSelectedByMe = currentPassengerSeat?.id === seat.id
    const isSelectedByOther = assignedSeatIds.includes(seat.id) && !isSelectedByMe
    const isHovered = hoveredSeat === seat.id

    // Taken seats or seats chosen by other members of your traveling party
    if (seat.taken || isSelectedByOther) return {
      background: '#F1F5F9', borderColor: '#E2E2DC', cursor: 'not-allowed', color: '#94A3B8',
    }
    // Selection state matches premium slate color accent
    if (isSelectedByMe) return {
      background: '#1C2321', borderColor: '#1C2321', color: '#FAF9F6', cursor: 'pointer',
    }
    if (seat.extraLegroom) return {
      background: isHovered ? '#FAF9F6' : '#ffffff',
      borderColor: isHovered ? '#1C2321' : '#E2E2DC',
      color: '#1C2321', cursor: 'pointer',
    }
    return {
      background: isHovered ? '#FAF9F6' : '#ffffff',
      borderColor: isHovered ? '#1C2321' : '#CBD5E1',
      color: '#555550', cursor: 'pointer',
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
      {/* Target Active Passenger Context */}
      <div style={{ marginBottom: '1.25rem', fontSize: '0.85rem', color: '#7A7A72', fontWeight: 500 }}>
        Selecting seat for: <strong style={{ color: '#1C2321', textTransform: 'uppercase' }}>{activePassenger?.firstName || `Passenger`}</strong>
      </div>

      {/* Legend */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        {[
          { label: 'Available', bg: '#ffffff', border: '#CBD5E1' },
          { label: 'Extra Legroom (+£45)', bg: '#ffffff', border: '#1C2321' },
          { label: 'Selected', bg: '#1C2321', border: '#1C2321' },
          { label: 'Taken / Claimed', bg: '#F1F5F9', border: '#E2E2DC' },
        ].map(l => (
          <div key={l.label} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.75rem', color: '#7A7A72', fontWeight: 500 }}>
            <div style={{
              width: 14, height: 14, borderRadius: 3,
              background: l.bg, border: `1px solid ${l.border}`,
            }} />
            {l.label}
          </div>
        ))}
      </div>

      {/* Plane nose */}
      <div style={{ textAlign: 'center', marginBottom: '0.5rem', fontSize: '1.5rem', opacity: 0.5, color: '#7A7A72' }}>✈</div>

      {/* Column headers */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 6, paddingLeft: 30 }}>
        {['A','B','C','','D','E','F'].map((c, i) => (
          <div key={i} style={{
            width: c === '' ? 20 : 30, textAlign: 'center',
            fontSize: '0.72rem', color: '#7A7A72', fontWeight: 700,
          }}>
            {c}
          </div>
        ))}
      </div>

      {/* Seats Layout Matrix Grid */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
        {SEAT_DATA.map((row, ri) => (
          <div key={ri} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            {/* Row number */}
            <div style={{ width: 22, textAlign: 'center', fontSize: '0.72rem', color: '#7A7A72', fontWeight: 600 }}>
              {row[0].row}
            </div>

            {/* Left window column triplet */}
            {row.slice(0, 3).map(seat => {
              const takenByOther = assignedSeatIds.includes(seat.id) && currentPassengerSeat?.id !== seat.id
              return (
                <motion.div
                  key={seat.id}
                  whileTap={!seat.taken && !takenByOther ? { scale: 0.92 } : {}}
                  onClick={() => handleSeat(seat)}
                  onMouseEnter={() => setHoveredSeat(seat.id)}
                  onMouseLeave={() => setHoveredSeat(null)}
                  title={seat.id}
                  style={{
                    width: 30, height: 30, borderRadius: '5px 5px 3px 3px',
                    border: '1px solid', display: 'flex', alignItems: 'center',
                    justifyContent: 'center', fontSize: '0.72rem', fontWeight: 700,
                    transition: 'all 0.15s', userSelect: 'none',
                    ...getSeatStyle(seat),
                  }}
                >
                  {seat.taken || takenByOther ? '✕' : seat.col}
                </motion.div>
              )
            })}

            {/* Central Aisle Spacer */}
            <div style={{ width: 20 }} />

            {/* Right window column triplet */}
            {row.slice(3).map(seat => {
              const takenByOther = assignedSeatIds.includes(seat.id) && currentPassengerSeat?.id !== seat.id
              return (
                <motion.div
                  key={seat.id}
                  whileTap={!seat.taken && !takenByOther ? { scale: 0.92 } : {}}
                  onClick={() => handleSeat(seat)}
                  onMouseEnter={() => setHoveredSeat(seat.id)}
                  onMouseLeave={() => setHoveredSeat(null)}
                  title={seat.id}
                  style={{
                    width: 30, height: 30, borderRadius: '5px 5px 3px 3px',
                    border: '1px solid', display: 'flex', alignItems: 'center',
                    justifyContent: 'center', fontSize: '0.72rem', fontWeight: 700,
                    transition: 'all 0.15s', userSelect: 'none',
                    ...getSeatStyle(seat),
                  }}
                >
                  {seat.taken || takenByOther ? '✕' : seat.col}
                </motion.div>
              )
            })}
          </div>
        ))}
      </div>

      {currentPassengerSeat && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            marginTop: '1.5rem', padding: '0.75rem 1.25rem',
            background: '#ffffff', border: '1px solid #1C2321',
            borderRadius: 8, fontSize: '0.85rem', color: '#1C2321',
            fontWeight: 500, width: '100%', maxWidth: '280px', textAlign: 'center'
          }}
        >
          ✓ Seat <strong style={{ fontWeight: 700 }}>{currentPassengerSeat.id}</strong> chosen
          {currentPassengerSeat.extraLegroom && ' · Extra Legroom (+£45)'}
        </motion.div>
      )}
    </div>
  )
}