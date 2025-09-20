-- Quick RLS fix for blog CMS
DROP POLICY IF EXISTS "Allow read published posts to anon" ON public.posts;
DROP POLICY IF EXISTS "Allow full access to authenticated users" ON public.posts;

CREATE POLICY "Allow all operations for anon users" 
    ON public.posts 
    FOR ALL 
    USING (true)
    WITH CHECK (true);

-- Fix popup config policies too
DROP POLICY IF EXISTS "Allow read popup config to anon" ON public.popup_config;
DROP POLICY IF EXISTS "Allow update popup config to authenticated" ON public.popup_config;

CREATE POLICY "Allow all operations on popup_config for anon users"
    ON public.popup_config
    FOR ALL
    USING (true)
    WITH CHECK (true);