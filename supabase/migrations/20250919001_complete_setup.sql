-- Complete B21 Luxe Booking Database Setup
-- Additional tables for blog, popup config, and franchise leads

-- 1. Posts table for blog functionality
CREATE TABLE IF NOT EXISTS public.posts (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    excerpt TEXT,
    category TEXT,
    author TEXT,
    published_date TIMESTAMPTZ,
    featured_image TEXT,
    content TEXT,
    status TEXT DEFAULT 'published' CHECK (status IN ('draft', 'published', 'archived')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Popup config table for banner management
CREATE TABLE IF NOT EXISTS public.popup_config (
    id BIGINT PRIMARY KEY DEFAULT 1,
    enabled BOOLEAN NOT NULL DEFAULT true,
    delay_ms INTEGER NOT NULL DEFAULT 3000,
    title TEXT NOT NULL DEFAULT 'Special Offer!',
    subtitle TEXT NOT NULL DEFAULT '20% OFF Last-Minute Bookings',
    validity_text TEXT NOT NULL DEFAULT 'Valid for today only',
    body_text TEXT NOT NULL DEFAULT 'Book your appointment today and enjoy 20% off our premium services.',
    whatsapp_number TEXT NOT NULL DEFAULT '919876543210',
    whatsapp_message TEXT NOT NULL DEFAULT 'Hi B21! I''m interested in your 20% off last-minute booking offer.',
    banner_image TEXT DEFAULT '/Pop-up banner offer.webp',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. Franchise leads table for inquiry forms
CREATE TABLE IF NOT EXISTS public.franchise_leads (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    city TEXT NOT NULL,
    message TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_posts_slug ON public.posts(slug);
CREATE INDEX IF NOT EXISTS idx_posts_status ON public.posts(status);
CREATE INDEX IF NOT EXISTS idx_posts_published_date ON public.posts(published_date DESC);
CREATE INDEX IF NOT EXISTS idx_franchise_leads_created_at ON public.franchise_leads(created_at DESC);

-- Enable Row Level Security (RLS) on all tables
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.popup_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.franchise_leads ENABLE ROW LEVEL SECURITY;

-- RLS Policies for posts table
DROP POLICY IF EXISTS "Allow read published posts to anon" ON public.posts;
CREATE POLICY "Allow read published posts to anon"
    ON public.posts FOR SELECT
    USING (status = 'published');

DROP POLICY IF EXISTS "Allow full access to authenticated users" ON public.posts;
CREATE POLICY "Allow full access to authenticated users"
    ON public.posts
    FOR ALL
    USING (auth.role() = 'authenticated');

-- RLS Policies for popup_config table
DROP POLICY IF EXISTS "Allow read popup config to anon" ON public.popup_config;
CREATE POLICY "Allow read popup config to anon"
    ON public.popup_config FOR SELECT
    USING (true);

DROP POLICY IF EXISTS "Allow update popup config to authenticated" ON public.popup_config;
CREATE POLICY "Allow update popup config to authenticated"
    ON public.popup_config
    FOR ALL
    USING (auth.role() = 'authenticated');

-- RLS Policies for franchise_leads table
DROP POLICY IF EXISTS "Allow insert franchise leads to anon" ON public.franchise_leads;
CREATE POLICY "Allow insert franchise leads to anon"
    ON public.franchise_leads FOR INSERT
    WITH CHECK (true);

DROP POLICY IF EXISTS "Allow read franchise leads to authenticated" ON public.franchise_leads;
CREATE POLICY "Allow read franchise leads to authenticated"
    ON public.franchise_leads FOR SELECT
    USING (auth.role() = 'authenticated');

-- Insert default popup config
INSERT INTO public.popup_config (
    id, enabled, delay_ms, title, subtitle, validity_text, body_text, 
    whatsapp_number, whatsapp_message, banner_image
) VALUES (
    1, true, 3000, 'Special Offer!', '20% OFF Last-Minute Bookings',
    'Valid for today only', 
    'Book your appointment today and enjoy 20% off our premium services. Perfect for last-minute touch-ups or treating yourself!',
    '919876543210',
    'Hi B21! I''m interested in your 20% off last-minute booking offer.',
    '/Pop-up banner offer.webp'
) ON CONFLICT (id) DO NOTHING;

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
DROP TRIGGER IF EXISTS update_posts_updated_at ON public.posts;
CREATE TRIGGER update_posts_updated_at
    BEFORE UPDATE ON public.posts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_popup_config_updated_at ON public.popup_config;
CREATE TRIGGER update_popup_config_updated_at
    BEFORE UPDATE ON public.popup_config
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();