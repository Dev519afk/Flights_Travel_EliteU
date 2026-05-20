import React, { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useBookingStore } from '../store/bookingStore'

const UPSELLS = [
  { icon: '🏨', title: 'Find a Hotel', sub: 'Browse 50,000+ hotels in New York from £89/night', cta: 'Search Hotels →' },
  { icon: '🚗', title: 'Rent a Car',  sub: 'Pick up at JFK from £32/day — free cancellation', cta: 'Browse Cars →'   },
]

export default function SuccessPage() {
  const navigate  = useNavigate()
  const { confirmedBooking, reset } = useBookingStore()

  // Fallback demo data if user lands here directly
  const booking = confirmedBooking || {
    bookingId: 'FTE-847291',
    flight: {
      airline: 'Qatar Airways', airlineCode: 'QR', currency: '£', price: 389,
      outbound: { dep: '08:45', arr: '14:35', depCode: 'MAN', arrCode: 'JFK', stopInfo: '1 Stop · DOH', depDate: '24 May 2026' },
      inbound:  { dep: '18:20', arr: '08:50', depCode: 'JFK', arrCode: 'MAN', stopInfo: '1 Stop · DOH', depDate: '31 May 2026' },
    },
    passenger: { firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', gender: 'Mr' },
    seat: { id: '12A' },
    totalPrice: 476,
    bookedAt: new Date().toISOString(),
  }

  const { bookingId, flight, passenger, seat, totalPrice } = booking
  const passengerName = `${passenger?.gender || 'Mr'} ${passenger?.firstName || 'John'} ${passenger?.lastName || 'Doe'}`
  const email = passenger?.email || 'john.doe@example.com'

  const handleNewSearch = () => {
    reset()
    navigate('/')
  }

  return (
    <div style={{ background: 'var(--navy)', minHeight: '100vh' }}>
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '3rem 2rem', textAlign: 'center' }}>

        {/* Animated checkmark */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
          style={{
            width: 100, height: 100, borderRadius: '50%',
            background: 'rgba(34,197,94,0.12)',
            border: '3px solid var(--green)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 2rem', fontSize: '2.5rem',
          }}
        >
          ✓
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(1.8rem, 5vw, 2.5rem)',
            fontWeight: 700, marginBottom: '0.5rem',
          }}>
            Booking Confirmed! 🎉
          </h1>
          <p style={{ color: 'var(--muted)', marginBottom: '1.5rem' }}>
            Your tickets are reserved and a confirmation email is on its way.
          </p>

          {/* Booking ID */}
          <div style={{
            display: 'inline-block',
            background: 'rgba(240,165,0,0.1)', border: '1px solid rgba(240,165,0,0.3)',
            borderRadius: 8, padding: '6px 20px', fontFamily: 'monospace',
            fontSize: '1.1rem', color: 'var(--gold)', marginBottom: '2rem',
            letterSpacing: '0.12em',
          }}>
            {bookingId}
          </div>
        </motion.div>

        {/* Ticket card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          style={{
            background: 'var(--card)', border: '1px solid var(--border)',
            borderRadius: 16, overflow: 'hidden', textAlign: 'left', marginBottom: '2rem',
          }}
        >
          {/* Ticket top */}
          <div style={{
            padding: '1.5rem',
            background: 'linear-gradient(135deg, var(--navy2) 0%, var(--navy3) 100%)',
          }}>
            {/* Route */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.2rem', fontWeight: 700 }}>
                {flight.outbound.depCode}
              </div>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                <div style={{ fontSize: '0.7rem', color: 'var(--muted)' }}>{flight.outbound.depDate}</div>
                <div style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 4 }}>
                  <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
                  <span style={{ fontSize: '1.2rem', color: 'var(--gold)' }}>✈</span>
                  <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
                </div>
                <div style={{ fontSize: '0.7rem', color: 'var(--muted)' }}>{flight.outbound.stopInfo}</div>
              </div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.2rem', fontWeight: 700 }}>
                {flight.outbound.arrCode}
              </div>
            </div>

            {/* Meta grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
              {[
                { label: 'Passenger', val: passengerName },
                { label: 'Date',      val: flight.outbound.depDate },
                { label: 'Time',      val: `${flight.outbound.dep} → ${flight.outbound.arr}` },
                { label: 'Seat',      val: seat?.id || '12A' },
              ].map(m => (
                <div key={m.label}>
                  <div style={{ fontSize: '0.65rem', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 2 }}>
                    {m.label}
                  </div>
                  <div style={{ fontSize: '0.88rem', fontWeight: 500 }}>{m.val}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Tear line */}
          <div style={{ display: 'flex', alignItems: 'center', padding: '0 -10px', overflow: 'hidden' }}>
            <div style={{ width: 20, height: 20, borderRadius: '50%', background: 'var(--navy)', border: '1px solid var(--border)', flexShrink: 0, marginLeft: -10 }} />
            <div style={{ flex: 1, borderTop: '2px dashed var(--border)' }} />
            <div style={{ width: 20, height: 20, borderRadius: '50%', background: 'var(--navy)', border: '1px solid var(--border)', flexShrink: 0, marginRight: -10 }} />
          </div>

          {/* Ticket bottom */}
          <div style={{ padding: '1.25rem 1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{
                  width: 42, height: 42, borderRadius: '50%',
                  background: 'var(--navy3)', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', fontWeight: 700, fontSize: '0.9rem', color: 'var(--gold)',
                }}>
                  {(passenger?.firstName?.[0] || 'J')}{(passenger?.lastName?.[0] || 'D')}
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>{passengerName}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>
                    {flight.airline} · Economy · {flight.outbound.stopInfo}
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
                <div style={{
                  background: 'rgba(34,197,94,0.12)', color: 'var(--green)',
                  fontSize: '0.68rem', fontWeight: 700,
                  padding: '3px 10px', borderRadius: 4,
                  textTransform: 'uppercase', letterSpacing: '0.08em',
                }}>
                  ✓ Confirmed
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--muted)', fontFamily: 'monospace' }}>{bookingId}</div>
              </div>
            </div>

            {/* Total */}
            <div style={{
              marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border)',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>Total paid</div>
              <div style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--gold)' }}>
                {flight.currency}{totalPrice}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Action buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55 }}
          style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '2.5rem' }}
        >
          <motion.button
            whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            onClick={() => alert('Generating PDF ticket...')}
            style={{
              background: 'var(--gold)', color: '#000', border: 'none',
              padding: '10px 24px', borderRadius: 10, fontWeight: 700,
              fontSize: '0.9rem', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif",
            }}
          >
            📄 Download Ticket
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            onClick={() => alert('Opening booking manager...')}
            style={{
              background: 'transparent', border: '1px solid var(--border)',
              color: 'var(--text)', padding: '10px 24px', borderRadius: 10,
              fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer',
              fontFamily: "'DM Sans', sans-serif", transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--gold)'; e.currentTarget.style.color = 'var(--gold)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text)' }}
          >
            View Booking
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            onClick={handleNewSearch}
            style={{
              background: 'transparent', border: '1px solid var(--border)',
              color: 'var(--text)', padding: '10px 24px', borderRadius: 10,
              fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer',
              fontFamily: "'DM Sans', sans-serif", transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--gold)'; e.currentTarget.style.color = 'var(--gold)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text)' }}
          >
            ← Back to Home
          </motion.button>
        </motion.div>

        {/* Upsells */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65 }}>
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.2rem', marginBottom: '1rem', textAlign: 'left' }}>
            Complete your trip
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
            {UPSELLS.map(u => (
              <motion.div
                key={u.title}
                whileHover={{ y: -4, borderColor: 'rgba(240,165,0,0.4)' }}
                style={{
                  background: 'var(--card)', border: '1px solid var(--border)',
                  borderRadius: 12, padding: '1.25rem', textAlign: 'left',
                  cursor: 'pointer', transition: 'all 0.2s',
                }}
              >
                <div style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>{u.icon}</div>
                <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>{u.title}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--muted)', marginBottom: '0.75rem', lineHeight: 1.5 }}>{u.sub}</div>
                <div style={{ fontSize: '0.82rem', color: 'var(--gold)', fontWeight: 500 }}>{u.cta}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Email confirmation notice */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.75 }}
          style={{
            background: 'rgba(26,115,232,0.07)', border: '1px solid rgba(26,115,232,0.2)',
            borderRadius: 10, padding: '1rem 1.25rem',
            fontSize: '0.83rem', color: 'var(--muted)', lineHeight: 1.6,
          }}
        >
          ✉ A confirmation email with your e-ticket and booking reference has been sent to{' '}
          <strong style={{ color: 'var(--text)' }}>{email}</strong>.{' '}
          Please check your inbox and spam folder. Keep your booking reference{' '}
          <strong style={{ color: 'var(--gold)', fontFamily: 'monospace' }}>{bookingId}</strong>{' '}
          handy when travelling.
        </motion.div>
      </div>
    </div>
  )
}
