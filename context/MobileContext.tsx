'use client';

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

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

      // Keep the previous object unless a breakpoint actually flipped, so
      // resize events don't re-render every consumer.
      setState((prev) =>
        prev.isMobile === isMobile &&
        prev.isTablet === isTablet &&
        prev.isTabletPortrait === isTabletPortrait &&
        prev.isDesktop === isDesktop
          ? prev
          : { isMobile, isTablet, isTabletPortrait, isDesktop }
      );

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

  const { isMobile, isTablet, isTabletPortrait, isDesktop } = state;
  const value = useMemo(
    () => ({ isMobile, isTablet, isTabletPortrait, isDesktop }),
    [isMobile, isTablet, isTabletPortrait, isDesktop]
  );

  return (
    <MobileContext.Provider value={value}>
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
