import React from 'react'
import Input from '../ui/Input'

export default function ClientDetailsForm({ formData, setFormData, errors }) {
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h3 className="font-heading text-xl text-heading">بيانات الحجز</h3>
        <p className="text-body text-sm">أدخلي بياناتك لتأكيد الحجز. لن نشارك هذه البيانات مع أحد.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="الاسم الكامل"
          id="client_name"
          name="client_name"
          placeholder="أدخلي اسمك الكامل"
          value={formData.client_name}
          onChange={handleChange}
          error={errors?.client_name}
          required
        />

        <Input
          label="رقم الهاتف"
          id="client_phone"
          name="client_phone"
          placeholder="05XXXXXXXX"
          type="tel"
          dir="ltr"
          value={formData.client_phone}
          onChange={handleChange}
          error={errors?.client_phone}
          required
        />
      </div>

      <Input
        label="البريد الإلكتروني (اختياري)"
        id="client_email"
        name="client_email"
        placeholder="example@email.com"
        type="email"
        dir="ltr"
        value={formData.client_email}
        onChange={handleChange}
        error={errors?.client_email}
      />

      <div className="flex flex-col gap-2">
        <label htmlFor="notes" className="font-heading text-sm text-heading">
          ملاحظات إضافية (اختياري)
        </label>
        <textarea
          id="notes"
          name="notes"
          rows={3}
          placeholder="أي تفاصيل ترغبين بإضافتها..."
          value={formData.notes}
          onChange={handleChange}
          className={`
            w-full bg-neutral-secondary border border-border-default rounded-4px
            px-4 py-3 text-body font-mono text-sm
            focus:outline-none focus:border-brand focus:shadow-[2px_2px_0_0_#2C3FA7]
            transition-all duration-120 resize-y
            ${errors?.notes ? 'border-danger-strong focus:border-danger-strong focus:shadow-[2px_2px_0_0_#D92D20]' : ''}
          `}
        />
        {errors?.notes && (
          <span className="text-xs text-danger-strong font-mono">{errors.notes}</span>
        )}
      </div>
    </div>
  )
}
