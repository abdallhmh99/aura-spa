import React from 'react'
import { format } from 'date-fns'
import { arSA } from 'date-fns/locale'
import Button from '../ui/Button'
import Card from '../ui/Card'

export default function BookingSuccess({ bookingData, onClose }) {
  const { service, date, time, client_name } = bookingData

  return (
    <div className="flex flex-col items-center text-center gap-6 py-4">
      <div className="w-16 h-16 bg-brand-softer rounded-full flex items-center justify-center border-2 border-brand-subtle mb-2">
        <span className="text-3xl">✨</span>
      </div>
      
      <div className="flex flex-col gap-2">
        <h3 className="font-heading text-2xl text-heading">تم تأكيد طلب الحجز!</h3>
        <p className="text-body text-sm max-w-md">
          شكراً لك {client_name}. لقد استلمنا طلب الحجز الخاص بك بنجاح، بانتظار تأكيد الإدارة.
        </p>
      </div>

      <Card className="w-full text-right p-5 flex flex-col gap-4 mt-2">
        <div className="flex justify-between items-center border-b border-border-default pb-3">
          <span className="text-body text-sm font-mono">الخدمة</span>
          <span className="font-heading text-heading">{service?.name}</span>
        </div>
        <div className="flex justify-between items-center border-b border-border-default pb-3">
          <span className="text-body text-sm font-mono">التاريخ</span>
          <span className="font-heading text-heading">
            {date ? format(date, 'EEEE، d MMMM yyyy', { locale: arSA }) : ''}
          </span>
        </div>
        <div className="flex justify-between items-center pb-1">
          <span className="text-body text-sm font-mono">الوقت</span>
          <span className="font-heading text-heading" dir="ltr">{time}</span>
        </div>
      </Card>

      <Button onClick={onClose} className="w-full mt-4">
        إغلاق والعودة للرئيسية
      </Button>
    </div>
  )
}
