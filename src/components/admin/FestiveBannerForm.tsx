import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchFestiveBannerConfig, saveFestiveBannerConfig } from '@/lib/supabaseApi';
import { supabase } from '@/integrations/supabase/client';
import { Image, Loader2, X } from 'lucide-react';

type FormValues = {
  enabled: boolean;
  title: string;
  subtitle: string;
  button_text: string;
  banner_image: string;
  whatsapp_message: string;
};

type FestiveBannerFormProps = {
  onSuccess?: (message: string) => void;
  onError?: (message: string) => void;
};

export default function FestiveBannerForm({ onSuccess, onError }: FestiveBannerFormProps = {}) {
  const qc = useQueryClient();
  const { data } = useQuery({ queryKey: ['festive_banner'], queryFn: fetchFestiveBannerConfig });
  const { register, handleSubmit, reset, setValue, watch } = useForm<FormValues>({
    defaultValues: {
      enabled: true,
      title: 'FESTIVE GLOW',
      subtitle: 'Celebrate the season with our exclusive festive beauty packages',
      button_text: 'VIEW OFFERS',
      banner_image: '/images/pop-up-banner.jpg',
      whatsapp_message: "Hi B21! I'm interested in your Festive Glow offers.",
    },
  });

  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const currentBannerImage = watch('banner_image');

  useEffect(() => {
    if (data) {
      reset({
        enabled: (data as any).enabled ?? true,
        title: (data as any).title || 'FESTIVE GLOW',
        subtitle: (data as any).subtitle || 'Celebrate the season with our exclusive festive beauty packages',
        button_text: (data as any).button_text || 'VIEW OFFERS',
        banner_image: (data as any).banner_image || '/images/pop-up-banner.jpg',
        whatsapp_message: (data as any).whatsapp_message || "Hi B21! I'm interested in your Festive Glow offers.",
      });
    }
  }, [data, reset]);

  const handleImageUpload = async (file: File): Promise<string> => {
    setIsUploadingImage(true);
    try {
      // Create unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `festive-${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `${fileName}`;

      console.log('Uploading festive banner image:', filePath);

      // Upload to festive-banners bucket
      const { data, error } = await supabase.storage
        .from('festive-banners')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) {
        console.error('Upload error:', error);
        throw error;
      }

      console.log('Upload successful to festive-banners bucket');

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('festive-banners')
        .getPublicUrl(filePath);

      console.log('Public URL generated:', publicUrl);

      return publicUrl;
    } catch (error) {
      console.error('Festive banner image upload error:', error);
      throw new Error('Failed to upload festive banner image: ' + (error as any).message);
    } finally {
      setIsUploadingImage(false);
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file (JPG, PNG, WebP, GIF)');
      return;
    }

    // Validate file size (10MB max)
    if (file.size > 10 * 1024 * 1024) {
      alert('Image must be smaller than 10MB');
      return;
    }

    console.log('Selected file:', file.name, 'Type:', file.type, 'Size:', file.size);

    try {
      const imageUrl = await handleImageUpload(file);
      setValue('banner_image', imageUrl);
      console.log('Festive banner image updated successfully:', imageUrl);
    } catch (error) {
      console.error('Upload failed:', error);
      const errorMessage = (error as any).message || 'Unknown error occurred';
      alert('Failed to upload festive banner image: ' + errorMessage + '\n\nPlease check:\n1. Internet connection\n2. File is a valid image\n3. festive-banners bucket exists in Supabase\n4. Try a smaller file size');
    }
  };

  const mutation = useMutation({
    mutationFn: saveFestiveBannerConfig,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['festive_banner'] });
      onSuccess?.('Festive banner settings saved');
    },
    onError: () => onError?.('Failed to save festive banner settings'),
  });

  const onSubmit = (values: FormValues) => {
    mutation.mutate(values);
  };

  return (
    <div className="card-luxury p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-heading text-2xl font-bold">Festive Glow Banner</h2>
        {mutation.isPending && <span className="text-sm text-muted-foreground">Saving…</span>}
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <label className="flex items-center gap-2">
          <input type="checkbox" {...register('enabled')} />
          <span>Show Festive Banner</span>
        </label>
        <div className="md:col-span-2">
          <label className="block text-sm text-muted-foreground mb-1">Title</label>
          <input className="w-full border rounded px-3 py-2 bg-background" {...register('title')} placeholder="FESTIVE GLOW" />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm text-muted-foreground mb-1">Subtitle</label>
          <input className="w-full border rounded px-3 py-2 bg-background" {...register('subtitle')} placeholder="Celebrate the season with our exclusive festive beauty packages" />
        </div>
        <div>
          <label className="block text-sm text-muted-foreground mb-1">Button Text</label>
          <input className="w-full border rounded px-3 py-2 bg-background" {...register('button_text')} placeholder="VIEW OFFERS" />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm text-muted-foreground mb-1">WhatsApp Message</label>
          <input className="w-full border rounded px-3 py-2 bg-background" {...register('whatsapp_message')} placeholder="Hi B21! I'm interested in your Festive Glow offers." />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm text-muted-foreground mb-1">Banner Image</label>
          <div className="space-y-3">
            {/* Image Preview */}
            {currentBannerImage && (
              <div className="relative">
                <img 
                  src={currentBannerImage} 
                  alt="Festive banner preview" 
                  className="w-full h-48 object-cover rounded-md border border-border"
                  onError={(e) => {
                    e.currentTarget.src = '/placeholder.svg';
                  }}
                />
                <button
                  type="button"
                  onClick={() => setValue('banner_image', '/images/pop-up-banner.jpg')}
                  className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
                  title="Reset to default image"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            )}
            
            {/* Upload Controls */}
            <div className="flex gap-2">
              <input
                type="url"
                {...register('banner_image')}
                className="flex-1 border rounded px-3 py-2 bg-background"
                placeholder="https://example.com/banner.jpg or upload below"
              />
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  disabled={isUploadingImage}
                />
                <button
                  type="button"
                  disabled={isUploadingImage}
                  className="px-4 py-2 border border-border rounded-md text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50 flex items-center gap-2"
                  title="Upload festive banner image"
                >
                  {isUploadingImage ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Image className="h-4 w-4" />
                  )}
                  {isUploadingImage ? 'Uploading...' : 'Upload'}
                </button>
              </div>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-1">Upload an image or provide a URL. Recommended size: 1920x600px (wide banner format)</p>
        </div>
        <div className="md:col-span-2 flex justify-end">
          <button type="submit" className="px-5 py-2 bg-accent text-black rounded-md">Save Festive Banner</button>
        </div>
      </form>
    </div>
  );
}
