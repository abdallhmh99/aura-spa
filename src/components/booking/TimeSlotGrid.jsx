import React from 'react'

export default function TimeSlotGrid({ slots, availableSlots, isLoading, error, onSelectTime, selectedTime }) {
  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '32px 0' }}>
        <p style={{ color: 'var(--body)', fontFamily: '"Space Mono", monospace', fontSize: '14px' }}>جاري التحقق من الأوقات المتاحة...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div style={{ padding: '16px', border: '2px solid var(--border-danger-subtle)', backgroundColor: 'var(--danger-soft)', borderRadius: '4px', margin: '16px 0' }}>
        <p style={{ color: 'var(--fg-danger-strong)', fontFamily: '"Space Grotesk", sans-serif', margin: 0 }}>{error}</p>
      </div>
    )
  }

  if (!slots || slots.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '32px', border: '1px solid var(--border-default, #E4E0D9)', borderRadius: '4px', backgroundColor: 'var(--neutral-secondary, #FBF6EC)', margin: '16px 0' }}>
        <p style={{ color: 'var(--body, #637EC2)', fontFamily: '"Space Mono", monospace', fontSize: '14px', margin: 0 }}>الرجاء اختيار التاريخ لعرض الأوقات المتاحة.</p>
      </div>
    )
  }

  if (availableSlots.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '32px', border: '1px solid var(--border-warning-subtle)', borderRadius: '4px', backgroundColor: 'var(--warning-soft)', margin: '16px 0' }}>
        <p style={{ color: 'var(--fg-warning)', fontFamily: '"Space Grotesk", sans-serif', fontWeight: 600, margin: '0 0 8px 0' }}>عذراً، لا توجد أوقات متاحة في هذا اليوم.</p>
        <p style={{ color: 'var(--body, #637EC2)', fontSize: '14px', margin: 0 }}>يرجى اختيار يوم آخر.</p>
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '24px' }}>
      <div>
        <h3 style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: '18px', fontWeight: 700, color: 'var(--heading, #2C3FA7)', margin: '0 0 4px 0' }}>اختاري الوقت</h3>
        <p style={{ color: 'var(--body, #637EC2)', fontSize: '14px', margin: 0 }}>الأوقات المتاحة للحجز:</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))', gap: '10px' }}>
        {slots.map((slot, index) => {
          const isSelected = selectedTime === slot.time
          const isAvailable = slot.available

          return (
            <button
              key={`${slot.time}-${index}`}
              disabled={!isAvailable}
              onClick={() => isAvailable && onSelectTime(slot.time)}
              style={{
                padding: '10px 4px', borderRadius: '4px', fontFamily: '"Space Mono", monospace', fontSize: '14px',
                cursor: isAvailable ? 'pointer' : 'not-allowed', transition: 'all 120ms',
                border: !isAvailable ? '1px solid transparent' : isSelected ? '2px solid #F237A1' : '1px solid var(--border-default, #E4E0D9)',
                backgroundColor: !isAvailable ? 'var(--neutral-primary, #F3EEE4)' : isSelected ? '#FDE3F0' : 'var(--neutral-secondary, #FBF6EC)',
                color: !isAvailable ? 'var(--body, #637EC2)' : 'var(--heading, #2C3FA7)',
                opacity: isAvailable ? 1 : 0.4,
                textDecoration: isAvailable ? 'none' : 'line-through',
                boxShadow: isSelected ? '2px 2px 0 0 #2C3FA7' : 'none',
                transform: isSelected ? 'translate(2px, 2px)' : 'none',
              }}
            >
              {slot.time}
            </button>
          )
        })}
      </div>
    </div>
  )
}
