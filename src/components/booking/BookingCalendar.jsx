import React from 'react'
import { format, addDays, isSameDay, startOfToday } from 'date-fns'
import { arSA } from 'date-fns/locale'

export default function BookingCalendar({ selectedDate, onSelectDate }) {
  const today = startOfToday()
  
  // Generate next 14 days
  const days = Array.from({ length: 14 }).map((_, i) => addDays(today, i))

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <h3 className="font-heading text-xl text-heading">اختر التاريخ</h3>
        <p className="text-body text-sm">حددي اليوم المناسب لك من الأيام المتاحة القادمة.</p>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-2">
        {days.map(day => {
          const isSelected = selectedDate && isSameDay(day, selectedDate)
          return (
            <button
              key={day.toISOString()}
              onClick={() => onSelectDate(day)}
              className={`
                flex flex-col items-center justify-center p-3 rounded-4px border transition-all duration-120
                ${isSelected
                  ? 'border-brand bg-brand-softer shadow-xs text-brand-strong translate-x-[2px] translate-y-[2px]'
                  : 'border-border-default bg-neutral-secondary text-heading hover:bg-neutral-tertiary hover:border-brand-subtle'
                }
              `}
            >
              <span className="text-xs font-mono uppercase mb-1">
                {format(day, 'EEE', { locale: arSA })}
              </span>
              <span className="text-xl font-heading font-bold">
                {format(day, 'd')}
              </span>
              <span className="text-xs font-mono text-body mt-1">
                {format(day, 'MMM', { locale: arSA })}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
