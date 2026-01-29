'use client';

import { motion } from 'framer-motion';
import { Table, Settings, FileType, Zap, Code2, Package } from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: 'Blazing Fast',
    description: 'Written in Rust, compiled to WASM. 10-50x faster than JavaScript alternatives.',
  },
  {
    icon: Table,
    title: 'GFM Support',
    description: 'Tables, strikethrough, task lists, and fenced code blocks with full GitHub Flavored Markdown.',
  },
  {
    icon: Settings,
    title: 'Configurable',
    description: 'Heading styles, link formats, code fences, and CSS selector filtering.',
  },
  {
    icon: Code2,
    title: 'TypeScript',
    description: 'Full type definitions included. Autocomplete and type checking out of the box.',
  },
  {
    icon: Package,
    title: 'Zero Dependencies',
    description: 'Lightweight bundle. No bloat, no transitive dependencies to worry about.',
  },
  {
    icon: FileType,
    title: 'Edge Cases',
    description: 'Proper escaping, nested lists, language detection, and special character handling.',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function Features() {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">
            Built for Performance
          </h2>
          <p className="text-lg text-[var(--text-muted)] max-w-xl mx-auto">
            A Rust-powered conversion engine that handles real-world HTML with precision.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={cardVariants}
              className="group relative p-6 border border-neutral-800 rounded-md bg-transparent transition-all duration-300 hover:border-neutral-700 overflow-hidden"
            >
              {/* Amber glow on hover - top left corner */}
              <div className="absolute -top-12 -left-12 w-24 h-24 bg-accent-500/0 rounded-full blur-2xl transition-all duration-500 group-hover:bg-accent-500/20" />

              <div className="relative z-10">
                <feature.icon className="w-6 h-6 text-neutral-400 mb-4 transition-colors duration-300 group-hover:text-accent-500" />
                <h3 className="text-lg font-semibold mb-2 text-neutral-100">{feature.title}</h3>
                <p className="text-base text-neutral-400 leading-relaxed">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
