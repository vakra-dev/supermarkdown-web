export function PerformanceBadge({ timeMs, label }: { timeMs: number; label?: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-sm font-mono font-semibold text-green-600 dark:text-green-500">
      <span className="w-2 h-2 rounded-full bg-green-500" />
      {label || 'Converted'} in {timeMs.toFixed(1)}ms
    </span>
  );
}
