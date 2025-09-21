# Manual Bucket Creation Instructions

## Create banner-images bucket manually in Supabase Dashboard:

1. **Go to Supabase Dashboard**: https://supabase.com/dashboard/project/akbpveurkalpkuncswan

2. **Navigate to Storage**:
   - Click "Storage" in the left sidebar
   - Click "Create Bucket" button

3. **Create Bucket**:
   - Bucket name: `banner-images`
   - Make bucket public: ✅ **CHECK THIS BOX**
   - File size limit: `10485760` (10MB)
   - Allowed MIME types: `image/jpeg,image/jpg,image/png,image/webp,image/gif`
   - Click "Create Bucket"

4. **Verify Bucket Exists**:
   - You should see `banner-images` in the Storage buckets list
   - The bucket should show as "Public"

## Alternative: Use SQL to create bucket and policies

If the above doesn't work, go to **SQL Editor** and run:

```sql
-- Create banner-images bucket
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'banner-images', 
    'banner-images', 
    true, 
    10485760,
    ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
) ON CONFLICT (id) DO NOTHING;

-- Create RLS policy for banner-images
INSERT INTO storage.policies (bucket_id, name, definition, check, roles)
VALUES (
    'banner-images',
    'Allow anon access to banner-images',
    '(bucket_id = ''banner-images'')',
    '(bucket_id = ''banner-images'')',
    ARRAY['anon']
) ON CONFLICT DO NOTHING;
```

## Test Upload

After creating the bucket:
1. Go to your website admin panel
2. Try uploading a banner image (JPG, PNG, WebP under 10MB)
3. Check browser console (F12) for any error messages
4. If it still fails, the upload will automatically fallback to using the blog-images bucket

The code now includes automatic fallback to blog-images bucket if banner-images doesn't exist.