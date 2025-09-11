'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { MagicCard } from '@/components/magicui/magic-card';
import { RippleButton } from '@/components/magicui/ripple-button';
import confetti from 'canvas-confetti';
import { sanitizeInput } from '../../lib/sanitize';
import { trackFormSubmission } from '../../lib/analytics';
import DevModeTooltip from '../common/DevModeTooltip';
import LoadingSkeleton from '../common/LoadingSkeleton';

interface ContactSectionProps {
  devMode: boolean;
}

const formSchema = z.object({
  name: z.string().min(1, 'Name is required').max(50, 'Name must be 50 characters or less'),
  email: z.string().email('Invalid email address').min(1, 'Email is required'),
  message: z.string().min(1, 'Message is required').max(500, 'Message must be 500 characters or less'),
});

type FormData = z.infer<typeof formSchema>;

export default function ContactSection({ devMode }: ContactSectionProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: '', email: '', message: '' },
  });

  const triggerConfetti = () => {
    if (!buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 1000 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval = window.setInterval(() => {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) return clearInterval(interval);

      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults,
        particleCount,
        origin: {
          x: (rect.left + rect.width / 2) / window.innerWidth,
          y: (rect.top + rect.height / 2) / window.innerHeight,
        },
      });
    }, 250);
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);

    const sanitizedData = {
      name: sanitizeInput(data.name),
      email: sanitizeInput(data.email),
      message: sanitizeInput(data.message),
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sanitizedData),
      });

      if (response.ok) {
        trackFormSubmission();
        setIsSubmitted(true);
        triggerConfetti();
        reset();
      }
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-[var(--background)]">
      <motion.h2
        className="text-4xl md:text-5xl font-bold text-primary text-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Contact Us
      </motion.h2>
      <div className="max-w-md mx-auto">
        <MagicCard
          className="p-8 rounded-2xl magic-card"
          gradientSize={200}
          gradientFrom="#00FF66"
          gradientTo="#FF00FF"
          gradientColor={devMode ? '#33BBCF' : 'rgba(0, 255, 102, 0.3)'}
          gradientOpacity={0.8}
        >
          {isSubmitting ? (
            <LoadingSkeleton />
          ) : isSubmitted ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="text-center"
            >
              <p className="text-[var(--accent)] gradient-text">Thank you! Your message has been sent.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-primary text-lg font-medium mb-1">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Enter your name"
                  className="w-full p-3 glassmorphism rounded-lg text-primary focus:outline-none focus:ring-2 focus:ring-accent"
                  {...register('name')}
                />
                {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>}
              </div>
              <div>
                <label htmlFor="email" className="block text-primary text-lg font-medium mb-1">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="w-full p-3 glassmorphism rounded-lg text-primary focus:outline-none focus:ring-2 focus:ring-accent"
                  {...register('email')}
                />
                {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
              </div>
              <div>
                <label htmlFor="message" className="block text-primary text-lg font-medium mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  placeholder="Enter your message"
                  className="w-full p-3 glassmorphism rounded-lg text-primary focus:outline-none focus:ring-2 focus:ring-accent"
                  rows={5}
                  {...register('message')}
                />
                {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>}
              </div>
              <RippleButton
                ref={buttonRef}
                type="submit"
                className="w-full p-3 glassmorphism rounded-lg text-[var(--text-dark)] hover:bg-[var(--button-hover-gradient)]"
                rippleColor="#33BBCF"
                disabled={isSubmitting}
              >
                Send Message
              </RippleButton>
            </form>
          )}
          {devMode && (
            <DevModeTooltip
              content="Inputs are sanitized using sanitize-html to prevent XSS and SQL injection attacks."
              isVisible={devMode}
            />
          )}
        </MagicCard>
      </div>
    </section>
  );
}