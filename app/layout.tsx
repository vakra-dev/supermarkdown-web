import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { PromoBanner } from '@/components/layout/promo-banner';
import { MainContent } from '@/components/layout/main-content';

export const metadata: Metadata = {
  title: {
    default: 'supermarkdown - HTML to Markdown Converter',
    template: '%s | supermarkdown',
  },
  description:
    'Convert HTML to Markdown with full GFM support. Tables, code blocks, nested lists, and more. Fast, simple, complete.',
  keywords: ['html to markdown', 'markdown converter', 'gfm', 'turndown alternative', 'rust'],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://supermarkdown.dev',
    siteName: 'supermarkdown',
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col antialiased bg-neutral-950">
        <PromoBanner />
        <Header />
        <MainContent>{children}</MainContent>
        <Footer />
      </body>
    </html>
  );
}
