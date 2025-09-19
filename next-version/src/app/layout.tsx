import './globals.css';
import { ReactNode } from 'react';
import LoadingScreen from '../components/LoadingScreen';
import Providers from '../components/Providers';
import PopupBanner from '../components/popup/PopupBanner';

export const metadata = {
  title: 'B21 Luxury Salon',
  description: 'Hair | Beauty | Spa',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <LoadingScreen />
          <PopupBanner />
          {children}
        </Providers>
      </body>
    </html>
  );
}
