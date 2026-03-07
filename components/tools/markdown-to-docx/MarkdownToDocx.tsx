'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import dynamic from 'next/dynamic';
import { useDebouncedCallback } from 'use-debounce';
import { SplitPane } from '@/components/tools/SplitPane';
import { PerformanceBadge } from '@/components/tools/PerformanceBadge';
import { CopyAction, DownloadAction } from '@/components/tools/ToolActions';
import { useTheme } from '@/components/theme-provider';
import { baseEditorOptions } from '@/lib/tools/editor-options';
import { Download } from 'lucide-react';

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

function parseInlineTokens(token: any, TextRun: any): any[] {
  if (!token || !token.children) {
    return [new TextRun({ text: token?.content || '' })];
  }

  const runs: any[] = [];
  let bold = false;
  let italic = false;
  let strikethrough = false;

  for (const child of token.children) {
    if (child.type === 'strong_open') { bold = true; continue; }
    if (child.type === 'strong_close') { bold = false; continue; }
    if (child.type === 'em_open') { italic = true; continue; }
    if (child.type === 'em_close') { italic = false; continue; }
    if (child.type === 's_open') { strikethrough = true; continue; }
    if (child.type === 's_close') { strikethrough = false; continue; }
    if (child.type === 'code_inline') {
      runs.push(new TextRun({ text: child.content, font: 'Courier New', bold, italics: italic }));
      continue;
    }
    if (child.type === 'text') {
      runs.push(new TextRun({ text: child.content, bold, italics: italic, strike: strikethrough }));
    }
    if (child.type === 'softbreak') {
      runs.push(new TextRun({ text: '', break: 1 }));
    }
    if (child.type === 'link_open') {
      continue;
    }
    if (child.type === 'link_close') {
      continue;
    }
  }

  return runs.length > 0 ? runs : [new TextRun({ text: '' })];
}

async function generateDocx(markdownInput: string): Promise<Blob> {
  const [mdModule, docxModule] = await Promise.all([
    import('markdown-it'),
    import('docx'),
  ]);

  const { Document, Packer, Paragraph, TextRun, HeadingLevel } = docxModule;

  const md = new mdModule.default({ html: true, linkify: true });
  const tokens = md.parse(markdownInput, {});

  const children: any[] = [];
  let i = 0;

  while (i < tokens.length) {
    const token = tokens[i];

    if (token.type === 'heading_open') {
      const level = parseInt(token.tag.slice(1)) - 1;
      const headingLevels = [
        HeadingLevel.HEADING_1, HeadingLevel.HEADING_2, HeadingLevel.HEADING_3,
        HeadingLevel.HEADING_4, HeadingLevel.HEADING_5, HeadingLevel.HEADING_6,
      ];
      const inlineToken = tokens[i + 1];
      const runs = parseInlineTokens(inlineToken, TextRun);
      children.push(new Paragraph({ heading: headingLevels[level] || HeadingLevel.HEADING_1, children: runs }));
      i += 3;
    } else if (token.type === 'paragraph_open') {
      const inlineToken = tokens[i + 1];
      const runs = parseInlineTokens(inlineToken, TextRun);
      children.push(new Paragraph({ children: runs }));
      i += 3;
    } else if (token.type === 'bullet_list_open' || token.type === 'ordered_list_open') {
      const isOrdered = token.type === 'ordered_list_open';
      const closeType = isOrdered ? 'ordered_list_close' : 'bullet_list_close';
      i++;
      let itemNum = 1;
      while (i < tokens.length && tokens[i].type !== closeType) {
        if (tokens[i].type === 'list_item_open') {
          i++;
          if (tokens[i].type === 'paragraph_open') {
            const inlineToken = tokens[i + 1];
            const runs = parseInlineTokens(inlineToken, TextRun);
            const bullet = isOrdered ? `${itemNum}. ` : '\u2022 ';
            children.push(new Paragraph({
              children: [new TextRun({ text: bullet }), ...runs],
            }));
            itemNum++;
            i += 3;
          }
        } else {
          i++;
        }
      }
      i++;
    } else if (token.type === 'fence' || token.type === 'code_block') {
      const codeText = token.content || '';
      const lines = codeText.split('\n');
      for (const line of lines) {
        children.push(new Paragraph({
          children: [new TextRun({ text: line || ' ', font: 'Courier New', size: 20 })],
          spacing: { before: 0, after: 0 },
        }));
      }
      i++;
    } else if (token.type === 'blockquote_open') {
      i++;
      while (i < tokens.length && tokens[i].type !== 'blockquote_close') {
        if (tokens[i].type === 'paragraph_open') {
          const inlineToken = tokens[i + 1];
          const runs = parseInlineTokens(inlineToken, TextRun);
          children.push(new Paragraph({
            children: runs,
            indent: { left: 720 },
          }));
          i += 3;
        } else {
          i++;
        }
      }
      i++;
    } else if (token.type === 'hr') {
      children.push(new Paragraph({
        children: [new TextRun({ text: '\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500' })],
      }));
      i++;
    } else {
      i++;
    }
  }

  const doc = new Document({
    sections: [{ children: children.length > 0 ? children : [new Paragraph({ children: [new TextRun('')] })] }],
  });

  return await Packer.toBlob(doc);
}

export function MarkdownToDocx() {
  const [markdown, setMarkdown] = useState(sampleMarkdown);
  const [html, setHtml] = useState('');
  const [docxBlob, setDocxBlob] = useState<Blob | null>(null);
  const [timeMs, setTimeMs] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);
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
      const result = md.render(input);
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

  const handleGenerate = useCallback(async () => {
    if (!markdown.trim()) return;
    setGenerating(true);
    setError(null);
    try {
      const start = performance.now();
      const blob = await generateDocx(markdown);
      setTimeMs(performance.now() - start);
      setDocxBlob(blob);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'document.docx';
      a.click();
      URL.revokeObjectURL(url);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'DOCX generation failed');
    } finally {
      setGenerating(false);
    }
  }, [markdown]);

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
        <div className="flex items-center gap-2">
          {timeMs !== null && <PerformanceBadge timeMs={timeMs} label="Generated" />}
          <button
            onClick={handleGenerate}
            disabled={generating || !markdown.trim()}
            className="inline-flex items-center gap-2 px-3 py-1.5 text-sm bg-accent-500 text-neutral-950 font-medium rounded transition-colors hover:bg-accent-400 disabled:opacity-50"
          >
            <Download className="w-4 h-4" />
            {generating ? 'Generating...' : 'Download .docx'}
          </button>
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
        rightLabel="Preview"
        rightStatus={timeMs !== null ? <PerformanceBadge timeMs={timeMs} label="Generated" /> : undefined}
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
