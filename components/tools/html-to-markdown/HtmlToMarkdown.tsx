'use client';

import { useState, useEffect, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { useDebouncedCallback } from 'use-debounce';
import { convert, ConvertOptions, ConvertResult } from '@/lib/wasm';
import { SplitPane } from '@/components/tools/SplitPane';
import { PerformanceBadge } from '@/components/tools/PerformanceBadge';
import { CopyAction, DownloadAction } from '@/components/tools/ToolActions';
import { Settings, X } from 'lucide-react';
import { useTheme } from '@/components/theme-provider';
import { baseEditorOptions, readOnlyEditorOptions } from '@/lib/tools/editor-options';

const Editor = dynamic(() => import('@monaco-editor/react'), { ssr: false });

const sampleHtml = `<article>
  <h1>Getting Started with Markdown</h1>
  <p>Markdown is a <em>lightweight</em> markup language created by <a href="https://daringfireball.net">John Gruber</a>.</p>

  <h2>Why Use Markdown?</h2>
  <ul>
    <li><strong>Simple</strong> - Easy to learn and read</li>
    <li><strong>Portable</strong> - Works everywhere</li>
    <li><strong>Flexible</strong> - Converts to HTML, PDF, and more</li>
  </ul>

  <h2>Code Example</h2>
  <pre><code class="language-javascript">function greet(name) {
  return \`Hello, \${name}!\`;
}</code></pre>

  <blockquote>
    <p>Markdown is intended to be as easy-to-read and easy-to-write as possible.</p>
  </blockquote>

  <h2>Comparison</h2>
  <table>
    <thead>
      <tr><th>Feature</th><th>Markdown</th><th>HTML</th></tr>
    </thead>
    <tbody>
      <tr><td>Readability</td><td>High</td><td>Low</td></tr>
      <tr><td>Learning curve</td><td>Minutes</td><td>Hours</td></tr>
    </tbody>
  </table>
</article>`;

export function HtmlToMarkdown() {
  const [html, setHtml] = useState(sampleHtml);
  const [result, setResult] = useState<ConvertResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [options, setOptions] = useState<ConvertOptions>({});
  const [showOptions, setShowOptions] = useState(false);
  const { theme } = useTheme();
  const editorTheme = theme === 'dark' ? 'vs-dark' : 'light';

  const doConvert = useDebouncedCallback(
    async (input: string, opts: ConvertOptions) => {
      try {
        setError(null);
        const res = await convert(input, opts);
        setResult(res);
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Conversion failed');
      }
    },
    100
  );

  useEffect(() => {
    doConvert(html, options);
  }, [html, options, doConvert]);

  const handleSample = useCallback(() => {
    setHtml(sampleHtml);
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
          <CopyAction text={result?.markdown || ''} />
          <DownloadAction
            content={result?.markdown || ''}
            filename="converted.md"
            mimeType="text/markdown"
            label="Download .md"
          />
        </div>
      </div>

      {/* Options panel */}
      {showOptions && (
        <div className="flex items-center gap-4 px-4 py-3 bg-surface/50 border border-edge rounded-md text-sm flex-wrap">
          <label className="flex items-center gap-2 text-fg-secondary">
            <span className="text-fg-muted">Headings:</span>
            <select
              value={options.headingStyle || 'atx'}
              onChange={(e) => setOptions({ ...options, headingStyle: e.target.value as 'atx' | 'setext' })}
              className="bg-elevated border border-edge rounded px-2 py-1 text-fg-secondary"
            >
              <option value="atx"># ATX</option>
              <option value="setext">Setext</option>
            </select>
          </label>
          <label className="flex items-center gap-2 text-fg-secondary">
            <span className="text-fg-muted">Links:</span>
            <select
              value={options.linkStyle || 'inline'}
              onChange={(e) => setOptions({ ...options, linkStyle: e.target.value as 'inline' | 'referenced' })}
              className="bg-elevated border border-edge rounded px-2 py-1 text-fg-secondary"
            >
              <option value="inline">Inline</option>
              <option value="referenced">Referenced</option>
            </select>
          </label>
          <label className="flex items-center gap-2 text-fg-secondary">
            <span className="text-fg-muted">Bullets:</span>
            <select
              value={options.bulletMarker || '-'}
              onChange={(e) => setOptions({ ...options, bulletMarker: e.target.value as '-' | '*' | '+' })}
              className="bg-elevated border border-edge rounded px-2 py-1 text-fg-secondary"
            >
              <option value="-">- Dash</option>
              <option value="*">* Asterisk</option>
              <option value="+">+ Plus</option>
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
        leftLabel="HTML"
        rightLabel="Markdown"
        rightStatus={result ? <PerformanceBadge timeMs={result.timing} /> : undefined}
        left={
          <Editor
            height="600px"
            defaultLanguage="html"
            value={html}
            onChange={(value) => setHtml(value || '')}
            theme={editorTheme}
            options={baseEditorOptions}
          />
        }
        right={
          <Editor
            height="600px"
            defaultLanguage="markdown"
            value={result?.markdown || ''}
            theme={editorTheme}
            options={readOnlyEditorOptions}
          />
        }
      />
    </div>
  );
}
