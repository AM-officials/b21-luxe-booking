-- Fix RLS policies for blog CMS functionality
-- This allows anon users (with proper API key) to perform all operations on posts

-- Drop existing restrictive policies
DROP POLICY IF EXISTS "Allow read published posts to anon" ON public.posts;
DROP POLICY IF EXISTS "Allow full access to authenticated users" ON public.posts;

-- Create permissive policies for anon users (admin operations)
-- In a real app, you'd want proper auth, but for this demo we'll allow anon operations
CREATE POLICY "Allow all operations for anon users" 
    ON public.posts 
    FOR ALL 
    USING (true)
    WITH CHECK (true);

-- Also allow all operations on popup_config for anon users
DROP POLICY IF EXISTS "Allow read popup config to anon" ON public.popup_config;
DROP POLICY IF EXISTS "Allow update popup config to authenticated" ON public.popup_config;

CREATE POLICY "Allow all operations on popup_config for anon users"
    ON public.popup_config
    FOR ALL
    USING (true)
    WITH CHECK (true);

-- Create blog_images storage bucket for image uploads
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'blog-images', 
    'blog-images', 
    true, 
    10485760, -- 10MB limit
    ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
) ON CONFLICT (id) DO NOTHING;

-- Create banner-images storage bucket for popup banner uploads
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'banner-images', 
    'banner-images', 
    true, 
    10485760, -- 10MB limit
    ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
) ON CONFLICT (id) DO NOTHING;

-- Allow anon users to upload, read, update, and delete from blog-images bucket
CREATE POLICY "Allow anon access to blog-images"
    ON storage.objects
    FOR ALL
    USING (bucket_id = 'blog-images')
    WITH CHECK (bucket_id = 'blog-images');

-- Allow anon users to upload, read, update, and delete from banner-images bucket
CREATE POLICY "Allow anon access to banner-images"
    ON storage.objects
    FOR ALL
    USING (bucket_id = 'banner-images')
    WITH CHECK (bucket_id = 'banner-images');