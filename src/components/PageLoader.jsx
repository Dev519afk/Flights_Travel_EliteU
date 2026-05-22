import React from 'react'
import { motion } from 'framer-motion'

export default function PageLoader() {
  return (
    <div style={{
      minHeight: '60vh', 
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'center', 
      justifyContent: 'center', 
      gap: '1.25rem',
      fontFamily: "'DM Sans', sans-serif"
    }}>
      {/* Your original rotating flight icon animated with premium dark graphite accenting */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
        style={{ 
          fontSize: '2.2rem', 
          color: '#1C2321',
          display: 'inline-block'
        }}
      >
        ✈
      </motion.div>

      {/* High-contrast elegant font layer placeholder notice */}
      <div style={{ 
        color: '#7A7A72', 
        fontSize: '0.88rem',
        fontWeight: 500,
        letterSpacing: '0.05em',
        textTransform: 'uppercase'
      }}>
        Loading Routes...
      </div>
    </div>
  )
}