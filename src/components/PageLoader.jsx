import React from 'react'
import { motion } from 'framer-motion'

export default function PageLoader() {
  return (
    <div style={{
      minHeight: '60vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', gap: '1.5rem',
    }}>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        style={{ fontSize: '2rem' }}
      >
        ✈
      </motion.div>
      <div style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>Loading...</div>
    </div>
  )
}
