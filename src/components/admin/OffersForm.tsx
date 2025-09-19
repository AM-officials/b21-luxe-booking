import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchPopupConfig, savePopupConfig } from '@/lib/supabaseApi';

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
  const { register, handleSubmit, reset } = useForm<FormValues>({
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
          <label className="block text-sm text-muted-foreground mb-1">Banner Image URL</label>
          <input className="w-full border rounded px-3 py-2 bg-background" placeholder="/Pop-up banner offer.webp" {...register('banner_image')} />
          <p className="text-xs text-muted-foreground mt-1">Provide relative path or full URL.</p>
        </div>
        <div className="md:col-span-2 flex justify-end">
          <button type="submit" className="px-5 py-2 bg-accent text-black rounded-md">Save</button>
        </div>
      </form>
    </div>
  );
}
