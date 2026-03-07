'use client';

import { useState, useEffect, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { useDebouncedCallback } from 'use-debounce';
import { SplitPane } from '@/components/tools/SplitPane';
import { PerformanceBadge } from '@/components/tools/PerformanceBadge';
import { CopyAction, DownloadAction } from '@/components/tools/ToolActions';
import { Settings, X } from 'lucide-react';
import { useTheme } from '@/components/theme-provider';
import { baseEditorOptions, readOnlyEditorOptions } from '@/lib/tools/editor-options';

const Editor = dynamic(() => import('@monaco-editor/react'), { ssr: false });

const sampleCsv = `Name,Age,City,Role
Alice,30,New York,Engineer
Bob,25,London,Designer
Charlie,35,Tokyo,Manager
Diana,28,Berlin,Developer`;

interface CsvOptions {
  delimiter: ',' | '\t' | ';' | '|';
  hasHeader: boolean;
}

function parseCsv(input: string, delimiter: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = '';
  let inQuotes = false;
  let i = 0;

  while (i < input.length) {
    const char = input[i];

    if (inQuotes) {
      if (char === '"') {
        if (i + 1 < input.length && input[i + 1] === '"') {
          field += '"';
          i += 2;
          continue;
        } else {
          inQuotes = false;
          i++;
          continue;
        }
      } else {
        field += char;
        i++;
        continue;
      }
    }

    if (char === '"') {
      inQuotes = true;
      i++;
      continue;
    }

    if (char === delimiter) {
      row.push(field);
      field = '';
      i++;
      continue;
    }

    if (char === '\r') {
      if (i + 1 < input.length && input[i + 1] === '\n') {
        row.push(field);
        field = '';
        rows.push(row);
        row = [];
        i += 2;
        continue;
      }
      row.push(field);
      field = '';
      rows.push(row);
      row = [];
      i++;
      continue;
    }

    if (char === '\n') {
      row.push(field);
      field = '';
      rows.push(row);
      row = [];
      i++;
      continue;
    }

    field += char;
    i++;
  }

  if (field.length > 0 || row.length > 0) {
    row.push(field);
    rows.push(row);
  }

  return rows;
}

function csvToMarkdownTable(rows: string[][], hasHeader: boolean): string {
  if (rows.length === 0) return '';

  const maxCols = rows.reduce((max, row) => Math.max(max, row.length), 0);

  const normalizedRows = rows.map((row) => {
    const padded = [...row];
    while (padded.length < maxCols) {
      padded.push('');
    }
    return padded.map((cell) => cell.trim());
  });

  const colWidths = Array.from({ length: maxCols }, (_, colIndex) =>
    Math.max(3, ...normalizedRows.map((row) => row[colIndex].length))
  );

  const formatRow = (cells: string[]): string =>
    '| ' + cells.map((cell, i) => cell.padEnd(colWidths[i])).join(' | ') + ' |';

  const separatorRow =
    '| ' + colWidths.map((w) => '-'.repeat(w)).join(' | ') + ' |';

  const lines: string[] = [];

  if (hasHeader) {
    lines.push(formatRow(normalizedRows[0]));
    lines.push(separatorRow);
    for (let i = 1; i < normalizedRows.length; i++) {
      lines.push(formatRow(normalizedRows[i]));
    }
  } else {
    const emptyHeader = Array.from({ length: maxCols }, () => '');
    lines.push(formatRow(emptyHeader));
    lines.push(separatorRow);
    for (const row of normalizedRows) {
      lines.push(formatRow(row));
    }
  }

  return lines.join('\n') + '\n';
}

export function CsvToMarkdown() {
  const [csv, setCsv] = useState(sampleCsv);
  const [markdown, setMarkdown] = useState('');
  const [timeMs, setTimeMs] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [options, setOptions] = useState<CsvOptions>({
    delimiter: ',',
    hasHeader: true,
  });
  const [showOptions, setShowOptions] = useState(false);
  const { theme } = useTheme();
  const editorTheme = theme === 'dark' ? 'vs-dark' : 'light';

  const doConvert = useDebouncedCallback(
    (input: string, opts: CsvOptions) => {
      try {
        setError(null);
        const start = performance.now();
        const rows = parseCsv(input, opts.delimiter);
        const result = csvToMarkdownTable(rows, opts.hasHeader);
        setTimeMs(performance.now() - start);
        setMarkdown(result);
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Conversion failed');
      }
    },
    100
  );

  useEffect(() => {
    doConvert(csv, options);
  }, [csv, options, doConvert]);

  const handleSample = useCallback(() => {
    setCsv(sampleCsv);
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
          <CopyAction text={markdown} />
          <DownloadAction
            content={markdown}
            filename="table.md"
            mimeType="text/markdown"
            label="Download .md"
          />
        </div>
      </div>

      {/* Options panel */}
      {showOptions && (
        <div className="flex items-center gap-4 px-4 py-3 bg-surface/50 border border-edge rounded-md text-sm flex-wrap">
          <label className="flex items-center gap-2 text-fg-secondary">
            <span className="text-fg-muted">Delimiter:</span>
            <select
              value={options.delimiter}
              onChange={(e) =>
                setOptions({
                  ...options,
                  delimiter: e.target.value as CsvOptions['delimiter'],
                })
              }
              className="bg-elevated border border-edge rounded px-2 py-1 text-fg-secondary"
            >
              <option value=",">Comma (,)</option>
              <option value={'\t'}>Tab</option>
              <option value=";">Semicolon (;)</option>
              <option value="|">Pipe (|)</option>
            </select>
          </label>
          <label className="flex items-center gap-2 text-fg-secondary cursor-pointer">
            <input
              type="checkbox"
              checked={options.hasHeader}
              onChange={(e) =>
                setOptions({ ...options, hasHeader: e.target.checked })
              }
              className="rounded border-edge"
            />
            <span className="text-fg-muted">First row is header</span>
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
        leftLabel="CSV"
        rightLabel="Markdown"
        rightStatus={
          timeMs !== null ? <PerformanceBadge timeMs={timeMs} /> : undefined
        }
        left={
          <Editor
            height="600px"
            defaultLanguage="plaintext"
            value={csv}
            onChange={(value) => setCsv(value || '')}
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
