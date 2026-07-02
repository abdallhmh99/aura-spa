import { useState, useEffect, useCallback } from 'react'
import { getBookingsByDate } from '../lib/api/publicApi'
import { generateTimeSlots, calculateAvailableSlots } from '../lib/utils/bookingTime'

export function useAvailableSlots(selectedDate, serviceDuration) {
  const [slots, setSlots] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchAvailableSlots = useCallback(async () => {
    if (!selectedDate || !serviceDuration) {
      setSlots([])
      return
    }

    setIsLoading(true)
    setError(null)

    // For the MVP, we assume business hours are 10:00 to 22:00
    // This could be fetched from 'business_settings' in a future iteration
    const BUSINESS_START = '10:00'
    const BUSINESS_END = '22:00'
    const SLOT_INTERVAL = 30 // 30 minutes slots

    const allSlots = generateTimeSlots(BUSINESS_START, BUSINESS_END, SLOT_INTERVAL)

    const dateStr = typeof selectedDate === 'string' ? selectedDate : selectedDate.toISOString().split('T')[0]
    
    const { data: existingBookings, error: apiError } = await getBookingsByDate(dateStr)

    if (apiError) {
      setError(apiError.message)
      setSlots([])
    } else {
      const calculatedSlots = calculateAvailableSlots(
        allSlots, 
        existingBookings || [], 
        serviceDuration, 
        BUSINESS_END,
        selectedDate
      )
      setSlots(calculatedSlots)
    }

    setIsLoading(false)
  }, [selectedDate, serviceDuration])

  useEffect(() => {
    fetchAvailableSlots()
  }, [fetchAvailableSlots])

  return {
    slots,
    availableSlots: slots.filter(s => s.available),
    isLoading,
    error,
    refetch: fetchAvailableSlots
  }
}
