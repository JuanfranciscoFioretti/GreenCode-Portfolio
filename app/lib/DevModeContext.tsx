'use client';

import { createContext, useContext, useState, ReactNode, useCallback, useMemo } from 'react';

interface DevModeContextType {
  devMode: boolean;
  toggleDevMode: () => void;
}

const DevModeContext = createContext<DevModeContextType | undefined>(undefined);

export function DevModeProvider({ children }: { children: ReactNode }) {
  const [devMode, setDevMode] = useState(false);

  const toggleDevMode = useCallback(() => {
    setDevMode(prev => !prev);
  }, []);

  const value = useMemo(() => ({ devMode, toggleDevMode }), [devMode, toggleDevMode]);

  return (
    <DevModeContext.Provider value={value}>
      {children}
    </DevModeContext.Provider>
  );
}

export function useDevMode() {
  const context = useContext(DevModeContext);
  if (!context) {
    return { devMode: false, toggleDevMode: () => {} };
  }
  return context;
}
