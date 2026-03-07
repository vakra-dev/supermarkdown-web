import Link from 'next/link';
import { getRelatedTools, implementedSlugs } from '@/lib/tools/registry';
import { ArrowRight } from 'lucide-react';

export function RelatedTools({ slugs }: { slugs: string[] }) {
  const related = getRelatedTools(slugs).filter((t) => implementedSlugs.has(t.slug));
  if (related.length === 0) return null;

  return (
    <section className="px-4 py-8 container mx-auto border-t border-edge/50">
      <h2 className="text-xl font-semibold text-fg mb-6">Related Tools</h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {related.map((tool) => (
          <Link
            key={tool.slug}
            href={`/tools/${tool.slug}`}
            className="group block p-4 border border-edge rounded-md hover:border-edge-hover transition-colors"
          >
            <h3 className="font-medium text-fg mb-1 flex items-center gap-2">
              {tool.h1}
              <ArrowRight className="w-4 h-4 text-fg-faint group-hover:text-accent-fg transition-colors" />
            </h3>
            <p className="text-sm text-fg-muted line-clamp-2">{tool.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
