// 'use client';

// import React from 'react';
// import { Poppins } from 'next/font/google';
// import Navbar from './components/common/Navbar';
// import Footer from './components/common/Footer';
// import { DevModeProvider } from './lib/DevModeContext';
// import { ThemeProvider, useTheme } from './lib/ThemeContext';
// import './styles/globals.css';

// const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600', '700'], display: 'swap' });

// const metadata = {
//   title: 'Greencode - Digital Solutions',
//   description: 'Greencode offers cutting-edge web and mobile app development, UX/UI design, and AI automations.',
//   keywords: 'web development, mobile apps, UX/UI design, cybersecurity, AI automations, Greencode',
//   icons: {
//     icon: '/images/logo-primary.svg',
//   },
//   openGraph: {
//     title: 'Greencode Portfolio',
//     description: 'Discover Greencode’s innovative solutions and projects.',
//     url: 'https://green-code-portfolio.vercel.app/',
//     siteName: 'Greencode',
//     images: [
//       {
//         url: '/images/logo-primary.svg',
//         width: 1200,
//         height: 630,
//         alt: 'Greencode Portfolio Preview',
//       },
//     ],
//     locale: 'en_US',
//     type: 'website',
//   },
// };

// function RootContent({ children }: { children: React.ReactNode }) {
//   const { theme } = useTheme();
//   return (
//     <html lang="en" className={poppins.className} data-theme={theme}>
//       <head>
//         <meta name="viewport" content="width=device-device-width, initial-scale=1" />
//         <meta name="description" content={metadata.description} />
//         <meta name="keywords" content={metadata.keywords} />
//         <meta property="og:title" content={metadata.openGraph.title} />
//         <meta property="og:description" content={metadata.openGraph.description} />
//         <meta property="og:url" content={metadata.openGraph.url} />
//         <meta property="og:site_name" content={metadata.openGraph.siteName} />
//         <meta property="og:locale" content={metadata.openGraph.locale} />
//         <meta property="og:type" content={metadata.openGraph.type} />
//         <meta property="og:image" content={metadata.openGraph.images[0].url} />
//         <meta property="og:image:width" content={metadata.openGraph.images[0].width.toString()} />
//         <meta property="og:image:height" content={metadata.openGraph.images[0].height.toString()} />
//         <meta property="og:image:alt" content={metadata.openGraph.images[0].alt} />
//         <title>{metadata.title}</title>
//         <link rel="icon" href={metadata.icons.icon} /> {/* Fallback for explicit favicon */}
//       </head>
//       <body>
//         <Navbar />
//         {children}
//         <Footer />
//       </body>
//     </html>
//   );
// }

// export default function RootLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <ThemeProvider>
//       <DevModeProvider>
//         <RootContent>{children}</RootContent>
//       </DevModeProvider>
//     </ThemeProvider>
//   );
// }

'use client';

import React from 'react';
import { Poppins } from 'next/font/google';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import { DevModeProvider } from './lib/DevModeContext';
import { ThemeProvider, useTheme } from './lib/ThemeContext';
import './styles/globals.css';

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600', '700'], display: 'swap' });

const metadata = {
  title: 'Greencode - Digital Solutions',
  description: 'Greencode offers cutting-edge web and mobile app development, UX/UI design, and AI automations.',
  keywords: 'web development, mobile apps, UX/UI design, cybersecurity, AI automations, Greencode',
  icons: {
    icon: '/images/logo-primary.svg',
  },
  openGraph: {
    title: 'Greencode Portfolio',
    description: 'Discover Greencode’s innovative solutions and projects.',
    url: 'https://green-code-portfolio.vercel.app/',
    siteName: 'Greencode',
    images: [
      {
        url: '/images/logo-primary.svg',
        width: 1200,
        height: 630,
        alt: 'Greencode Portfolio Preview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

function RootContent({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();
  return (
    <html lang="en" className={`${poppins.className} h-full`} data-theme={theme}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords} />
        <meta property="og:title" content={metadata.openGraph.title} />
        <meta property="og:description" content={metadata.openGraph.description} />
        <meta property="og:url" content={metadata.openGraph.url} />
        <meta property="og:site_name" content={metadata.openGraph.siteName} />
        <meta property="og:locale" content={metadata.openGraph.locale} />
        <meta property="og:type" content={metadata.openGraph.type} />
        <meta property="og:image" content={metadata.openGraph.images[0].url} />
        <meta property="og:image:width" content={metadata.openGraph.images[0].width.toString()} />
        <meta property="og:image:height" content={metadata.openGraph.images[0].height.toString()} />
        <meta property="og:image:alt" content={metadata.openGraph.images[0].alt} />
        <title>{metadata.title}</title>
        <link rel="icon" href={metadata.icons.icon} />
      </head>
      <body className="min-h-full w-full">
        <div className="min-h-screen w-full flex flex-col">
          <Navbar />
          <div className="flex-1 w-full">
            {children}
          </div>
          <Footer />
        </div>
      </body>
    </html>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <DevModeProvider>
        <RootContent>{children}</RootContent>
      </DevModeProvider>
    </ThemeProvider>
  );
}