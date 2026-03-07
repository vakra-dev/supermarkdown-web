import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { PromoBanner } from '@/components/layout/promo-banner';
import { MainContent } from '@/components/layout/main-content';
import { ThemeProvider } from '@/components/theme-provider';

export const metadata: Metadata = {
  metadataBase: new URL('https://supermarkdown.dev'),
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
  verification: {
    google: 'k0q_YgsHhVcn6UoUKPxaVCqI_7bCL3MLmovLcGpx3gQ',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(localStorage.getItem('supermarkdown-theme')==='dark'){document.documentElement.classList.add('dark')}}catch(e){}`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: `{"@context":"https://schema.org","@type":"Organization","name":"supermarkdown","url":"https://supermarkdown.dev","logo":"https://supermarkdown.dev/og-image.png","sameAs":["https://github.com/vakra-dev/supermarkdown"]}` }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: `{"@context":"https://schema.org","@type":"SoftwareApplication","name":"supermarkdown","url":"https://supermarkdown.dev","applicationCategory":"DeveloperApplication","operatingSystem":"Any","description":"Convert HTML to Markdown with full GFM support. Tables, code blocks, nested lists, and more. Fast, simple, complete.","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"}}` }}
        />
      </head>
      <body className="min-h-screen flex flex-col antialiased bg-page">
        <ThemeProvider>
          <PromoBanner />
          <Header />
          <MainContent>{children}</MainContent>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
