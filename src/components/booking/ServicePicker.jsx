import React, { useState } from 'react'
import { useServices } from '../../hooks/useServices'
import Badge from '../ui/Badge'
import Card from '../ui/Card'

export default function ServicePicker({ onSelect, selectedServiceId }) {
  const { categories, services, isLoading, error } = useServices()
  const [activeCategory, setActiveCategory] = useState(null)

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-body font-mono text-sm animate-pulse">جاري تحميل الخدمات...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-4 border-2 border-danger-subtle bg-danger-soft rounded-4px">
        <p className="text-danger-strong font-heading">{error}</p>
      </div>
    )
  }

  const displayedServices = activeCategory 
    ? services.filter(s => s.service_categories?.slug === activeCategory)
    : services

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h3 className="font-heading text-xl text-heading">اختر الخدمة</h3>
        <p className="text-body text-sm">حددي الخدمة التي ترغبين بحجزها لنتمكن من عرض الأوقات المتاحة.</p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setActiveCategory(null)}
          className={`px-4 py-2 rounded-4px font-mono text-sm uppercase transition-all duration-120
            ${!activeCategory 
              ? 'bg-heading text-white shadow-sm' 
              : 'bg-neutral-secondary border border-border-default text-body hover:bg-neutral-tertiary'
            }`}
        >
          الكل
        </button>
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.slug)}
            className={`px-4 py-2 rounded-4px font-mono text-sm uppercase transition-all duration-120
              ${activeCategory === category.slug 
                ? 'bg-heading text-white shadow-sm' 
                : 'bg-neutral-secondary border border-border-default text-body hover:bg-neutral-tertiary'
              }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {displayedServices.map(service => (
          <div 
            key={service.id}
            onClick={() => onSelect(service)}
            className={`
              p-4 border rounded-4px cursor-pointer transition-all duration-120
              flex flex-col gap-3 relative
              ${selectedServiceId === service.id 
                ? 'border-brand bg-brand-softer shadow-xs translate-x-[2px] translate-y-[2px]' 
                : 'border-border-default bg-neutral-secondary hover:bg-neutral-tertiary hover:border-brand-subtle'
              }
            `}
          >
            <div className="flex justify-between items-start gap-4">
              <h4 className="font-heading text-lg text-heading leading-tight">{service.name}</h4>
              <span className="font-mono text-heading font-bold whitespace-nowrap">{service.price} ر.س</span>
            </div>
            
            <p className="text-sm text-body line-clamp-2">{service.short_description || service.description}</p>
            
            <div className="mt-auto pt-2 flex items-center justify-between border-t border-border-default">
              <span className="text-xs font-mono text-body flex items-center gap-1">
                ⏱ {service.duration_minutes} دقيقة
              </span>
              {selectedServiceId === service.id && (
                <Badge variant="brand" className="text-[10px]">تم الاختيار</Badge>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
