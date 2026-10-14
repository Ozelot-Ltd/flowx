'use client';

import { useEffect, useRef, useState } from 'react';

const VIDEO_ID = 'bpTvgYByvH4';
const VIDEO_SRC = `https://www.youtube-nocookie.com/embed/${VIDEO_ID}?autoplay=1&mute=1&loop=1&playlist=${VIDEO_ID}&playsinline=1&modestbranding=1`;

type Props = {
  className?: string;
};

/**
 * The muted, looping vision video. The YouTube iframe (and its player JS) is
 * only mounted once the section is about to scroll into view.
 */
export default function VisionVideo({ className }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isNear, setIsNear] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // No IntersectionObserver (very old browsers): just load it.
    if (typeof IntersectionObserver === 'undefined') {
      setIsNear(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setIsNear(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );
    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className={className}>
      {isNear && (
        <iframe
          width="100%"
          height="100%"
          src={VIDEO_SRC}
          title="flowX vision video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      )}
    </div>
  );
}
