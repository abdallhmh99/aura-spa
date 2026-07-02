import { supabase } from '../supabase'

/**
 * جلب فئات الخدمات النشطة
 * @returns {Promise<{data: Array, error: Object}>}
 */
export async function getPublicServiceCategories() {
  try {
    const { data, error } = await supabase
      .from('service_categories')
      .select('id, name, slug, description, display_order')
      .order('display_order', { ascending: true })

    if (error) throw error

    return { data, error: null }
  } catch (error) {
    console.error('Error fetching categories:', error)
    return { 
      data: null, 
      error: { code: 'DATABASE_ERROR', message: 'تعذر تحميل فئات الخدمات. حاولي مرة أخرى.' } 
    }
  }
}

/**
 * جلب الخدمات النشطة مع إمكانية الفلترة
 * @param {Object} options 
 * @param {string} options.category_slug
 * @returns {Promise<{data: Array, error: Object}>}
 */
export async function getPublicServices({ category_slug } = {}) {
  try {
    let query = supabase
      .from('services')
      .select(`
        id, name, slug, description, short_description, price, currency, 
        duration_minutes, image_url, is_featured, display_order, category_id,
        service_categories!inner(slug)
      `)
      .order('display_order', { ascending: true })

    if (category_slug) {
      query = query.eq('service_categories.slug', category_slug)
    }

    const { data, error } = await query

    if (error) throw error

    return { data, error: null }
  } catch (error) {
    console.error('Error fetching services:', error)
    return { 
      data: null, 
      error: { code: 'DATABASE_ERROR', message: 'تعذر تحميل الخدمات. حاولي مرة أخرى.' } 
    }
  }
}

/**
 * إنشاء حجز جديد
 * @param {Object} bookingData 
 * @returns {Promise<{data: Object, error: Object}>}
 */
export async function createBooking(bookingData) {
  try {
    const { service_id, booking_date, start_time, end_time, client_name, client_phone, client_email, notes, service_price, service_duration } = bookingData

    const { data, error } = await supabase
      .from('bookings')
      .insert([
        {
          service_id,
          booking_date,
          start_time,
          end_time,
          client_name,
          client_phone,
          client_email,
          notes,
          service_price_snapshot: service_price,
          service_duration_snapshot: service_duration,
          status: 'pending'
        }
      ])
      .select('id, status, booking_date, start_time, end_time')
      .single()

    if (error) throw error

    return { data, error: null }
  } catch (error) {
    console.error('Error creating booking:', error)
    return { 
      data: null, 
      error: { code: 'DATABASE_ERROR', message: 'تعذر إنشاء الحجز. يرجى المحاولة مرة أخرى.' } 
    }
  }
}

/**
 * جلب الحجوزات الموجودة في يوم محدد (للتحقق من التعارض)
 * @param {string} date - 'YYYY-MM-DD'
 * @returns {Promise<{data: Array, error: Object}>}
 */
export async function getBookingsByDate(date) {
  try {
    const { data, error } = await supabase
      .from('bookings')
      .select('start_time, end_time, status')
      .eq('booking_date', date)
      .in('status', ['pending', 'confirmed']) // ignore cancelled/completed

    if (error) throw error

    return { data, error: null }
  } catch (error) {
    console.error('Error fetching bookings for date:', error)
    return { 
      data: null, 
      error: { code: 'DATABASE_ERROR', message: 'تعذر التحقق من الأوقات المتاحة.' } 
    }
  }
}
