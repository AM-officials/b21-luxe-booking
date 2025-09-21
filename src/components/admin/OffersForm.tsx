import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchPopupConfig, savePopupConfig } from '@/lib/supabaseApi';
import { supabase } from '@/integrations/supabase/client';
import { Upload, Image, Loader2, X } from 'lucide-react';

type FormValues = {
  enabled: boolean;
  delay_ms: number;
  title: string;
  subtitle: string;
  validity_text: string;
  body_text: string;
  whatsapp_number: string;
  whatsapp_message: string;
  banner_image: string;
};

export default function OffersForm() {
  const qc = useQueryClient();
  const { data } = useQuery({ queryKey: ['popup_config'], queryFn: fetchPopupConfig });
  const { register, handleSubmit, reset, setValue, watch } = useForm<FormValues>({
    defaultValues: {
      enabled: true,
      delay_ms: 3000,
      title: 'Special Offer!',
      subtitle: '20% OFF Last-Minute Bookings',
      validity_text: 'Valid for today only',
      body_text: 'Book your appointment today and enjoy 20% off our premium services.',
      whatsapp_number: '919876543210',
  whatsapp_message: "Hi B21! I'm interested in your 20% off last-minute booking offer.",
  banner_image: '/Pop-up banner offer.webp',
    },
  });

  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const currentBannerImage = watch('banner_image');

  useEffect(() => {
    if (data) {
      reset({
        enabled: data.enabled,
        delay_ms: data.delay_ms,
        title: data.title,
        subtitle: data.subtitle,
        validity_text: data.validity_text,
        body_text: data.body_text,
        whatsapp_number: data.whatsapp_number,
  whatsapp_message: data.whatsapp_message,
  banner_image: (data as any).banner_image || '/Pop-up banner offer.webp',
      });
    }
  }, [data, reset]);

  const handleImageUpload = async (file: File): Promise<string> => {
    setIsUploadingImage(true);
    try {
      // Create unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `banner-${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `${fileName}`;

      // Upload to Supabase Storage
      const { error } = await supabase.storage
        .from('banner-images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) throw error;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('banner-images')
        .getPublicUrl(filePath);

      return publicUrl;
    } catch (error) {
      console.error('Banner image upload error:', error);
      throw new Error('Failed to upload banner image');
    } finally {
      setIsUploadingImage(false);
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    // Validate file size (10MB max)
    if (file.size > 10 * 1024 * 1024) {
      alert('Image must be smaller than 10MB');
      return;
    }

    try {
      const imageUrl = await handleImageUpload(file);
      setValue('banner_image', imageUrl);
    } catch (error) {
      alert('Failed to upload banner image. Please try again.');
    }
  };

  const mutation = useMutation({
    mutationFn: savePopupConfig,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['popup_config'] }),
  });

  const onSubmit = (values: FormValues) => {
    mutation.mutate(values);
  };

  return (
    <div className="card-luxury p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-heading text-2xl font-bold">Popup Offer</h2>
        {mutation.isPending && <span className="text-sm text-muted-foreground">Saving…</span>}
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <label className="flex items-center gap-2">
          <input type="checkbox" {...register('enabled')} />
          <span>Enabled</span>
        </label>
        <div>
          <label className="block text-sm text-muted-foreground mb-1">Delay (ms)</label>
          <input type="number" className="w-full border rounded px-3 py-2 bg-background" {...register('delay_ms', { valueAsNumber: true })} />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm text-muted-foreground mb-1">Title</label>
          <input className="w-full border rounded px-3 py-2 bg-background" {...register('title')} />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm text-muted-foreground mb-1">Subtitle</label>
          <input className="w-full border rounded px-3 py-2 bg-background" {...register('subtitle')} />
        </div>
        <div>
          <label className="block text-sm text-muted-foreground mb-1">Validity Text</label>
          <input className="w-full border rounded px-3 py-2 bg-background" {...register('validity_text')} />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm text-muted-foreground mb-1">Body Text</label>
          <textarea className="w-full border rounded px-3 py-2 bg-background" rows={4} {...register('body_text')} />
        </div>
        <div>
          <label className="block text-sm text-muted-foreground mb-1">WhatsApp Number</label>
          <input className="w-full border rounded px-3 py-2 bg-background" {...register('whatsapp_number')} />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm text-muted-foreground mb-1">WhatsApp Message</label>
          <input className="w-full border rounded px-3 py-2 bg-background" {...register('whatsapp_message')} />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm text-muted-foreground mb-1">Banner Image</label>
          <div className="space-y-3">
            {/* Image Preview */}
            {currentBannerImage && (
              <div className="relative">
                <img 
                  src={currentBannerImage} 
                  alt="Banner image preview" 
                  className="w-full h-32 object-cover rounded-md border border-border"
                  onError={(e) => {
                    e.currentTarget.src = '/placeholder.svg';
                  }}
                />
                <button
                  type="button"
                  onClick={() => setValue('banner_image', '')}
                  className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
                  title="Remove image"
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
                  title="Upload banner image"
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
          <p className="text-xs text-muted-foreground mt-1">Upload an image or provide a URL. Recommended size: 400x300px</p>
        </div>
        <div className="md:col-span-2 flex justify-end">
          <button type="submit" className="px-5 py-2 bg-accent text-black rounded-md">Save</button>
        </div>
      </form>
    </div>
  );
}
