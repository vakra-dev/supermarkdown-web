'use client';

import { useState, useEffect, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { useDebouncedCallback } from 'use-debounce';
import { SplitPane } from '@/components/tools/SplitPane';
import { PerformanceBadge } from '@/components/tools/PerformanceBadge';
import { CopyAction, DownloadAction } from '@/components/tools/ToolActions';
import { useTheme } from '@/components/theme-provider';
import { baseEditorOptions, readOnlyEditorOptions } from '@/lib/tools/editor-options';
import { Table, List, Code } from 'lucide-react';

const Editor = dynamic(() => import('@monaco-editor/react'), { ssr: false });

const sampleJson = `[
  { "name": "Alice", "age": 30, "city": "New York", "role": "Engineer" },
  { "name": "Bob", "age": 25, "city": "London", "role": "Designer" },
  { "name": "Charlie", "age": 35, "city": "Tokyo", "role": "Manager" }
]`;

type OutputMode = 'table' | 'list' | 'code';

function escapeTableCell(value: string): string {
  return value.replace(/\|/g, '\\|');
}

function formatCellValue(val: unknown): string {
  if (val === null || val === undefined) {
    return '';
  }
  if (typeof val === 'object') {
    return JSON.stringify(val);
  }
  return String(val);
}

function convertToTable(data: unknown): string {
  if (!Array.isArray(data) || data.length === 0) {
    return '> *Input is not an array of objects. Showing as list instead.*\n\n' + convertToList(data, 0);
  }

  const allObjects = data.every(
    (item) => typeof item === 'object' && item !== null && !Array.isArray(item)
  );

  if (!allObjects) {
    return '> *Array items are not all objects. Showing as list instead.*\n\n' + convertToList(data, 0);
  }

  const headers: string[] = [];
  for (const item of data) {
    for (const key of Object.keys(item as Record<string, unknown>)) {
      if (!headers.includes(key)) {
        headers.push(key);
      }
    }
  }

  const headerRow = '| ' + headers.map((h) => escapeTableCell(h)).join(' | ') + ' |';
  const separatorRow = '| ' + headers.map(() => '---').join(' | ') + ' |';

  const bodyRows = data.map((item) => {
    const record = item as Record<string, unknown>;
    const cells = headers.map((h) => escapeTableCell(formatCellValue(record[h])));
    return '| ' + cells.join(' | ') + ' |';
  });

  return [headerRow, separatorRow, ...bodyRows].join('\n');
}

function convertToList(data: unknown, indent: number): string {
  const prefix = ' '.repeat(indent);
  const lines: string[] = [];

  if (Array.isArray(data)) {
    for (const item of data) {
      if (typeof item === 'object' && item !== null) {
        lines.push(`${prefix}- `);
        lines.push(convertToList(item, indent + 2));
      } else {
        lines.push(`${prefix}- ${formatCellValue(item)}`);
      }
    }
  } else if (typeof data === 'object' && data !== null) {
    const record = data as Record<string, unknown>;
    for (const [key, value] of Object.entries(record)) {
      if (typeof value === 'object' && value !== null) {
        lines.push(`${prefix}- **${key}**:`);
        lines.push(convertToList(value, indent + 2));
      } else {
        lines.push(`${prefix}- **${key}**: ${formatCellValue(value)}`);
      }
    }
  } else {
    lines.push(`${prefix}- ${formatCellValue(data)}`);
  }

  return lines.join('\n');
}

function convertToCodeBlock(data: unknown): string {
  return '```json\n' + JSON.stringify(data, null, 2) + '\n```';
}

function convertJsonToMarkdown(input: string, mode: OutputMode): string {
  const data = JSON.parse(input);

  switch (mode) {
    case 'table':
      return convertToTable(data);
    case 'list':
      return convertToList(data, 0);
    case 'code':
      return convertToCodeBlock(data);
  }
}

export function JsonToMarkdown() {
  const [json, setJson] = useState(sampleJson);
  const [markdown, setMarkdown] = useState('');
  const [timeMs, setTimeMs] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [outputMode, setOutputMode] = useState<OutputMode>('table');
  const { theme } = useTheme();
  const editorTheme = theme === 'dark' ? 'vs-dark' : 'light';

  const doConvert = useDebouncedCallback((input: string, mode: OutputMode) => {
    try {
      setError(null);
      const start = performance.now();
      const result = convertJsonToMarkdown(input, mode);
      setTimeMs(performance.now() - start);
      setMarkdown(result);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Invalid JSON');
      setMarkdown('');
      setTimeMs(null);
    }
  }, 100);

  useEffect(() => {
    doConvert(json, outputMode);
  }, [json, outputMode, doConvert]);

  const handleSample = useCallback(() => {
    setJson(sampleJson);
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
          {/* Output mode toggle */}
          <div className="flex items-center border border-edge rounded overflow-hidden mr-2">
            <button
              onClick={() => setOutputMode('table')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-sm transition-colors ${
                outputMode === 'table'
                  ? 'bg-elevated/50 text-fg'
                  : 'text-fg-muted hover:text-fg-secondary'
              }`}
            >
              <Table className="w-3.5 h-3.5" />
              Table
            </button>
            <button
              onClick={() => setOutputMode('list')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-sm transition-colors ${
                outputMode === 'list'
                  ? 'bg-elevated/50 text-fg'
                  : 'text-fg-muted hover:text-fg-secondary'
              }`}
            >
              <List className="w-3.5 h-3.5" />
              List
            </button>
            <button
              onClick={() => setOutputMode('code')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-sm transition-colors ${
                outputMode === 'code'
                  ? 'bg-elevated/50 text-fg'
                  : 'text-fg-muted hover:text-fg-secondary'
              }`}
            >
              <Code className="w-3.5 h-3.5" />
              Code
            </button>
          </div>
          <CopyAction text={markdown} />
          <DownloadAction
            content={markdown}
            filename="converted.md"
            mimeType="text/markdown"
            label="Download .md"
          />
        </div>
      </div>

      {/* Error banner */}
      {error && (
        <div className="px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-md text-red-600 dark:text-red-400 text-sm">
          {error}
        </div>
      )}

      {/* Split pane editors */}
      <SplitPane
        leftLabel="JSON"
        rightLabel="Markdown"
        rightStatus={timeMs !== null ? <PerformanceBadge timeMs={timeMs} label="Converted" /> : undefined}
        left={
          <Editor
            height="600px"
            defaultLanguage="json"
            value={json}
            onChange={(value) => setJson(value || '')}
            theme={editorTheme}
            options={baseEditorOptions}
          />
        }
        right={
          <Editor
            height="600px"
            defaultLanguage="markdown"
            value={markdown}
            theme={editorTheme}
            options={readOnlyEditorOptions}
          />
        }
      />
    </div>
  );
}
