'use client';

import { useState, useEffect, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { SplitPane } from '@/components/tools/SplitPane';
import { CopyAction, DownloadAction } from '@/components/tools/ToolActions';
import { useTheme } from '@/components/theme-provider';
import { readOnlyEditorOptions } from '@/lib/tools/editor-options';
import { Plus, X } from 'lucide-react';

const Editor = dynamic(() => import('@monaco-editor/react'), { ssr: false });

interface ReadmeConfig {
  projectName: string;
  description: string;
  badges: { npm: boolean; license: boolean; build: boolean };
  installation: string;
  usage: string;
  features: string[];
  contributing: boolean;
  license: string;
  authorName: string;
}

function generateReadme(config: ReadmeConfig, template: 'minimal' | 'standard' | 'detailed'): string {
  const lines: string[] = [];

  // Title
  lines.push(`# ${config.projectName || 'Project Name'}`);
  lines.push('');

  // Badges
  const badgeLines: string[] = [];
  if (config.badges.npm) {
    badgeLines.push(`[![npm version](https://img.shields.io/npm/v/${encodeURIComponent(config.projectName)})](https://npmjs.com/package/${encodeURIComponent(config.projectName)})`);
  }
  if (config.badges.license && config.license !== 'none') {
    badgeLines.push(`![License: ${config.license}](https://img.shields.io/badge/License-${encodeURIComponent(config.license)}-blue.svg)`);
  }
  if (config.badges.build) {
    badgeLines.push(`![Build Status](https://img.shields.io/badge/build-passing-brightgreen)`);
  }
  if (badgeLines.length > 0) {
    lines.push(badgeLines.join(' '));
    lines.push('');
  }

  // Description
  if (config.description) {
    lines.push(config.description);
    lines.push('');
  }

  // Features (standard and detailed only)
  if (template !== 'minimal' && config.features.filter(Boolean).length > 0) {
    lines.push('## Features');
    lines.push('');
    config.features.filter(Boolean).forEach(f => lines.push(`- ${f}`));
    lines.push('');
  }

  // Installation
  if (config.installation) {
    lines.push('## Installation');
    lines.push('');
    lines.push('```bash');
    lines.push(config.installation);
    lines.push('```');
    lines.push('');
  }

  // Usage
  if (config.usage) {
    lines.push('## Usage');
    lines.push('');
    lines.push('```javascript');
    lines.push(config.usage);
    lines.push('```');
    lines.push('');
  }

  // Contributing (standard and detailed)
  if (template !== 'minimal' && config.contributing) {
    lines.push('## Contributing');
    lines.push('');
    if (template === 'detailed') {
      lines.push('1. Fork the repository');
      lines.push('2. Create your feature branch (`git checkout -b feature/amazing-feature`)');
      lines.push('3. Commit your changes (`git commit -m \'Add amazing feature\'`)');
      lines.push('4. Push to the branch (`git push origin feature/amazing-feature`)');
      lines.push('5. Open a Pull Request');
    } else {
      lines.push('Contributions are welcome! Please open an issue or submit a pull request.');
    }
    lines.push('');
  }

  // License
  if (config.license !== 'none') {
    lines.push('## License');
    lines.push('');
    lines.push(`This project is licensed under the ${config.license} License${config.authorName ? ` - see the [LICENSE](LICENSE) file for details` : ''}.`);
    lines.push('');
  }

  // Author (detailed only)
  if (template === 'detailed' && config.authorName) {
    lines.push('## Author');
    lines.push('');
    lines.push(`**${config.authorName}**`);
    lines.push('');
  }

  return lines.join('\n');
}

export function ReadmeGenerator() {
  const [config, setConfig] = useState<ReadmeConfig>({
    projectName: 'my-awesome-project',
    description: 'A brief description of what this project does.',
    badges: { npm: false, license: true, build: false },
    installation: 'npm install my-awesome-project',
    usage: 'const myProject = require(\'my-awesome-project\');\n\nmyProject.doSomething();',
    features: ['Easy to use', 'Lightweight', 'TypeScript support'],
    contributing: true,
    license: 'MIT',
    authorName: '',
  });
  const [template, setTemplate] = useState<'minimal' | 'standard' | 'detailed'>('standard');
  const [markdown, setMarkdown] = useState('');
  const { theme } = useTheme();
  const editorTheme = theme === 'dark' ? 'vs-dark' : 'light';

  useEffect(() => {
    setMarkdown(generateReadme(config, template));
  }, [config, template]);

  return (
    <div className="space-y-3">
      {/* Toolbar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* Template selector */}
          <div className="flex items-center border border-edge rounded overflow-hidden">
            {(['minimal', 'standard', 'detailed'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTemplate(t)}
                className={`px-3 py-1.5 text-sm transition-colors capitalize ${
                  template === t ? 'bg-elevated/50 text-fg' : 'text-fg-muted hover:text-fg-secondary'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-1">
          <CopyAction text={markdown} />
          <DownloadAction content={markdown} filename="README.md" mimeType="text/markdown" label="Download .md" />
        </div>
      </div>

      {/* Split pane: form + output */}
      <SplitPane
        leftLabel="Configuration"
        rightLabel="README.md"
        left={
          <div className="h-[600px] overflow-y-auto p-4 space-y-4">
            {/* Project Name */}
            <div>
              <label className="block text-sm font-medium text-fg-secondary mb-1.5">Project Name</label>
              <input
                value={config.projectName}
                onChange={(e) => setConfig({ ...config, projectName: e.target.value })}
                className="w-full px-3 py-2 bg-elevated/50 border border-edge rounded text-fg text-sm outline-none focus:border-accent-500/50"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-fg-secondary mb-1.5">Description</label>
              <textarea
                value={config.description}
                onChange={(e) => setConfig({ ...config, description: e.target.value })}
                rows={2}
                className="w-full px-3 py-2 bg-elevated/50 border border-edge rounded text-fg text-sm outline-none focus:border-accent-500/50 resize-none"
              />
            </div>

            {/* Badges */}
            <div>
              <label className="block text-sm font-medium text-fg-secondary mb-1.5">Badges</label>
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm text-fg-secondary cursor-pointer">
                  <input
                    type="checkbox"
                    checked={config.badges.npm}
                    onChange={(e) => setConfig({ ...config, badges: { ...config.badges, npm: e.target.checked } })}
                    className="rounded border-edge"
                  />
                  npm version badge
                </label>
                <label className="flex items-center gap-2 text-sm text-fg-secondary cursor-pointer">
                  <input
                    type="checkbox"
                    checked={config.badges.license}
                    onChange={(e) => setConfig({ ...config, badges: { ...config.badges, license: e.target.checked } })}
                    className="rounded border-edge"
                  />
                  License badge
                </label>
                <label className="flex items-center gap-2 text-sm text-fg-secondary cursor-pointer">
                  <input
                    type="checkbox"
                    checked={config.badges.build}
                    onChange={(e) => setConfig({ ...config, badges: { ...config.badges, build: e.target.checked } })}
                    className="rounded border-edge"
                  />
                  Build status badge
                </label>
              </div>
            </div>

            {/* Installation */}
            <div>
              <label className="block text-sm font-medium text-fg-secondary mb-1.5">Installation</label>
              <textarea
                value={config.installation}
                onChange={(e) => setConfig({ ...config, installation: e.target.value })}
                rows={2}
                className="w-full px-3 py-2 bg-elevated/50 border border-edge rounded text-fg text-sm outline-none focus:border-accent-500/50 resize-none"
              />
            </div>

            {/* Usage */}
            <div>
              <label className="block text-sm font-medium text-fg-secondary mb-1.5">Usage</label>
              <textarea
                value={config.usage}
                onChange={(e) => setConfig({ ...config, usage: e.target.value })}
                rows={2}
                className="w-full px-3 py-2 bg-elevated/50 border border-edge rounded text-fg text-sm outline-none focus:border-accent-500/50 resize-none"
              />
            </div>

            {/* Features */}
            <div>
              <label className="block text-sm font-medium text-fg-secondary mb-1.5">Features</label>
              <div className="space-y-2">
                {config.features.map((f, i) => (
                  <div key={i} className="flex gap-2">
                    <input
                      value={f}
                      onChange={(e) => {
                        const next = [...config.features];
                        next[i] = e.target.value;
                        setConfig({ ...config, features: next });
                      }}
                      className="flex-1 px-3 py-2 bg-elevated/50 border border-edge rounded text-fg text-sm outline-none focus:border-accent-500/50"
                      placeholder="Feature description"
                    />
                    <button
                      onClick={() => {
                        const next = config.features.filter((_, j) => j !== i);
                        setConfig({ ...config, features: next });
                      }}
                      className="p-2 text-fg-faint hover:text-fg-muted transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => setConfig({ ...config, features: [...config.features, ''] })}
                  className="inline-flex items-center gap-1 text-sm text-accent-fg hover:text-accent-500 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add feature
                </button>
              </div>
            </div>

            {/* Contributing */}
            <div>
              <label className="flex items-center gap-2 text-sm text-fg-secondary cursor-pointer">
                <input
                  type="checkbox"
                  checked={config.contributing}
                  onChange={(e) => setConfig({ ...config, contributing: e.target.checked })}
                  className="rounded border-edge"
                />
                Include contributing section
              </label>
            </div>

            {/* License */}
            <div>
              <label className="block text-sm font-medium text-fg-secondary mb-1.5">License</label>
              <select
                value={config.license}
                onChange={(e) => setConfig({ ...config, license: e.target.value })}
                className="w-full px-3 py-2 bg-elevated/50 border border-edge rounded text-fg text-sm outline-none"
              >
                <option value="MIT">MIT</option>
                <option value="Apache-2.0">Apache 2.0</option>
                <option value="GPL-3.0">GPL 3.0</option>
                <option value="ISC">ISC</option>
                <option value="none">None</option>
              </select>
            </div>

            {/* Author Name */}
            <div>
              <label className="block text-sm font-medium text-fg-secondary mb-1.5">Author Name</label>
              <input
                value={config.authorName}
                onChange={(e) => setConfig({ ...config, authorName: e.target.value })}
                className="w-full px-3 py-2 bg-elevated/50 border border-edge rounded text-fg text-sm outline-none focus:border-accent-500/50"
                placeholder="Optional"
              />
            </div>
          </div>
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
