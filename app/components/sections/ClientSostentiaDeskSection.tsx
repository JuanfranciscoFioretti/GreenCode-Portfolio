'use client';

import SostentiaDeskSection from './SostentiaDeskSection';

interface ClientSostentiaDeskSectionProps {
  devMode: boolean;
}

export default function ClientSostentiaDeskSection({ devMode }: ClientSostentiaDeskSectionProps) {
  return <SostentiaDeskSection devMode={devMode} />;
}
