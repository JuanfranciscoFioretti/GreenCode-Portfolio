import React from 'react';
import { Poppins } from 'next/font/google';
import { Metadata, Viewport } from 'next';
import ClientLayout from './ClientLayout';

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600', '700'], display: 'swap' });

export const metadata: Metadata = {
  title: 'Sostentia - Expert Web Development, Mobile Apps & AI Solutions',
  description: 'Boost your business with Sostentia\'s professional web development, mobile apps, UX/UI design, AI automations, and marketing campaigns. Secure, scalable solutions to grow your digital presence.',
  keywords: 'web development, mobile apps, UX/UI design, cybersecurity, AI automations, marketing campaigns, content creation, custom solutions, digital transformation, business growth, Sostentia',
  icons: {
    icon: '/images/Slogo.webp',
  },
  appleWebApp: {
    capable: true,
    title: 'Sostentia',
    statusBarStyle: 'black-translucent',
  },
  openGraph: {
    title: 'Sostentia - Transform Your Business with Digital Innovation',
    description: 'Discover expert web development, mobile applications, AI-powered automations, and marketing strategies from Sostentia. Elevate your business today.',
    url: 'https://sostentia.com/',
    siteName: 'Sostentia',
    images: [
      {
        url: '/images/logo-primary-black.webp',
        width: 1200,
        height: 630,
        alt: 'Sostentia - Leading Digital Solutions Agency',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={poppins.className}>
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}