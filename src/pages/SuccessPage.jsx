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
    <div style={{ background: '#FAF9F6', minHeight: '100vh', color: '#1C2321', fontFamily: "'DM Sans', sans-serif" }}>
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '3rem 1.5rem', textAlign: 'center' }}>

        {/* Animated Checkmark Circle */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
          style={{
            width: 80, height: 80, borderRadius: '50%',
            background: 'rgba(22,163,74,0.08)',
            border: '2px solid #16a34a',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 1.5rem', fontSize: '2rem', color: '#16a34a', fontWeight: 'bold'
          }}
        >
          ✓
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(1.8rem, 5vw, 2.5rem)',
            fontWeight: 700, marginBottom: '0.5rem', color: '#1C2321'
          }}>
            Booking Confirmed! 🎉
          </h1>
          <p style={{ color: '#7A7A72', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
            Your tickets are reserved and a confirmation email is on its way.
          </p>

          {/* Booking ID badge locator */}
          <div style={{
            display: 'inline-block',
            background: '#ffffff', border: '1px solid #E2E2DC',
            borderRadius: 8, padding: '8px 24px', fontFamily: 'monospace',
            fontSize: '1.1rem', fontWeight: 700, color: '#1C2321', marginBottom: '2.5rem',
            letterSpacing: '0.08em', boxShadow: '0 2px 8px rgba(0,0,0,0.01)'
          }}>
            REFERENCE: {bookingId}
          </div>
        </motion.div>

        {/* Premium Light Digital Ticket Stub Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          style={{
            background: '#ffffff', border: '1px solid #E2E2DC',
            borderRadius: 16, overflow: 'hidden', textAlign: 'left', marginBottom: '2.5rem',
            boxShadow: '0 6px 20px rgba(28,35,33,0.03)'
          }}
        >
          {/* Ticket Header Segment */}
          <div style={{
            padding: '1.75rem 2rem',
            background: '#ffffff',
            borderBottom: '1px solid #FAF9F6'
          }}>
            {/* Route path tags */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '1.5rem' }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.4rem', fontWeight: 700, color: '#1C2321' }}>
                {flight.outbound.depCode}
              </div>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                <div style={{ fontSize: '0.72rem', color: '#7A7A72', fontWeight: 600 }}>{flight.outbound.depDate}</div>
                <div style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{ flex: 1, height: 1, background: '#E2E2DC' }} />
                  <span style={{ fontSize: '1.1rem', color: '#1C2321', transform: 'rotate(90deg)' }}>✈</span>
                  <div style={{ flex: 1, height: 1, background: '#E2E2DC' }} />
                </div>
                <div style={{ fontSize: '0.7rem', color: '#7A7A72', fontWeight: 500 }}>{flight.outbound.stopInfo}</div>
              </div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.4rem', fontWeight: 700, color: '#1C2321' }}>
                {flight.outbound.arrCode}
              </div>
            </div>

            {/* Flight Metadata Parameters Grid Table */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '1.25rem', paddingTop: '0.5rem' }}>
              {[
                { label: 'Passenger', val: passengerName },
                { label: 'Date',      val: flight.outbound.depDate },
                { label: 'Time Schedule', val: `${flight.outbound.dep} → ${flight.outbound.arr}` },
                { label: 'Assigned Seat', val: seat?.id || '12A' },
              ].map(m => (
                <div key={m.label}>
                  <div style={{ fontSize: '0.68rem', color: '#7A7A72', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 3, fontWeight: 700 }}>
                    {m.label}
                  </div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#1C2321' }}>{m.val}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Ticket Tear Separation Dash Line Container */}
          <div style={{ display: 'flex', alignItems: 'center', margin: '0 -11px', overflow: 'hidden', background: '#ffffff' }}>
            <div style={{ width: 22, height: 22, borderRadius: '50%', background: '#FAF9F6', border: '1px solid #E2E2DC', flexShrink: 0, marginLeft: -11 }} />
            <div style={{ flex: 1, borderTop: '1px dashed #E2E2DC' }} />
            <div style={{ width: 22, height: 22, borderRadius: '50%', background: '#FAF9F6', border: '1px solid #E2E2DC', flexShrink: 0, marginRight: -11 }} />
          </div>

          {/* Ticket Bottom Coupon Segment */}
          <div style={{ padding: '1.5rem 2rem', background: '#ffffff' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{
                  width: 40, height: 40, borderRadius: '50%',
                  background: '#FAF9F6', border: '1px solid #E2E2DC', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', fontWeight: 700, fontSize: '0.85rem', color: '#1C2321',
                }}>
                  {(passenger?.firstName?.[0] || 'J')}{(passenger?.lastName?.[0] || 'D')}
                </div>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontWeight: 600, fontSize: '0.95rem', color: '#1C2321' }}>{passengerName}</div>
                  <div style={{ fontSize: '0.75rem', color: '#7A7A72', marginTop: 1 }}>
                    {flight.airline} · Economy · {flight.outbound.stopInfo}
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
                <div style={{
                  background: 'rgba(22,163,74,0.08)', color: '#16a34a',
                  fontSize: '0.68rem', fontWeight: 700,
                  padding: '4px 12px', borderRadius: 4,
                  textTransform: 'uppercase', letterSpacing: '0.06em',
                }}>
                  ✓ Confirmed
                </div>
                <div style={{ fontSize: '0.72rem', color: '#7A7A72', fontFamily: 'monospace', fontWeight: 600 }}>{bookingId}</div>
              </div>
            </div>

            {/* Total Paid calculation display footer line row */}
            <div style={{
              marginTop: '1.25rem', paddingTop: '1.25rem', borderTop: '1px solid #FAF9F6',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            }}>
              <div style={{ fontSize: '0.82rem', color: '#7A7A72', fontWeight: 500 }}>Total Paid</div>
              <div style={{ fontSize: '1.4rem', fontWeight: 700, color: '#1C2321' }}>
                {flight.currency}{totalPrice}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Action Trigger Buttons Container Stack */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '3rem' }}
        >
          <motion.button
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            onClick={() => alert('Generating PDF ticket...')}
            style={{
              background: '#1C2321', color: '#FAF9F6', border: 'none',
              padding: '12px 28px', borderRadius: 10, fontWeight: 700,
              fontSize: '0.9rem', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif",
              boxShadow: '0 4px 12px rgba(28,35,33,0.1)'
            }}
          >
            📄 Download Ticket
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            onClick={() => alert('Opening booking manager...')}
            style={{
              background: '#ffffff', border: '1px solid #E2E2DC',
              color: '#1C2321', padding: '12px 28px', borderRadius: 10,
              fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer',
              fontFamily: "'DM Sans', sans-serif", transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#1C2321'; e.currentTarget.style.background = '#FAF9F6' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = '#E2E2DC'; e.currentTarget.style.background = '#ffffff' }}
          >
            View Booking
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            onClick={handleNewSearch}
            style={{
              background: '#ffffff', border: '1px solid #E2E2DC',
              color: '#1C2321', padding: '12px 28px', borderRadius: 10,
              fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer',
              fontFamily: "'DM Sans', sans-serif", transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#1C2321'; e.currentTarget.style.background = '#FAF9F6' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = '#E2E2DC'; e.currentTarget.style.background = '#ffffff' }}
          >
            ← Back to Home
          </motion.button>
        </motion.div>

        {/* Dynamic Cross-sell Upsells cards grid module section */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.3rem', fontWeight: 700, marginBottom: '1.25rem', textAlign: 'left', color: '#1C2321' }}>
            Complete your trip
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', marginBottom: '2.5rem' }}>
            {UPSELLS.map(u => (
              <motion.div
                key={u.title}
                whileHover={{ y: -3, borderColor: '#1C2321' }}
                style={{
                  background: '#ffffff', border: '1px solid #E2E2DC',
                  borderRadius: 12, padding: '1.5rem', textAlign: 'left',
                  cursor: 'pointer', transition: 'all 0.2s',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.01)'
                }}
              >
                <div style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>{u.icon}</div>
                <div style={{ fontWeight: 700, fontSize: '1rem', color: '#1C2321', marginBottom: '0.25rem' }}>{u.title}</div>
                <div style={{ fontSize: '0.82rem', color: '#555550', marginBottom: '1rem', lineHeight: 1.5 }}>{u.sub}</div>
                <div style={{ fontSize: '0.85rem', color: '#1C2321', fontWeight: 700, textDecoration: 'underline' }}>{u.cta}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Email verification notice block confirmation toast banner */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          style={{
            background: '#ffffff', border: '1px solid #E2E2DC',
            borderRadius: 12, padding: '1.25rem 1.5rem', textAlign: 'left',
            fontSize: '0.85rem', color: '#555550', lineHeight: 1.6,
            boxShadow: '0 4px 12px rgba(28,35,33,0.01)'
          }}
        >
          ✉ A confirmation email with your e-ticket and booking reference has been sent to{' '}
          <strong style={{ color: '#1C2321', fontWeight: 600 }}>{email}</strong>.{' '}
          Please check your inbox and spam folder. Keep your booking reference{' '}
          <strong style={{ color: '#1C2321', fontFamily: 'monospace', fontWeight: 700 }}>{bookingId}</strong>{' '}
          handy when travelling.
        </motion.div>
      </div>
    </div>
  )
}