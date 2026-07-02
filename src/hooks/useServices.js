import { useState, useEffect, useCallback } from 'react'
import { getPublicServiceCategories, getPublicServices } from '../lib/api/publicApi'

export function useServices() {
  const [categories, setCategories] = useState([])
  const [services, setServices] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchData = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    const [categoriesResult, servicesResult] = await Promise.all([
      getPublicServiceCategories(),
      getPublicServices()
    ])

    if (categoriesResult.error || servicesResult.error) {
      setError(categoriesResult.error?.message || servicesResult.error?.message)
    } else {
      setCategories(categoriesResult.data)
      setServices(servicesResult.data)
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
