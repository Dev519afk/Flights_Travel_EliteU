import axios from 'axios'

// Base axios instance — swap baseURL for real API later
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://api.flightstravel.example.com',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
})

// ─── MOCK DATA ────────────────────────────────────────────────────────────────

export const MOCK_FLIGHTS = [
  {
    id: 'QR-001',
    airline: 'Qatar Airways',
    airlineCode: 'QR',
    logo: '🟣',
    outbound: {
      dep: '08:45', arr: '14:35', depCode: 'MAN', arrCode: 'JFK',
      duration: '10h 50m', stops: 1, stopInfo: '1 Stop · DOH',
      depDate: '24 May 2026', arrDate: '24 May 2026',
    },
    inbound: {
      dep: '18:20', arr: '08:50', depCode: 'JFK', arrCode: 'MAN',
      duration: '9h 30m', stops: 1, stopInfo: '1 Stop · DOH',
      depDate: '31 May 2026', arrDate: '01 Jun 2026',
    },
    price: 389,
    currency: '£',
    cabin: 'Economy',
    seatsLeft: 4,
    isBestValue: true,
    amenities: ['wifi', 'meals', 'entertainment'],
  },
  {
    id: 'EK-002',
    airline: 'Emirates',
    airlineCode: 'EK',
    logo: '🔴',
    outbound: {
      dep: '09:30', arr: '16:20', depCode: 'MAN', arrCode: 'JFK',
      duration: '19h 50m', stops: 1, stopInfo: '1 Stop · DXB',
      depDate: '24 May 2026', arrDate: '24 May 2026',
    },
    inbound: {
      dep: '20:35', arr: '10:40', depCode: 'JFK', arrCode: 'MAN',
      duration: '9h 05m', stops: 1, stopInfo: '1 Stop · DXB',
      depDate: '31 May 2026', arrDate: '01 Jun 2026',
    },
    price: 419,
    currency: '£',
    cabin: 'Economy',
    seatsLeft: 7,
    isBestValue: false,
    amenities: ['wifi', 'meals', 'entertainment', 'lounge'],
  },
  {
    id: 'TK-003',
    airline: 'Turkish Airlines',
    airlineCode: 'TK',
    logo: '🔵',
    outbound: {
      dep: '07:20', arr: '15:05', depCode: 'MAN', arrCode: 'JFK',
      duration: '12h 45m', stops: 1, stopInfo: '1 Stop · IST',
      depDate: '24 May 2026', arrDate: '24 May 2026',
    },
    inbound: {
      dep: '22:10', arr: '12:25', depCode: 'JFK', arrCode: 'MAN',
      duration: '9h 15m', stops: 1, stopInfo: '1 Stop · IST',
      depDate: '31 May 2026', arrDate: '01 Jun 2026',
    },
    price: 459,
    currency: '£',
    cabin: 'Economy',
    seatsLeft: 12,
    isBestValue: false,
    amenities: ['meals', 'entertainment'],
  },
  {
    id: 'BA-004',
    airline: 'British Airways',
    airlineCode: 'BA',
    logo: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    outbound: {
      dep: '11:15', arr: '18:45', depCode: 'MAN', arrCode: 'JFK',
      duration: '12h 30m', stops: 1, stopInfo: '1 Stop · LHR',
      depDate: '24 May 2026', arrDate: '24 May 2026',
    },
    inbound: {
      dep: '21:30', arr: '08:20', depCode: 'JFK', arrCode: 'MAN',
      duration: '9h 50m', stops: 1, stopInfo: '1 Stop · LHR',
      depDate: '31 May 2026', arrDate: '01 Jun 2026',
    },
    price: 489,
    currency: '£',
    cabin: 'Economy',
    seatsLeft: 3,
    isBestValue: false,
    amenities: ['wifi', 'meals'],
  },
  {
    id: 'AF-005',
    airline: 'Air France',
    airlineCode: 'AF',
    logo: '🇫🇷',
    outbound: {
      dep: '10:40', arr: '18:05', depCode: 'MAN', arrCode: 'JFK',
      duration: '12h 25m', stops: 1, stopInfo: '1 Stop · CDG',
      depDate: '24 May 2026', arrDate: '24 May 2026',
    },
    inbound: {
      dep: '20:15', arr: '08:35', depCode: 'JFK', arrCode: 'MAN',
      duration: '7h 20m', stops: 1, stopInfo: '1 Stop · CDG',
      depDate: '31 May 2026', arrDate: '01 Jun 2026',
    },
    price: 499,
    currency: '£',
    cabin: 'Economy',
    seatsLeft: 9,
    isBestValue: false,
    amenities: ['meals', 'entertainment', 'wifi'],
  },
]

export const DATE_PRICES = [
  { date: '20 May', day: 'Tue', price: 389, label: '£389' },
  { date: '21 May', day: 'Wed', price: 352, label: '£352' },
  { date: '22 May', day: 'Thu', price: 319, label: '£319', isLowest: true },
  { date: '23 May', day: 'Fri', price: 329, label: '£329' },
  { date: '24 May', day: 'Sat', price: 342, label: '£342' },
]

export const DESTINATIONS = [
  { name: 'Maldives',   code: 'MLE' , price: 589, currency: '£', img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80'   },
  { name: 'Dubai',      code: 'DXB',  price: 339, currency: '£', img: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80'      },
  { name: 'New York',   code: 'JFK',  price: 389, currency: '£', img: 'https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?w=800&q=80'    },
  { name: 'Bali',       code: 'DPS',  price: 499, currency: '£', img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80'       },
  { name: 'Singapore',  code: 'SIN',  price: 439, currency: '£', img: 'https://images.unsplash.com/photo-1508962914676-134849a727f0?w=800&q=80'  },
  { name: 'Paris',      code: 'CDG',  price: 199, currency: '£', img: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80'      },
]

// ─── API FUNCTIONS ─────────────────────────────────────────────────────────────

/**
 * Search for available flights.
 * Replace the mock with: return api.get('/flights/search', { params })
 */
export async function searchFlights(params) {
  // Simulate network delay
  await new Promise(r => setTimeout(r, 800))

  // Filter mock data based on max price if provided
  let results = [...MOCK_FLIGHTS]
  if (params?.maxPrice) {
    results = results.filter(f => f.price <= params.maxPrice)
  }
  if (params?.airlines?.length) {
    results = results.filter(f => params.airlines.includes(f.airlineCode))
  }

  return { data: results, total: results.length }
}

/**
 * Get details for a single flight by ID.
 * Replace with: return api.get(`/flights/${id}`)
 */
export async function getFlightDetails(id) {
  await new Promise(r => setTimeout(r, 400))
  const flight = MOCK_FLIGHTS.find(f => f.id === id)
  if (!flight) throw new Error('Flight not found')
  return { data: flight }
}

/**
 * Create a booking.
 * Replace with: return api.post('/bookings', payload)
 */
export async function createBooking(payload) {
  await new Promise(r => setTimeout(r, 1200))

  // Simulate occasional failure (5% chance) — good for testing error states
  if (Math.random() < 0.05) {
    throw new Error('Payment gateway timeout. Please try again.')
  }

  return {
    data: {
      bookingId: 'FTE-' + Math.floor(100000 + Math.random() * 900000),
      status: 'confirmed',
      ...payload,
      createdAt: new Date().toISOString(),
    }
  }
}

/**
 * Get date price grid for a route.
 * Replace with: return api.get('/flights/prices', { params })
 */
export async function getDatePrices(params) {
  await new Promise(r => setTimeout(r, 300))
  return { data: DATE_PRICES }
}

export default api
