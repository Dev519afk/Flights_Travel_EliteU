import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const NAV_LINKS = [
  { name: 'Flights', path: '/' },
  { name: 'Hotels', path: '/' },
  { name: 'Experiences', path: '/' },
  { name: 'Holidays', path: '/' },
  { name: 'Discover', path: '/' }
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => { 
    setMobileMenuOpen(false) 
  }, [location])

  return (
    <>
      <motion.nav
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className={`sticky top-0 z-50 w-full transition-all duration-300 px-4 sm:px-6 md:px-12 h-20 flex items-center justify-between ${
          scrolled 
            ? 'bg-[#FAF9F6]/95 backdrop-blur-md border-b border-[#E2E2DC] shadow-sm' 
            : 'bg-[#FAF9F6] border-b border-[#FAF9F6]'
        }`}
      >
        {/* Brand Identity / Logo */}
        <Link to="/" className="flex items-center gap-2 group focus:outline-none shrink-0">
          <span className="text-xl text-[#1C2321] transition-transform duration-300 group-hover:scale-105">✈</span>
          <div className="flex flex-col">
            <div className="font-serif text-base font-bold text-[#1C2321] tracking-tight leading-tight">
              FlightsTravel
            </div>
            <div className="text-[10px] text-[#7A7A72] tracking-[0.15em] uppercase font-semibold">
              Elite
            </div>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <ul className="hidden md:flex items-center gap-6 lg:gap-8 font-medium mx-4">
          {NAV_LINKS.map((link) => {
            const isActive = location.pathname === link.path && link.name === 'Flights'
            return (
              <li key={link.name} className="relative py-2">
                <Link
                  to={link.path}
                  className={`text-sm tracking-wide transition-colors duration-200 hover:text-[#1C2321] whitespace-nowrap ${
                    isActive ? 'text-[#1C2321] font-bold' : 'text-[#7A7A72]'
                  }`}
                >
                  {link.name}
                </Link>
                {isActive && (
                  <motion.div 
                    layoutId="activeIndicator"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#1C2321]"
                  />
                )}
              </li>
            )
          })}
        </ul>

        {/* Right side CTA & Trust Suite */}
        <div className="hidden md:flex items-center gap-4 lg:gap-6 shrink-0">
          <div className="text-right hidden lg:flex flex-col justify-center">
            <div className="text-[#4A4A42] text-xs font-bold tracking-widest leading-none">
              ★★★★★
            </div>
            <div className="text-[11px] text-[#7A7A72] mt-1 whitespace-nowrap">
              4.9/5 · 2,341 reviews
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.01, backgroundColor: '#1C2321', color: '#FAF9F6' }}
            whileTap={{ scale: 0.99 }}
            className="border border-[#1C2321] text-[#1C2321] font-semibold text-xs uppercase tracking-wider px-4 lg:px-5 py-2.5 rounded-lg transition-all duration-200"
          >
            Plan your trip
          </motion.button>
        </div>

        {/* Mobile Menu Action Button */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden flex flex-col justify-center items-center gap-1.5 w-8 h-8 focus:outline-none"
          aria-label="Toggle Menu"
        >
          <span className={`h-0.5 w-6 bg-[#1C2321] transition-transform duration-300 ${mobileMenuOpen ? 'rotate-44 translate-y-2' : ''}`} />
          <span className={`h-0.5 w-6 bg-[#1C2321] transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`} />
          <span className={`h-0.5 w-6 bg-[#1C2321] transition-transform duration-300 ${mobileMenuOpen ? '-rotate-44 -translate-y-2' : ''}`} />
        </button>
      </motion.nav>

      {/* Mobile Drawer Menu Overlays */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed top-20 left-0 w-full bg-[#FAF9F6] border-b border-[#E2E2DC] px-6 py-8 flex flex-col gap-6 z-40 shadow-lg md:hidden"
          >
            <ul className="flex flex-col gap-5 font-medium">
              {NAV_LINKS.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-base text-[#1C2321] block py-1"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            <hr className="border-[#E2E2DC]" />
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-center sm:text-left">
                <div className="text-[#4A4A42] text-xs font-bold tracking-widest">★★★★★</div>
                <div className="text-[11px] text-[#7A7A72] mt-0.5">4.9/5 · 2,341 reviews</div>
              </div>
              <button className="w-full sm:w-auto bg-[#1C2321] text-[#FAF9F6] font-semibold text-center px-6 py-3 rounded-lg text-sm shadow-sm">
                Plan your trip
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}