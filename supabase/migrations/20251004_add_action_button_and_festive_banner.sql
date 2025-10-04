-- Add action_button_text column to popup_config
ALTER TABLE public.popup_config 
ADD COLUMN IF NOT EXISTS action_button_text TEXT DEFAULT 'Book Now & Save 20%';

-- Create festive_banner table for CMS management
CREATE TABLE IF NOT EXISTS public.festive_banner (
    id BIGSERIAL PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    enabled BOOLEAN DEFAULT true,
    title TEXT DEFAULT 'FESTIVE GLOW',
    subtitle TEXT DEFAULT 'Celebrate the season with our exclusive festive beauty packages',
    button_text TEXT DEFAULT 'VIEW OFFERS',
    banner_image TEXT DEFAULT '/Pop-up banner offer.webp',
    whatsapp_message TEXT DEFAULT 'Hi B21! I''m interested in your Festive Glow offers.'
);

-- Enable RLS
ALTER TABLE public.festive_banner ENABLE ROW LEVEL SECURITY;

-- RLS Policies for festive_banner
DROP POLICY IF EXISTS "Allow read festive_banner to anon" ON public.festive_banner;
CREATE POLICY "Allow read festive_banner to anon"
    ON public.festive_banner FOR SELECT
    TO anon
    USING (true);

DROP POLICY IF EXISTS "Allow all operations on festive_banner for authenticated" ON public.festive_banner;
CREATE POLICY "Allow all operations on festive_banner for authenticated"
    ON public.festive_banner
    FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- Insert default festive banner config
INSERT INTO public.festive_banner (
    enabled, title, subtitle, button_text, banner_image, whatsapp_message
) VALUES (
    true,
    'FESTIVE GLOW',
    'Celebrate the season with our exclusive festive beauty packages',
    'VIEW OFFERS',
    '/Pop-up banner offer.webp',
    'Hi B21! I''m interested in your Festive Glow offers.'
) ON CONFLICT DO NOTHING;

-- Add updated_at trigger for festive_banner
DROP TRIGGER IF EXISTS update_festive_banner_updated_at ON public.festive_banner;
CREATE TRIGGER update_festive_banner_updated_at
    BEFORE UPDATE ON public.festive_banner
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- Create storage bucket for festive banners (if not exists)
-- Note: Storage buckets must be created via Supabase Dashboard or CLI
-- This is just documentation of the required bucket name: 'festive-banners'
