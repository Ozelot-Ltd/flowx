'use client';

import React, { useEffect, useRef, useState } from 'react';

import styles from './StartingScreen.module.css';
import Image from 'next/image';
import Logo from '../../../../public/images/flow_x_Logo.png';

import { useMobile } from '../../../../context/MobileContext';

export default function StartingScreen() {
  const { isMobile } = useMobile();
  const [isHidden, setIsHidden] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Effect to hide the splash screen after a random time
  useEffect(() => {
    // Calculate a random time between 1000ms (1s) and 2000ms (2s)
    const randomInterval = Math.floor(Math.random() * 1500) + 1000;

    // Set timeout to hide the splash screen
    timeoutRef.current = setTimeout(() => {
      setIsHidden(true);
    }, randomInterval);

    // Clean up timeout when component unmounts
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div className={`${styles.container} ${isHidden ? styles.hidden : ''}`}>
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
