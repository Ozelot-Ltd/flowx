'use client';

import { createContext, useContext, useEffect, useState } from 'react';

interface MobileContextType {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isPortrait: boolean;
  isTabletPortrait: boolean;
}

const MobileContext = createContext<MobileContextType>({
  isMobile: false,
  isTablet: false,
  isDesktop: true,
  isPortrait: false,
  isTabletPortrait: false,
});

export function MobileProvider({ children }: { children: React.ReactNode }) {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);
  const [isPortrait, setIsPortrait] = useState(false);
  const [isTabletPortrait, setIsTabletPortrait] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const currentWidth = window.innerWidth;
      const currentHeight = window.innerHeight;

      // Device type checks
      const mobile = currentWidth < 768;
      const tablet = currentWidth >= 768 && currentWidth < 1100;
      const desktop = currentWidth >= 1100;

      // Orientation check
      const portrait = currentHeight > currentWidth;

      // Combined check
      const tabletPortrait = tablet && portrait;

      // Update all states at once
      setIsMobile(mobile);
      setIsTablet(tablet);
      setIsDesktop(desktop);
      setIsPortrait(portrait);
      setIsTabletPortrait(tabletPortrait);
    };

    // Initial check
    handleResize();

    // Add event listeners for both resize and orientation change
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, []);

  return (
    <MobileContext.Provider
      value={{
        isMobile,
        isTablet,
        isDesktop,
        isPortrait,
        isTabletPortrait,
      }}
    >
      {children}
    </MobileContext.Provider>
  );
}

// Custom hook to use the mobile context
export function useMobile() {
  const context = useContext(MobileContext);
  if (context === undefined) {
    throw new Error('useMobile must be used within a MobileProvider');
  }
  return context;
}
