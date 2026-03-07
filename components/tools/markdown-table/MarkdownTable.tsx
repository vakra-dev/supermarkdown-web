'use client';

import { useState, useEffect, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { CopyAction, DownloadAction } from '@/components/tools/ToolActions';
import { useTheme } from '@/components/theme-provider';
import { readOnlyEditorOptions } from '@/lib/tools/editor-options';
import { Plus, Minus } from 'lucide-react';

const Editor = dynamic(() => import('@monaco-editor/react'), { ssr: false });

function createGrid(rows: number, cols: number): string[][] {
  return Array.from({ length: rows }, (_, r) =>
    Array.from({ length: cols }, (_, c) => (r === 0 ? `Header ${c + 1}` : ''))
  );
}

function generateMarkdownTable(
  cells: string[][],
  alignments: ('left' | 'center' | 'right')[]
): string {
  if (cells.length === 0 || cells[0].length === 0) return '';
  const header = cells[0];
  const separator = header.map((_, i) => {
    const align = alignments[i] || 'left';
    if (align === 'center') return ':---:';
    if (align === 'right') return '---:';
    return '---';
  });
  const dataRows = cells.slice(1);
  return [
    '| ' + header.map((c) => c.replace(/\|/g, '\\|')).join(' | ') + ' |',
    '| ' + separator.join(' | ') + ' |',
    ...dataRows.map(
      (r) =>
        '| ' + r.map((c) => c.replace(/\|/g, '\\|')).join(' | ') + ' |'
    ),
  ].join('\n');
}

export function MarkdownTable() {
  const [rows, setRows] = useState(4);
  const [cols, setCols] = useState(3);
  const [cells, setCells] = useState<string[][]>(() => createGrid(4, 3));
  const [alignments, setAlignments] = useState<
    ('left' | 'center' | 'right')[]
  >(['left', 'left', 'left']);
  const [markdown, setMarkdown] = useState('');
  const { theme } = useTheme();
  const editorTheme = theme === 'dark' ? 'vs-dark' : 'light';

  const updateCell = useCallback(
    (row: number, col: number, value: string) => {
      setCells((prev) => {
        const next = prev.map((r) => [...r]);
        next[row][col] = value;
        return next;
      });
    },
    []
  );

  const addRow = useCallback(() => {
    setCells((prev) => [...prev, Array(prev[0]?.length || cols).fill('')]);
    setRows((prev) => prev + 1);
  }, [cols]);

  const addCol = useCallback(() => {
    setCells((prev) =>
      prev.map((r, i) => [...r, i === 0 ? `Header ${r.length + 1}` : ''])
    );
    setCols((prev) => prev + 1);
    setAlignments((prev) => [...prev, 'left']);
  }, []);

  const removeRow = useCallback(() => {
    if (rows <= 2) return;
    setCells((prev) => prev.slice(0, -1));
    setRows((prev) => prev - 1);
  }, [rows]);

  const removeCol = useCallback(() => {
    if (cols <= 1) return;
    setCells((prev) => prev.map((r) => r.slice(0, -1)));
    setCols((prev) => prev - 1);
    setAlignments((prev) => prev.slice(0, -1));
  }, [cols]);

  const setColumnAlign = useCallback(
    (colIdx: number, align: 'left' | 'center' | 'right') => {
      setAlignments((prev) => {
        const next = [...prev];
        next[colIdx] = align;
        return next;
      });
    },
    []
  );

  const handlePaste = useCallback(
    (e: React.ClipboardEvent) => {
      const text = e.clipboardData.getData('text');
      if (
        text.includes('\t') ||
        (text.includes(',') && text.includes('\n'))
      ) {
        e.preventDefault();
        const delimiter = text.includes('\t') ? '\t' : ',';
        const parsed = text
          .trim()
          .split('\n')
          .map((r) => r.split(delimiter).map((c) => c.trim()));
        const newRows = parsed.length;
        const newCols = Math.max(...parsed.map((r) => r.length));
        const normalized = parsed.map((r) => {
          while (r.length < newCols) r.push('');
          return r;
        });
        setCells(normalized);
        setRows(newRows);
        setCols(newCols);
        setAlignments(Array(newCols).fill('left'));
      }
    },
    []
  );

  useEffect(() => {
    setMarkdown(generateMarkdownTable(cells, alignments));
  }, [cells, alignments]);

  return (
    <div className="space-y-3">
      {/* Toolbar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={addRow}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm text-fg-muted hover:text-fg-secondary hover:bg-elevated/50 rounded transition-colors"
          >
            <Plus className="w-4 h-4" /> Row
          </button>
          <button
            onClick={addCol}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm text-fg-muted hover:text-fg-secondary hover:bg-elevated/50 rounded transition-colors"
          >
            <Plus className="w-4 h-4" /> Column
          </button>
          <button
            onClick={removeRow}
            disabled={rows <= 2}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm text-fg-muted hover:text-fg-secondary hover:bg-elevated/50 rounded transition-colors disabled:opacity-40 disabled:pointer-events-none"
          >
            <Minus className="w-4 h-4" /> Row
          </button>
          <button
            onClick={removeCol}
            disabled={cols <= 1}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm text-fg-muted hover:text-fg-secondary hover:bg-elevated/50 rounded transition-colors disabled:opacity-40 disabled:pointer-events-none"
          >
            <Minus className="w-4 h-4" /> Column
          </button>
        </div>
        <div className="flex items-center gap-1">
          <CopyAction text={markdown} />
          <DownloadAction
            content={markdown}
            filename="table.md"
            mimeType="text/markdown"
            label="Download .md"
          />
        </div>
      </div>

      {/* Editable table grid */}
      <div
        className="border border-edge rounded-md overflow-x-auto"
        onPaste={handlePaste}
      >
        <table className="w-full border-collapse">
          <thead>
            <tr>
              {Array.from({ length: cols }).map((_, colIdx) => (
                <th key={colIdx} className="border border-edge p-0">
                  <input
                    value={cells[0]?.[colIdx] || ''}
                    onChange={(e) => updateCell(0, colIdx, e.target.value)}
                    className="w-full px-3 py-2 bg-surface/50 text-sm text-fg font-medium border-none outline-none"
                    placeholder={`Header ${colIdx + 1}`}
                  />
                  <div className="flex justify-center gap-0.5 pb-1.5 px-1">
                    {(['left', 'center', 'right'] as const).map((align) => (
                      <button
                        key={align}
                        onClick={() => setColumnAlign(colIdx, align)}
                        className={`px-2 py-0.5 text-xs rounded transition-colors ${
                          alignments[colIdx] === align
                            ? 'bg-accent-500/20 text-accent-fg'
                            : 'text-fg-faint hover:text-fg-muted hover:bg-elevated/50'
                        }`}
                      >
                        {align === 'left'
                          ? 'L'
                          : align === 'center'
                            ? 'C'
                            : 'R'}
                      </button>
                    ))}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: rows - 1 }).map((_, rowIdx) => (
              <tr key={rowIdx + 1}>
                {Array.from({ length: cols }).map((_, colIdx) => (
                  <td key={colIdx} className="border border-edge p-0">
                    <input
                      value={cells[rowIdx + 1]?.[colIdx] || ''}
                      onChange={(e) =>
                        updateCell(rowIdx + 1, colIdx, e.target.value)
                      }
                      className="w-full px-3 py-2 bg-transparent text-sm text-fg border-none outline-none"
                      placeholder="..."
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Generated Markdown output */}
      <div className="border border-edge rounded-md overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2 border-b border-edge bg-surface/30">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-edge-hover" />
              <div className="w-2.5 h-2.5 rounded-full bg-edge-hover" />
              <div className="w-2.5 h-2.5 rounded-full bg-edge-hover" />
            </div>
            <span className="text-sm font-medium text-fg-muted uppercase tracking-wider ml-2">
              Markdown
            </span>
          </div>
        </div>
        <Editor
          height="200px"
          defaultLanguage="markdown"
          value={markdown}
          theme={editorTheme}
          options={readOnlyEditorOptions}
        />
      </div>
    </div>
  );
}
