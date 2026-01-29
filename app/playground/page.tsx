import { Metadata } from 'next';
import { Playground } from '@/components/playground/playground';

export const metadata: Metadata = {
  title: 'Playground',
  description: 'Interactive HTML to Markdown converter. Try supermarkdown in your browser.',
};

export default function PlaygroundPage() {
  return <Playground />;
}
