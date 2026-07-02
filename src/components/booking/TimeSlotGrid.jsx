import React from 'react'

export default function TimeSlotGrid({ slots, availableSlots, isLoading, error, onSelectTime, selectedTime }) {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <p className="text-body font-mono text-sm animate-pulse">جاري التحقق من الأوقات المتاحة...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-4 border-2 border-danger-subtle bg-danger-soft rounded-4px my-4">
        <p className="text-danger-strong font-heading">{error}</p>
      </div>
    )
  }

  if (!slots || slots.length === 0) {
    return (
      <div className="text-center py-8 border rounded-4px border-border-default bg-neutral-secondary my-4">
        <p className="text-body font-mono text-sm">الرجاء اختيار التاريخ لعرض الأوقات المتاحة.</p>
      </div>
    )
  }

  if (availableSlots.length === 0) {
    return (
      <div className="text-center py-8 border rounded-4px border-warning-subtle bg-warning-soft my-4">
        <p className="text-warning-strong font-heading">عذراً، لا توجد أوقات متاحة في هذا اليوم.</p>
        <p className="text-body text-sm mt-2">يرجى اختيار يوم آخر.</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4 mt-6">
      <div className="flex flex-col gap-1">
        <h3 className="font-heading text-lg text-heading">اختر الوقت</h3>
        <p className="text-body text-sm">الأوقات المتاحة للحجز:</p>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
        {slots.map((slot, index) => {
          const isSelected = selectedTime === slot.time
          const isAvailable = slot.available

          return (
            <button
              key={`${slot.time}-${index}`}
              disabled={!isAvailable}
              onClick={() => isAvailable && onSelectTime(slot.time)}
              className={`
                py-2 px-1 rounded-4px font-mono text-sm transition-all duration-120 border
                ${!isAvailable 
                  ? 'opacity-50 cursor-not-allowed border-transparent bg-neutral-primary text-body line-through'
                  : isSelected
                    ? 'border-brand bg-brand-softer shadow-xs text-brand-strong translate-x-[2px] translate-y-[2px]'
                    : 'border-border-default bg-neutral-secondary text-heading hover:bg-neutral-tertiary hover:border-brand-subtle'
                }
              `}
            >
              {slot.time}
            </button>
          )
        })}
      </div>
    </div>
  )
}
