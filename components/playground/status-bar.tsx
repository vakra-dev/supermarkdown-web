'use client';

import { Check } from 'lucide-react';
import { ConvertResult } from '@/lib/wasm';

interface StatusBarProps {
  result: ConvertResult | null;
}

export function StatusBar({ result }: StatusBarProps) {
  if (!result) {
    return (
      <div className="px-4 py-2 text-sm text-[var(--text-muted)] border-t border-[var(--border)] bg-[var(--bg-secondary)]">
        Loading...
      </div>
    );
  }

  return (
    <div className="px-4 py-2 text-sm border-t border-[var(--border)] bg-[var(--bg-secondary)] flex items-center gap-4">
      <span className="flex items-center gap-1 text-green-500">
        <Check className="w-4 h-4" />
        {result.timing.toFixed(2)}ms
      </span>
      <span className="text-[var(--text-muted)]">
        {result.inputBytes} bytes → {result.outputBytes} bytes
      </span>
    </div>
  );
}
