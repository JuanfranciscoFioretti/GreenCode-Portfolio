// import { motion } from 'framer-motion';
import { Metadata } from 'next';
import ClientTechnologiesSection from './components/sections/ClientTechnologiesSection';
import ClientServicesSection from './components/sections/ClientServicesSection';
import ClientContactSection from './components/sections/ClientContactSection';
import ClientFAQSection from './components/sections/ClientFAQSection';
import ClientAboutUsSection from './components/sections/ClientAboutUsSection';
import ClientTestimonialsSection from './components/sections/ClientTestimonialsSection';
// import AnalyticsDashboard from './components/sections/AnalyticsDashboard';
// import DevModeToggle from './components/common/DevModeToggle';
import ClientHeroParallaxDemo from './components/sections/ClientHeroParallaxDemo';
import ClientRobotSection from './components/sections/ClientRobotSection';

export const metadata: Metadata = {
  title: 'Sostentia - Software, Marketing & AI Automations',
  description: 'At Sostentia we turn ideas into custom software, mobile apps, AI automations, marketing campaigns, and cybersecurity analysis to drive your business forward.',
  keywords: 'software development, mobile apps, AI automations, marketing, cybersecurity, web development',
  openGraph: {
    title: 'Sostentia - Digital Solutions',
    description: 'Custom software, AI automations, and marketing solutions for modern businesses.',
    url: 'https://sostentia.com/',
    siteName: 'Sostentia',
    images: [
      {
        url: '/images/logo-primary-black.png',
        width: 1200,
        height: 630,
        alt: 'Sostentia Portfolio',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sostentia - Software & AI Solutions',
    description: 'Custom software development, AI automations, and digital marketing.',
    images: ['/images/logo-primary-black.png'],
  },
};

export default function Home() {
  const devMode = false; // Default for server rendering

  return (
    <main className="w-full min-h-screen">

      <div className="w-full">
        <ClientRobotSection />
      </div>
      
      <div className="w-full">
        <ClientHeroParallaxDemo />
      </div>
      
      <div className="w-full">
        <ClientServicesSection />
      </div>

      <div className="w-full">
        <ClientTechnologiesSection devMode={devMode} />
      </div>
      
      <div className="w-full">
        <ClientAboutUsSection devMode={devMode} />
      </div>
      
      <div className="w-full">
        <ClientTestimonialsSection devMode={devMode} />
      </div>
      
      <div className="w-full">
        <ClientContactSection devMode={devMode} />
      </div>
      
      {/* {!devMode && (
        <motion.div
          className="w-full text-center py-10 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-[24px] gradient-text">Haven’t tried devMode yet?</h2>
          <p className="text-secondary">Enable devMode to explore technical details!</p>
          <div className='flex justify-center mt-4'>
            <DevModeToggle/>
          </div>
        </motion.div>
      )}
      
      {devMode && (
        <motion.div
          className="w-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <AnalyticsDashboard />
        </motion.div>
      )} */}
      
      <div className="w-full">
        <ClientFAQSection devMode={devMode} />
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Sostentia",
            "url": "https://sostentia.com/",
            "logo": "https://sostentia.com/images/logo-primary-black.png",
            "description": "Sostentia offers custom software development, mobile apps, AI automations, marketing campaigns, and cybersecurity analysis.",
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+1-XXX-XXX-XXXX",
              "contactType": "Customer Service",
              "email": "info@sostentia.com"
            },
            "sameAs": [
              "https://www.linkedin.com/company/sostentia",
              "https://github.com/sostentia"
            ]
          })
        }}
      />
    </main>
  );
}