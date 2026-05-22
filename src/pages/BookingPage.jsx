import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useBookingStore } from '../store/bookingStore'
import { createBooking } from '../api/flights'
import ProgressBar from '../components/ProgressBar'
import SeatMap from '../components/SeatMap'

const inputStyle = {
  background: '#FAF9F6',
  border: '1px solid #E2E2DC',
  borderRadius: 8,
  padding: '11px 14px',
  color: '#1C2321',
  fontSize: '0.88rem',
  fontFamily: "'DM Sans', sans-serif",
  width: '100%',
  outline: 'none',
  transition: 'border-color 0.2s, background-color 0.2s',
}

function FormInput({ label, value, onChange, type = 'text', placeholder }) {
  const [focused, setFocused] = useState(false)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, textAlign: 'left' }}>
      <label style={{ fontSize: '0.72rem', color: '#7A7A72', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>
        {label}
      </label>
      <input
        type={type}
        value={value || ''}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{ 
          ...inputStyle, 
          borderColor: focused ? '#1C2321' : '#E2E2DC',
          background: focused ? '#ffffff' : '#FAF9F6'
        }}
      />
    </div>
  )
}

function Card({ title, children }) {
  return (
    <div style={{
      background: '#ffffff', border: '1px solid #E2E2DC',
      borderRadius: 12, padding: '1.5rem', marginBottom: '1.25rem',
      boxShadow: '0 4px 12px rgba(28,35,33,0.02)'
    }}>
      {title && (
        <h3 style={{
          fontSize: '1rem', fontWeight: 600, marginBottom: '1.25rem',
          paddingBottom: '0.75rem', borderBottom: '1px solid #FAF9F6',
          color: '#1C2321', textAlign: 'left'
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
    selectedFlight,
    passengers,
    addPassenger,
    removePassenger,
    updatePassenger,
    selectedSeats,
    setSelectedSeatForPassenger,
    selectedBaggage,
    setSelectedBaggageForPassenger,
    confirmBooking
  } = useBookingStore()
  
  // Track which traveler is currently active for selecting seats and bags
  const [activePassengerIdx, setActivePassengerIdx] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const flight = selectedFlight || {
    id: 'QR-001', airline: 'Qatar Airways', airlineCode: 'QR', price: 389, currency: '£',
    outbound: { dep: '08:45', arr: '14:35', depCode: 'MAN', arrCode: 'JFK', duration: '10h 50m', stopInfo: '1 Stop · DOH', depDate: '24 May 2026' },
    inbound:  { dep: '18:20', arr: '08:50', depCode: 'JFK', arrCode: 'MAN', duration: '9h 30m',  stopInfo: '1 Stop · DOH', depDate: '31 May 2026' },
  }

  const activePassenger = passengers[activePassengerIdx] || passengers[0]
  const basePricePerTicket = flight.price
  const taxesPerTicket = 87

  // Multi-passenger price breakdowns
  const totalBaseAndTaxes = (basePricePerTicket + taxesPerTicket) * passengers.length
  
  const totalBaggageFees = Object.values(selectedBaggage || {}).reduce((sum, bag) => {
    return sum + (bag === '20' ? 35 : bag === '32' ? 55 : 0)
  }, 0)

  const totalSeatUpgrades = Object.values(selectedSeats || {}).reduce((sum, seat) => {
    return sum + (seat?.extraLegroom ? 45 : 0)
  }, 0)

  const total = totalBaseAndTaxes + totalBaggageFees + totalSeatUpgrades

  const handleContinue = async () => {
    const incomplete = passengers.some(p => !p.firstName || !p.lastName || !p.email)
    if (incomplete) {
      setError('Please fill in the first name, last name, and email for all passengers.')
      return
    }
    setError(null)
    setLoading(true)
    try {
      await confirmBooking()
      navigate('/success')
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ background: '#FAF9F6', minHeight: '100vh', color: '#1C2321', fontFamily: "'DM Sans', sans-serif" }}>
      
      {/* Header */}
      <div style={{ background: '#ffffff', borderBottom: '1px solid #E2E2DC', padding: '1.5rem 1.5rem' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', textAlign: 'left' }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.5rem', fontWeight: 700, color: '#1C2321', margin: 0 }}>
            Complete your booking
          </h2>
          <p style={{ fontSize: '0.85rem', color: '#7A7A72', marginTop: 4, margin: 0 }}>
            You are moments away from your next adventure
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '1.5rem 1.5rem' }}>
        
        <div style={{ marginBottom: '2rem' }}>
          <ProgressBar currentStep={2} />
        </div>

        {/* Locked Grid Layout */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 340px', 
          gap: '1.5rem', 
          alignItems: 'start' 
        }}>
          
          {/* LEFT SIDE — Forms */}
          <div style={{ width: '100%' }}>
            
            {passengers.map((passenger, index) => (
              <div key={passenger.id} style={{ marginBottom: '1.5rem' }}>
                <Card title={`Passenger #${index + 1} (${index === activePassengerIdx ? 'Active Selector' : 'Traveler'})`}>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                    {/* Active/Select Indicator state badge layout */}
                    <button
                      type="button"
                      onClick={() => setActivePassengerIdx(index)}
                      style={{
                        background: activePassengerIdx === index ? '#1C2321' : 'transparent',
                        color: activePassengerIdx === index ? '#FAF9F6' : '#1C2321',
                        border: '1px solid #1C2321', padding: '6px 14px', borderRadius: 8, fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer'
                      }}
                    >
                      {activePassengerIdx === index ? '✓ Selected Active Passenger' : '⚡ Click to Customise Extras'}
                    </button>
                    {passengers.length > 1 && (
                      <button 
                        type="button"
                        onClick={() => { removePassenger(passenger.id); setActivePassengerIdx(0); }}
                        style={{ background: 'transparent', border: 'none', color: '#EF4444', fontSize: '0.82rem', cursor: 'pointer', fontWeight: 600 }}
                      >
                        Remove Traveler
                      </button>
                    )}
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                    <FormInput label="First Name" value={passenger.firstName} onChange={v => updatePassenger(passenger.id, 'firstName', v)} placeholder="John" />
                    <FormInput label="Last Name" value={passenger.lastName} onChange={v => updatePassenger(passenger.id, 'lastName', v)} placeholder="Doe" />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                    <FormInput label="Email Address" value={passenger.email} onChange={v => updatePassenger(passenger.id, 'email', v)} type="email" placeholder="john@example.com" />
                    <FormInput label="Phone Number" value={passenger.phone} onChange={v => updatePassenger(passenger.id, 'phone', v)} placeholder="+44 7700 900123" />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1rem' }}>
                    <FormInput label="Date of Birth" value={passenger.dob} onChange={v => updatePassenger(passenger.id, 'dob', v)} type="date" />
                    <FormInput label="Nationality" value={passenger.nationality} onChange={v => updatePassenger(passenger.id, 'nationality', v)} placeholder="British" />
                    <FormInput label="Passport Number" value={passenger.passportNumber} onChange={v => updatePassenger(passenger.id, 'passportNumber', v)} placeholder="AB1234567" />
                    <FormInput label="Passport Expiry" value={passenger.passportExpiry} onChange={v => updatePassenger(passenger.id, 'passportExpiry', v)} type="date" />
                  </div>

                  {/* Micro Summary for Selected seat and bag for this specific index loop path */}
                  <div style={{ marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid #FAF9F6', display: 'flex', gap: '1.5rem', fontSize: '0.82rem', color: '#555550', fontWeight: 500 }}>
                    <div>💺 Seat allocation: <strong style={{ color: '#1C2321' }}>{selectedSeats[passenger.id]?.id || 'Not Assigned'}</strong></div>
                    <div>🧳 Checked Baggage: <strong style={{ color: '#1C2321' }}>{selectedBaggage[passenger.id] ? `${selectedBaggage[passenger.id]}kg` : 'None Included'}</strong></div>
                  </div>
                </Card>
              </div>
            ))}

            {/* Add Passenger triggering slot banner */}
            <button 
              type="button"
              onClick={addPassenger}
              style={{ width: '100%', background: '#ffffff', border: '1px dashed #CBD5E1', padding: '1rem', borderRadius: 12, color: '#1C2321', fontWeight: 600, cursor: 'pointer', textAlign: 'center', marginBottom: '2rem' }}
            >
              + Add Another Passenger to Group
            </button>

            {/* Baggage Add-ons Selector Module linked dynamically to active passenger ID */}
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
              <Card title={`Baggage Add-ons — Customising Passenger #${activePassengerIdx + 1} (${activePassenger?.firstName || 'Traveler'})`}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  {[
                    { kg: '20', price: '35', icon: '🧳', desc: 'Standard hold bag' },
                    { kg: '32', price: '55', icon: '🛄', desc: 'Large hold bag' },
                  ].map(b => {
                    const isCurrentBagSelected = selectedBaggage[activePassenger?.id] === b.kg
                    return (
                      <div
                        key={b.kg}
                        onClick={() => setSelectedBaggageForPassenger(activePassenger?.id, b.kg)}
                        style={{
                          background: isCurrentBagSelected ? '#FAF9F6' : '#ffffff',
                          border: `1px solid ${isCurrentBagSelected ? '#1C2321' : '#E2E2DC'}`,
                          borderRadius: 12, padding: '1.25rem', cursor: 'pointer',
                          textAlign: 'center', transition: 'all 0.2s',
                          boxShadow: isCurrentBagSelected ? '0 4px 12px rgba(0,0,0,0.02)' : 'none'
                        }}
                      >
                        <div style={{ fontSize: '1.8rem', marginBottom: 6 }}>{b.icon}</div>
                        <div style={{ fontWeight: 600, fontSize: '0.88rem', marginBottom: 2, color: '#1C2321' }}>{b.kg}kg Checked Bag</div>
                        <div style={{ fontSize: '0.75rem', color: '#7A7A72', marginBottom: 8 }}>{b.desc}</div>
                        <div style={{ color: '#1C2321', fontWeight: 700, fontSize: '0.9rem' }}>+{flight.currency}{b.price} / bag</div>
                        {isCurrentBagSelected && (
                          <div style={{ fontSize: '0.72rem', color: '#16a34a', fontWeight: 600, marginTop: 6 }}>✓ Added</div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </Card>
            </motion.div>

            {error && (
              <div style={{ background: '#fef2f2', border: '1px solid #fca5a5', borderRadius: 8, padding: '0.85rem 1rem', color: '#dc2626', fontSize: '0.85rem', marginBottom: '1.25rem', textAlign: 'left', fontWeight: 500 }}>
                ⚠ {error}
              </div>
            )}
          </div>

          {/* RIGHT SIDE — Persistent Summary Column */}
          <div style={{ width: '100%', position: 'sticky', top: '100px' }}>
            <div style={{ background: '#ffffff', border: '1px solid #E2E2DC', borderRadius: 12, padding: '1.25rem', boxShadow: '0 4px 12px rgba(28,35,33,0.02)' }}>
              <h3 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '1.25rem', paddingBottom: '0.75rem', borderBottom: '1px solid #FAF9F6', color: '#1C2321', textAlign: 'left', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Your Trip Summary
              </h3>

              {/* Your Preferred Multi-Row SeatMap with Active Passenger Context Parameter */}
              <div style={{ marginBottom: '1.5rem', borderBottom: '1px solid #E2E2DC', paddingBottom: '1.5rem' }}>
                <SeatMap activePassengerId={activePassenger?.id} />
              </div>

              {[
                { label: 'Outbound Flight', leg: flight.outbound },
                { label: 'Return Flight',   leg: flight.inbound  },
              ].map(({ label, leg }) => (
                <div key={label} style={{ marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px solid #E2E2DC', textAlign: 'left' }}>
                  <div style={{ fontSize: '0.68rem', color: '#7A7A72', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4, fontWeight: 700 }}>{label}</div>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem', color: '#1C2321', marginBottom: 4 }}>{leg.depCode} → {leg.arrCode}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.82rem', color: '#555550', fontWeight: 500 }}>
                    <span>{leg.dep}</span><span style={{ color: '#7A7A72' }}>→</span><span>{leg.arr}</span>
                  </div>
                </div>
              ))}

              {/* Dynamic calculations list breakdown stack */}
              <div style={{ marginTop: '0.5rem', textAlign: 'left' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.83rem', marginBottom: '0.5rem', color: '#555550', fontWeight: 500 }}>
                  <span>Base Tickets ({passengers.length} × {flight.currency}{basePricePerTicket})</span>
                  <span>{flight.currency}{basePricePerTicket * passengers.length}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.83rem', marginBottom: '0.5rem', color: '#555550', fontWeight: 500 }}>
                  <span>Taxes ({passengers.length} × {flight.currency}{taxesPerTicket})</span>
                  <span>{flight.currency}{taxesPerTicket * passengers.length}</span>
                </div>
                {totalBaggageFees > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.83rem', marginBottom: '0.5rem', color: '#555550', fontWeight: 500 }}>
                    <span>Baggage Options Cost</span>
                    <span>+{flight.currency}{totalBaggageFees}</span>
                  </div>
                )}
                {totalSeatUpgrades > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.83rem', marginBottom: '0.5rem', color: '#555550', fontWeight: 500 }}>
                    <span>Extra Legroom Upgrades</span>
                    <span>+{flight.currency}{totalSeatUpgrades}</span>
                  </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.05rem', fontWeight: 700, color: '#1C2321', marginTop: '0.85rem', paddingTop: '0.85rem', borderTop: '1px solid #E2E2DC' }}>
                  <span>Total Due</span>
                  <span>{flight.currency}{total}</span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.72rem', color: '#16a34a', margin: '1rem 0', fontWeight: 600, justifyContent: 'center' }}>
                <span>🔒</span> Secure 256-Bit SSL Framework
              </div>

              <motion.button
                whileHover={{ scale: loading ? 1 : 1.01 }}
                whileTap={{ scale: loading ? 1 : 0.99 }}
                onClick={handleContinue}
                disabled={loading}
                style={{ width: '100%', background: '#1C2321', color: '#FAF9F6', border: 'none', padding: '12px', borderRadius: 10, fontWeight: 700, fontSize: '0.95rem', cursor: loading ? 'not-allowed' : 'pointer', fontFamily: "'DM Sans', sans-serif" }}
              >
                {loading ? '⏳ Processing...' : 'Complete Reservation →'}
              </motion.button>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}