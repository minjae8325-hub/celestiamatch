import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Starfield } from '@/components/Starfield';
import { SITE } from '@/lib/site';

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — Western Astrology Compatibility & Love Reading`,
    template: `%s · ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [
    'astrology',
    'zodiac compatibility',
    'love compatibility',
    'western astrology',
    'birth chart',
    'sun sign',
    'romantic chemistry',
    'free astrology reading',
  ],
  applicationName: SITE.name,
  authors: [{ name: SITE.name }],
  openGraph: {
    type: 'website',
    siteName: SITE.name,
    url: SITE.url,
    title: `${SITE.name} — Find Your Cosmic Match`,
    description: SITE.description,
    images: [
      {
        url: '/og-default.svg',
        width: 1200,
        height: 630,
        alt: `${SITE.name} — Western Astrology Compatibility`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE.name} — Find Your Cosmic Match`,
    description: SITE.description,
    images: ['/og-default.svg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  alternates: { canonical: '/' },
  category: 'lifestyle',
};

export const viewport: Viewport = {
  themeColor: '#08051a',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

const ADSENSE_CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT || '';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Inter:wght@400;500;600;700&display=swap"
        />
        {/*
          GOOGLE ADSENSE
          Replace NEXT_PUBLIC_ADSENSE_CLIENT in .env with your ca-pub-XXXXXXXXXXXXXXXX.
          The script is only injected in production builds when the env var is set.
        */}
        {ADSENSE_CLIENT && (
          <Script
            id="adsense-loader"
            async
            strategy="afterInteractive"
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
            crossOrigin="anonymous"
          />
        )}
        {/* JSON-LD: Organization */}
        <Script
          id="ld-org"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: SITE.name,
              url: SITE.url,
              logo: `${SITE.url}/logo.svg`,
              sameAs: [],
            }),
          }}
        />
      </head>
      <body>
        <Starfield />
        <div className="relative z-10 flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
