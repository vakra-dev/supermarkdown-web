const extractTools = new Set(['csv-to-markdown', 'json-to-markdown', 'markdown-table']);

interface CalloutContent {
  title: string;
  description: string;
  cta: string;
  href: string;
}

function getCallout(toolSlug: string): CalloutContent {
  if (extractTools.has(toolSlug)) {
    return {
      title: 'Need structured data from live webpages?',
      description:
        'Reader extracts structured JSON from public webpages for agents, datasets, and automation workflows.',
      cta: 'Try Reader Extract',
      href: 'https://reader.dev/extract',
    };
  }
  return {
    title: 'Need live webpages as Markdown?',
    description:
      'Reader turns public webpages into clean Markdown for AI agents, RAG pipelines, and data workflows.',
    cta: 'Try Reader',
    href: 'https://reader.dev/scrape',
  };
}

export function ReaderCallout({ toolSlug }: { toolSlug: string }) {
  const callout = getCallout(toolSlug);

  return (
    <section className="px-4 py-8 container mx-auto">
      <div className="border border-edge/50 rounded-md p-6 max-w-2xl">
        <h3 className="text-base font-semibold text-fg mb-1">{callout.title}</h3>
        <p className="text-sm text-fg-muted mb-3">{callout.description}</p>
        <a
          href={callout.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium text-accent-fg hover:text-accent-fg/80 transition-colors"
        >
          {callout.cta} &rarr;
        </a>
      </div>
    </section>
  );
}
