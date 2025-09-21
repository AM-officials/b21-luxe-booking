import { useQuery } from '@tanstack/react-query';
import { fetchPopupConfig } from '@/lib/supabaseApi';

export function buildWhatsAppUrl(number: string, message: string) {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

const DEFAULT_NUMBER = '919876543210';
const DEFAULT_MESSAGE = "Hi B21! I'm interested in your 20% off last-minute booking offer.";

export function useWhatsappConfig(messageOverride?: string) {
  const query = useQuery({ queryKey: ['popup_config'], queryFn: fetchPopupConfig });
  const cfg = query.data;
  const phone = cfg?.whatsapp_number || DEFAULT_NUMBER;
  const msg = (messageOverride ?? cfg?.whatsapp_message) || DEFAULT_MESSAGE;
  const url = buildWhatsAppUrl(phone, msg);
  return { number: phone, message: msg, url, isLoading: query.isLoading };
}
