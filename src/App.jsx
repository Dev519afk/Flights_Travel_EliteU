import React, { Suspense, lazy } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Nav from './components/Nav'
import PageLoader from './components/PageLoader'

// Lazy load pages for performance
const HomePage    = lazy(() => import('./pages/HomePage'))
const ListingPage = lazy(() => import('./pages/ListingPage'))
const BookingPage = lazy(() => import('./pages/BookingPage'))
const SuccessPage = lazy(() => import('./pages/SuccessPage'))

export default function App() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--navy)' }}>
      <Nav />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/"         element={<HomePage />} />
          <Route path="/flights"  element={<ListingPage />} />
          <Route path="/booking"  element={<BookingPage />} />
          <Route path="/success"  element={<SuccessPage />} />
          <Route path="*"         element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </div>
  )
}
