-- URGENT: Fix storage RLS policies for banner image upload

-- Step 1: Drop any existing storage policies that might be conflicting
DROP POLICY IF EXISTS "Allow anon access to blog-images" ON storage.objects;
DROP POLICY IF EXISTS "Allow anon access to banner-images" ON storage.objects;
DROP POLICY IF EXISTS "Enable anon access for blog-images" ON storage.objects;
DROP POLICY IF EXISTS "Enable anon access for banner-images" ON storage.objects;

-- Step 2: Create simple, permissive policies for anon users
CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (true);
CREATE POLICY "Public Insert" ON storage.objects FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Update" ON storage.objects FOR UPDATE USING (true);
CREATE POLICY "Public Delete" ON storage.objects FOR DELETE USING (true);

-- Alternative: If you want bucket-specific policies, use this instead:
-- CREATE POLICY "blog_images_policy" ON storage.objects FOR ALL TO anon, authenticated USING (bucket_id = 'blog-images');
-- CREATE POLICY "banner_images_policy" ON storage.objects FOR ALL TO anon, authenticated USING (bucket_id = 'banner-images');

-- Step 3: Make sure buckets exist and are public
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'blog-images', 
    'blog-images', 
    true, 
    10485760,
    ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
) ON CONFLICT (id) DO UPDATE SET public = true;

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'banner-images', 
    'banner-images', 
    true, 
    10485760,
    ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
) ON CONFLICT (id) DO UPDATE SET public = true;