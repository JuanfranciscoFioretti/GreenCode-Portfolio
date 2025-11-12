'use client';

import TestimonialsSection from './TestimonialsSection';

interface ClientTestimonialsSectionProps {
  devMode: boolean;
}

export default function ClientTestimonialsSection({ devMode }: ClientTestimonialsSectionProps) {
  return <TestimonialsSection devMode={devMode} />;
}