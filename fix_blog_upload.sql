-- FIX BLOG IMAGE UPLOAD REGRESSION
-- This ensures both blog-images and banner-images buckets have consistent policies

-- First, ensure blog-images bucket exists and is public
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'blog-images', 
    'blog-images', 
    true, 
    10485760,
    ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp']
) 
ON CONFLICT (id) DO UPDATE SET 
    public = true,
    file_size_limit = 10485760,
    allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

-- Ensure banner-images bucket also exists and is public  
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'banner-images', 
    'banner-images', 
    true, 
    10485760,
    ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp']
) 
ON CONFLICT (id) DO UPDATE SET 
    public = true,
    file_size_limit = 10485760,
    allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

-- Drop all existing storage.objects policies to start fresh
DROP POLICY IF EXISTS "anon_select_storage" ON storage.objects;
DROP POLICY IF EXISTS "anon_insert_storage" ON storage.objects; 
DROP POLICY IF EXISTS "anon_update_storage" ON storage.objects;
DROP POLICY IF EXISTS "anon_delete_storage" ON storage.objects;
DROP POLICY IF EXISTS "public_storage_select" ON storage.objects;
DROP POLICY IF EXISTS "public_storage_insert" ON storage.objects;
DROP POLICY IF EXISTS "public_storage_update" ON storage.objects; 
DROP POLICY IF EXISTS "public_storage_delete" ON storage.objects;

-- Create comprehensive permissive policies for both buckets
CREATE POLICY "allow_all_blog_images" ON storage.objects
FOR ALL USING (bucket_id = 'blog-images');

CREATE POLICY "allow_all_banner_images" ON storage.objects  
FOR ALL USING (bucket_id = 'banner-images');

-- Also create general permissive policy as fallback
CREATE POLICY "allow_public_storage_access" ON storage.objects
FOR ALL USING (true);