'use client';

import { useState } from 'react';

interface SplitPaneProps {
  left: React.ReactNode;
  right: React.ReactNode;
  leftLabel: string;
  rightLabel: string;
  rightStatus?: React.ReactNode;
}

export function SplitPane({ left, right, leftLabel, rightLabel, rightStatus }: SplitPaneProps) {
  const [activeTab, setActiveTab] = useState<'input' | 'output'>('input');

  return (
    <div className="border border-edge rounded-md overflow-hidden">
      {/* Mobile tab toggle */}
      <div className="flex md:hidden border-b border-edge">
        <button
          onClick={() => setActiveTab('input')}
          className={`flex-1 px-4 py-2.5 text-sm font-medium transition-colors ${
            activeTab === 'input'
              ? 'text-fg bg-elevated/50'
              : 'text-fg-muted hover:text-fg-secondary'
          }`}
        >
          {leftLabel}
        </button>
        <button
          onClick={() => setActiveTab('output')}
          className={`flex-1 px-4 py-2.5 text-sm font-medium transition-colors relative ${
            activeTab === 'output'
              ? 'text-fg bg-elevated/50'
              : 'text-fg-muted hover:text-fg-secondary'
          }`}
        >
          {rightLabel}
          {/* Output ready indicator - visible only when on input tab */}
          {activeTab === 'input' && rightStatus && (
            <span className="absolute top-2 right-3 w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          )}
        </button>
      </div>

      <div className="flex flex-col md:flex-row min-h-[600px]">
        {/* Left pane */}
        <div className={`flex-1 flex flex-col md:border-r border-edge ${activeTab !== 'input' ? 'hidden md:flex' : 'flex'}`}>
          {/* Desktop header */}
          <div className="hidden md:flex items-center justify-between px-4 py-2 border-b border-edge bg-surface/30">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-edge-hover" />
                <div className="w-2.5 h-2.5 rounded-full bg-edge-hover" />
                <div className="w-2.5 h-2.5 rounded-full bg-edge-hover" />
              </div>
              <span className="text-sm font-medium text-fg-muted uppercase tracking-wider ml-2">
                {leftLabel}
              </span>
            </div>
          </div>
          <div className="flex-1">{left}</div>
        </div>

        {/* Right pane */}
        <div className={`flex-1 flex flex-col ${activeTab !== 'output' ? 'hidden md:flex' : 'flex'}`}>
          {/* Desktop header */}
          <div className="hidden md:flex items-center justify-between px-4 py-2 border-b border-edge bg-surface/30">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-edge-hover" />
                <div className="w-2.5 h-2.5 rounded-full bg-edge-hover" />
                <div className="w-2.5 h-2.5 rounded-full bg-edge-hover" />
              </div>
              <span className="text-sm font-medium text-fg-muted uppercase tracking-wider ml-2">
                {rightLabel}
              </span>
            </div>
            {rightStatus}
          </div>
          <div className="flex-1">{right}</div>
        </div>
      </div>
    </div>
  );
}
