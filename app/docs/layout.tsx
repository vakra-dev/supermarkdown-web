import { Sidebar } from '@/components/layout/sidebar';

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 min-h-[calc(100vh-3.5rem)]">
        <div className="max-w-3xl mx-auto px-8 py-12">
          <article className="prose prose-invert">
            {children}
          </article>
        </div>
      </div>
    </div>
  );
}
