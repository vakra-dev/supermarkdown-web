'use client';

import { ConvertOptions } from '@/lib/wasm';

interface OptionsPanelProps {
  options: ConvertOptions;
  onChange: (options: ConvertOptions) => void;
  onClose: () => void;
}

export function OptionsPanel({ options, onChange }: OptionsPanelProps) {
  const updateOption = <K extends keyof ConvertOptions>(
    key: K,
    value: ConvertOptions[K]
  ) => {
    onChange({ ...options, [key]: value });
  };

  const resetDefaults = () => {
    onChange({});
  };

  return (
    <div className="p-4 space-y-5 overflow-y-auto max-h-[calc(100vh-8rem)]">
      {/* Heading Style */}
      <div>
        <label className="block text-sm font-medium text-neutral-400 uppercase tracking-wider mb-2">
          Heading Style
        </label>
        <div className="space-y-1.5">
          <label className="flex items-center gap-2 text-base text-neutral-300 cursor-pointer">
            <input
              type="radio"
              name="headingStyle"
              checked={!options.headingStyle || options.headingStyle === 'atx'}
              onChange={() => updateOption('headingStyle', 'atx')}
              className="accent-accent-500"
            />
            <span>ATX (# Heading)</span>
          </label>
          <label className="flex items-center gap-2 text-base text-neutral-300 cursor-pointer">
            <input
              type="radio"
              name="headingStyle"
              checked={options.headingStyle === 'setext'}
              onChange={() => updateOption('headingStyle', 'setext')}
              className="accent-accent-500"
            />
            <span>Setext (underline)</span>
          </label>
        </div>
      </div>

      {/* Link Style */}
      <div>
        <label className="block text-sm font-medium text-neutral-400 uppercase tracking-wider mb-2">
          Link Style
        </label>
        <div className="space-y-1.5">
          <label className="flex items-center gap-2 text-base text-neutral-300 cursor-pointer">
            <input
              type="radio"
              name="linkStyle"
              checked={!options.linkStyle || options.linkStyle === 'inline'}
              onChange={() => updateOption('linkStyle', 'inline')}
              className="accent-accent-500"
            />
            <span>Inline [text](url)</span>
          </label>
          <label className="flex items-center gap-2 text-base text-neutral-300 cursor-pointer">
            <input
              type="radio"
              name="linkStyle"
              checked={options.linkStyle === 'referenced'}
              onChange={() => updateOption('linkStyle', 'referenced')}
              className="accent-accent-500"
            />
            <span>Referenced [text][1]</span>
          </label>
        </div>
      </div>

      {/* Code Fence */}
      <div>
        <label className="block text-sm font-medium text-neutral-400 uppercase tracking-wider mb-2">
          Code Fence
        </label>
        <div className="space-y-1.5">
          <label className="flex items-center gap-2 text-base text-neutral-300 cursor-pointer">
            <input
              type="radio"
              name="codeFence"
              checked={!options.codeFence || options.codeFence === '`'}
              onChange={() => updateOption('codeFence', '`')}
              className="accent-accent-500"
            />
            <span>Backtick (```)</span>
          </label>
          <label className="flex items-center gap-2 text-base text-neutral-300 cursor-pointer">
            <input
              type="radio"
              name="codeFence"
              checked={options.codeFence === '~'}
              onChange={() => updateOption('codeFence', '~')}
              className="accent-accent-500"
            />
            <span>Tilde (~~~)</span>
          </label>
        </div>
      </div>

      {/* Bullet Character */}
      <div>
        <label className="block text-sm font-medium text-neutral-400 uppercase tracking-wider mb-2">
          Bullet Character
        </label>
        <div className="space-y-1.5">
          <label className="flex items-center gap-2 text-base text-neutral-300 cursor-pointer">
            <input
              type="radio"
              name="bulletMarker"
              checked={!options.bulletMarker || options.bulletMarker === '-'}
              onChange={() => updateOption('bulletMarker', '-')}
              className="accent-accent-500"
            />
            <span>Dash (-)</span>
          </label>
          <label className="flex items-center gap-2 text-base text-neutral-300 cursor-pointer">
            <input
              type="radio"
              name="bulletMarker"
              checked={options.bulletMarker === '*'}
              onChange={() => updateOption('bulletMarker', '*')}
              className="accent-accent-500"
            />
            <span>Asterisk (*)</span>
          </label>
          <label className="flex items-center gap-2 text-base text-neutral-300 cursor-pointer">
            <input
              type="radio"
              name="bulletMarker"
              checked={options.bulletMarker === '+'}
              onChange={() => updateOption('bulletMarker', '+')}
              className="accent-accent-500"
            />
            <span>Plus (+)</span>
          </label>
        </div>
      </div>

      {/* Base URL */}
      <div>
        <label className="block text-sm font-medium text-neutral-400 uppercase tracking-wider mb-2">
          Base URL
        </label>
        <input
          type="text"
          value={options.baseUrl || ''}
          onChange={(e) => updateOption('baseUrl', e.target.value || undefined)}
          placeholder="https://example.com"
          className="w-full px-3 py-2 bg-neutral-800/50 border border-neutral-700/50 rounded text-base text-neutral-200 placeholder:text-neutral-500 focus:outline-none focus:border-accent-500/50"
        />
        <p className="text-sm text-neutral-500 mt-1">
          For resolving relative links
        </p>
      </div>

      {/* Exclude Selectors */}
      <div>
        <label className="block text-sm font-medium text-neutral-400 uppercase tracking-wider mb-2">
          Exclude Selectors
        </label>
        <input
          type="text"
          value={options.excludeSelectors?.join(', ') || ''}
          onChange={(e) =>
            updateOption(
              'excludeSelectors',
              e.target.value ? e.target.value.split(',').map((s) => s.trim()) : undefined
            )
          }
          placeholder="nav, .sidebar, #ads"
          className="w-full px-3 py-2 bg-neutral-800/50 border border-neutral-700/50 rounded text-base text-neutral-200 placeholder:text-neutral-500 focus:outline-none focus:border-accent-500/50"
        />
        <p className="text-sm text-neutral-500 mt-1">
          Comma-separated CSS selectors
        </p>
      </div>

      <button
        onClick={resetDefaults}
        className="w-full px-3 py-2 text-base text-neutral-400 hover:text-neutral-200 border border-neutral-700/50 hover:border-neutral-600/50 rounded transition-colors"
      >
        Reset Defaults
      </button>
    </div>
  );
}
