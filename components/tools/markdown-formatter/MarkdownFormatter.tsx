'use client';

import { useState, useEffect, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { useDebouncedCallback } from 'use-debounce';
import { SplitPane } from '@/components/tools/SplitPane';
import { PerformanceBadge } from '@/components/tools/PerformanceBadge';
import { CopyAction, DownloadAction } from '@/components/tools/ToolActions';
import { useTheme } from '@/components/theme-provider';
import { baseEditorOptions, readOnlyEditorOptions } from '@/lib/tools/editor-options';
import { Settings, X } from 'lucide-react';

const Editor = dynamic(() => import('@monaco-editor/react'), { ssr: false });

const sampleMarkdown = `# Getting Started

This is a paragraph with   extra   spaces and trailing whitespace.

* Item one
- Item two
+ Item three

##   Another heading

Here's some **bold** and _italic_ text with \`inline code\`.

> A blockquote
> with continuation

1.  First ordered item
2.  Second ordered item


---
***
___

| Col 1 | Col 2 |
|-------|-------|
| a | b |
| c | d |`;

export function MarkdownFormatter() {
  const [input, setInput] = useState(sampleMarkdown);
  const [output, setOutput] = useState('');
  const [timeMs, setTimeMs] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showOptions, setShowOptions] = useState(false);
  const [options, setOptions] = useState({
    bullet: '-' as '-' | '*' | '+',
    emphasis: '*' as '*' | '_',
    strong: '*' as '*' | '_',
    rule: '-' as '-' | '*' | '_',
  });
  const { theme } = useTheme();
  const editorTheme = theme === 'dark' ? 'vs-dark' : 'light';

  const doFormat = useDebouncedCallback(
    async (text: string, opts: typeof options) => {
      try {
        setError(null);
        const start = performance.now();

        const { unified } = await import('unified');
        const remarkParse = (await import('remark-parse')).default;
        const remarkStringify = (await import('remark-stringify')).default;
        const remarkGfm = (await import('remark-gfm')).default;

        // Merge adjacent lists of the same type so mixed markers (*, -, +) normalize
        function remarkMergeLists() {
          return (tree: any) => {
            for (let i = tree.children.length - 1; i > 0; i--) {
              const prev = tree.children[i - 1];
              const curr = tree.children[i];
              if (prev.type === 'list' && curr.type === 'list' && prev.ordered === curr.ordered) {
                prev.children.push(...curr.children);
                tree.children.splice(i, 1);
              }
            }
          };
        }

        const result = await unified()
          .use(remarkParse)
          .use(remarkGfm)
          .use(remarkMergeLists)
          .use(remarkStringify, {
            bullet: opts.bullet,
            emphasis: opts.emphasis,
            strong: opts.strong,
            rule: opts.rule,
          })
          .process(text);

        setTimeMs(performance.now() - start);
        setOutput(String(result));
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Formatting failed');
      }
    },
    100
  );

  useEffect(() => {
    doFormat(input, options);
  }, [input, options, doFormat]);

  const handleSample = useCallback(() => {
    setInput(sampleMarkdown);
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
          <button
            onClick={() => setShowOptions(!showOptions)}
            className={`flex items-center gap-2 px-3 py-1.5 text-sm rounded transition-colors ${
              showOptions
                ? 'bg-elevated/50 text-fg'
                : 'text-fg-muted hover:text-fg-secondary hover:bg-elevated/50'
            }`}
          >
            <Settings className="w-4 h-4" />
            Options
          </button>
          <CopyAction text={output} />
          <DownloadAction
            content={output}
            filename="formatted.md"
            mimeType="text/markdown"
            label="Download .md"
          />
        </div>
      </div>

      {/* Options panel */}
      {showOptions && (
        <div className="flex items-center gap-4 px-4 py-3 bg-surface/50 border border-edge rounded-md text-sm flex-wrap">
          <label className="flex items-center gap-2 text-fg-secondary">
            <span className="text-fg-muted">Bullet:</span>
            <select
              value={options.bullet}
              onChange={(e) =>
                setOptions({ ...options, bullet: e.target.value as '-' | '*' | '+' })
              }
              className="bg-elevated border border-edge rounded px-2 py-1 text-fg-secondary"
            >
              <option value="-">- Dash</option>
              <option value="*">* Asterisk</option>
              <option value="+">+ Plus</option>
            </select>
          </label>
          <label className="flex items-center gap-2 text-fg-secondary">
            <span className="text-fg-muted">Emphasis:</span>
            <select
              value={options.emphasis}
              onChange={(e) =>
                setOptions({ ...options, emphasis: e.target.value as '*' | '_' })
              }
              className="bg-elevated border border-edge rounded px-2 py-1 text-fg-secondary"
            >
              <option value="*">* Asterisk</option>
              <option value="_">_ Underscore</option>
            </select>
          </label>
          <label className="flex items-center gap-2 text-fg-secondary">
            <span className="text-fg-muted">Strong:</span>
            <select
              value={options.strong}
              onChange={(e) =>
                setOptions({ ...options, strong: e.target.value as '*' | '_' })
              }
              className="bg-elevated border border-edge rounded px-2 py-1 text-fg-secondary"
            >
              <option value="*">* Asterisk (**)</option>
              <option value="_">_ Underscore (__)</option>
            </select>
          </label>
          <label className="flex items-center gap-2 text-fg-secondary">
            <span className="text-fg-muted">Rule:</span>
            <select
              value={options.rule}
              onChange={(e) =>
                setOptions({ ...options, rule: e.target.value as '-' | '*' | '_' })
              }
              className="bg-elevated border border-edge rounded px-2 py-1 text-fg-secondary"
            >
              <option value="-">- Dashes</option>
              <option value="*">* Asterisks</option>
              <option value="_">_ Underscores</option>
            </select>
          </label>
          <button
            onClick={() => setShowOptions(false)}
            className="ml-auto p-1 text-fg-muted hover:text-fg-secondary transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Error banner */}
      {error && (
        <div className="px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-md text-red-600 dark:text-red-400 text-sm">
          {error}
        </div>
      )}

      {/* Split pane editors */}
      <SplitPane
        leftLabel="Input"
        rightLabel="Formatted"
        rightStatus={
          timeMs !== null ? <PerformanceBadge timeMs={timeMs} label="Formatted" /> : undefined
        }
        left={
          <Editor
            height="600px"
            defaultLanguage="markdown"
            value={input}
            onChange={(value) => setInput(value || '')}
            theme={editorTheme}
            options={baseEditorOptions}
          />
        }
        right={
          <Editor
            height="600px"
            defaultLanguage="markdown"
            value={output}
            theme={editorTheme}
            options={readOnlyEditorOptions}
          />
        }
      />
    </div>
  );
}
