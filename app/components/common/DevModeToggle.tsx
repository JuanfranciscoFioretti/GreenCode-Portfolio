'use client';

import { useDevMode } from '../../lib/DevModeContext';

export default function DevModeToggle() {
  const { devMode, toggleDevMode } = useDevMode();

  const handleClick = () => {
    console.log('DevModeToggle clicked, current state:', devMode); // Debug log
    toggleDevMode();
  };

  return (
    <button
      onClick={handleClick}
      className={`button-secondary ${devMode ? 'bg-accent text-primary' : 'text-accent'}`}
    >
      {`</Dev Mode`} {devMode ? 'On' : 'Off'}{`>`}
    </button>
  );
}
