import { useState } from 'react'
import { createBooking } from '../lib/api/publicApi'

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
