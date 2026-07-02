import React, { useState } from 'react'
import { useServices } from '../../hooks/useServices'
import Badge from '../ui/Badge'

export default function ServicePicker({ onSelect, selectedServiceId }) {
  const { categories, services, isLoading, error } = useServices()
  const [activeCategory, setActiveCategory] = useState(null)

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px' }}>
        <p style={{ color: 'var(--body)', fontFamily: '"Space Mono", monospace', fontSize: '14px' }}>جاري تحميل الخدمات...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div style={{ padding: '16px', border: '2px solid var(--border-danger-subtle)', backgroundColor: 'var(--danger-soft)', borderRadius: '4px' }}>
        <p style={{ color: 'var(--fg-danger-strong)', fontFamily: '"Space Grotesk", sans-serif' }}>{error}</p>
      </div>
    )
  }

  const displayedServices = activeCategory
    ? services.filter(s => s.service_categories?.slug === activeCategory)
    : services

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h3 style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: '20px', fontWeight: 700, color: 'var(--heading, #2C3FA7)', margin: '0 0 8px 0' }}>اختاري الخدمة</h3>
        <p style={{ color: 'var(--body, #637EC2)', fontSize: '14px', margin: 0 }}>حددي الخدمة التي ترغبين بحجزها لنتمكن من عرض الأوقات المتاحة.</p>
      </div>

      {/* Category Filters */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        <button
          onClick={() => setActiveCategory(null)}
          style={{
            padding: '8px 16px', borderRadius: '4px', fontFamily: '"Space Mono", monospace', fontSize: '11px',
            textTransform: 'uppercase', letterSpacing: '0.04em', cursor: 'pointer', transition: 'all 150ms',
            border: !activeCategory ? '2px solid #2C3FA7' : '1px solid var(--border-default, #E4E0D9)',
            backgroundColor: !activeCategory ? '#2C3FA7' : 'var(--neutral-secondary, #FBF6EC)',
            color: !activeCategory ? '#fff' : 'var(--body, #637EC2)',
          }}
        >
          الكل
        </button>
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.slug)}
            style={{
              padding: '8px 16px', borderRadius: '4px', fontFamily: '"Space Mono", monospace', fontSize: '11px',
              textTransform: 'uppercase', letterSpacing: '0.04em', cursor: 'pointer', transition: 'all 150ms',
              border: activeCategory === category.slug ? '2px solid #2C3FA7' : '1px solid var(--border-default, #E4E0D9)',
              backgroundColor: activeCategory === category.slug ? '#2C3FA7' : 'var(--neutral-secondary, #FBF6EC)',
              color: activeCategory === category.slug ? '#fff' : 'var(--body, #637EC2)',
            }}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Services Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
        {displayedServices.map(service => {
          const isSelected = selectedServiceId === service.id
          return (
            <div
              key={service.id}
              onClick={() => onSelect(service)}
              style={{
                padding: '16px', borderRadius: '4px', cursor: 'pointer', transition: 'all 120ms',
                display: 'flex', flexDirection: 'column', gap: '12px',
                border: isSelected ? '2px solid #F237A1' : '1px solid var(--border-default, #E4E0D9)',
                backgroundColor: isSelected ? '#FDE3F0' : 'var(--neutral-secondary, #FBF6EC)',
                boxShadow: isSelected ? '2px 2px 0 0 #2C3FA7' : 'none',
                transform: isSelected ? 'translate(2px, 2px)' : 'none',
              }}
              onMouseEnter={e => { if (!isSelected) { e.currentTarget.style.backgroundColor = '#F4ECDA'; e.currentTarget.style.borderColor = '#F237A1' }}}
              onMouseLeave={e => { if (!isSelected) { e.currentTarget.style.backgroundColor = 'var(--neutral-secondary, #FBF6EC)'; e.currentTarget.style.borderColor = 'var(--border-default, #E4E0D9)' }}}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px' }}>
                <h4 style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: '16px', fontWeight: 600, color: 'var(--heading, #2C3FA7)', margin: 0, lineHeight: 1.3 }}>
                  {service.name}
                </h4>
                <span style={{ fontFamily: '"Space Mono", monospace', color: 'var(--heading, #2C3FA7)', fontWeight: 700, whiteSpace: 'nowrap', fontSize: '14px' }}>
                  {service.price} ر.س
                </span>
              </div>

              <p style={{ fontSize: '13px', color: 'var(--body, #637EC2)', margin: 0, lineHeight: 1.5 }}>
                {service.short_description || service.description}
              </p>

              <div style={{ marginTop: 'auto', paddingTop: '8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border-default, #E4E0D9)' }}>
                <span style={{ fontSize: '12px', fontFamily: '"Space Mono", monospace', color: 'var(--body, #637EC2)' }}>
                  ⏱ {service.duration_minutes} دقيقة
                </span>
                {isSelected && <Badge variant="brand">تم الاختيار ✓</Badge>}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
