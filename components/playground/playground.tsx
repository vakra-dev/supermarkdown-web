'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useDebouncedCallback } from 'use-debounce';
import { Settings, Copy, Download, Check, ChevronDown, X } from 'lucide-react';
import { convert, ConvertOptions, ConvertResult } from '@/lib/wasm';
import { examples } from '@/lib/examples';
import { OptionsPanel } from './options-panel';

// Dynamic import Monaco to avoid SSR issues
const Editor = dynamic(() => import('@monaco-editor/react'), { ssr: false });

const defaultHtml = examples[0].html;

export function Playground() {
  const [html, setHtml] = useState(defaultHtml);
  const [result, setResult] = useState<ConvertResult | null>(null);
  const [options, setOptions] = useState<ConvertOptions>({});
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const [selectedExample, setSelectedExample] = useState(examples[0].id);
  const [copied, setCopied] = useState(false);

  const doConvert = useDebouncedCallback(
    async (input: string, opts: ConvertOptions) => {
      try {
        const res = await convert(input, opts);
        setResult(res);
      } catch (error) {
        console.error('Conversion error:', error);
      }
    },
    100
  );

  useEffect(() => {
    doConvert(html, options);
  }, [html, options, doConvert]);

  const handleExampleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const example = examples.find((ex) => ex.id === e.target.value);
    if (example) {
      setSelectedExample(example.id);
      setHtml(example.html);
    }
  };

  const handleCopy = async () => {
    if (result) {
      await navigator.clipboard.writeText(result.markdown);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    if (result) {
      const blob = new Blob([result.markdown], { type: 'text/markdown' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'converted.md';
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-3.5rem)] bg-neutral-950">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-neutral-800/50 bg-neutral-900/50 backdrop-blur-sm">
        <div className="flex items-center gap-4">
          <div className="relative">
            <select
              value={selectedExample}
              onChange={handleExampleChange}
              className="appearance-none bg-neutral-800/50 border border-neutral-700/50 rounded px-3 py-1.5 pr-8 text-base text-neutral-200 focus:outline-none focus:border-accent-500/50 cursor-pointer"
            >
              {examples.map((ex) => (
                <option key={ex.id} value={ex.id}>
                  {ex.name}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setIsOptionsOpen(!isOptionsOpen)}
            className={`flex items-center gap-2 px-3 py-1.5 text-base rounded transition-colors ${
              isOptionsOpen
                ? 'bg-neutral-700/50 text-neutral-100'
                : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/50'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Options</span>
          </button>
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-3 py-1.5 text-base text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/50 rounded transition-colors"
          >
            {copied ? (
              <Check className="w-4 h-4 text-green-500" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 px-3 py-1.5 text-base text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/50 rounded transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Download</span>
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* Editors */}
        <div className="flex-1 flex flex-col md:flex-row">
          {/* HTML Input */}
          <div className="flex-1 flex flex-col border-r border-neutral-800/50">
            <div className="flex items-center justify-between px-4 py-2 border-b border-neutral-800/50 bg-neutral-900/30">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-neutral-700" />
                  <div className="w-2.5 h-2.5 rounded-full bg-neutral-700" />
                  <div className="w-2.5 h-2.5 rounded-full bg-neutral-700" />
                </div>
                <span className="text-sm font-medium text-neutral-400 uppercase tracking-wider ml-2">
                  HTML
                </span>
              </div>
            </div>
            <div className="flex-1 bg-neutral-900/20">
              <Editor
                height="100%"
                defaultLanguage="html"
                value={html}
                onChange={(value) => setHtml(value || '')}
                theme="vs-dark"
                options={{
                  minimap: { enabled: false },
                  fontSize: 15,
                  fontFamily: 'JetBrains Mono, Fira Code, monospace',
                  lineNumbers: 'on',
                  wordWrap: 'on',
                  scrollBeyondLastLine: false,
                  padding: { top: 16, bottom: 16 },
                  renderLineHighlight: 'none',
                  overviewRulerBorder: false,
                  hideCursorInOverviewRuler: true,
                  scrollbar: {
                    vertical: 'auto',
                    horizontal: 'auto',
                    verticalScrollbarSize: 8,
                    horizontalScrollbarSize: 8,
                  },
                }}
              />
            </div>
          </div>

          {/* Markdown Output */}
          <div className="flex-1 flex flex-col">
            <div className="flex items-center justify-between px-4 py-2 border-b border-neutral-800/50 bg-neutral-900/30">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-neutral-700" />
                  <div className="w-2.5 h-2.5 rounded-full bg-neutral-700" />
                  <div className="w-2.5 h-2.5 rounded-full bg-neutral-700" />
                </div>
                <span className="text-sm font-medium text-neutral-400 uppercase tracking-wider ml-2">
                  Markdown
                </span>
              </div>
              {result && (
                <span className="inline-flex items-center gap-1.5 text-base font-mono font-semibold text-green-500">
                  <span className="w-2 h-2 rounded-full bg-green-500" />
                  {result.timing.toFixed(2)}ms
                </span>
              )}
            </div>
            <div className="flex-1 bg-neutral-900/20">
              <Editor
                height="100%"
                defaultLanguage="markdown"
                value={result?.markdown || ''}
                theme="vs-dark"
                options={{
                  minimap: { enabled: false },
                  fontSize: 15,
                  fontFamily: 'JetBrains Mono, Fira Code, monospace',
                  lineNumbers: 'on',
                  wordWrap: 'on',
                  scrollBeyondLastLine: false,
                  readOnly: true,
                  padding: { top: 16, bottom: 16 },
                  renderLineHighlight: 'none',
                  overviewRulerBorder: false,
                  hideCursorInOverviewRuler: true,
                  scrollbar: {
                    vertical: 'auto',
                    horizontal: 'auto',
                    verticalScrollbarSize: 8,
                    horizontalScrollbarSize: 8,
                  },
                }}
              />
            </div>
          </div>
        </div>

        {/* Options Panel - Slide over */}
        {isOptionsOpen && (
          <div className="absolute right-0 top-0 bottom-0 w-72 border-l border-neutral-800/50 bg-neutral-900/95 backdrop-blur-xl shadow-2xl">
            <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-800/50">
              <span className="text-base font-medium text-neutral-200">Options</span>
              <button
                onClick={() => setIsOptionsOpen(false)}
                className="p-1 text-neutral-400 hover:text-neutral-300 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <OptionsPanel
              options={options}
              onChange={setOptions}
              onClose={() => setIsOptionsOpen(false)}
            />
          </div>
        )}
      </div>
    </div>
  );
}
