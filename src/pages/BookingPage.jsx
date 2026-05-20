import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useBookingStore } from '../store/bookingStore'
import { createBooking } from '../api/flights'
import ProgressBar from '../components/ProgressBar'
import SeatMap from '../components/SeatMap'

const inputStyle = {
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid var(--border)',
  borderRadius: 8,
  padding: '9px 12px',
  color: 'var(--text)',
  fontSize: '0.88rem',
  fontFamily: "'DM Sans', sans-serif",
  width: '100%',
  outline: 'none',
  transition: 'border-color 0.2s',
}

function FormInput({ label, value, onChange, type = 'text', placeholder }) {
  const [focused, setFocused] = useState(false)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <label style={{ fontSize: '0.72rem', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{ ...inputStyle, borderColor: focused ? 'var(--gold)' : 'var(--border)' }}
      />
    </div>
  )
}

function Card({ title, children }) {
  return (
    <div style={{
      background: 'var(--card)', border: '1px solid var(--border)',
      borderRadius: 12, padding: '1.5rem', marginBottom: '1rem',
    }}>
      {title && (
        <h3 style={{
          fontSize: '1rem', fontWeight: 600, marginBottom: '1.25rem',
          paddingBottom: '0.75rem', borderBottom: '1px solid var(--border)',
        }}>
          {title}
        </h3>
      )}
      {children}
    </div>
  )
}

export default function BookingPage() {
  const navigate = useNavigate()
  const {
    selectedFlight, bookingDetails, setBookingDetails,
    selectedSeat, selectedBaggage, setSelectedBaggage,
    confirmBooking,
  } = useBookingStore()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const flight = selectedFlight || {
    id: 'QR-001', airline: 'Qatar Airways', airlineCode: 'QR', price: 389, currency: '£',
    outbound: { dep: '08:45', arr: '14:35', depCode: 'MAN', arrCode: 'JFK', duration: '10h 50m', stopInfo: '1 Stop · DOH', depDate: '24 May 2026' },
    inbound:  { dep: '18:20', arr: '08:50', depCode: 'JFK', arrCode: 'MAN', duration: '9h 30m',  stopInfo: '1 Stop · DOH', depDate: '31 May 2026' },
  }

  const baseFare = flight.price
  const taxes = 87
  const baggageFee = selectedBaggage === '20' ? 35 : selectedBaggage === '32' ? 55 : 0
  const total = baseFare + taxes + baggageFee

  const handleContinue = async () => {
    if (!bookingDetails.firstName || !bookingDetails.lastName || !bookingDetails.email) {
      setError('Please fill in your first name, last name, and email.')
      return
    }
    setError(null)
    setLoading(true)
    try {
      await createBooking({ flight, passenger: bookingDetails, seat: selectedSeat, baggage: selectedBaggage })
      confirmBooking()
      navigate('/success')
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ background: 'var(--navy)', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ background: 'var(--card2)', borderBottom: '1px solid var(--border)', padding: '1.25rem 2rem' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.4rem', marginBottom: 4 }}>Complete your booking</h2>
          <p style={{ fontSize: '0.82rem', color: 'var(--muted)' }}>You are moments away from your next adventure</p>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '1.5rem 2rem' }}>
        {/* Progress bar */}
        <ProgressBar currentStep={2} />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 310px', gap: '1.5rem', alignItems: 'start' }}>
          {/* LEFT — Forms */}
          <div>
            {/* Contact */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <Card title="Contact Information">
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <FormInput label="Email Address" value={bookingDetails.email} onChange={v => setBookingDetails({ email: v })} type="email" placeholder="john@example.com" />
                  <FormInput label="Phone Number" value={bookingDetails.phone} onChange={v => setBookingDetails({ phone: v })} placeholder="+44 7700 900123" />
                </div>
              </Card>
            </motion.div>

            {/* Passenger */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
              <Card title="Passenger 1 (Adult)">
                {/* Gender */}
                <div style={{ display: 'flex', gap: 8, marginBottom: '1rem' }}>
                  {['Mr', 'Mrs', 'Ms'].map(g => (
                    <button
                      key={g}
                      onClick={() => setBookingDetails({ gender: g })}
                      style={{
                        flex: 1, padding: '8px', border: '1px solid',
                        borderColor: bookingDetails.gender === g ? 'var(--gold)' : 'var(--border)',
                        borderRadius: 8, background: bookingDetails.gender === g ? 'rgba(240,165,0,0.08)' : 'transparent',
                        color: bookingDetails.gender === g ? 'var(--gold)' : 'var(--muted)',
                        cursor: 'pointer', fontSize: '0.82rem', fontFamily: "'DM Sans', sans-serif",
                        transition: 'all 0.2s',
                      }}
                    >
                      {g}
                    </button>
                  ))}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <FormInput label="First Name"       value={bookingDetails.firstName}     onChange={v => setBookingDetails({ firstName: v })}     placeholder="John" />
                  <FormInput label="Last Name"        value={bookingDetails.lastName}      onChange={v => setBookingDetails({ lastName: v })}      placeholder="Doe" />
                  <FormInput label="Date of Birth"    value={bookingDetails.dob}           onChange={v => setBookingDetails({ dob: v })}           type="date" />
                  <FormInput label="Nationality"      value={bookingDetails.nationality}   onChange={v => setBookingDetails({ nationality: v })}   placeholder="British" />
                  <FormInput label="Passport Number"  value={bookingDetails.passportNumber} onChange={v => setBookingDetails({ passportNumber: v })} placeholder="AB1234567" />
                  <FormInput label="Passport Expiry"  value={bookingDetails.passportExpiry} onChange={v => setBookingDetails({ passportExpiry: v })} type="date" />
                </div>
              </Card>
            </motion.div>

            {/* Seat map */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <Card title={`Select Your Seat — Outbound: ${flight.outbound.depCode} → ${flight.outbound.arrCode}`}>
                <SeatMap />
              </Card>
            </motion.div>

            {/* Baggage */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
              <Card title="Baggage Add-ons">
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  {[
                    { kg: '20', price: '£35', icon: '🧳', desc: 'Standard hold bag' },
                    { kg: '32', price: '£55', icon: '🛄', desc: 'Large hold bag' },
                  ].map(b => (
                    <div
                      key={b.kg}
                      onClick={() => setSelectedBaggage(selectedBaggage === b.kg ? null : b.kg)}
                      style={{
                        background: selectedBaggage === b.kg ? 'rgba(240,165,0,0.06)' : 'rgba(255,255,255,0.02)',
                        border: `1px solid ${selectedBaggage === b.kg ? 'var(--gold)' : 'var(--border)'}`,
                        borderRadius: 10, padding: '1rem', cursor: 'pointer',
                        textAlign: 'center', transition: 'all 0.2s',
                      }}
                    >
                      <div style={{ fontSize: '1.8rem', marginBottom: 6 }}>{b.icon}</div>
                      <div style={{ fontWeight: 600, fontSize: '0.85rem', marginBottom: 2 }}>{b.kg}kg Checked Bag</div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--muted)', marginBottom: 6 }}>{b.desc}</div>
                      <div style={{ color: 'var(--gold)', fontWeight: 700, fontSize: '0.9rem' }}>+{b.price} / bag</div>
                      {selectedBaggage === b.kg && (
                        <div style={{ fontSize: '0.7rem', color: 'var(--green)', marginTop: 4 }}>✓ Added</div>
                      )}
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>

            {error && (
              <div style={{
                background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.3)',
                borderRadius: 8, padding: '0.75rem 1rem',
                color: '#f87171', fontSize: '0.85rem', marginBottom: '1rem',
              }}>
                ⚠ {error}
              </div>
            )}
          </div>

          {/* RIGHT — Summary */}
          <div style={{ position: 'sticky', top: 80 }}>
            <div style={{
              background: 'var(--card)', border: '1px solid var(--border)',
              borderRadius: 12, padding: '1.25rem',
            }}>
              <h3 style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: '1rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--border)' }}>
                Your Trip
              </h3>

              {/* Outbound */}
              {[
                { label: 'Outbound', leg: flight.outbound },
                { label: 'Return',   leg: flight.inbound  },
              ].map(({ label, leg }) => (
                <div key={label} style={{ marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border)' }}>
                  <div style={{ fontSize: '0.68rem', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>{label}</div>
                  <div style={{ fontWeight: 600, marginBottom: 4 }}>{leg.depCode} → {leg.arrCode}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.82rem', color: 'var(--muted)' }}>
                    <span>{leg.dep}</span>
                    <span style={{ color: 'var(--gold)' }}>→</span>
                    <span>{leg.arr}</span>
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--muted)', marginTop: 2 }}>
                    {flight.airline} · {leg.stopInfo}
                  </div>
                </div>
              ))}

              {/* Price breakdown */}
              <div style={{ marginTop: '0.5rem' }}>
                {[
                  { label: 'Base Fare', value: `${flight.currency}${baseFare}` },
                  { label: 'Taxes & Fees', value: `${flight.currency}${taxes}` },
                  ...(baggageFee ? [{ label: `${selectedBaggage}kg Baggage`, value: `+${flight.currency}${baggageFee}` }] : []),
                ].map(r => (
                  <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.83rem', marginBottom: '0.4rem', color: 'var(--muted)' }}>
                    <span>{r.label}</span><span>{r.value}</span>
                  </div>
                ))}
                <div style={{
                  display: 'flex', justifyContent: 'space-between',
                  fontSize: '1rem', fontWeight: 700, color: 'var(--text)',
                  marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border)',
                }}>
                  <span>Total</span>
                  <span style={{ color: 'var(--gold)' }}>{flight.currency}{total}</span>
                </div>
              </div>

              {/* Secure notice */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.72rem', color: 'var(--muted)', margin: '0.75rem 0' }}>
                <span>🔒</span> Secure booking · Price locked in
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleContinue}
                disabled={loading}
                style={{
                  width: '100%', background: loading ? 'rgba(240,165,0,0.5)' : 'var(--gold)',
                  color: '#000', border: 'none', padding: '12px',
                  borderRadius: 10, fontWeight: 700, fontSize: '0.95rem',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                {loading ? '⏳ Processing...' : 'Continue to Extras →'}
              </motion.button>

              <div style={{ textAlign: 'center', fontSize: '0.72rem', color: 'var(--muted)', marginTop: '0.75rem' }}>
                You can review your booking before payment
              </div>
            </div>

            {/* Benefits card */}
            <div style={{
              marginTop: '1rem', background: 'linear-gradient(135deg, rgba(26,50,90,0.6), rgba(22,40,80,0.8))',
              border: '1px solid var(--border)', borderRadius: 12, padding: '1rem',
            }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--gold)' }}>
                🌟 Unlock exclusive benefits
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--muted)', marginBottom: '0.75rem' }}>
                Sign in or create an account to earn points and get member discounts.
              </div>
              <button style={{
                width: '100%', background: 'var(--navy3)', border: '1px solid var(--border)',
                color: 'var(--text)', padding: '8px', borderRadius: 8,
                fontSize: '0.8rem', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif",
              }}>
                Sign In / Create Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
