'use client';

import { motion } from 'framer-motion';
import { Globe, Bot, FileText, BookOpen } from 'lucide-react';

const useCases = [
  {
    icon: Globe,
    title: 'Web Scraping',
    description: 'Clean scraped HTML by removing nav, ads, sidebars, and cookie banners. Extract just the content you need.',
    code: `convert(html, {
  excludeSelectors: [
    'nav', 'header', 'footer',
    '.sidebar', '.advertisement',
    '.cookie-banner'
  ]
});`,
  },
  {
    icon: Bot,
    title: 'LLM Pipelines',
    description: 'Prepare web content for RAG pipelines and LLM context. Clean, focused text without HTML artifacts.',
    code: `// Extract article for LLM context
const markdown = convert(html, {
  excludeSelectors: ['nav', 'aside'],
  includeSelectors: ['article', 'main']
});`,
  },
  {
    icon: FileText,
    title: 'Blog Processing',
    description: 'Convert blog posts while preserving code blocks, formatting, and language detection.',
    code: `// Code blocks preserve language
// <pre><code class="language-rust">
// → \`\`\`rust`,
  },
  {
    icon: BookOpen,
    title: 'Documentation',
    description: 'Handle tables, definition lists, and nested structures common in technical docs.',
    code: `// Tables with alignment
// <th align="right">Price</th>
// → | Price |
//   | ----: |`,
  },
];

export function UseCases() {
  return (
    <section className="py-24 border-t border-edge/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">
            Built for Real-World Use
          </h2>
          <p className="text-lg text-fg-muted max-w-xl mx-auto">
            From scraping to AI pipelines, supermarkdown handles the messy HTML you encounter in production.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {useCases.map((useCase, index) => (
            <motion.div
              key={useCase.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group border border-edge rounded-md overflow-hidden bg-surface/30 hover:border-edge-hover transition-colors"
            >
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <useCase.icon className="w-6 h-6 text-amber-500" />
                  <h3 className="text-lg font-semibold text-fg">{useCase.title}</h3>
                </div>
                <p className="text-base text-fg-muted leading-relaxed">
                  {useCase.description}
                </p>
              </div>
              <div className="border-t border-edge bg-surface/50 p-4">
                <pre className="text-sm font-mono text-fg-faint overflow-x-auto">
                  <code>{useCase.code}</code>
                </pre>
              </div>
            </motion.div>
          ))}
        </div>

        <p className="text-sm text-fg-muted text-center mt-8 max-w-xl mx-auto">
          Supermarkdown powers Markdown conversion workflows in{' '}
          <a
            href="https://reader.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent-fg hover:text-accent-fg/80 transition-colors"
          >
            Reader
          </a>
          , the web context API for AI agents.
        </p>
      </div>
    </section>
  );
}
