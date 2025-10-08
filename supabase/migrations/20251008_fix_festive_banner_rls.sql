-- Fix RLS policies for festive_banner table

-- Drop existing policies
DROP POLICY IF EXISTS "Allow read festive_banner to anon" ON public.festive_banner;
DROP POLICY IF EXISTS "Allow all operations on festive_banner for authenticated" ON public.festive_banner;

-- Create more permissive policies
CREATE POLICY "Enable read access for all users"
    ON public.festive_banner FOR SELECT
    USING (true);

CREATE POLICY "Enable insert for authenticated users only"
    ON public.festive_banner FOR INSERT
    TO authenticated
    WITH CHECK (true);

CREATE POLICY "Enable update for authenticated users only"
    ON public.festive_banner FOR UPDATE
    TO authenticated
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Enable delete for authenticated users only"
    ON public.festive_banner FOR DELETE
    TO authenticated
    USING (true);

-- Ensure table has at least one row
INSERT INTO public.festive_banner (
    enabled, title, subtitle, button_text, banner_image, whatsapp_message
) VALUES (
    true,
    'FESTIVE GLOW',
    'Celebrate the season with our exclusive festive beauty packages',
    'VIEW OFFERS',
    '/images/pop-up-banner.jpg',
    'Hi B21! I''m interested in your Festive Glow offers.'
) ON CONFLICT (id) DO NOTHING;
