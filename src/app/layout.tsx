import { PrismicPreview } from '@prismicio/next';
import { repositoryName } from '@/prismicio';
import './globals.css';

import { Providers } from './components/Providers/Providers';
import Script from 'next/script';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <div className="content-wrapper">{children}</div>
        </Providers>
      </body>
      <Script src="https://scripts.simpleanalyticscdn.com/latest.js" />
      <PrismicPreview repositoryName={repositoryName} />
    </html>
  );
}
