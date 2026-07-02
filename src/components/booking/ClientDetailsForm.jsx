import React from 'react'

export default function ClientDetailsForm({ formData, setFormData, errors }) {
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const labelStyle = {
    fontFamily: '"Space Grotesk", sans-serif', fontSize: '14px', fontWeight: 600,
    color: 'var(--heading, #2C3FA7)', display: 'block', marginBottom: '6px',
  }

  const inputStyle = (hasError) => ({
    width: '100%', boxSizing: 'border-box', padding: '12px 16px',
    fontFamily: '"Space Mono", monospace', fontSize: '14px',
    backgroundColor: 'var(--neutral-secondary, #FBF6EC)',
    border: hasError ? '2px solid var(--fg-danger-strong, #D92D20)' : '1px solid var(--border-default, #E4E0D9)',
    borderRadius: '4px', color: 'var(--heading, #2C3FA7)',
    outline: 'none', transition: 'border-color 150ms, box-shadow 150ms',
  })

  const errorStyle = {
    fontSize: '12px', color: 'var(--fg-danger-strong, #D92D20)',
    fontFamily: '"Space Mono", monospace', marginTop: '4px',
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h3 style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: '20px', fontWeight: 700, color: 'var(--heading, #2C3FA7)', margin: '0 0 8px 0' }}>بيانات الحجز</h3>
        <p style={{ color: 'var(--body, #637EC2)', fontSize: '14px', margin: 0 }}>أدخلي بياناتك لتأكيد الحجز. لن نشارك هذه البيانات مع أحد.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
        <div>
          <label htmlFor="client_name" style={labelStyle}>الاسم الكامل *</label>
          <input
            id="client_name" name="client_name" placeholder="أدخلي اسمك الكامل"
            value={formData.client_name} onChange={handleChange}
            style={inputStyle(errors?.client_name)}
            onFocus={e => { e.target.style.borderColor = '#F237A1'; e.target.style.boxShadow = '2px 2px 0 0 #2C3FA7' }}
            onBlur={e => { if (!errors?.client_name) { e.target.style.borderColor = 'var(--border-default, #E4E0D9)'; e.target.style.boxShadow = 'none' }}}
          />
          {errors?.client_name && <span style={errorStyle}>{errors.client_name}</span>}
        </div>

        <div>
          <label htmlFor="client_phone" style={labelStyle}>رقم الهاتف *</label>
          <input
            id="client_phone" name="client_phone" placeholder="05XXXXXXXX"
            type="tel" dir="ltr"
            value={formData.client_phone} onChange={handleChange}
            style={inputStyle(errors?.client_phone)}
            onFocus={e => { e.target.style.borderColor = '#F237A1'; e.target.style.boxShadow = '2px 2px 0 0 #2C3FA7' }}
            onBlur={e => { if (!errors?.client_phone) { e.target.style.borderColor = 'var(--border-default, #E4E0D9)'; e.target.style.boxShadow = 'none' }}}
          />
          {errors?.client_phone && <span style={errorStyle}>{errors.client_phone}</span>}
        </div>
      </div>

      <div>
        <label htmlFor="client_email" style={labelStyle}>البريد الإلكتروني (اختياري)</label>
        <input
          id="client_email" name="client_email" placeholder="example@email.com"
          type="email" dir="ltr"
          value={formData.client_email} onChange={handleChange}
          style={inputStyle(errors?.client_email)}
          onFocus={e => { e.target.style.borderColor = '#F237A1'; e.target.style.boxShadow = '2px 2px 0 0 #2C3FA7' }}
          onBlur={e => { e.target.style.borderColor = 'var(--border-default, #E4E0D9)'; e.target.style.boxShadow = 'none' }}
        />
      </div>

      <div>
        <label htmlFor="notes" style={labelStyle}>ملاحظات إضافية (اختياري)</label>
        <textarea
          id="notes" name="notes" rows={3}
          placeholder="أي تفاصيل ترغبين بإضافتها..."
          value={formData.notes} onChange={handleChange}
          style={{ ...inputStyle(false), resize: 'vertical' }}
          onFocus={e => { e.target.style.borderColor = '#F237A1'; e.target.style.boxShadow = '2px 2px 0 0 #2C3FA7' }}
          onBlur={e => { e.target.style.borderColor = 'var(--border-default, #E4E0D9)'; e.target.style.boxShadow = 'none' }}
        />
      </div>
    </div>
  )
}
