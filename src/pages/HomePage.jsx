import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import SearchBox from '../components/SearchBox'
import { DESTINATIONS } from '../api/flights'
import { useBookingStore } from '../store/bookingStore'

const TESTIMONIALS = [
  { text: 'Genuinely the best booking experience. Found the cheapest Tokyo flight in minutes. Will never use another site.', author: 'Sarah J.', loc: 'Manchester, UK', stars: 5 },
  { text: 'Booked Paris for my anniversary. Seamless from search to boarding pass. The seat picker is brilliant.', author: 'Mike R.', loc: 'London, UK', stars: 5 },
  { text: 'Best price guarantee actually works — got refunded the difference automatically when prices dropped. Incredible.', author: 'Priya K.', loc: 'Birmingham, UK', stars: 5 },
]

const CERTS = ['IATA Certified', 'ABTA Member', 'ATOL Protected', 'Trustpilot Excellent ★★★★★']

const HOTELS_SHOWCASE = [
  { name: 'The Savoy Hotel', loc: 'London, UK', price: '349', rating: '4.9', img: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=600&auto=format&fit=crop' },
  { name: 'Marina Bay Sands', loc: 'Singapore', price: '420', rating: '4.8', img: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=600&auto=format&fit=crop' },
  { name: 'Riad Jasmine', loc: 'Marrakech, Morocco', price: '189', rating: '4.7', img: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=600&auto=format&fit=crop' }
]

const EXPERIENCES_SHOWCASE = [
  { title: 'Hot Air Balloon over Cappadocia', cat: 'Adventure', duration: '3 hrs', price: '140', img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=600&auto=format&fit=crop' },
  { title: 'Private Sushi Masterclass in Tokyo', cat: 'Food & Culture', duration: '4 hrs', price: '95', img: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=600&auto=format&fit=crop' }
]

const HOLIDAYS_SHOWCASE = [
  { title: 'Maldives Luxury Escape', duration: '7 Nights', highlights: 'Overwater Villa + Flights', price: '1,499', img: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?q=80&w=600&auto=format&fit=crop' },
  { title: 'Dubai City & Desert Oasis', duration: '5 Nights', highlights: '5★ Resort + Desert Safari', price: '799', img: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=600&auto=format&fit=crop' }
]

const ARTICLES_SHOWCASE = [
  { title: 'Best Places to Visit in 2026', desc: 'The definitive list of hot destinations curated by our travel editors.', date: '24 May 2026', img: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=600&auto=format&fit=crop' },
  { title: 'The Ultimate UK Travellers Guide', desc: 'Navigating global baggage claims, customs, and premium lounge hacks.', date: '12 May 2026', img: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=600&auto=format&fit=crop' }
]

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, delay },
})

export default function HomePage() {
  const navigate = useNavigate()
  const setSearchParams = useBookingStore(s => s.setSearchParams)

  const handleDestClick = (dest) => {
    setSearchParams({ to: `${dest.name} (${dest.code})`, toCode: dest.code })
    navigate('/flights')
  }

  return (
    <div style={{ background: '#FAF9F6', color: '#1C2321', fontFamily: "'DM Sans', sans-serif" }}>
      
      {/* ── HERO ─────────────────────────────────────────────────── */}
      <div style={{
        position: 'relative', minHeight: '85vh',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden', padding: '2rem 1rem'
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'url("https://images.unsplash.com/photo-1568607689150-17e625c1586e?q=80&w=2070&auto=format&fit=crop")',
          backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', opacity: 0.12
        }} />
        
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'radial-gradient(circle, rgba(28,35,33,0.1) 1px, transparent 1px)',
          backgroundSize: '44px 44px', opacity: 0.5,
        }} />

        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', width: '100%', maxWidth: 920 }}>
          <motion.div {...fadeUp(0.1)}>
            <div style={{
              display: 'inline-block', background: 'rgba(28,35,33,0.05)',
              border: '1px solid rgba(28,35,33,0.1)', borderRadius: 20,
              padding: '5px 16px', fontSize: '0.75rem', color: '#1C2321',
              marginBottom: '1.25rem', letterSpacing: '0.08em', textTransform: 'uppercase',
            }}>
              ✈ Trusted by 2.3M+ travellers
            </div>
          </motion.div>

          <motion.h1
            {...fadeUp(0.2)}
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(2.2rem, 5vw, 4.2rem)',
              fontWeight: 700, lineHeight: 1.15, marginBottom: '1rem', color: '#1C2321'
            }}
          >
            Journeys that <br className="hidden sm:inline" /> <em style={{ fontStyle: 'italic', color: '#7A7A72', fontStyle: 'italic' }}>stay with you</em>
          </motion.h1>

          <motion.p {...fadeUp(0.3)} style={{ color: '#555550', fontSize: '1rem', marginBottom: '2.5rem', maxWidth: 460, margin: '0 auto 2.5rem' }}>
            Discover the world with comfort, luxury and unforgettable experiences.
          </motion.p>

          <SearchBox />
        </div>
      </div> 

      {/* ── DESTINATIONS ─────────────────────────────────────────── */}
      <div style={{ padding: '4rem 1.5rem', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '2rem', flexWrap: 'wrap', gap: '10px' }}>
          <motion.h2
            initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.4 }}
            style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.8rem', margin: 0, textAlign: 'left' }}
          >
            Where will your next adventure take you?
          </motion.h2>
          <button
            onClick={() => navigate('/flights')}
            style={{ background: 'none', border: 'none', color: '#1C2321', fontSize: '0.85rem', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", fontWeight: 600, textDecoration: 'underline' }}
          >
            View all →
          </button>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', justifyContent: 'center' }}>
          {DESTINATIONS.slice(0, 6).map((dest, i) => (
            <motion.div
              key={dest.name}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.05 }}
              whileHover={{ y: -4 }}
              onClick={() => handleDestClick(dest)}
              style={{
                background: '#ffffff', border: '1px solid #E2E2DC',
                borderRadius: 12, overflow: 'hidden', cursor: 'pointer',
                flex: '1 1 180px', minWidth: '160px', maxWidth: '220px',
                transition: 'all 0.2s', boxShadow: '0 4px 12px rgba(0,0,0,0.02)'
              }}
            >
              <div style={{
                height: 130, display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundImage: `url(${dest.img})`, backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative',
              }}>
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 60%)' }} />
                <span style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))', fontSize: '2rem', zIndex: 1 }}>{dest.emoji}</span>
              </div>
              <div style={{ padding: '0.75rem 1rem', textAlign: 'left' }}>
                <div style={{ fontWeight: 600, marginBottom: 2, fontSize: '0.9rem' }}>{dest.name}</div>
                <div style={{ fontSize: '0.75rem', color: '#7A7A72' }}>
                  From <span style={{ color: '#1C2321', fontWeight: 700 }}>{dest.currency || '£'}{dest.price}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── HOTELS SHOWCASE ────────────────────────────────────── */}
      <div style={{ background: '#ffffff', borderTop: '1px solid #E2E2DC', borderBottom: '1px solid #E2E2DC', padding: '4rem 1.5rem' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ marginBottom: '2rem', textAlign: 'left' }}>
            <div style={{ fontSize: '0.68rem', color: '#7A7A72', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700 }}>Luxury Stays</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.8rem', margin: '4px 0 0 0' }}>Handselected Hotels</h2>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', justifyContent: 'center' }}>
            {HOTELS_SHOWCASE.map((hotel) => (
              <div key={hotel.name} style={{ flex: '1 1 280px', maxWidth: '380px', minWidth: '260px' }}>
                <div style={{ height: 180, borderRadius: 8, overflow: 'hidden', position: 'relative', marginBottom: '0.75rem' }}>
                  <img src={hotel.img} alt={hotel.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', top: 12, right: 12, background: 'rgba(255,255,255,0.9)', padding: '2px 8px', borderRadius: 4, fontSize: '0.75rem', fontWeight: 700 }}>★ {hotel.rating}</div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', textAlign: 'left' }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>{hotel.name}</div>
                    <div style={{ fontSize: '0.75rem', color: '#7A7A72' }}>{hotel.loc}</div>
                  </div>
                  <div style={{ textAlign: 'right', fontSize: '0.85rem' }}>
                    <span style={{ color: '#7A7A72', fontSize: '0.7rem' }}>From</span>
                    <div style={{ fontWeight: 700 }}>£{hotel.price}<span style={{ fontWeight: 400, fontSize: '0.75rem', color: '#7A7A72' }}>/nt</span></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── EXPERIENCES & PACKAGES UNIFIED RESPONSIVE GRID ── */}
      <div style={{ padding: '4rem 1.5rem', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '2.5rem',
          alignItems: 'start'
        }}>
          
          {/* 1. Experiences Section Block */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ marginBottom: '1.5rem', borderBottom: '1px solid #E2E2DC', paddingBottom: '0.5rem', textAlign: 'left' }}>
              <div style={{ fontSize: '0.68rem', color: '#7A7A72', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700 }}>Curated Activities</div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.6rem', margin: '2px 0 0 0', color: '#1C2321' }}>Unmissable Experiences</h2>
            </div>
            
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', 
              gap: '1.25rem' 
            }}>
              {EXPERIENCES_SHOWCASE.map((exp) => (
                <div 
                  key={exp.title} 
                  style={{ 
                    background: '#ffffff', 
                    border: '1px solid #E2E2DC', 
                    borderRadius: 12, 
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    height: '100%',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.01)'
                  }}
                >
                  <div style={{ height: 140, position: 'relative', overflow: 'hidden' }}>
                    <img src={exp.img} alt={exp.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <span style={{ position: 'absolute', bottom: 8, left: 8, background: '#1C2321', color: '#fff', fontSize: '0.65rem', padding: '3px 6px', borderRadius: 4, fontWeight: 600 }}>
                      {exp.duration}
                    </span>
                  </div>

                  <div style={{ padding: '1rem', flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', textAlign: 'left' }}>
                    <div style={{ marginBottom: '1rem' }}>
                      <span style={{ fontSize: '0.65rem', textTransform: 'uppercase', color: '#7A7A72', fontWeight: 600 }}>{exp.cat}</span>
                      <div style={{ fontWeight: 600, fontSize: '0.9rem', color: '#1C2321', marginTop: 4, lineHeight: 1.3, minHeight: '36px' }}>
                        {exp.title}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#7A7A72', marginTop: 4, visibility: 'hidden' }}>Placeholder</div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.75rem', borderTop: '1px solid #FAF9F6' }}>
                      <span style={{ fontSize: '0.8rem', color: '#555550' }}>From <strong style={{ color: '#1C2321', fontSize: '0.95rem' }}>£{exp.price}</strong></span>
                      <button style={{ background: 'none', border: '1px solid #1C2321', padding: '3px 10px', borderRadius: 6, fontSize: '0.72rem', fontWeight: 600, color: '#1C2321', cursor: 'pointer' }}>View</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 2. Holiday Packages Section Block */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ marginBottom: '1.5rem', borderBottom: '1px solid #E2E2DC', paddingBottom: '0.5rem', textAlign: 'left' }}>
              <div style={{ fontSize: '0.68rem', color: '#7A7A72', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700 }}>All-Inclusive</div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.6rem', margin: '2px 0 0 0', color: '#1C2321' }}>Holiday Packages</h2>
            </div>
            
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', 
              gap: '1.25rem' 
            }}>
              {HOLIDAYS_SHOWCASE.map((pkg) => (
                <div 
                  key={pkg.title} 
                  style={{ 
                    background: '#ffffff', 
                    border: '1px solid #E2E2DC', 
                    borderRadius: 12, 
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    height: '100%',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.01)'
                  }}
                >
                  <div style={{ height: 140, position: 'relative', overflow: 'hidden' }}>
                    <img src={pkg.img} alt={pkg.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <span style={{ position: 'absolute', bottom: 8, left: 8, background: '#1C2321', color: '#fff', fontSize: '0.65rem', padding: '3px 6px', borderRadius: 4, fontWeight: 600 }}>
                      {pkg.duration}
                    </span>
                  </div>

                  <div style={{ padding: '1rem', flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', textAlign: 'left' }}>
                    <div style={{ marginBottom: '1rem' }}>
                      <span style={{ fontSize: '0.65rem', textTransform: 'uppercase', color: '#7A7A72', fontWeight: 600, visibility: 'hidden' }}>Package</span>
                      <div style={{ fontWeight: 600, fontSize: '0.9rem', color: '#1C2321', marginTop: 4, lineHeight: 1.3, minHeight: '36px' }}>
                        {pkg.title}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#7A7A72', marginTop: 4 }}>
                        {pkg.highlights}
                      </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.75rem', borderTop: '1px solid #FAF9F6' }}>
                      <span style={{ fontSize: '0.8rem', color: '#555550' }}>From <strong style={{ color: '#1C2321', fontSize: '0.95rem' }}>£{pkg.price}</strong></span>
                      <button style={{ background: 'none', border: '1px solid #1C2321', padding: '3px 10px', borderRadius: 6, fontSize: '0.72rem', fontWeight: 600, color: '#1C2321', cursor: 'pointer' }}>View</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* ── DISCOVER / TRAVEL GUIDES ───────────────────────────── */}
      <div style={{ background: '#ffffff', borderTop: '1px solid #E2E2DC', padding: '4rem 1.5rem' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ marginBottom: '2rem', borderBottom: '1px solid #E2E2DC', paddingBottom: '0.5rem', textAlign: 'left' }}>
            <div style={{ fontSize: '0.68rem', color: '#7A7A72', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700 }}>Inspiration Hub</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.8rem', margin: '2px 0 0 0' }}>Discover & Travel Guides</h2>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem' }}>
            {ARTICLES_SHOWCASE.map((art) => (
              <div key={art.title} style={{ flex: '1 1 45%', minWidth: '290px', display: 'flex', gap: '1rem', background: '#FAF9F6', padding: '1rem', borderRadius: 12, border: '1px solid #E2E2DC', textAlign: 'left' }}>
                <img src={art.img} alt={art.title} style={{ width: 100, height: 90, objectFit: 'cover', borderRadius: 8 }} />
                <div>
                  <span style={{ fontSize: '0.7rem', color: '#7A7A72' }}>{art.date}</span>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: '1rem', marginTop: 2 }}>{art.title}</div>
                  <div style={{ fontSize: '0.75rem', color: '#555550', marginTop: 4, lineHeight: 1.4 }}>{art.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── TESTIMONIALS ─────────────────────────────────────────── */}
      <div style={{ padding: '4rem 1.5rem', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'left' }}>
          <motion.h2
            initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.8rem', margin: 0 }}
          >
            Why travellers choose us
          </motion.h2>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', marginTop: '2rem' }}>
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.05 }}
              style={{
                background: '#ffffff', border: '1px solid #E2E2DC',
                borderRadius: 12, padding: '1.25rem', flex: '1 1 280px', textAlign: 'left'
              }}
            >
              <div style={{ color: '#1C2321', fontSize: '0.9rem', marginBottom: '0.5rem', letterSpacing: '2px' }}>
                {'★'.repeat(t.stars)}
              </div>
              <p style={{ fontSize: '0.85rem', color: '#555550', marginBottom: '1.25rem', lineHeight: 1.6, fontStyle: 'italic' }}>
                "{t.text}"
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, paddingTop: '0.75rem', borderTop: '1px solid #FAF9F6' }}>
                <div style={{
                  width: 34, height: 34, borderRadius: '50%',
                  background: '#1C2321', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', fontWeight: 600, fontSize: '0.78rem', color: '#FAF9F6',
                }}>
                  {t.author.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>{t.author}</div>
                  <div style={{ fontSize: '0.72rem', color: '#7A7A72' }}>{t.loc}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div style={{
          display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap',
          padding: '1.5rem', background: '#ffffff', marginTop: '3rem',
          borderRadius: 12, border: '1px solid #E2E2DC',
        }}>
          {CERTS.map(c => (
            <div key={c} style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#555550', fontSize: '0.82rem', fontWeight: 500 }}>
              <span style={{ fontSize: '1rem' }}>🏅</span>
              {c}
            </div>
          ))}
        </div>
      </div>

      {/* ── CLEAN RESPONSIVE LIGHT FOOTER DIRECTORY ───────────────── */}
      <footer style={{ background: '#ffffff', borderTop: '1px solid #E2E2DC', padding: '3rem 1.5rem 2rem' }}>
        <div style={{
          maxWidth: 1200, margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: '2.5rem', justifyContent: 'space-between'
        }}>
          <div style={{ flex: '2 1 300px', minWidth: '260px', textAlign: 'left' }}>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.3rem', fontWeight: 700, margin: 0, color: '#1C2321' }}>
              FlightsTravel
            </h3>
            <div style={{ fontSize: '0.72rem', color: '#7A7A72', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 600, marginTop: 2 }}>
              Elite
            </div>
            <p style={{ color: '#555550', fontSize: '0.8rem', lineHeight: 1.6, marginTop: '1rem', maxWidth: '340px' }}>
              Providing beautiful bespoke global itineraries, flight solutions, and protected holiday frameworks for discerning holidaymakers.
            </p>
          </div>

          <div style={{ flex: '1 1 140px', minWidth: '120px', textAlign: 'left' }}>
            <h4 style={{ fontSize: '0.68rem', textTransform: 'uppercase', tracking: '0.1em', fontWeight: 700, color: '#1C2321', marginBottom: '0.75rem' }}>Company</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.8rem', color: '#555550' }}>
              <span style={{ cursor: 'pointer' }}>About Us</span>
              <span style={{ cursor: 'pointer' }}>Our Promise</span>
            </div>
          </div>

          <div style={{ flex: '1 1 140px', minWidth: '120px', textAlign: 'left' }}>
            <h4 style={{ fontSize: '0.68rem', textTransform: 'uppercase', tracking: '0.1em', fontWeight: 700, color: '#1C2321', marginBottom: '0.75rem' }}>Support</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.8rem', color: '#555550' }}>
              <span style={{ cursor: 'pointer' }}>Help Centre</span>
              <span style={{ cursor: 'pointer' }}>Manage Booking</span>
            </div>
          </div>

          <div style={{ flex: '1 1 140px', minWidth: '120px', textAlign: 'left' }}>
            <h4 style={{ fontSize: '0.68rem', textTransform: 'uppercase', tracking: '0.1em', fontWeight: 700, color: '#1C2321', marginBottom: '0.75rem' }}>Travel Guides</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.8rem', color: '#555550' }}>
              <span style={{ cursor: 'pointer' }}>Europe Hubs</span>
              <span style={{ cursor: 'pointer' }}>Asia Escapes</span>
            </div>
          </div>
        </div>

        <div style={{
          maxWidth: 1200, margin: '2rem auto 0', paddingTop: '1.5rem', borderTop: '1px solid #FAF9F6',
          display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem',
          fontSize: '0.75rem', color: '#7A7A72'
        }}>
          <span>© 2026 FlightsTravel Elite · Book with confidence · All rights reserved</span>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <span style={{ cursor: 'pointer', textDecoration: 'underline' }}>Privacy Policy</span>
            <span style={{ cursor: 'pointer', textDecoration: 'underline' }}>Terms & Conditions</span>
          </div>
        </div>
      </footer>

    </div>
  )
}