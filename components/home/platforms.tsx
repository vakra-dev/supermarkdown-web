'use client';

import { motion } from 'framer-motion';
import { CopyButton } from '@/components/ui/copy-button';

const platforms = [
  {
    name: 'Node.js',
    description: 'Native bindings via NAPI-RS. Full TypeScript support.',
    install: 'npm install @vakra-dev/supermarkdown',
    color: 'text-green-400',
  },
  {
    name: 'Rust',
    description: 'Use directly as a Rust crate in your project.',
    install: 'cargo add supermarkdown',
    color: 'text-orange-400',
  },
  {
    name: 'CLI',
    description: 'Convert files from the command line or via stdin.',
    install: 'cargo install supermarkdown-cli',
    color: 'text-blue-400',
  },
];

export function Platforms() {
  return (
    <section className="py-20 border-t border-neutral-800/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-gradient">
            Available Everywhere
          </h2>
          <p className="text-lg text-neutral-400">
            Pre-built binaries for Windows, macOS, and Linux (x64 & ARM64)
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {platforms.map((platform, index) => (
            <motion.div
              key={platform.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="border border-neutral-800 rounded-md p-6 bg-neutral-900/30 hover:border-neutral-700 transition-colors"
            >
              <h3 className={`text-xl font-semibold mb-2 ${platform.color}`}>
                {platform.name}
              </h3>
              <p className="text-base text-neutral-400 mb-4">
                {platform.description}
              </p>
              <div className="flex items-center gap-2 bg-neutral-900 rounded px-4 py-2.5 border border-neutral-800">
                <code className="text-base font-mono text-neutral-300 flex-1">
                  {platform.install}
                </code>
                <CopyButton text={platform.install} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
