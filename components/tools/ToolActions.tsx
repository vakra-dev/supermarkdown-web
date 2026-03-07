'use client';

import { useState } from 'react';
import { Copy, Download, Check } from 'lucide-react';

export function CopyAction({ text, label = 'Copy' }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="inline-flex items-center gap-2 px-3 py-1.5 text-sm text-fg-muted hover:text-fg-secondary hover:bg-elevated/50 rounded transition-colors"
    >
      {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
      {copied ? 'Copied' : label}
    </button>
  );
}

export function DownloadAction({
  content,
  filename,
  mimeType = 'text/plain',
  label = 'Download',
}: {
  content: string | Blob;
  filename: string;
  mimeType?: string;
  label?: string;
}) {
  const handleDownload = () => {
    const blob = content instanceof Blob ? content : new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <button
      onClick={handleDownload}
      className="inline-flex items-center gap-2 px-3 py-1.5 text-sm text-fg-muted hover:text-fg-secondary hover:bg-elevated/50 rounded transition-colors"
    >
      <Download className="w-4 h-4" />
      {label}
    </button>
  );
}
