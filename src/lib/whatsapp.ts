import { useQuery } from '@tanstack/react-query';
import { fetchPopupConfig } from '@/lib/supabaseApi';

export function buildWhatsAppUrl(number: string, message: string, source?: string) {
  const digits = (number || '').replace(/\D/g, '');
  // Add source tag to message if provided
  const messageWithSource = source 
    ? `${message} [Source: ${source}]` 
    : message;
  return `https://wa.me/${digits}?text=${encodeURIComponent(messageWithSource)}`;
}

// Default to B21 main WhatsApp number: +91 80930 81930
const DEFAULT_NUMBER = '918093081930';
const DEFAULT_MESSAGE = "Hi B21! I'm interested in your 20% off last-minute booking offer.";

export function useWhatsappConfig(messageOverride?: string, source?: string) {
  const query = useQuery({ queryKey: ['popup_config'], queryFn: fetchPopupConfig });
  const cfg = query.data;
  const phone = cfg?.whatsapp_number || DEFAULT_NUMBER;
  const msg = (messageOverride ?? cfg?.whatsapp_message) || DEFAULT_MESSAGE;
  const url = buildWhatsAppUrl(phone, msg, source);
  return { number: phone, message: msg, url, isLoading: query.isLoading };
}
