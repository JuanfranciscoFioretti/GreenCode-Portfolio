'use client';

import { m } from 'framer-motion';
import Image from 'next/image';
import { Smartphone, LayoutDashboard, Package, Calendar, Bell, BarChart3, Users, Zap, ArrowRight } from 'lucide-react';
import DevModeTooltip from '../common/DevModeTooltip';

interface SostentiaDeskSectionProps {
  devMode: boolean;
}

export default function SostentiaDeskSection({ devMode }: SostentiaDeskSectionProps) {
  const features = [
    {
      title: 'Mobile App',
      description: 'Sell products and manage reservations from anywhere',
      icon: Smartphone,
    },
    {
      title: 'Web Dashboard',
      description: 'Complete panel to manage your entire business',
      icon: LayoutDashboard,
    },
    {
      title: 'Product Management',
      description: 'Create and manage your product catalog easily',
      icon: Package,
    },
    {
      title: 'Reservations',
      description: 'Smart booking system and calendar management',
      icon: Calendar,
    },
    {
      title: 'News & Events',
      description: 'Share updates and events with your customers',
      icon: Bell,
    },
    {
      title: 'Analytics',
      description: 'Detailed business insights in real-time',
      icon: BarChart3,
    },
    {
      title: 'Team Management',
      description: 'Assign roles and permissions to your employees',
      icon: Users,
    },
    {
      title: 'Complete Control',
      description: 'Manage sales, bookings, and operations all in one place',
      icon: Zap,
    },
  ];

  return (
    <section id="sostentia-desk" className="w-full pt-20 pb-20 bg-[var(--gradient-bg)] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        {devMode && (
          <DevModeTooltip
            content="Sostentia Desk SaaS Product Section with mobile frame overlay on desktop screenshot"
            isVisible={devMode}
          />
        )}

        {/* Título */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <a
            href="https://sostentia-desk.vercel.app/en"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-4 mb-6"
          >
            <ArrowRight className="size-10 -translate-x-full text-primary opacity-0 transition-all duration-300 ease-out group-hover:translate-x-0 group-hover:text-accent group-hover:opacity-100" />
            <h2 className="text-4xl md:text-5xl font-bold text-primary -translate-x-12 transition-transform duration-300 ease-out group-hover:translate-x-0 group-hover:text-accent">
              Sostentia Desk
            </h2>
          </a>
          <p className="text-lg text-secondary max-w-2xl mx-auto">
            The complete SaaS solution to manage your business. Combines an intuitive mobile app with a powerful web dashboard.
          </p>
        </m.div>

        {/* Visual Section con Layout Responsive */}
        <m.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="relative w-full h-auto mb-20"
        >
          {/* Mobile Layout - Stack vertically */}
          <div className="md:hidden flex flex-col items-center gap-6">
            {/* Frame Móvil - Arriba en móvil */}
            <div className="w-full flex justify-center">
              <div className="relative w-40 aspect-[9/19] bg-black rounded-[2.5rem] shadow-2xl border-8 border-gray-800 overflow-hidden">
                {/* Notch */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-28 h-6 bg-black rounded-b-3xl z-20"></div>

                {/* Contenido móvil */}
                <div className="relative w-full h-full overflow-hidden">
                  <Image
                    src="/images/projects/App-Screen-1.webp"
                    alt="Sostentia Desk Mobile App"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </div>

            {/* Screenshot - Abajo en móvil */}
            <div className="relative w-full h-64 sm:h-80">
              <Image
                src="/images/projects/screen.webp"
                alt="Sostentia Desk Dashboard"
                fill
                className="object-cover rounded-3xl shadow-2xl"
                priority
              />
            </div>
          </div>

          {/* Tablet & Desktop Layout - Horizontal con overlay */}
          <div className="hidden md:block relative w-full h-auto">
            <div className="relative w-full aspect-video lg:aspect-auto lg:h-[600px] flex items-center justify-center">
              {/* Imagen grande - Screenshot1 */}
              <div className="relative w-full h-full">
                <Image
                  src="/images/projects/screen.webp"
                  alt="Sostentia Desk Dashboard"
                  fill
                  className="object-cover rounded-3xl shadow-2xl"
                  priority
                />
              </div>

              {/* Frame Móvil con App-Screen-1 - Overlaid en la izquierda */}
              <div className="absolute left-4 lg:left-6 top-1/2 transform -translate-y-1/2 z-10">
                <div className="relative w-48 lg:w-64 aspect-[9/19] bg-black rounded-[3rem] shadow-2xl border-8 border-gray-800 overflow-hidden">
                  {/* Notch */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-7 bg-black rounded-b-3xl z-20"></div>

                  {/* Contenido móvil */}
                  <div className="relative w-full h-full overflow-hidden">
                    <Image
                      src="/images/projects/App-Screen-1.webp"
                      alt="Sostentia Desk Mobile App"
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </m.div>

        {/* Features Grid */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
            <m.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative h-full"
            >
              <div className="sostentia-feature-card relative h-full p-6 rounded-xl border backdrop-blur-sm overflow-hidden hover:-translate-y-1">
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/10 via-transparent to-[var(--highlight)]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Content */}
                <div className="relative z-10 h-full flex flex-col">
                  {/* Icon */}
                  <div className="mb-4 transition-transform duration-300 group-hover:-translate-y-2">
                    <Icon className="w-8 h-8 text-[#01f19d]" />
                  </div>
                  <h3 className="text-lg font-semibold text-primary mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-secondary leading-relaxed flex-grow">
                    {feature.description}
                  </p>
                </div>
              </div>
            </m.div>
            );
          })}
        </m.div>

        {/* CTA */}
        <m.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <a
            href="https://sostentia-desk.vercel.app/en"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-4 bg-gradient-to-r from-[#01f19d] to-[#00d9f4] text-black font-semibold rounded-2xl border border-[#00d9f4]/30 shadow-[0_0_20px_rgba(0,217,244,0.3)] backdrop-blur-sm transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,217,244,0.6)] hover:-translate-y-1 hover:scale-105 hover:border-[#00d9f4]/60 animate-gradient-shift"
          >
            Explore Sostentia Desk
          </a>
        </m.div>
      </div>
    </section>
  );
}
