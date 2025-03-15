import { PrismicPreview } from '@prismicio/next';
import { repositoryName } from '@/prismicio';
import './globals.css';

import { Providers } from './components/Providers/Providers';

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
      <PrismicPreview repositoryName={repositoryName} />
    </html>
  );
}
