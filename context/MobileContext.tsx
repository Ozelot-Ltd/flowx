'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

type MobileContextType = {
  isMobile: boolean;
  isTablet: boolean;
  isTabletPortrait: boolean;
  isDesktop: boolean;
};

// Create context with default values
const MobileContext = createContext<MobileContextType>({
  isMobile: false,
  isTablet: false,
  isTabletPortrait: false,
  isDesktop: true, // Default to desktop to match server rendering
});

export const MobileProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Start with "not initialized" state to prevent hydration mismatch
  const [isInitialized, setIsInitialized] = useState(false);
  const [state, setState] = useState<MobileContextType>({
    isMobile: false,
    isTablet: false,
    isTabletPortrait: false,
    isDesktop: true, // Default to desktop to match server rendering
  });

  useEffect(() => {
    // Only run device detection on client side
    const checkDeviceType = () => {
      const width = window.innerWidth;

      const isMobile = width < 768;
      const isTablet = width >= 768 && width < 1024;
      const isTabletPortrait =
        isTablet && window.innerHeight > window.innerWidth;
      const isDesktop = width >= 1024;

      setState({
        isMobile,
        isTablet,
        isTabletPortrait,
        isDesktop,
      });

      setIsInitialized(true);
    };

    // Initial check
    checkDeviceType();

    // Add resize listener
    window.addEventListener('resize', checkDeviceType);

    // Cleanup
    return () => {
      window.removeEventListener('resize', checkDeviceType);
    };
  }, []);

  return (
    <MobileContext.Provider value={state}>
      {/* Ensure first client render matches server render to prevent hydration errors */}
      {!isInitialized ? (
        // This will match server rendering
        <div style={{ display: 'none' }} data-hydration-trigger></div>
      ) : null}
      {children}
    </MobileContext.Provider>
  );
};

export const useMobile = () => useContext(MobileContext);
