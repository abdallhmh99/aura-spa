import React from 'react'
import { format, addDays, isSameDay, startOfToday } from 'date-fns'
import { arSA } from 'date-fns/locale'

export default function BookingCalendar({ selectedDate, onSelectDate }) {
  const today = startOfToday()
  const days = Array.from({ length: 14 }).map((_, i) => addDays(today, i))

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <h3 style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: '20px', fontWeight: 700, color: 'var(--heading, #2C3FA7)', margin: '0 0 8px 0' }}>اختاري التاريخ</h3>
        <p style={{ color: 'var(--body, #637EC2)', fontSize: '14px', margin: 0 }}>حددي اليوم المناسب لك من الأيام المتاحة القادمة.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))', gap: '8px' }}>
        {days.map(day => {
          const isSelected = selectedDate && isSameDay(day, selectedDate)
          return (
            <button
              key={day.toISOString()}
              onClick={() => onSelectDate(day)}
              style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                padding: '12px 8px', borderRadius: '4px', cursor: 'pointer', transition: 'all 120ms',
                border: isSelected ? '2px solid #F237A1' : '1px solid var(--border-default, #E4E0D9)',
                backgroundColor: isSelected ? '#FDE3F0' : 'var(--neutral-secondary, #FBF6EC)',
                boxShadow: isSelected ? '2px 2px 0 0 #2C3FA7' : 'none',
                transform: isSelected ? 'translate(2px, 2px)' : 'none',
              }}
              onMouseEnter={e => { if (!isSelected) e.currentTarget.style.backgroundColor = '#F4ECDA' }}
              onMouseLeave={e => { if (!isSelected) e.currentTarget.style.backgroundColor = 'var(--neutral-secondary, #FBF6EC)' }}
            >
              <span style={{ fontSize: '11px', fontFamily: '"Space Mono", monospace', textTransform: 'uppercase', marginBottom: '4px', color: 'var(--body, #637EC2)' }}>
                {format(day, 'EEE', { locale: arSA })}
              </span>
              <span style={{ fontSize: '22px', fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700, color: 'var(--heading, #2C3FA7)' }}>
                {format(day, 'd')}
              </span>
              <span style={{ fontSize: '11px', fontFamily: '"Space Mono", monospace', color: 'var(--body, #637EC2)', marginTop: '4px' }}>
                {format(day, 'MMM', { locale: arSA })}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
