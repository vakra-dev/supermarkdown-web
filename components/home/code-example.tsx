'use client';

import { motion } from 'framer-motion';
import { CopyButton } from '@/components/ui/copy-button';

const codeExample = `import { convert } from '@vakra-dev/supermarkdown';

const html = '<h1>Hello</h1><p>World</p>';
const markdown = convert(html);

console.log(markdown);
// # Hello
//
// World`;

export function CodeExample() {
  return (
    <section className="py-24 border-t border-neutral-800/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-gradient">
            Get Started in Seconds
          </h2>
          <p className="text-lg text-neutral-400">
            One import, one function call.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-2xl mx-auto relative group"
        >
          {/* Window chrome */}
          <div className="border border-neutral-800 rounded-md overflow-hidden bg-neutral-900/50 backdrop-blur-sm">
            <div className="flex items-center justify-between px-4 py-2 bg-neutral-900/80 border-b border-neutral-800">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-neutral-700" />
                  <div className="w-2.5 h-2.5 rounded-full bg-neutral-700" />
                  <div className="w-2.5 h-2.5 rounded-full bg-neutral-700" />
                </div>
                <span className="text-sm text-neutral-600 ml-2">example.ts</span>
              </div>
              <CopyButton text={codeExample} />
            </div>
            <pre className="p-5 overflow-x-auto">
              <code className="text-[15px] font-mono leading-relaxed">
                <span className="text-purple-400">import</span>
                {' { '}
                <span className="text-amber-300">convert</span>
                {' } '}
                <span className="text-purple-400">from</span>
                {' '}
                <span className="text-green-400">{`'@vakra-dev/supermarkdown'`}</span>
                <span className="text-neutral-600">;</span>
                {'\n\n'}
                <span className="text-purple-400">const</span>
                {' '}
                <span className="text-blue-300">html</span>
                {' = '}
                <span className="text-green-400">{`'<h1>Hello</h1><p>World</p>'`}</span>
                <span className="text-neutral-600">;</span>
                {'\n'}
                <span className="text-purple-400">const</span>
                {' '}
                <span className="text-blue-300">markdown</span>
                {' = '}
                <span className="text-amber-300">convert</span>
                {'('}
                <span className="text-blue-300">html</span>
                {')'}<span className="text-neutral-600">;</span>
                {'\n\n'}
                <span className="text-blue-300">console</span>
                {'.'}
                <span className="text-amber-300">log</span>
                {'('}
                <span className="text-blue-300">markdown</span>
                {')'}<span className="text-neutral-600">;</span>
                {'\n'}
                <span className="text-neutral-600">{'// # Hello'}</span>
                {'\n'}
                <span className="text-neutral-600">{'// '}</span>
                {'\n'}
                <span className="text-neutral-600">{'// World'}</span>
              </code>
            </pre>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
