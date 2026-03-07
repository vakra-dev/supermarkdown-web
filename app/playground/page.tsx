import { Metadata } from 'next';
import { Playground } from '@/components/playground/playground';

export const metadata: Metadata = {
  title: 'Playground',
  description:
    'Interactive HTML to Markdown converter. Try supermarkdown in your browser with real-time preview and conversion options.',
  alternates: { canonical: 'https://supermarkdown.dev/playground' },
  openGraph: {
    title: 'Playground - supermarkdown',
    description:
      'Interactive HTML to Markdown converter. Try supermarkdown in your browser with real-time preview and conversion options.',
    url: 'https://supermarkdown.dev/playground',
    siteName: 'supermarkdown',
    type: 'website',
  },
  twitter: { card: 'summary_large_image' },
};

export default function PlaygroundPage() {
  return <Playground />;
}
