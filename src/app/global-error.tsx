'use client';

import { useEffect } from 'react';

// Last-resort boundary for errors thrown in the root layout itself. It
// replaces the layout, so globals.css isn't loaded: styles are inline and the
// colours mirror the tokens in globals.css.
const colors = {
  lightgrey: '#f9f9f9',
  darkgrey: '#343933',
  middlegreen: '#7cb48f',
  green: '#ace0af',
};

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: '100svh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1.5rem',
          boxSizing: 'border-box',
          backgroundColor: colors.lightgrey,
          color: colors.darkgrey,
          fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
          textAlign: 'center',
        }}
      >
        <main style={{ maxWidth: '34rem' }}>
          <p
            style={{
              margin: 0,
              fontSize: 'clamp(3.5rem, 12vw, 7rem)',
              fontWeight: 700,
              lineHeight: 0.9,
              color: colors.middlegreen,
            }}
          >
            Oops
          </p>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 500 }}>
            Something went wrong.
          </h1>
          <p style={{ opacity: 0.65 }}>
            An unexpected error occurred. You can try again, or head back to the
            homepage.
          </p>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '0.75rem',
              marginTop: '1.5rem',
            }}
          >
            <button
              type="button"
              onClick={() => reset()}
              style={{
                padding: '0.85rem 2.1rem',
                borderRadius: '15px',
                border: `1px solid ${colors.green}`,
                background: 'transparent',
                color: colors.darkgrey,
                font: 'inherit',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Try again
            </button>
            {/* Plain anchor: a full reload is the safest recovery here */}
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a
              href="/"
              style={{
                padding: '0.85rem 2.1rem',
                borderRadius: '15px',
                border: `1px solid ${colors.green}`,
                backgroundColor: colors.green,
                color: '#0c160b',
                fontWeight: 600,
                textDecoration: 'none',
              }}
            >
              Back to home
            </a>
          </div>
        </main>
      </body>
    </html>
  );
}
