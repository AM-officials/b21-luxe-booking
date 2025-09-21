-- Check storage bucket policies and permissions
-- Run this to diagnose blog image upload issues

-- Check if blog-images bucket exists
SELECT * FROM storage.buckets WHERE name = 'blog-images';

-- Check storage RLS policies 
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
FROM pg_policies 
WHERE schemaname = 'storage' AND tablename = 'objects';

-- Check if we can insert into storage.objects for blog-images
-- This should return the permissions available
SELECT 
  pol.policyname,
  pol.permissive,
  pol.roles,
  pol.cmd,
  pol.qual,
  pol.with_check
FROM pg_policies pol
WHERE pol.schemaname = 'storage' 
  AND pol.tablename = 'objects'
  AND (pol.qual LIKE '%blog-images%' OR pol.with_check LIKE '%blog-images%' OR pol.policyname LIKE '%blog%');