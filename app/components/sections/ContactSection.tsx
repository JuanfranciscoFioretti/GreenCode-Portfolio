'use client';

import { useState } from 'react';
import { m, useReducedMotion } from 'framer-motion';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { MagicCard } from '@/components/magicui/magic-card';
import { RippleButton } from '@/components/magicui/ripple-button';
import { sanitizeInput } from '../../../lib/sanitize';
import { trackFormSubmission } from '../../lib/analytics';
import { useTheme } from '../../lib/ThemeContext';
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
  const { theme } = useTheme();
  const prefersReducedMotion = useReducedMotion();

  // Title animation: transform + opacity only for smooth GPU-accelerated motion
  const titleInitial = prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -12 };
  const titleShow = prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 };
  const titleSubmitted = prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 24 };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: '', email: '', message: '' },
  });

  // Helpers to normalize capitalization on blur/submit
  const toTitleCase = (str: string) =>
    str
      .toLowerCase()
      .replace(/\b\w/g, (c) => c.toUpperCase());

  const capitalizeFirst = (str: string) =>
    str.length ? str.charAt(0).toUpperCase() + str.slice(1) : str;

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);

    const sanitizedData = {
      name: sanitizeInput(toTitleCase(data.name)),
      email: sanitizeInput(data.email),
      message: sanitizeInput(capitalizeFirst(data.message)),
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
        reset();
      }
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="w-full py-20 bg-[var(--gradient-bg)]">
      <m.h2
        className="text-4xl md:text-5xl font-bold text-primary text-center mb-12 relative z-0"
        initial={titleInitial}
        animate={isSubmitted ? titleSubmitted : titleShow}
        transition={{ type: 'spring', stiffness: 280, damping: 24, mass: 0.6 }}
        style={{ willChange: 'transform, opacity' }}
      >
        Contact Us
      </m.h2>
  <div className="max-w-md mx-auto px-[5px] sm:px-0">
        <MagicCard
          className="p-8 rounded-2xl border border-1px border-[var(--glass-border)] min-h-[28rem] relative z-10"
          gradientSize={200}
          gradientFrom="#00FF66"
          gradientTo="#FF00FF"
          gradientColor={'rgba(0, 255, 102, 0.3)'}
          gradientOpacity={0.8}
        >
          {isSubmitting ? (
            <LoadingSkeleton />
          ) : isSubmitted ? (
            <m.div
              initial={{ opacity: 0, scale: 0.98, y: 8, filter: 'blur(4px)' }}
              animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="flex flex-col items-center justify-center text-center min-h-[20rem]"
              role="status"
              aria-live="polite"
            >
              <m.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="mb-6"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-[#01f19d] to-[#00d9f4] flex items-center justify-center shadow-[0_0_20px_rgba(1,241,157,0.35)]">
                  <m.svg
                    initial={{ scale: 0.85, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.28, ease: "easeOut" }}
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
                  </m.svg>
                </div>
              </m.div>
              <m.h3
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="text-2xl font-bold text-primary mb-3"
              >
                Message Sent Successfully!
              </m.h3>
              <m.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className={`text-lg ${
                  theme === 'dark'
                    ? 'bg-gradient-to-r from-[#01f19d] to-[#00d9f4] bg-clip-text text-transparent'
                    : 'text-black drop-shadow-[0_1px_1px_rgba(0,0,0,0.25)]'
                }`}
              >
                Thank you for reaching out. We will get back to you soon!
              </m.p>
            </m.div>
          ) : (
            <m.form
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
                  autoCapitalize="words"
                  autoComplete="name"
                  className="w-full p-3 glassmorphism rounded-lg text-primary focus:outline-none focus:ring-2 focus:ring-accent capitalize"
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                  {...register('name', {
                    onBlur: (e) =>
                      setValue('name', toTitleCase(e.target.value), {
                        shouldValidate: true,
                        shouldDirty: true,
                      }),
                  })}
                />
                {errors.name && <p id="name-error" className="mt-1 text-sm text-red-500" role="alert" aria-live="polite">{errors.name.message}</p>}
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
                  autoCapitalize="off"
                  autoCorrect="off"
                  autoComplete="email"
                  inputMode="email"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  {...register('email')}
                />
                {errors.email && <p id="email-error" className="mt-1 text-sm text-red-500" role="alert" aria-live="polite">{errors.email.message}</p>}
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
                  autoCapitalize="sentences"
                  onInput={(e) => {
                    const el = e.currentTarget as HTMLTextAreaElement;
                    const v = el.value;
                    const capped = capitalizeFirst(v);
                    if (v !== capped) {
                      setValue('message', capped, { shouldValidate: true, shouldDirty: true });
                      el.value = capped;
                    }
                  }}
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                  {...register('message', {
                    onBlur: (e) =>
                      setValue('message', capitalizeFirst(e.target.value), {
                        shouldValidate: true,
                        shouldDirty: true,
                      }),
                  })}
                />
                {errors.message && <p id="message-error" className="mt-1 text-sm text-red-500" role="alert" aria-live="polite">{errors.message.message}</p>}
              </div>
              <RippleButton
                type="submit"
                className="w-full p-3 glassmorphism rounded-lg text-[var(--text-dark)] hover:bg-[var(--button-hover-gradient)]"
                rippleColor="#33BBCF"
                disabled={isSubmitting}
              >
                Contact Us
              </RippleButton>
            </m.form>
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