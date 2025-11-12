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
        url: '/images/logo-primary-black.webp',
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
    images: ['/images/logo-primary-black.webp'],
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
            "logo": "https://sostentia.com/images/logo-primary-black.webp",
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What is Sostentia?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Sostentia is a premier full-stack development agency dedicated to crafting innovative, secure, and high-performance digital solutions tailored to meet the unique needs of our clients."
                }
              },
              {
                "@type": "Question",
                "name": "What services does Sostentia offer?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Sostentia provides a wide range of services, including full-stack development, custom web and mobile application design, API integration, UX/UI optimization, ongoing maintenance and support, content creation, and security consulting, all tailored to enhance your digital presence and business efficiency."
                }
              },
              {
                "@type": "Question",
                "name": "How can I contact you?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "You can reach us conveniently through the contact form on our website, where our team will respond to your inquiry promptly and professionally."
                }
              },
              {
                "@type": "Question",
                "name": "What tech skills does Sostentia bring to the table?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "At Sostentia, we are skilled in a friendly mix of top-notch technologies like React, Node.js, MySQL, PostgreSQL, TypeScript, and Next.js, helping us create tailored, high-quality solutions that work great for our clients!"
                }
              },
              {
                "@type": "Question",
                "name": "Can you provide custom solutions for my business?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Absolutely! At Sostentia, we proudly tailor our services to align with your unique business needs, ensuring a personalized and effective solution just for you."
                }
              },
              {
                "@type": "Question",
                "name": "What does the development process look like?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "At Sostentia, we utilize an agile methodology, fostering transparency and close collaboration with you at every step of the project to ensure a smooth and successful outcome."
                }
              }
            ]
          })
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Web Application Development",
            "description": "Building scalable and secure web applications.",
            "provider": {
              "@type": "Organization",
              "name": "Sostentia"
            }
          })
        }}
      />
    </main>
  );
}