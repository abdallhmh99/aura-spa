import { useState, useEffect, useCallback } from 'react'
import { getBookingsByDate } from '../lib/api/publicApi'
import { generateTimeSlots, calculateAvailableSlots } from '../lib/utils/bookingTime'

const isSupabaseConfigured = () => {
  const url = import.meta.env.VITE_SUPABASE_URL
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY
  return url && url !== 'your_supabase_project_url_here' && key && key !== 'your_supabase_anon_key_here'
}

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

    const BUSINESS_START = '10:00'
    const BUSINESS_END = '22:00'
    const SLOT_INTERVAL = 30

    const allSlots = generateTimeSlots(BUSINESS_START, BUSINESS_END, SLOT_INTERVAL)

    // If Supabase not configured, generate slots with no existing bookings (all available)
    if (!isSupabaseConfigured()) {
      const calculatedSlots = calculateAvailableSlots(
        allSlots,
        [], // no existing bookings in demo mode
        serviceDuration,
        BUSINESS_END,
        selectedDate
      )
      setSlots(calculatedSlots)
      setIsLoading(false)
      return
    }

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
