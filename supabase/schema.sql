-- 1. Create service_categories table
CREATE TABLE IF NOT EXISTS service_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    display_order INTEGER NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 2. Create services table
CREATE TABLE IF NOT EXISTS services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category_id UUID REFERENCES service_categories(id) ON DELETE RESTRICT,
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT NOT NULL,
    short_description TEXT,
    price NUMERIC NOT NULL CHECK (price >= 0),
    currency TEXT NOT NULL DEFAULT 'SAR',
    duration_minutes INTEGER NOT NULL CHECK (duration_minutes > 0),
    buffer_before_minutes INTEGER NOT NULL DEFAULT 0,
    buffer_after_minutes INTEGER NOT NULL DEFAULT 0,
    image_url TEXT,
    display_order INTEGER NOT NULL DEFAULT 0,
    is_featured BOOLEAN NOT NULL DEFAULT false,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    deleted_at TIMESTAMP WITH TIME ZONE
);

-- 3. Create bookings table
CREATE TABLE IF NOT EXISTS bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    service_id UUID NOT NULL REFERENCES services(id) ON DELETE RESTRICT,
    client_name TEXT NOT NULL,
    client_phone TEXT NOT NULL,
    client_email TEXT,
    booking_date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed', 'no_show')),
    service_price_snapshot NUMERIC NOT NULL,
    service_duration_snapshot INTEGER NOT NULL,
    notes TEXT,
    admin_notes TEXT,
    cancelled_at TIMESTAMP WITH TIME ZONE,
    cancelled_by TEXT,
    cancellation_reason TEXT,
    confirmed_at TIMESTAMP WITH TIME ZONE,
    completed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Basic RLS (Row Level Security) setup
ALTER TABLE service_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read active service categories
CREATE POLICY "Enable read access for all active categories"
ON service_categories FOR SELECT
USING (is_active = true);

-- Allow anyone to read active services
CREATE POLICY "Enable read access for all active services"
ON services FOR SELECT
USING (is_active = true AND deleted_at IS NULL);

-- Allow anyone to create a booking (pending)
CREATE POLICY "Enable insert for anyone"
ON bookings FOR INSERT
WITH CHECK (true);

-- Insert Initial Seed Data for Categories
INSERT INTO service_categories (name, slug, display_order) VALUES
('Skincare', 'skincare', 1),
('Massage & Relaxation', 'massage', 2),
('Hair Styling & Care', 'hair', 3)
ON CONFLICT (slug) DO NOTHING;

-- Insert Initial Seed Data for Services
INSERT INTO services (name, slug, description, price, duration_minutes, category_id)
SELECT 'Golden Facial Cleansing', 'facial-gold', 'Deep facial cleansing using a gold mask for superior hydration and instant radiance.', 350, 60, id FROM service_categories WHERE slug = 'skincare'
UNION ALL
SELECT 'HydraFacial Peel', 'facial-hydra', 'Advanced technique for pore cleansing, dead cell exfoliation, and deep skin nourishment.', 400, 45, id FROM service_categories WHERE slug = 'skincare'
UNION ALL
SELECT 'Classic Swedish Massage', 'massage-swedish', 'A soothing full-body massage to relieve muscle tension and boost blood circulation.', 300, 60, id FROM service_categories WHERE slug = 'massage'
UNION ALL
SELECT 'Hot Stone Massage', 'massage-hotstone', 'A luxurious therapeutic session using heated volcanic basalt stones for deep relaxation.', 500, 90, id FROM service_categories WHERE slug = 'massage'
UNION ALL
SELECT 'Professional Cut & Style', 'hair-cut-style', 'A trendy haircut tailored to your features with full styling and heat protection.', 150, 45, id FROM service_categories WHERE slug = 'hair'
UNION ALL
SELECT 'Organic Keratin Treatment', 'hair-treatment', 'Repair and smooth damaged or curly hair with natural, safe ingredients that last for months.', 800, 120, id FROM service_categories WHERE slug = 'hair';
