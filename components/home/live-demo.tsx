'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDebouncedCallback } from 'use-debounce';
import { convert, ConvertResult } from '@/lib/wasm';

const defaultHtml = `<h1>Hello</h1>
<p>This is a <strong>test</strong>.</p>`;

export function LiveDemo() {
  const [html, setHtml] = useState(defaultHtml);
  const [result, setResult] = useState<ConvertResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showBeam, setShowBeam] = useState(false);
  const beamKey = useRef(0);

  const doConvert = useDebouncedCallback(async (input: string) => {
    try {
      const res = await convert(input);
      setResult(res);
      // Trigger beam animation
      beamKey.current += 1;
      setShowBeam(true);
      setTimeout(() => setShowBeam(false), 600);
    } catch (error) {
      console.error('Conversion error:', error);
    }
  }, 150);

  useEffect(() => {
    doConvert(html);
    setIsLoading(false);
  }, [html, doConvert]);

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-semibold mb-12 text-center text-fg-secondary"
        >
          Live Demo
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="relative max-w-5xl mx-auto"
        >
          {/* The Interactive Bridge */}
          <div className="grid md:grid-cols-[1fr,100px,1fr] gap-0 items-stretch">
            {/* HTML Input Pane */}
            <div className="relative border border-edge rounded-md overflow-hidden bg-surface/50">
              {/* Status bar */}
              <div className="flex items-center gap-2 px-4 py-2 border-b border-edge bg-surface">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-edge-hover" />
                  <div className="w-3 h-3 rounded-full bg-edge-hover" />
                  <div className="w-3 h-3 rounded-full bg-edge-hover" />
                </div>
                <span className="text-sm font-mono text-fg-muted ml-2">
                  HTML
                </span>
              </div>
              <textarea
                value={html}
                onChange={(e) => setHtml(e.target.value)}
                className="w-full h-52 p-4 bg-transparent font-mono text-base resize-none focus:outline-none text-fg-secondary"
                spellCheck={false}
              />
            </div>

            {/* Beam Connector */}
            <div className="hidden md:flex items-center justify-center relative overflow-hidden">
              {/* Static line */}
              <div className="absolute w-full h-px bg-edge" />

              {/* Animated beam */}
              <AnimatePresence>
                {showBeam && (
                  <motion.div
                    key={beamKey.current}
                    initial={{ x: '-100%' }}
                    animate={{ x: '200%' }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    className="absolute w-16 h-2 flex items-center"
                  >
                    {/* Glowing beam */}
                    <div className="w-full h-1 rounded-full bg-gradient-to-r from-transparent via-amber-400 to-transparent"
                         style={{
                           boxShadow: '0 0 20px #fbbf24, 0 0 40px #fbbf24, 0 0 60px #f59e0b'
                         }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Markdown Output Pane */}
            <div className="relative border border-edge rounded-md overflow-hidden bg-surface/50">
              {/* Status bar */}
              <div className="flex items-center gap-2 px-4 py-2 border-b border-edge bg-surface">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-edge-hover" />
                  <div className="w-3 h-3 rounded-full bg-edge-hover" />
                  <div className="w-3 h-3 rounded-full bg-edge-hover" />
                </div>
                <span className="text-sm font-mono text-fg-muted ml-2">
                  Markdown
                </span>
                {/* Status indicator */}
                <div className="ml-auto flex items-center gap-2">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      isLoading ? 'bg-amber-500 status-pulse' : 'bg-green-500'
                    }`}
                  />
                </div>
              </div>
              <div className="w-full h-52 p-4 font-mono text-base overflow-auto whitespace-pre-wrap text-fg-secondary">
                {isLoading ? (
                  <span className="text-fg-faint">Loading WASM...</span>
                ) : (
                  result?.markdown || ''
                )}
              </div>
            </div>
          </div>

          {/* Timing badge */}
          {result && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-center mt-6"
            >
              <span className="inline-flex items-center gap-2 text-sm font-mono text-fg-muted bg-surface border border-edge rounded-full px-4 py-1.5">
                <span className="w-2 h-2 rounded-full bg-green-500" />
                {result.timing.toFixed(2)}ms
              </span>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
