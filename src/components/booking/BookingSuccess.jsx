import React from 'react'
import { format } from 'date-fns'
import { arSA } from 'date-fns/locale'
import Button from '../ui/Button'

export default function BookingSuccess({ bookingData, onClose }) {
  const { service, date, time, client_name } = bookingData

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '24px', padding: '16px 0' }}>
      <div style={{
        width: '64px', height: '64px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
        backgroundColor: '#FDE3F0', border: '2px solid #F237A1',
      }}>
        <span style={{ fontSize: '28px' }}>✨</span>
      </div>

      <div>
        <h3 style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: '24px', fontWeight: 700, color: 'var(--heading, #2C3FA7)', margin: '0 0 8px 0' }}>
          تم تأكيد طلب الحجز!
        </h3>
        <p style={{ color: 'var(--body, #637EC2)', fontSize: '15px', maxWidth: '400px', margin: '0 auto', lineHeight: 1.6 }}>
          شكراً لك {client_name}. لقد استلمنا طلب الحجز الخاص بك بنجاح، بانتظار تأكيد الإدارة.
        </p>
      </div>

      <div style={{
        width: '100%', padding: '20px', borderRadius: '4px', textAlign: 'right',
        backgroundColor: 'var(--neutral-secondary, #FBF6EC)', border: '1px solid var(--border-default, #E4E0D9)',
        boxShadow: '4px 4px 0 0 #2C3FA7',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '12px', marginBottom: '12px', borderBottom: '1px solid var(--border-default, #E4E0D9)' }}>
          <span style={{ color: 'var(--body, #637EC2)', fontSize: '13px', fontFamily: '"Space Mono", monospace' }}>الخدمة</span>
          <span style={{ fontFamily: '"Space Grotesk", sans-serif', fontWeight: 600, color: 'var(--heading, #2C3FA7)' }}>{service?.name}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '12px', marginBottom: '12px', borderBottom: '1px solid var(--border-default, #E4E0D9)' }}>
          <span style={{ color: 'var(--body, #637EC2)', fontSize: '13px', fontFamily: '"Space Mono", monospace' }}>التاريخ</span>
          <span style={{ fontFamily: '"Space Grotesk", sans-serif', fontWeight: 600, color: 'var(--heading, #2C3FA7)' }}>
            {date ? format(date, 'EEEE، d MMMM yyyy', { locale: arSA }) : ''}
          </span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ color: 'var(--body, #637EC2)', fontSize: '13px', fontFamily: '"Space Mono", monospace' }}>الوقت</span>
          <span style={{ fontFamily: '"Space Grotesk", sans-serif', fontWeight: 600, color: 'var(--heading, #2C3FA7)' }} dir="ltr">{time}</span>
        </div>
      </div>

      <Button onClick={onClose} style={{ width: '100%', marginTop: '8px' }}>
        إغلاق والعودة للرئيسية
      </Button>
    </div>
  )
}
