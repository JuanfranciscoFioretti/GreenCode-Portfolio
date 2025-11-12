'use client';

import TechnologiesSection from './TechnologiesSection';

interface ClientTechnologiesSectionProps {
  devMode: boolean;
}

export default function ClientTechnologiesSection({ devMode }: ClientTechnologiesSectionProps) {
  return <TechnologiesSection devMode={devMode} />;
}