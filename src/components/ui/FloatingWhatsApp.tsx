import { MessageCircle } from 'lucide-react';
import { useWhatsappConfig } from '@/lib/whatsapp';

export default function FloatingWhatsApp() {
  const { url } = useWhatsappConfig("Hi B21! I have a quick question.");
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed z-50 right-4 bottom-4 md:right-6 md:bottom-6 rounded-full bg-[#25D366] text-white shadow-lg hover:shadow-xl transition-shadow"
      style={{ width: 56, height: 56 }}
    >
      <div className="w-full h-full flex items-center justify-center">
        <MessageCircle size={26} />
      </div>
    </a>
  );
}
