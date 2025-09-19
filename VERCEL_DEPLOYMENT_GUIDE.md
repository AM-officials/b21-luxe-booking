# Vercel Deployment Environment Variables

## Required Environment Variables for Vercel

When deploying to Vercel, you need to set the following environment variables in your Vercel dashboard:

### 1. VITE_SUPABASE_URL
- **Value**: `https://akbpveurkalpkuncswan.supabase.co`
- **Description**: The URL of your Supabase project
- **Required for**: Database connections, authentication, storage

### 2. VITE_SUPABASE_ANON_KEY
- **Value**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFrYnB2ZXVya2FscGt1bmNzd2FuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ5MjQ5MTIsImV4cCI6MjA1MDUwMDkxMn0.oUhJTVV7iJP5KyFXy2gMGhPU2FGYMhRf7GUgMKoAzBc`
- **Description**: The anonymous/public key for your Supabase project
- **Required for**: Client-side authentication and API calls

## How to Set Environment Variables in Vercel

### Method 1: Through Vercel Dashboard
1. Go to your project dashboard on Vercel
2. Click on **Settings** tab
3. Click on **Environment Variables** in the sidebar
4. Add each variable:
   - Name: `VITE_SUPABASE_URL`
   - Value: `https://akbpveurkalpkuncswan.supabase.co`
   - Environment: Select "Production", "Preview", and "Development"
   - Click **Save**
5. Repeat for `VITE_SUPABASE_ANON_KEY`

### Method 2: Through Vercel CLI (if you have it installed)
```bash
vercel env add VITE_SUPABASE_URL
# Enter: https://akbpveurkalpkuncswan.supabase.co

vercel env add VITE_SUPABASE_ANON_KEY
# Enter: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFrYnB2ZXVya2FscGt1bmNzd2FuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ5MjQ5MTIsImV4cCI6MjA1MDUwMDkxMn0.oUhJTVV7iJP5KyFXy2gMGhPU2FGYMhRf7GUgMKoAzBc
```

## Important Notes

- **NEVER** commit these values to GitHub
- The `.env` file is excluded by `.gitignore` to prevent accidental commits
- These are the public keys - they're safe to use in client-side applications
- The anonymous key has Row Level Security (RLS) policies applied
- After setting variables, you may need to redeploy your application

## Vercel Deployment Steps

1. **Push to GitHub**: Make sure your code is pushed to a GitHub repository
2. **Connect to Vercel**: Import your GitHub repository to Vercel
3. **Set Environment Variables**: Add the variables above in Vercel dashboard
4. **Deploy**: Vercel will automatically build and deploy your app

## Testing Your Deployment

After deployment, verify these features work:
- ✅ Website loads without errors
- ✅ Blog posts load from Supabase database
- ✅ Videos play from Supabase Storage
- ✅ Admin panel works (login functionality)
- ✅ Popup banners load from database
- ✅ Contact forms submit to database

## Troubleshooting

**If videos don't load:**
- Check that the `videos` bucket exists in Supabase Storage
- Verify bucket is set to **Public**
- Ensure video files are uploaded correctly

**If database operations fail:**
- Verify environment variables are set correctly
- Check Supabase project is active and accessible
- Review browser console for specific error messages

**If build fails:**
- Check that all dependencies are listed in `package.json`
- Verify TypeScript types are correct
- Review Vercel build logs for specific errors