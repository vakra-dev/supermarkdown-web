'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import dynamic from 'next/dynamic';
import { useDebouncedCallback } from 'use-debounce';
import { SplitPane } from '@/components/tools/SplitPane';
import { PerformanceBadge } from '@/components/tools/PerformanceBadge';
import { CopyAction, DownloadAction } from '@/components/tools/ToolActions';
import { Code, Eye } from 'lucide-react';
import { useTheme } from '@/components/theme-provider';
import { baseEditorOptions, readOnlyEditorOptions } from '@/lib/tools/editor-options';

const Editor = dynamic(() => import('@monaco-editor/react'), { ssr: false });

const sampleMarkdown = `# Getting Started with Markdown

Markdown is a *lightweight* markup language created by [John Gruber](https://daringfireball.net).

## Why Use Markdown?

- **Simple** - Easy to learn and read
- **Portable** - Works everywhere
- **Flexible** - Converts to HTML, PDF, and more

## Code Example

\`\`\`javascript
function greet(name) {
  return \`Hello, \${name}!\`;
}
\`\`\`

> Markdown is intended to be as easy-to-read and easy-to-write as possible.

## Comparison

| Feature | Markdown | HTML |
|---------|----------|------|
| Readability | High | Low |
| Learning curve | Minutes | Hours |
`;

export function MarkdownToHtml() {
  const [markdown, setMarkdown] = useState(sampleMarkdown);
  const [html, setHtml] = useState('');
  const [timeMs, setTimeMs] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<'code' | 'preview'>('code');
  const [error, setError] = useState<string | null>(null);
  const markdownItRef = useRef<any>(null);
  const { theme } = useTheme();
  const editorTheme = theme === 'dark' ? 'vs-dark' : 'light';

  const loadMarkdownIt = useCallback(async () => {
    if (!markdownItRef.current) {
      const mod = await import('markdown-it');
      markdownItRef.current = new mod.default({ html: true, linkify: true, typographer: false });
    }
    return markdownItRef.current;
  }, []);

  const doConvert = useDebouncedCallback(async (input: string) => {
    try {
      setError(null);
      const md = await loadMarkdownIt();
      const start = performance.now();
      const result = md.render(input);
      setTimeMs(performance.now() - start);
      setHtml(result);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Conversion failed');
    }
  }, 100);

  useEffect(() => {
    doConvert(markdown);
  }, [markdown, doConvert]);

  const handleSample = useCallback(() => {
    setMarkdown(sampleMarkdown);
  }, []);

  return (
    <div className="space-y-3">
      {/* Toolbar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={handleSample}
            className="px-3 py-1.5 text-sm text-fg-muted hover:text-fg-secondary hover:bg-elevated/50 rounded transition-colors"
          >
            Load sample
          </button>
        </div>
        <div className="flex items-center gap-1">
          {/* View toggle */}
          <div className="flex items-center border border-edge rounded overflow-hidden mr-2">
            <button
              onClick={() => setViewMode('code')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-sm transition-colors ${
                viewMode === 'code'
                  ? 'bg-elevated/50 text-fg'
                  : 'text-fg-muted hover:text-fg-secondary'
              }`}
            >
              <Code className="w-3.5 h-3.5" />
              HTML
            </button>
            <button
              onClick={() => setViewMode('preview')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-sm transition-colors ${
                viewMode === 'preview'
                  ? 'bg-elevated/50 text-fg'
                  : 'text-fg-muted hover:text-fg-secondary'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              Preview
            </button>
          </div>
          <CopyAction text={html} />
          <DownloadAction
            content={html}
            filename="converted.html"
            mimeType="text/html"
            label="Download .html"
          />
        </div>
      </div>

      {/* Error banner */}
      {error && (
        <div className="px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-md text-red-600 dark:text-red-400 text-sm">
          {error}
        </div>
      )}

      {/* Split pane */}
      <SplitPane
        leftLabel="Markdown"
        rightLabel={viewMode === 'code' ? 'HTML' : 'Preview'}
        rightStatus={timeMs !== null ? <PerformanceBadge timeMs={timeMs} label="Rendered" /> : undefined}
        left={
          <Editor
            height="600px"
            defaultLanguage="markdown"
            value={markdown}
            onChange={(value) => setMarkdown(value || '')}
            theme={editorTheme}
            options={baseEditorOptions}
          />
        }
        right={
          viewMode === 'code' ? (
            <Editor
              height="600px"
              defaultLanguage="html"
              value={html}
              theme={editorTheme}
              options={readOnlyEditorOptions}
            />
          ) : (
            <div className="h-[600px] overflow-auto p-4 bg-white rounded-b-md preview-light">
              <div
                className="prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: html }}
              />
            </div>
          )
        }
      />
    </div>
  );
}
