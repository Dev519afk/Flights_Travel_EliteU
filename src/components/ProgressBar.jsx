import React from 'react'

const STEPS = [
  { step: 1, name: 'Flights' },
  { step: 2, name: 'Traveller Details' },
  { step: 3, name: 'Extras' },
  { step: 4, name: 'Payment' },
  { step: 5, name: 'Confirmation' }
]

export default function ProgressBar({ currentStep = 2 }) {
  return (
    <div 
      style={{
        background: '#ffffff',
        border: '1px solid #E2E2DC',
        borderRadius: 12,
        padding: '1rem 1.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem',
        width: '100%',
        boxShadow: '0 4px 12px rgba(28,35,33,0.01)'
      }}
    >
      {STEPS.map((s, idx) => {
        const isCompleted = currentStep > s.step
        const isActive = currentStep === s.step

        return (
          <div 
            key={s.step} 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.5rem',
              flexShrink: 0 
            }}
          >
            {/* Step Status Indicator Circle */}
            <div 
              style={{
                width: 24,
                height: 24,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.75rem',
                fontWeight: 700,
                transition: 'all 0.3s',
                background: isCompleted ? '#16a34a' : isActive ? '#1C2321' : '#FAF9F6',
                border: `1px solid ${isActive || isCompleted ? 'transparent' : '#E2E2DC'}`,
                color: isCompleted || isActive ? '#FAF9F6' : '#7A7A72'
              }}
            >
              {isCompleted ? '✓' : s.step}
            </div>

            {/* Step Label Name Text Block */}
            <span 
              style={{
                fontSize: '0.85rem',
                fontWeight: isActive ? 700 : 500,
                color: isActive ? '#1C2321' : '#7A7A72',
                transition: 'color 0.3s'
              }}
            >
              {s.name}
            </span>

            {/* Connecting line delimiter between steps (hidden on final step item node) */}
            {idx < STEPS.length - 1 && (
              <div 
                style={{
                  width: '2rem',
                  height: 1,
                  background: isCompleted ? '#16a34a' : '#E2E2DC',
                  marginLeft: '0.5rem',
                  display: 'none', // Fallback container auto-flows grid layout gracefully across views
                  '@media (minWidth: 640px)': { display: 'block' }
                }}
                className="hidden sm:block"
              />
            )}
          </div>
        )
      })}
    </div>
  )
}