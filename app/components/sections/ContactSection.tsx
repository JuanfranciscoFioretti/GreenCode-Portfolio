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
    <section id="contact" className="w-full py-20 bg-[var(--background-gradient)]">
      <motion.h2
        className="text-4xl md:text-5xl font-bold text-primary text-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        animate={{ opacity: isSubmitted ? 0 : 1, y: isSubmitted ? -20 : 0 }}
        transition={{ duration: 0.5 }}
      >
        Contact Us
      </motion.h2>
      <div className="max-w-md mx-auto">
        <MagicCard
          className="p-8 rounded-2xl"
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
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "backOut" }}
              className="text-center py-12"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="mb-6"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-green-400 to-blue-500 flex items-center justify-center">
                  <motion.svg
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5, duration: 0.3 }}
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </motion.svg>
                </div>
              </motion.div>
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="text-2xl font-bold text-primary mb-3"
              >
                Message Sent Successfully!
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="text-lg bg-gradient-to-r from-[#01f19d] to-[#00d9f4] bg-clip-text text-transparent"
              >
                Thank you for reaching out. We will get back to you soon!
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0, duration: 0.6 }}
                className="mt-6"
              >
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="px-6 py-2 text-sm text-primary border border-primary rounded-lg hover:bg-primary hover:text-background transition-colors duration-300"
                >
                  Send Another Message
                </button>
              </motion.div>
            </motion.div>
          ) : (
            <motion.form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4"
              initial={{ opacity: 1 }}
              animate={{ opacity: isSubmitted ? 0 : 1 }}
              transition={{ duration: 0.5 }}
            >
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
            </motion.form>
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