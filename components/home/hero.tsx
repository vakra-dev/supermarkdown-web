'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { CopyButton } from '@/components/ui/copy-button';

export function Hero() {
  const installCommand = 'npm install @vakra-dev/supermarkdown';

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 bg-grid" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-gradient">
            HTML → Markdown
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-xl md:text-2xl text-fg-tertiary mb-10"
        >
          Fast. Simple. Complete.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
        >
          <Link href="/docs">
            <Button size="lg">Get Started</Button>
          </Link>
          <Link href="/playground">
            <Button variant="secondary" size="lg">
              Playground
            </Button>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="inline-flex items-center gap-3 bg-surface border border-edge rounded-md px-4 py-3 hover:border-edge-hover transition-colors"
        >
          <code className="text-base md:text-lg font-mono text-fg-tertiary">
            {installCommand}
          </code>
          <CopyButton text={installCommand} />
        </motion.div>
      </div>
    </section>
  );
}
