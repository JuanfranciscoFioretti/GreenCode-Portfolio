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
    // Provide multiple icon formats/sizes so browsers can pick the best one
    icon: '/images/Slogo.webp',
    shortcut: '/images/Slogo.webp',
    apple: '/images/Slogo.webp',
    other: [
      { rel: 'icon', url: '/images/Slogo.webp', sizes: '192x192', type: 'image/webp' },
      { rel: 'icon', url: '/images/Slogo.webp', sizes: '512x512', type: 'image/webp' },
      { rel: 'apple-touch-icon', url: '/images/Slogo.webp' },
    ],
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
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="shortcut icon" href="/images/Slogo.webp" />
        <link rel="apple-touch-icon" href="/images/Slogo.webp" />
        <link rel="icon" href="/images/Slogo.webp" type="image/webp" sizes="192x192" />
        {/* Support ICO favicons: prefer images/Slogo.ico if present */}
        <link rel="icon" href="/images/Slogo.ico" type="image/x-icon" />
        <link rel="icon" href="/Slogo.ico" type="image/x-icon" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      </head>
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}