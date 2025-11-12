'use client';

import ContactSection from './ContactSection';

interface ClientContactSectionProps {
  devMode: boolean;
}

export default function ClientContactSection({ devMode }: ClientContactSectionProps) {
  return <ContactSection devMode={devMode} />;
}