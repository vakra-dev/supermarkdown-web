'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import dynamic from 'next/dynamic';
import { useDebouncedCallback } from 'use-debounce';
import { SplitPane } from '@/components/tools/SplitPane';
import { PerformanceBadge } from '@/components/tools/PerformanceBadge';
import { CopyAction, DownloadAction } from '@/components/tools/ToolActions';
import { useTheme } from '@/components/theme-provider';
import { baseEditorOptions } from '@/lib/tools/editor-options';
import {
  Bold, Italic, Strikethrough, Heading1, Heading2, Heading3,
  List, ListOrdered, Quote, Code, FileCode, Link as LinkIcon, Image,
} from 'lucide-react';

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

type ToolbarAction = {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  prefix: string;
  suffix: string;
  lineStart?: boolean;
} | null;

const toolbarActions: ToolbarAction[] = [
  { icon: Bold, label: 'Bold', prefix: '**', suffix: '**' },
  { icon: Italic, label: 'Italic', prefix: '_', suffix: '_' },
  { icon: Strikethrough, label: 'Strikethrough', prefix: '~~', suffix: '~~' },
  null,
  { icon: Heading1, label: 'Heading 1', prefix: '# ', suffix: '', lineStart: true },
  { icon: Heading2, label: 'Heading 2', prefix: '## ', suffix: '', lineStart: true },
  { icon: Heading3, label: 'Heading 3', prefix: '### ', suffix: '', lineStart: true },
  null,
  { icon: List, label: 'Bullet List', prefix: '- ', suffix: '', lineStart: true },
  { icon: ListOrdered, label: 'Ordered List', prefix: '1. ', suffix: '', lineStart: true },
  { icon: Quote, label: 'Blockquote', prefix: '> ', suffix: '', lineStart: true },
  null,
  { icon: Code, label: 'Inline Code', prefix: '`', suffix: '`' },
  { icon: FileCode, label: 'Code Block', prefix: '```\n', suffix: '\n```' },
  { icon: LinkIcon, label: 'Link', prefix: '[', suffix: '](url)' },
  { icon: Image, label: 'Image', prefix: '![alt](', suffix: ')' },
];

export function MarkdownEditor() {
  const [markdown, setMarkdown] = useState(sampleMarkdown);
  const [html, setHtml] = useState('');
  const [timeMs, setTimeMs] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const markdownItRef = useRef<any>(null);
  const editorRef = useRef<any>(null);
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

  function insertFormatting(prefix: string, suffix: string, lineStart?: boolean) {
    const editor = editorRef.current;
    if (!editor) return;
    const selection = editor.getSelection();
    const model = editor.getModel();
    if (!selection || !model) return;

    const selectedText = model.getValueInRange(selection);

    if (lineStart) {
      if (selectedText === '') {
        editor.executeEdits('toolbar', [{
          range: selection,
          text: prefix,
        }]);
      } else {
        const lines = selectedText.split('\n');
        const formatted = lines.map((line: string) => prefix + line).join('\n');
        editor.executeEdits('toolbar', [{
          range: selection,
          text: formatted,
        }]);
      }
    } else {
      editor.executeEdits('toolbar', [{
        range: selection,
        text: prefix + (selectedText || 'text') + suffix,
      }]);
    }
    editor.focus();
  }

  return (
    <div className="space-y-3">
      {/* Main toolbar */}
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
          <CopyAction text={markdown} label="Copy" />
          <CopyAction text={html} label="Copy HTML" />
          <DownloadAction
            content={markdown}
            filename="document.md"
            mimeType="text/markdown"
            label="Download .md"
          />
        </div>
      </div>

      {/* Formatting toolbar */}
      <div className="flex items-center gap-0.5 px-2 py-1.5 bg-surface/30 border border-edge rounded-md overflow-x-auto">
        {toolbarActions.map((action, index) => {
          if (action === null) {
            return <div key={index} className="w-px h-5 bg-edge mx-1" />;
          }
          const Icon = action.icon;
          return (
            <button
              key={index}
              onClick={() => insertFormatting(action.prefix, action.suffix, action.lineStart)}
              className="p-1.5 text-fg-muted hover:text-fg-secondary hover:bg-elevated/50 rounded transition-colors"
              title={action.label}
            >
              <Icon className="w-4 h-4" />
            </button>
          );
        })}
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
        rightLabel="Preview"
        rightStatus={timeMs !== null ? <PerformanceBadge timeMs={timeMs} label="Rendered" /> : undefined}
        left={
          <Editor
            height="600px"
            defaultLanguage="markdown"
            value={markdown}
            onChange={(value) => setMarkdown(value || '')}
            theme={editorTheme}
            options={baseEditorOptions}
            onMount={(editor) => { editorRef.current = editor; }}
          />
        }
        right={
          <div className="h-[600px] overflow-auto p-4 bg-white rounded-b-md preview-light">
            <div
              className="prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </div>
        }
      />
    </div>
  );
}
