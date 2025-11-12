'use client';

import FAQSection from './FAQSection';

interface ClientFAQSectionProps {
  devMode: boolean;
}

export default function ClientFAQSection({ devMode }: ClientFAQSectionProps) {
  return <FAQSection devMode={devMode} />;
}