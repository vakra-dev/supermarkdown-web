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
        <label className="block text-sm font-medium text-fg-muted uppercase tracking-wider mb-2">
          Heading Style
        </label>
        <div className="space-y-1.5">
          <label className="flex items-center gap-2 text-base text-fg-secondary cursor-pointer">
            <input
              type="radio"
              name="headingStyle"
              checked={!options.headingStyle || options.headingStyle === 'atx'}
              onChange={() => updateOption('headingStyle', 'atx')}
              className="accent-accent-500"
            />
            <span>ATX (# Heading)</span>
          </label>
          <label className="flex items-center gap-2 text-base text-fg-secondary cursor-pointer">
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
        <label className="block text-sm font-medium text-fg-muted uppercase tracking-wider mb-2">
          Link Style
        </label>
        <div className="space-y-1.5">
          <label className="flex items-center gap-2 text-base text-fg-secondary cursor-pointer">
            <input
              type="radio"
              name="linkStyle"
              checked={!options.linkStyle || options.linkStyle === 'inline'}
              onChange={() => updateOption('linkStyle', 'inline')}
              className="accent-accent-500"
            />
            <span>Inline [text](url)</span>
          </label>
          <label className="flex items-center gap-2 text-base text-fg-secondary cursor-pointer">
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
        <label className="block text-sm font-medium text-fg-muted uppercase tracking-wider mb-2">
          Code Fence
        </label>
        <div className="space-y-1.5">
          <label className="flex items-center gap-2 text-base text-fg-secondary cursor-pointer">
            <input
              type="radio"
              name="codeFence"
              checked={!options.codeFence || options.codeFence === '`'}
              onChange={() => updateOption('codeFence', '`')}
              className="accent-accent-500"
            />
            <span>Backtick (```)</span>
          </label>
          <label className="flex items-center gap-2 text-base text-fg-secondary cursor-pointer">
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
        <label className="block text-sm font-medium text-fg-muted uppercase tracking-wider mb-2">
          Bullet Character
        </label>
        <div className="space-y-1.5">
          <label className="flex items-center gap-2 text-base text-fg-secondary cursor-pointer">
            <input
              type="radio"
              name="bulletMarker"
              checked={!options.bulletMarker || options.bulletMarker === '-'}
              onChange={() => updateOption('bulletMarker', '-')}
              className="accent-accent-500"
            />
            <span>Dash (-)</span>
          </label>
          <label className="flex items-center gap-2 text-base text-fg-secondary cursor-pointer">
            <input
              type="radio"
              name="bulletMarker"
              checked={options.bulletMarker === '*'}
              onChange={() => updateOption('bulletMarker', '*')}
              className="accent-accent-500"
            />
            <span>Asterisk (*)</span>
          </label>
          <label className="flex items-center gap-2 text-base text-fg-secondary cursor-pointer">
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
        <label className="block text-sm font-medium text-fg-muted uppercase tracking-wider mb-2">
          Base URL
        </label>
        <input
          type="text"
          value={options.baseUrl || ''}
          onChange={(e) => updateOption('baseUrl', e.target.value || undefined)}
          placeholder="https://example.com"
          className="w-full px-3 py-2 bg-elevated/50 border border-edge rounded text-base text-fg-secondary placeholder:text-fg-faint focus:outline-none focus:border-accent-fg/50"
        />
        <p className="text-sm text-fg-faint mt-1">
          For resolving relative links
        </p>
      </div>

      {/* Exclude Selectors */}
      <div>
        <label className="block text-sm font-medium text-fg-muted uppercase tracking-wider mb-2">
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
          className="w-full px-3 py-2 bg-elevated/50 border border-edge rounded text-base text-fg-secondary placeholder:text-fg-faint focus:outline-none focus:border-accent-fg/50"
        />
        <p className="text-sm text-fg-faint mt-1">
          Comma-separated CSS selectors
        </p>
      </div>

      <button
        onClick={resetDefaults}
        className="w-full px-3 py-2 text-base text-fg-muted hover:text-fg-secondary border border-edge hover:border-edge-hover rounded transition-colors"
      >
        Reset Defaults
      </button>
    </div>
  );
}
