import React from 'react'

const STEPS = ['Flights', 'Traveller Details', 'Extras', 'Payment', 'Confirmation']

export default function ProgressBar({ currentStep = 1 }) {
  return (
    <div style={{
      background: 'var(--card)', border: '1px solid var(--border)',
      borderRadius: 12, padding: '0.9rem 1.5rem',
      marginBottom: '1.25rem',
    }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {STEPS.map((label, i) => {
          const stepNum = i + 1
          const isDone   = stepNum < currentStep
          const isActive = stepNum === currentStep

          return (
            <React.Fragment key={label}>
              {i > 0 && (
                <div style={{
                  flex: 1, height: 1,
                  background: isDone ? 'var(--green)' : 'var(--border)',
                  margin: '0 6px', transition: 'background 0.3s',
                }} />
              )}
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{
                  width: 24, height: 24, borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.7rem', fontWeight: 700, flexShrink: 0,
                  background: isDone ? 'var(--green)' : isActive ? 'var(--gold)' : 'var(--border)',
                  color: isDone ? '#fff' : isActive ? '#000' : 'var(--muted)',
                  transition: 'all 0.3s',
                }}>
                  {isDone ? '✓' : stepNum}
                </div>
                <span style={{
                  fontSize: '0.75rem',
                  color: isDone ? 'var(--green)' : isActive ? 'var(--text)' : 'var(--muted)',
                  fontWeight: isActive ? 500 : 400,
                  whiteSpace: 'nowrap',
                }}>
                  {label}
                </span>
              </div>
            </React.Fragment>
          )
        })}
      </div>
    </div>
  )
}
