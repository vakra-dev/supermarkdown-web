import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import dynamic from 'next/dynamic';
import { tools, getToolBySlug, implementedSlugs } from '@/lib/tools/registry';
import { generateFaqSchema, generateWebAppSchema, generateHowToSchema } from '@/lib/tools/seo';
import { ToolLayout } from '@/components/tools/ToolLayout';

// Explicit component map for correct code-splitting
const toolComponents: Record<string, React.ComponentType> = {
  'html-to-markdown': dynamic(() =>
    import('@/components/tools/html-to-markdown/HtmlToMarkdown').then((m) => m.HtmlToMarkdown)
  ),
  'markdown-to-html': dynamic(() =>
    import('@/components/tools/markdown-to-html/MarkdownToHtml').then((m) => m.MarkdownToHtml)
  ),
  'markdown-to-docx': dynamic(() =>
    import('@/components/tools/markdown-to-docx/MarkdownToDocx').then((m) => m.MarkdownToDocx)
  ),
  'csv-to-markdown': dynamic(() =>
    import('@/components/tools/csv-to-markdown/CsvToMarkdown').then((m) => m.CsvToMarkdown)
  ),
  'json-to-markdown': dynamic(() =>
    import('@/components/tools/json-to-markdown/JsonToMarkdown').then((m) => m.JsonToMarkdown)
  ),
  'markdown-editor': dynamic(() =>
    import('@/components/tools/markdown-editor/MarkdownEditor').then((m) => m.MarkdownEditor)
  ),
  'markdown-table': dynamic(() =>
    import('@/components/tools/markdown-table/MarkdownTable').then((m) => m.MarkdownTable)
  ),
  'markdown-diff': dynamic(() =>
    import('@/components/tools/markdown-diff/MarkdownDiff').then((m) => m.MarkdownDiff)
  ),
  'markdown-formatter': dynamic(() =>
    import('@/components/tools/markdown-formatter/MarkdownFormatter').then((m) => m.MarkdownFormatter)
  ),
  'readme-generator': dynamic(() =>
    import('@/components/tools/readme-generator/ReadmeGenerator').then((m) => m.ReadmeGenerator)
  ),
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) return {};

  return {
    title: tool.title,
    description: tool.description,
    alternates: { canonical: `https://supermarkdown.dev/tools/${tool.slug}` },
    openGraph: {
      title: tool.h1,
      description: tool.description,
      url: `https://supermarkdown.dev/tools/${tool.slug}`,
      siteName: 'supermarkdown',
      type: 'website',
      images: ['/og-image.png'],
    },
    twitter: { card: 'summary_large_image' },
  };
}

export const dynamicParams = false;

export function generateStaticParams() {
  return tools
    .filter((t) => implementedSlugs.has(t.slug))
    .map((t) => ({ slug: t.slug }));
}

export default async function ToolPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) notFound();

  const ToolComponent = toolComponents[slug];
  if (!ToolComponent) notFound();

  const faqSchema = generateFaqSchema(tool);
  const webAppSchema = generateWebAppSchema(tool);
  const howToSchema = generateHowToSchema(tool);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <ToolLayout config={tool}>
        <ToolComponent />
      </ToolLayout>
    </>
  );
}
