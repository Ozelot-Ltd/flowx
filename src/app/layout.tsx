import type { Metadata } from 'next';
import { Quicksand } from 'next/font/google';
import { PrismicPreview } from '@prismicio/next';
import { repositoryName } from '@/prismicio';
import './globals.css';

import { Providers } from './components/Providers/Providers';
import Script from 'next/script';

// Self-hosted by next/font (no render-blocking request to Google). Exposed as a
// CSS variable that globals.css plugs into --title-font.
const quicksand = Quicksand({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-quicksand',
});

// Site-wide defaults; pages override these via generateMetadata.
export const metadata: Metadata = {
  metadataBase: new URL('https://flowx.one'),
  title: {
    default: 'flowX',
    template: '%s | flowX',
  },
  description:
    'flowX develops a patented, fluid-based glass façade system that dynamically manages energy flows in the building envelope.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={quicksand.variable}>
      <body>
        <Providers>
          <div className="content-wrapper">{children}</div>
        </Providers>
        <Script src="https://scripts.simpleanalyticscdn.com/latest.js" />
        <PrismicPreview repositoryName={repositoryName} />
      </body>
    </html>
  );
}
