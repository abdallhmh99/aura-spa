import React, { useState, useEffect } from 'react'
import Modal from '../ui/Modal'
import Button from '../ui/Button'
import Alert from '../ui/Alert'
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
  
  // Form State
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

  // Fetch slots based on selections
  const { slots, availableSlots, isLoading: slotsLoading, error: slotsError } = 
    useAvailableSlots(selectedDate, selectedService?.duration_minutes)

  // Booking Hook
  const { submitBooking, isSubmitting, error: submitError, setError: setSubmitError } = useBookingForm((data) => {
    setStep(4) // Success step
  })

  // Reset when modal closes or opens
  useEffect(() => {
    if (isOpen) {
      if (!initialServiceId) {
        setStep(1)
        setSelectedService(null)
      } else {
        // We could fetch the service by ID here if passed from Home
        // For now, if we have it, we jump to step 2, but we need the actual service object.
        // Assuming we let the ServicePicker handle it or we fetch it.
        // Easiest is start at step 1 and pre-select.
        setStep(1)
      }
      setSelectedDate(null)
      setSelectedTime(null)
      setFormData({ client_name: '', client_phone: '', client_email: '', notes: '' })
      setFormErrors({})
      setSubmitError(null)
    }
  }, [isOpen, initialServiceId, setSubmitError])

  const handleNext = () => {
    setSubmitError(null)
    if (step === 1) {
      if (!selectedService) return setSubmitError('الرجاء اختيار الخدمة أولاً')
      setStep(2)
    } else if (step === 2) {
      if (!selectedDate || !selectedTime) return setSubmitError('الرجاء اختيار التاريخ والوقت')
      setStep(3)
    } else if (step === 3) {
      handleConfirmBooking()
    }
  }

  const handleBack = () => {
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

    const bookingPayload = {
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
    }

    submitBooking(bookingPayload)
  }

  // Content for each step
  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <ServicePicker 
            selectedServiceId={selectedService?.id} 
            onSelect={(service) => {
              setSelectedService(service)
              setSubmitError(null)
            }} 
          />
        )
      case 2:
        return (
          <div className="flex flex-col gap-8">
            <BookingCalendar 
              selectedDate={selectedDate} 
              onSelectDate={(date) => {
                setSelectedDate(date)
                setSelectedTime(null)
                setSubmitError(null)
              }} 
            />
            {selectedDate && (
              <TimeSlotGrid 
                slots={slots} 
                availableSlots={availableSlots}
                isLoading={slotsLoading}
                error={slotsError}
                selectedTime={selectedTime}
                onSelectTime={(time) => {
                  setSelectedTime(time)
                  setSubmitError(null)
                }}
              />
            )}
          </div>
        )
      case 3:
        return (
          <ClientDetailsForm 
            formData={formData} 
            setFormData={setFormData} 
            errors={formErrors} 
          />
        )
      case 4:
        return <BookingSuccess bookingData={{ service: selectedService, date: selectedDate, time: selectedTime, client_name: formData.client_name }} onClose={onClose} />
      default:
        return null
    }
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

  const getNextButtonText = () => {
    if (isSubmitting) return 'جاري التنفيذ...'
    switch (step) {
      case 1: return 'متابعة لاختيار الموعد'
      case 2: return 'متابعة للخطوة الأخيرة'
      case 3: return 'تأكيد الحجز'
      default: return 'التالي'
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={getStepTitle()}>
      
      {/* Stepper Progress */}
      {step < 4 && (
        <div className="flex gap-2 mb-8">
          {[1, 2, 3].map(i => (
            <div 
              key={i} 
              className={`h-2 flex-1 rounded-full ${step >= i ? 'bg-brand' : 'bg-neutral-tertiary'}`}
            />
          ))}
        </div>
      )}

      {/* Main Content */}
      <div className="min-h-[300px]">
        {renderStepContent()}
      </div>

      {/* Error Alert */}
      {submitError && (
        <div className="mt-4">
          <Alert variant="danger" title="عذراً">{submitError}</Alert>
        </div>
      )}

      {/* Footer Actions */}
      {step < 4 && (
        <div className="flex items-center gap-3 mt-8 pt-4 border-t border-border-default">
          {step > 1 && (
            <Button variant="ghost" onClick={handleBack} disabled={isSubmitting}>
              رجوع
            </Button>
          )}
          <Button 
            className="flex-1" 
            onClick={handleNext} 
            disabled={
              isSubmitting || 
              (step === 1 && !selectedService) || 
              (step === 2 && (!selectedDate || !selectedTime))
            }
          >
            {getNextButtonText()}
          </Button>
        </div>
      )}
    </Modal>
  )
}
