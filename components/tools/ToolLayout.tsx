import { ToolConfig } from '@/lib/tools/registry';
import { FAQ } from './FAQ';
import { ReaderCallout } from './ReaderCallout';
import { RelatedTools } from './RelatedTools';

export function ToolLayout({
  config,
  children,
}: {
  config: ToolConfig;
  children: React.ReactNode;
}) {
  return (
    <>
      {/* H1 + description - server rendered, always crawlable */}
      <header className="px-4 pt-24 pb-4 container mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-fg mb-2">{config.h1}</h1>
        <p className="text-base text-fg-muted max-w-2xl">{config.description}</p>
      </header>

      {/* The tool itself */}
      <section className="px-4 pb-8 container mx-auto">
        {children}
      </section>

      {/* How to use - 3 steps, server rendered */}
      <section className="px-4 py-8 container mx-auto border-t border-edge/50">
        <h2 className="text-xl font-semibold text-fg mb-6">How to Use</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {config.howTo.map((item, i) => (
            <div key={i} className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent-500 text-neutral-950 flex items-center justify-center text-sm font-bold">
                {i + 1}
              </div>
              <div>
                <h3 className="font-medium text-fg mb-1">{item.step}</h3>
                <p className="text-sm text-fg-muted">{item.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ - server rendered with schema markup */}
      <FAQ items={config.faq} />

      {/* Reader cross-link */}
      <ReaderCallout toolSlug={config.slug} />

      {/* Related tools - internal links */}
      <RelatedTools slugs={config.related} />
    </>
  );
}
