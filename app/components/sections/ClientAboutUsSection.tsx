'use client';

import AboutUsSection from './AboutUsSection';

interface ClientAboutUsSectionProps {
  devMode: boolean;
}

export default function ClientAboutUsSection({ devMode }: ClientAboutUsSectionProps) {
  return <AboutUsSection devMode={devMode} />;
}