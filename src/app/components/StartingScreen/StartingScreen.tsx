'use client';

import React, { useEffect, useRef, useState } from 'react';

import styles from './StartingScreen.module.css';
import Image from 'next/image';
import Logo from '../../../../public/images/flow_x_Logo.png';

import { useMobile } from '../../../../context/MobileContext';
import { useSplashStore } from '../../../../stores/useSplashStore';

// Must match the .container transform transition in the CSS module.
const HIDE_DELAY = 2200;
const SLIDE_DURATION = 800;

export default function StartingScreen() {
  const { isMobile } = useMobile();
  const { isSplashDone, setSplashDone } = useSplashStore();
  const [isHidden, setIsHidden] = useState(false);
  const hideRef = useRef<NodeJS.Timeout | null>(null);
  const doneRef = useRef<NodeJS.Timeout | null>(null);

  // Slide the splash away after a fixed time. Done is signalled on
  // transitionend, with a timeout fallback for when that never fires
  // (background tab, reduced motion, etc.).
  useEffect(() => {
    hideRef.current = setTimeout(() => setIsHidden(true), HIDE_DELAY);
    doneRef.current = setTimeout(setSplashDone, HIDE_DELAY + SLIDE_DURATION + 200);

    return () => {
      if (hideRef.current) clearTimeout(hideRef.current);
      if (doneRef.current) clearTimeout(doneRef.current);
    };
  }, [setSplashDone]);

  // Unmount once gone so the infinite loader animations and the SVG filter
  // stop running off-screen.
  if (isSplashDone) return null;

  return (
    <div
      className={`${styles.container} ${isHidden ? styles.hidden : ''}`}
      onTransitionEnd={(e) => {
        if (e.target === e.currentTarget && isHidden) setSplashDone();
      }}
    >
      <div className={styles.content}>
        <div className={styles.logoContainer}>
          <Image
            src={Logo}
            alt={'flowX Logo'}
            style={{ height: '300px', width: 'auto' }}
          />
        </div>
        <div className={styles.loader}>
          <span style={{ '--delay': '1' } as React.CSSProperties}></span>
          <span style={{ '--delay': '2' } as React.CSSProperties}></span>
          <span style={{ '--delay': '3' } as React.CSSProperties}></span>
          <span style={{ '--delay': '4' } as React.CSSProperties}></span>
          <span style={{ '--delay': '5' } as React.CSSProperties}></span>
          <span style={{ '--delay': '6' } as React.CSSProperties}></span>
          <span style={{ '--delay': '7' } as React.CSSProperties}></span>
        </div>
        <svg>
          <filter id="liquid">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" />
            <feColorMatrix
              values={`1 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                      0 0 0 ${!isMobile ? '20' : '12'} -8`}
            />
          </filter>
        </svg>
      </div>
    </div>
  );
}
