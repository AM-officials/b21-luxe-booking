"use client";
import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from 'react';

export type PopupBannerConfig = {
  enabled: boolean;
  headline: string;
  offerText: string;
  buttonText: string;
  buttonLink: string;
  imageUrl?: string;
  delayMs: number; // delay after app loaded
};

type PopupContextValue = {
  config: PopupBannerConfig;
  update: (partial: Partial<PopupBannerConfig>) => void;
  dismissed: boolean;
  dismiss: () => void;
  readyToShow: boolean; // becomes true after loader event + delay
};

const DEFAULT_CONFIG: PopupBannerConfig = {
  enabled: true,
  headline: 'Monsoon Glow Offer',
  offerText: 'Flat 20% off on skincare rituals + complimentary scalp analysis. Limited time only.' ,
  buttonText: 'Book Now',
  buttonLink: '/services',
  imageUrl: '/logo-white.png',
  delayMs: 1000,
};

const STORAGE_KEY = 'b21.popup.config.v1';
const DISMISS_KEY = 'b21.popup.dismissed.session';

const PopupContext = createContext<PopupContextValue | undefined>(undefined);

export function PopupProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<PopupBannerConfig>(() => {
    if (typeof window === 'undefined') return DEFAULT_CONFIG;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return { ...DEFAULT_CONFIG, ...JSON.parse(raw) } as PopupBannerConfig;
    } catch {}
    return DEFAULT_CONFIG;
  });
  const [dismissed, setDismissed] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return sessionStorage.getItem(DISMISS_KEY) === '1';
  });
  const [appLoaded, setAppLoaded] = useState(false);
  const [readyToShow, setReadyToShow] = useState(false);

  useEffect(() => {
    function onLoaded(){ setAppLoaded(true); }
    window.addEventListener('appLoaded', onLoaded);
    return () => window.removeEventListener('appLoaded', onLoaded);
  }, []);

  useEffect(() => {
    if (appLoaded) {
      const t = setTimeout(() => setReadyToShow(true), config.delayMs);
      return () => clearTimeout(t);
    }
  }, [appLoaded, config.delayMs]);

  const update = useCallback((partial: Partial<PopupBannerConfig>) => {
    setConfig(prev => {
      const next = { ...prev, ...partial };
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch {}
      return next;
    });
  }, []);

  const dismiss = useCallback(() => {
    setDismissed(true);
    try { sessionStorage.setItem(DISMISS_KEY, '1'); } catch {}
  }, []);

  return (
    <PopupContext.Provider value={{ config, update, dismissed, dismiss, readyToShow }}>
      {children}
    </PopupContext.Provider>
  );
}

export function usePopupBanner() {
  const ctx = useContext(PopupContext);
  if (!ctx) throw new Error('usePopupBanner must be used within PopupProvider');
  return ctx;
}
