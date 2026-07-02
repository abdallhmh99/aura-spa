import { addMinutes, parse, format, isBefore, isEqual, startOfDay } from 'date-fns'

/**
 * Generate all possible time slots for a given day
 * @param {string} startTime - 'HH:mm'
 * @param {string} endTime - 'HH:mm'
 * @param {number} intervalMinutes - Interval between slots (e.g., 30)
 * @returns {Array} List of time slot strings ['10:00', '10:30', ...]
 */
export function generateTimeSlots(startTime = '10:00', endTime = '22:00', intervalMinutes = 30) {
  const slots = []
  const baseDate = new Date()
  let current = parse(startTime, 'HH:mm', baseDate)
  const end = parse(endTime, 'HH:mm', baseDate)

  while (isBefore(current, end) || isEqual(current, end)) {
    slots.push(format(current, 'HH:mm'))
    current = addMinutes(current, intervalMinutes)
  }

  return slots
}

/**
 * Filter slots to remove those that conflict with existing bookings
 * or don't have enough time for the service duration before the next booking/end of day.
 * 
 * @param {Array<string>} slots - ['10:00', '10:30', ...]
 * @param {Array<Object>} existingBookings - [{ start_time: '11:00:00', end_time: '12:00:00' }]
 * @param {number} serviceDuration - Service duration in minutes
 * @param {string} businessEndTime - End of business day '22:00'
 * @param {string|Date} selectedDate - The date selected by the user
 * @returns {Array} Array of objects with { time: 'HH:mm', available: boolean }
 */
export function calculateAvailableSlots(slots, existingBookings, serviceDuration, businessEndTime = '22:00', selectedDate) {
  const baseDate = startOfDay(new Date(selectedDate || new Date()))
  const now = new Date()
  const isToday = baseDate.toDateString() === now.toDateString()
  
  return slots.map(slotTime => {
    const slotStart = parse(slotTime, 'HH:mm', baseDate)
    const slotEnd = addMinutes(slotStart, serviceDuration)
    const businessEnd = parse(businessEndTime, 'HH:mm', baseDate)

    // Check 1: Is it in the past (if today)?
    if (isToday && isBefore(slotStart, now)) {
      return { time: slotTime, available: false, reason: 'PAST_TIME' }
    }

    // Check 2: Does it exceed business hours?
    if (isBefore(businessEnd, slotEnd)) {
      return { time: slotTime, available: false, reason: 'INSUFFICIENT_DURATION' }
    }

    // Check 3: Does it overlap with existing bookings?
    const hasConflict = existingBookings.some(booking => {
      // Supabase returns time with seconds, e.g., '10:00:00'
      const bStartStr = booking.start_time.substring(0, 5) 
      const bEndStr = booking.end_time.substring(0, 5)
      
      const bookingStart = parse(bStartStr, 'HH:mm', baseDate)
      const bookingEnd = parse(bEndStr, 'HH:mm', baseDate)

      // Overlap logic: (StartA < EndB) and (EndA > StartB)
      return isBefore(slotStart, bookingEnd) && isBefore(bookingStart, slotEnd)
    })

    if (hasConflict) {
      return { time: slotTime, available: false, reason: 'BOOKING_CONFLICT' }
    }

    return { time: slotTime, available: true }
  })
}
