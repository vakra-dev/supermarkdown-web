'use client';

import { useState, useEffect, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { useDebouncedCallback } from 'use-debounce';
import { PerformanceBadge } from '@/components/tools/PerformanceBadge';
import { useTheme } from '@/components/theme-provider';
import { baseEditorOptions } from '@/lib/tools/editor-options';
import { Columns, AlignJustify } from 'lucide-react';
import type { Change } from 'diff';

const Editor = dynamic(() => import('@monaco-editor/react'), { ssr: false });
const DiffEditorComponent = dynamic(
  () => import('@monaco-editor/react').then(m => ({ default: m.DiffEditor })),
  { ssr: false }
);

const sampleOriginal = `# My Document

This is the first paragraph of my document.

## Features

- Feature one
- Feature two
- Feature three

## Installation

Run \`npm install\` to get started.`;

const sampleModified = `# My Document

This is the first paragraph of my document, with some edits.

## Features

- Feature one
- Feature two (updated)
- Feature three
- Feature four (new)

## Getting Started

Run \`npm install\` to get started.

## License

MIT`;

const activeClass =
  'flex items-center gap-1.5 px-3 py-1.5 text-sm transition-colors bg-elevated/50 text-fg';
const inactiveClass =
  'flex items-center gap-1.5 px-3 py-1.5 text-sm transition-colors text-fg-muted hover:text-fg-secondary';

export function MarkdownDiff() {
  const [original, setOriginal] = useState('');
  const [modified, setModified] = useState('');
  const [diffResult, setDiffResult] = useState<Change[]>([]);
  const [viewMode, setViewMode] = useState<'unified' | 'split'>('unified');
  const [timeMs, setTimeMs] = useState<number | null>(null);
  const { theme } = useTheme();
  const editorTheme = theme === 'dark' ? 'vs-dark' : 'light';

  const doDiff = useDebouncedCallback(async (orig: string, mod: string) => {
    try {
      const { diffLines } = await import('diff');
      const start = performance.now();
      const changes = diffLines(orig, mod);
      setTimeMs(performance.now() - start);
      setDiffResult(changes);
    } catch (e) {
      // silently handle
    }
  }, 100);

  useEffect(() => {
    doDiff(original, modified);
  }, [original, modified, doDiff]);

  const handleSample = useCallback(() => {
    setOriginal(sampleOriginal);
    setModified(sampleModified);
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
          {/* View mode toggle */}
          <div className="flex items-center border border-edge rounded overflow-hidden mr-2">
            <button
              onClick={() => setViewMode('unified')}
              className={viewMode === 'unified' ? activeClass : inactiveClass}
            >
              <AlignJustify className="w-3.5 h-3.5" /> Unified
            </button>
            <button
              onClick={() => setViewMode('split')}
              className={viewMode === 'split' ? activeClass : inactiveClass}
            >
              <Columns className="w-3.5 h-3.5" /> Split
            </button>
          </div>
          {timeMs !== null && <PerformanceBadge timeMs={timeMs} label="Compared" />}
        </div>
      </div>

      {/* Input editors - side by side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* Original */}
        <div className="border border-edge rounded-md overflow-hidden">
          <div className="flex items-center px-4 py-2 border-b border-edge bg-surface/30">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-edge-hover" />
                <div className="w-2.5 h-2.5 rounded-full bg-edge-hover" />
                <div className="w-2.5 h-2.5 rounded-full bg-edge-hover" />
              </div>
              <span className="text-sm font-medium text-fg-muted uppercase tracking-wider ml-2">
                Original
              </span>
            </div>
          </div>
          <Editor
            height="250px"
            defaultLanguage="markdown"
            value={original}
            onChange={(value) => setOriginal(value || '')}
            theme={editorTheme}
            options={baseEditorOptions}
          />
        </div>

        {/* Modified */}
        <div className="border border-edge rounded-md overflow-hidden">
          <div className="flex items-center px-4 py-2 border-b border-edge bg-surface/30">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-edge-hover" />
                <div className="w-2.5 h-2.5 rounded-full bg-edge-hover" />
                <div className="w-2.5 h-2.5 rounded-full bg-edge-hover" />
              </div>
              <span className="text-sm font-medium text-fg-muted uppercase tracking-wider ml-2">
                Modified
              </span>
            </div>
          </div>
          <Editor
            height="250px"
            defaultLanguage="markdown"
            value={modified}
            onChange={(value) => setModified(value || '')}
            theme={editorTheme}
            options={baseEditorOptions}
          />
        </div>
      </div>

      {/* Diff result */}
      {viewMode === 'unified' ? (
        <div className="border border-edge rounded-md overflow-hidden">
          <div className="flex items-center px-4 py-2 border-b border-edge bg-surface/30">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-edge-hover" />
                <div className="w-2.5 h-2.5 rounded-full bg-edge-hover" />
                <div className="w-2.5 h-2.5 rounded-full bg-edge-hover" />
              </div>
              <span className="text-sm font-medium text-fg-muted uppercase tracking-wider ml-2">
                Diff
              </span>
            </div>
          </div>
          <div className="max-h-[600px] overflow-auto font-mono text-sm">
            {diffResult.map((part, i) => (
              <div key={i}>
                {part.value
                  .split('\n')
                  .filter((line, j, arr) => !(j === arr.length - 1 && line === ''))
                  .map((line, j) => (
                    <div
                      key={j}
                      className={
                        part.added
                          ? 'bg-green-500/10 text-green-700 dark:text-green-400'
                          : part.removed
                          ? 'bg-red-500/10 text-red-700 dark:text-red-400'
                          : 'text-fg-secondary'
                      }
                    >
                      <span className="inline-block w-6 text-center text-fg-faint select-none">
                        {part.added ? '+' : part.removed ? '-' : ' '}
                      </span>
                      <span className="px-2">{line || ' '}</span>
                    </div>
                  ))}
              </div>
            ))}
            {diffResult.length === 0 && (
              <div className="px-4 py-8 text-center text-fg-muted">
                Enter text in both editors to see differences
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="border border-edge rounded-md overflow-hidden">
          <div className="flex items-center px-4 py-2 border-b border-edge bg-surface/30">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-edge-hover" />
                <div className="w-2.5 h-2.5 rounded-full bg-edge-hover" />
                <div className="w-2.5 h-2.5 rounded-full bg-edge-hover" />
              </div>
              <span className="text-sm font-medium text-fg-muted uppercase tracking-wider ml-2">
                Side-by-Side Diff
              </span>
            </div>
          </div>
          <DiffEditorComponent
            height="600px"
            language="markdown"
            original={original}
            modified={modified}
            theme={editorTheme}
            options={{
              readOnly: true,
              renderSideBySide: true,
              minimap: { enabled: false },
              fontSize: 14,
              fontFamily: 'JetBrains Mono, Fira Code, monospace',
              scrollBeyondLastLine: false,
            }}
          />
        </div>
      )}
    </div>
  );
}
