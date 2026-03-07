import type { editor } from 'monaco-editor';

export const baseEditorOptions: editor.IStandaloneEditorConstructionOptions = {
  minimap: { enabled: false },
  fontSize: 14,
  fontFamily: 'JetBrains Mono, Fira Code, monospace',
  lineNumbers: 'on',
  wordWrap: 'on',
  scrollBeyondLastLine: false,
  padding: { top: 12, bottom: 12 },
  renderLineHighlight: 'none',
  overviewRulerBorder: false,
  hideCursorInOverviewRuler: true,
  scrollbar: {
    vertical: 'auto',
    horizontal: 'auto',
    verticalScrollbarSize: 8,
    horizontalScrollbarSize: 8,
  },
};

export const readOnlyEditorOptions: editor.IStandaloneEditorConstructionOptions = {
  ...baseEditorOptions,
  readOnly: true,
};
