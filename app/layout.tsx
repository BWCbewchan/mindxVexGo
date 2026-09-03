import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = { title: 'mindX · VEX GO Studio', description: 'A VEX GO programming workspace for the web.' };
export const viewport: Viewport = { width: 'device-width', initialScale: 1, themeColor: '#123e35' };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="vi"><body>{children}</body></html>;
}
