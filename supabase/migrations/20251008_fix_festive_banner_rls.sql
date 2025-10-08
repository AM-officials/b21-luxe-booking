-- Fix RLS policies for festive_banner table
-- NOTE: Since the app uses custom auth (not Supabase auth), we need to allow anon access

-- Drop ALL existing policies
DROP POLICY IF EXISTS "Allow read festive_banner to anon" ON public.festive_banner;
DROP POLICY IF EXISTS "Allow all operations on festive_banner for authenticated" ON public.festive_banner;
DROP POLICY IF EXISTS "Enable read access for all users" ON public.festive_banner;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON public.festive_banner;
DROP POLICY IF EXISTS "Enable update for authenticated users only" ON public.festive_banner;
DROP POLICY IF EXISTS "Enable delete for authenticated users only" ON public.festive_banner;
DROP POLICY IF EXISTS "Allow anonymous read access" ON public.festive_banner;
DROP POLICY IF EXISTS "Allow authenticated full access" ON public.festive_banner;

-- Create permissive policies for anonymous users
-- (since app uses custom auth, not Supabase auth, all requests come as 'anon')
CREATE POLICY "Allow all operations for everyone"
    ON public.festive_banner
    FOR ALL
    TO anon, authenticated
    USING (true)
    WITH CHECK (true);

-- Ensure table has at least one row
-- First check if there are any rows
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM public.festive_banner LIMIT 1) THEN
        INSERT INTO public.festive_banner (
            id, enabled, title, subtitle, button_text, banner_image, whatsapp_message
        ) VALUES (
            1,
            true,
            'FESTIVE GLOW',
            'Celebrate the season with our exclusive festive beauty packages',
            'VIEW OFFERS',
            '/images/pop-up-banner.jpg',
            'Hi B21! I''m interested in your Festive Glow offers.'
        );
    END IF;
END $$;
