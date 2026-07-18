import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { tools, implementedSlugs } from '@/lib/tools/registry';

export const metadata: Metadata = {
  title: 'Free Markdown Converter & Tools Online',
  description:
    'Convert, edit, and format Markdown - powered by Rust WASM. All tools are free. No sign-up required.',
  alternates: { canonical: 'https://supermarkdown.dev/tools' },
  openGraph: {
    title: 'Free Markdown Converter & Tools Online',
    description:
      'Convert, edit, and format Markdown - powered by Rust WASM. All tools are free. No sign-up required.',
    url: 'https://supermarkdown.dev/tools',
    siteName: 'supermarkdown',
    type: 'website',
    images: ['/og-image.png'],
  },
};

const liveTools = tools.filter((t) => implementedSlugs.has(t.slug));
const converters = liveTools.filter((t) => t.category === 'converter');
const utilities = liveTools.filter((t) => t.category === 'tool');

export default function ToolsHubPage() {
  return (
    <div className="container mx-auto px-4 pt-24 pb-12">
      <header className="mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-fg mb-3">
          Free Markdown Converter & Tools
        </h1>
        <p className="text-lg text-fg-muted max-w-2xl">
          Convert, edit, and format Markdown - powered by Rust WASM. All tools are free and run
          entirely in your browser. No sign-up required.
        </p>
      </header>

      {/* Converters */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold text-fg mb-4">Converters</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {converters.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      </section>

      {/* Utilities */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold text-fg mb-4">Tools</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {utilities.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      </section>

      {/* SEO copy */}
      <section className="border-t border-edge/50 pt-8 max-w-2xl">
        <h2 className="text-xl font-semibold text-fg mb-4">About These Tools</h2>
        <div className="space-y-3 text-fg-secondary text-sm leading-relaxed">
          <p>
            Every tool on this page runs entirely in your browser. Your data never leaves your
            device - there are no uploads, no server processing, and no accounts required.
          </p>
          <p>
            Our HTML to Markdown converter is powered by a Rust engine compiled to WebAssembly,
            delivering conversion speeds 10-50x faster than JavaScript alternatives. The performance
            difference is measurable and displayed after every conversion.
          </p>
          <p>
            All tools support GitHub Flavored Markdown (GFM) including tables, task lists,
            strikethrough, and fenced code blocks with language detection.
          </p>
        </div>
      </section>
    </div>
  );
}

function ToolCard({ tool }: { tool: (typeof tools)[0] }) {
  return (
    <Link
      href={`/tools/${tool.slug}`}
      className="group block p-4 border border-edge rounded-md hover:border-edge-hover transition-colors"
    >
      <h3 className="font-medium text-fg mb-1 flex items-center gap-2">
        <span className="flex-1 truncate">{tool.h1}</span>
        <ArrowRight className="w-4 h-4 flex-shrink-0 text-fg-faint group-hover:text-accent-fg transition-colors" />
      </h3>
      <p className="text-sm text-fg-muted line-clamp-2">{tool.description}</p>
    </Link>
  );
}
