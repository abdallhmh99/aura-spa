import React, { useState, useEffect } from 'react'
import Modal from '../ui/Modal'
import Button from '../ui/Button'
import ServicePicker from './ServicePicker'
import BookingCalendar from './BookingCalendar'
import TimeSlotGrid from './TimeSlotGrid'
import ClientDetailsForm from './ClientDetailsForm'
import BookingSuccess from './BookingSuccess'
import { useAvailableSlots } from '../../hooks/useAvailableSlots'
import { useBookingForm } from '../../hooks/useBookingForm'
import { addMinutes, format } from 'date-fns'

export default function BookingModal({ isOpen, onClose, initialServiceId = null }) {
  const [step, setStep] = useState(1)

  const [selectedService, setSelectedService] = useState(null)
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedTime, setSelectedTime] = useState(null)
  const [formData, setFormData] = useState({
    client_name: '',
    client_phone: '',
    client_email: '',
    notes: ''
  })
  const [formErrors, setFormErrors] = useState({})
  const [generalError, setGeneralError] = useState(null)

  const { slots, availableSlots, isLoading: slotsLoading, error: slotsError } =
    useAvailableSlots(selectedDate, selectedService?.duration_minutes)

  const { submitBooking, isSubmitting, error: submitError, setError: setSubmitError } = useBookingForm(() => {
    setStep(4)
  })

  useEffect(() => {
    if (isOpen) {
      setStep(1)
      setSelectedService(null)
      setSelectedDate(null)
      setSelectedTime(null)
      setFormData({ client_name: '', client_phone: '', client_email: '', notes: '' })
      setFormErrors({})
      setGeneralError(null)
      setSubmitError(null)
    }
  }, [isOpen, setSubmitError])

  const handleNext = () => {
    setGeneralError(null)
    setSubmitError(null)
    if (step === 1) {
      if (!selectedService) { setGeneralError('الرجاء اختيار الخدمة أولاً'); return }
      setStep(2)
    } else if (step === 2) {
      if (!selectedDate || !selectedTime) { setGeneralError('الرجاء اختيار التاريخ والوقت'); return }
      setStep(3)
    } else if (step === 3) {
      handleConfirmBooking()
    }
  }

  const handleBack = () => {
    setGeneralError(null)
    setSubmitError(null)
    if (step > 1) setStep(step - 1)
  }

  const validateForm = () => {
    const errors = {}
    if (!formData.client_name.trim()) errors.client_name = 'الاسم مطلوب'
    if (!formData.client_phone.trim()) {
      errors.client_phone = 'رقم الهاتف مطلوب'
    } else if (!/^[0-9+ ]{9,15}$/.test(formData.client_phone)) {
      errors.client_phone = 'صيغة الرقم غير صحيحة'
    }
    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleConfirmBooking = () => {
    if (!validateForm()) return

    const baseDate = new Date(selectedDate)
    const [hours, minutes] = selectedTime.split(':')
    baseDate.setHours(parseInt(hours), parseInt(minutes), 0, 0)
    const endDate = addMinutes(baseDate, selectedService.duration_minutes)

    submitBooking({
      service_id: selectedService.id,
      booking_date: format(selectedDate, 'yyyy-MM-dd'),
      start_time: selectedTime + ':00',
      end_time: format(endDate, 'HH:mm:00'),
      client_name: formData.client_name,
      client_phone: formData.client_phone,
      client_email: formData.client_email,
      notes: formData.notes,
      service_price: selectedService.price,
      service_duration: selectedService.duration_minutes
    })
  }

  const getStepTitle = () => {
    switch (step) {
      case 1: return 'اختيار الخدمة'
      case 2: return 'اختيار الموعد'
      case 3: return 'تأكيد البيانات'
      case 4: return 'تم الحجز بنجاح'
      default: return 'حجز موعد'
    }
  }

  const getNextText = () => {
    if (isSubmitting) return 'جاري التنفيذ...'
    switch (step) {
      case 1: return 'متابعة لاختيار الموعد ←'
      case 2: return 'متابعة للخطوة الأخيرة ←'
      case 3: return '✓ تأكيد الحجز'
      default: return 'التالي'
    }
  }

  const displayError = generalError || submitError

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={getStepTitle()}>

      {/* Stepper */}
      {step < 4 && (
        <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
          {[1, 2, 3].map(i => (
            <div key={i} style={{
              height: '6px', flex: 1, borderRadius: '100px',
              backgroundColor: step >= i ? '#F237A1' : '#E4E0D9',
              transition: 'background-color 200ms',
            }} />
          ))}
        </div>
      )}

      {/* Content */}
      <div style={{ minHeight: '280px' }}>
        {step === 1 && (
          <ServicePicker
            selectedServiceId={selectedService?.id}
            onSelect={(service) => { setSelectedService(service); setGeneralError(null) }}
          />
        )}
        {step === 2 && (
          <div>
            <BookingCalendar
              selectedDate={selectedDate}
              onSelectDate={(date) => { setSelectedDate(date); setSelectedTime(null); setGeneralError(null) }}
            />
            {selectedDate && (
              <TimeSlotGrid
                slots={slots}
                availableSlots={availableSlots}
                isLoading={slotsLoading}
                error={slotsError}
                selectedTime={selectedTime}
                onSelectTime={(time) => { setSelectedTime(time); setGeneralError(null) }}
              />
            )}
          </div>
        )}
        {step === 3 && (
          <ClientDetailsForm formData={formData} setFormData={setFormData} errors={formErrors} />
        )}
        {step === 4 && (
          <BookingSuccess
            bookingData={{ service: selectedService, date: selectedDate, time: selectedTime, client_name: formData.client_name }}
            onClose={onClose}
          />
        )}
      </div>

      {/* Error */}
      {displayError && (
        <div style={{
          marginTop: '16px', padding: '12px 16px', borderRadius: '4px',
          backgroundColor: 'var(--danger-soft, #FEE4E2)',
          border: '1px solid var(--border-danger-subtle, #FECDCA)',
          boxShadow: '2px 2px 0 0 #D92D20',
        }}>
          <p style={{ margin: 0, color: 'var(--fg-danger-strong, #D92D20)', fontFamily: '"Space Grotesk", sans-serif', fontSize: '14px', fontWeight: 600 }}>
            {displayError}
          </p>
        </div>
      )}

      {/* Footer */}
      {step < 4 && (
        <div style={{
          display: 'flex', alignItems: 'center', gap: '12px',
          marginTop: '24px', paddingTop: '16px',
          borderTop: '1px solid var(--border-default, #E4E0D9)',
        }}>
          {step > 1 && (
            <Button variant="ghost" onClick={handleBack} disabled={isSubmitting}>
              → رجوع
            </Button>
          )}
          <div style={{ flex: 1 }}>
            <Button
              fullWidth
              onClick={handleNext}
              disabled={
                isSubmitting ||
                (step === 1 && !selectedService) ||
                (step === 2 && (!selectedDate || !selectedTime))
              }
            >
              {getNextText()}
            </Button>
          </div>
        </div>
      )}
    </Modal>
  )
}
