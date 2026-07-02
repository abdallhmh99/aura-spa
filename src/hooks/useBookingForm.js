import { useState } from 'react'
import { createBooking } from '../lib/api/publicApi'

const isSupabaseConfigured = () => {
  const url = import.meta.env.VITE_SUPABASE_URL
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY
  return url && url !== 'your_supabase_project_url_here' && key && key !== 'your_supabase_anon_key_here'
}

export function useBookingForm(onSuccess) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState(null)

  const submitBooking = async (bookingData) => {
    setIsSubmitting(true)
    setError(null)

    // Basic validation
    if (!bookingData.service_id || !bookingData.booking_date || !bookingData.start_time || !bookingData.client_name || !bookingData.client_phone) {
      setError('الرجاء تعبئة جميع الحقول المطلوبة')
      setIsSubmitting(false)
      return { success: false }
    }

    // Demo mode: simulate successful booking without Supabase
    if (!isSupabaseConfigured()) {
      await new Promise(r => setTimeout(r, 800)) // small delay to feel realistic
      setIsSubmitting(false)
      if (onSuccess) onSuccess({ id: 'demo-booking', ...bookingData })
      return { success: true, data: { id: 'demo-booking', ...bookingData } }
    }

    const result = await createBooking(bookingData)

    setIsSubmitting(false)

    if (result.error) {
      setError(result.error.message)
      return { success: false, error: result.error }
    }

    if (onSuccess) {
      onSuccess(result.data)
    }

    return { success: true, data: result.data }
  }

  return {
    submitBooking,
    isSubmitting,
    error,
    setError
  }
}

