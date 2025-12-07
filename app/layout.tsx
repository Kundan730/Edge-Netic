import './globals.css';
import type { Metadata } from 'next';
import { Inter, Space_Mono, VT323 } from 'next/font/google';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const spaceMono = Space_Mono({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-mono'
});
const vt323 = VT323({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-vt323'
});

export const metadata: Metadata = {
  title: 'Edge-Netic - Privacy-First Browser AI',
  description: 'Run AI models locally in your browser with WebGPU. 100% offline, zero data transmitted.',
  manifest: '/manifest.json',
  themeColor: '#00ffff',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Edge-Netic',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
      </head>
      <body className={`${inter.variable} ${spaceMono.variable} ${vt323.variable} font-sans bg-black text-white antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
