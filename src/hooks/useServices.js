import { useState, useEffect, useCallback } from 'react'
import { getPublicServiceCategories, getPublicServices } from '../lib/api/publicApi'
import { categories as staticCategories, services as staticServices } from '../data/services'

// Check if Supabase is configured
const isSupabaseConfigured = () => {
  const url = import.meta.env.VITE_SUPABASE_URL
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY
  return url && url !== 'your_supabase_project_url_here' && key && key !== 'your_supabase_anon_key_here'
}

// Normalize static data to match Supabase shape
const normalizeStaticData = () => {
  const cats = staticCategories.map(c => ({
    id: c.id,
    name: c.name,
    slug: c.id,
    description: null,
    display_order: 0
  }))
  const svcs = staticServices.map(s => ({
    id: s.id,
    name: s.name,
    slug: s.id,
    description: s.description,
    short_description: s.description,
    price: s.price,
    currency: 'SAR',
    duration_minutes: s.duration,
    image_url: null,
    is_featured: false,
    category_id: s.categoryId,
    service_categories: { slug: s.categoryId }
  }))
  return { cats, svcs }
}

export function useServices() {
  const [categories, setCategories] = useState([])
  const [services, setServices] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchData = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    // If Supabase is not configured, use static fallback immediately
    if (!isSupabaseConfigured()) {
      const { cats, svcs } = normalizeStaticData()
      setCategories(cats)
      setServices(svcs)
      setIsLoading(false)
      return
    }

    try {
      const [categoriesResult, servicesResult] = await Promise.all([
        getPublicServiceCategories(),
        getPublicServices()
      ])

      if (categoriesResult.error || servicesResult.error) {
        // Fallback to static on error
        console.warn('Supabase fetch failed, using static data fallback')
        const { cats, svcs } = normalizeStaticData()
        setCategories(cats)
        setServices(svcs)
      } else {
        setCategories(categoriesResult.data)
        setServices(servicesResult.data)
      }
    } catch {
      const { cats, svcs } = normalizeStaticData()
      setCategories(cats)
      setServices(svcs)
    }

    setIsLoading(false)
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return {
    categories,
    services,
    isLoading,
    error,
    refetch: fetchData
  }
}
