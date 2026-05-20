# ✈ FlightsTravel Elite

A production-ready travel booking web application built with **React + Vite + Tailwind CSS**.  
Dark luxury theme · 4 full pages · Framer Motion animations · Zustand state · Mock API ready.

---

## 🚀 Quick Start (3 commands)

```bash
npm install
npm run dev
# Open http://localhost:5173
```

---

## 📁 Project Structure

```
src/
├── api/
│   └── flights.js          ← Mock API (swap for real API here)
├── components/
│   ├── Nav.jsx             ← Sticky navbar
│   ├── SearchBox.jsx       ← Flight search form
│   ├── FlightCard.jsx      ← Individual flight result card
│   ├── SeatMap.jsx         ← Interactive airplane seat picker
│   ├── ProgressBar.jsx     ← Booking step progress indicator
│   └── PageLoader.jsx      ← Suspense loading spinner
├── pages/
│   ├── HomePage.jsx        ← Landing page + hero + destinations
│   ├── ListingPage.jsx     ← Flight search results + filters
│   ├── BookingPage.jsx     ← Passenger details + seat + baggage
│   └── SuccessPage.jsx     ← Booking confirmation + ticket
├── store/
│   └── bookingStore.js     ← Zustand global state (persisted)
├── hooks/
│   └── useFlights.js       ← Custom hooks for flight data
├── App.jsx                 ← Router setup + lazy loading
├── main.jsx                ← Entry point
└── index.css               ← Global styles + CSS variables
```

---

## 🔌 Connecting a Real API

All API calls are in `src/api/flights.js`. Replace mock functions:

```js
// BEFORE (mock)
export async function searchFlights(params) {
  await new Promise(r => setTimeout(r, 800))
  return { data: MOCK_FLIGHTS }
}

// AFTER (real API)
export async function searchFlights(params) {
  const res = await api.get('/flights/search', { params })
  return res.data
}
```

Set your API base URL in `.env`:
```
VITE_API_URL=https://your-api.com
```

---

## 🌐 Deploy to Vercel

**Option A — CLI:**
```bash
npm run build
npx vercel
```

**Option B — Git (auto-deploy):**
1. Push to GitHub
2. Go to [vercel.com](https://vercel.com) → Import project
3. Select your repo → Deploy

`vercel.json` is already configured for SPA routing.

---

## 🎨 Design Tokens (CSS Variables)

| Variable     | Value     | Usage              |
|--------------|-----------|--------------------|
| `--navy`     | `#0a1628` | Page background    |
| `--card`     | `#111d35` | Card backgrounds   |
| `--gold`     | `#f0a500` | CTAs, accents      |
| `--gold2`    | `#ffc53d` | Hover gold         |
| `--muted`    | `#7b8db0` | Secondary text     |
| `--border`   | `#1e3060` | Borders, dividers  |
| `--green`    | `#22c55e` | Success, best value|
| `--accent`   | `#1a73e8` | Links, available seats |

---

## 📦 Dependencies

| Package           | Purpose                        |
|-------------------|--------------------------------|
| `react-router-dom`| Client-side routing            |
| `framer-motion`   | Animations & transitions       |
| `zustand`         | Global state (with persistence)|
| `axios`           | HTTP client for API calls      |
| `tailwindcss`     | Utility CSS framework          |

---

## 🗺 Pages & Routes

| Route      | Page            | Description                        |
|------------|-----------------|------------------------------------|
| `/`        | HomePage        | Hero, search, destinations, reviews|
| `/flights` | ListingPage     | Results, filters, date grid        |
| `/booking` | BookingPage     | Passenger form, seats, baggage     |
| `/success` | SuccessPage     | Confirmation, ticket, upsells      |

---

## 🔮 Next Steps (Production)

- [ ] Integrate **Amadeus API** or **Skyscanner API** for real flight data
- [ ] Add **Stripe** for payment processing
- [ ] Add **Firebase Auth** or **Clerk** for user accounts
- [ ] Add **Supabase** for booking database
- [ ] Add **Resend** or **SendGrid** for confirmation emails
- [ ] Add **i18n** for multi-language support
- [ ] Add **React Query** for data fetching + caching
