export interface ToolConfig {
  slug: string;
  title: string;
  h1: string;
  description: string;
  category: 'converter' | 'tool';
  priority: 'P0' | 'P1' | 'P2';
  keywords: string[];
  faq: Array<{ question: string; answer: string }>;
  related: string[];
  howTo: Array<{ step: string; detail: string }>;
}

export const tools: ToolConfig[] = [
  {
    slug: 'html-to-markdown',
    title: 'HTML to Markdown Converter - Free Online',
    h1: 'HTML to Markdown Converter',
    description:
      'Free online HTML to Markdown converter powered by Rust WASM. 10x faster than alternatives, runs entirely in your browser. No sign-up required.',
    category: 'converter',
    priority: 'P0',
    keywords: ['html to markdown', 'html to md', 'html markdown converter'],
    faq: [
      {
        question: 'How do I convert HTML to Markdown?',
        answer:
          'Paste your HTML into the left panel and the Markdown output appears instantly on the right. All processing happens in your browser using our Rust WASM engine - nothing is uploaded to any server.',
      },
      {
        question: 'Is my data safe?',
        answer:
          'Yes. All conversion happens locally in your browser. Your HTML never leaves your device.',
      },
      {
        question: 'What HTML elements are supported?',
        answer:
          'Headings, paragraphs, links, images, tables, code blocks, lists, blockquotes, emphasis, strikethrough, and more. Full GitHub Flavored Markdown (GFM) support.',
      },
      {
        question: 'How fast is the conversion?',
        answer:
          'Our Rust WASM engine converts typical web pages in under 1ms - 10-50x faster than JavaScript-based converters.',
      },
    ],
    related: ['markdown-to-html', 'markdown-to-docx', 'csv-to-markdown'],
    howTo: [
      { step: 'Paste or type HTML', detail: 'Enter your HTML in the left editor panel, or upload an .html file.' },
      { step: 'See Markdown instantly', detail: 'The converted Markdown appears in real-time on the right.' },
      { step: 'Copy or download', detail: 'Click Copy to clipboard or Download as .md file.' },
    ],
  },
  {
    slug: 'markdown-to-html',
    title: 'Markdown to HTML Converter - Free Online',
    h1: 'Markdown to HTML Converter',
    description:
      'Free online Markdown to HTML converter with GFM support. Tables, code blocks, task lists, and more. Runs in your browser, no sign-up required.',
    category: 'converter',
    priority: 'P0',
    keywords: ['markdown to html', 'md to html', 'markdown html converter'],
    faq: [
      {
        question: 'How do I convert Markdown to HTML?',
        answer:
          'Paste your Markdown into the left panel and the HTML output appears instantly on the right. Toggle between raw HTML and a rendered preview.',
      },
      {
        question: 'Is my data safe?',
        answer:
          'Yes. All conversion happens locally in your browser. Nothing is uploaded to any server.',
      },
      {
        question: 'What Markdown features are supported?',
        answer:
          'Headings, paragraphs, links, images, GFM tables, fenced code blocks, task lists, blockquotes, emphasis, strikethrough, and more.',
      },
      {
        question: 'Can I copy the generated HTML?',
        answer:
          'Yes. Use the Copy button to copy raw HTML, or switch to preview mode to see the rendered result.',
      },
    ],
    related: ['html-to-markdown', 'markdown-to-docx', 'markdown-editor'],
    howTo: [
      { step: 'Paste or type Markdown', detail: 'Enter your Markdown in the left editor panel.' },
      { step: 'View HTML output', detail: 'Switch between raw HTML code and rendered preview.' },
      { step: 'Copy or download', detail: 'Click Copy to grab the HTML, or Download as .html file.' },
    ],
  },
  {
    slug: 'markdown-to-docx',
    title: 'Markdown to Word Converter - Free Online DOCX Export',
    h1: 'Markdown to Word Converter',
    description:
      'Convert Markdown to Word documents (.docx) instantly. Preserves headings, tables, code blocks, and formatting. Free, no sign-up.',
    category: 'converter',
    priority: 'P0',
    keywords: ['markdown to docx', 'markdown to word', 'md to word', 'markdown word converter'],
    faq: [
      {
        question: 'How do I convert Markdown to Word?',
        answer:
          'Paste or type Markdown in the editor, preview the result, and click Download DOCX. The file is generated in your browser.',
      },
      {
        question: 'Does it preserve formatting?',
        answer:
          'Yes. Headings, lists, tables, code blocks, and emphasis are converted to native Word styles.',
      },
      {
        question: 'Can I open the DOCX in Google Docs?',
        answer:
          'Yes. The generated .docx is compatible with Microsoft Word, Google Docs, and LibreOffice.',
      },
      {
        question: 'Is there a file size limit?',
        answer:
          'No. Processing happens in your browser with no upload limits.',
      },
    ],
    related: ['markdown-to-html', 'html-to-markdown', 'markdown-editor'],
    howTo: [
      { step: 'Write or paste Markdown', detail: 'Enter your Markdown content in the editor.' },
      { step: 'Preview the document', detail: 'See a live preview styled to approximate Word formatting.' },
      { step: 'Download .docx', detail: 'Click Download DOCX to save the Word document.' },
    ],
  },
  {
    slug: 'csv-to-markdown',
    title: 'CSV to Markdown Table Converter - Free Online',
    h1: 'CSV to Markdown Table Converter',
    description:
      'Free CSV to Markdown table converter. Auto-detects delimiters, supports column alignment. Runs in your browser, no sign-up required.',
    category: 'converter',
    priority: 'P1',
    keywords: ['csv to markdown', 'csv to markdown table', 'csv markdown converter'],
    faq: [
      {
        question: 'How do I convert CSV to a Markdown table?',
        answer:
          'Paste your CSV data into the input area. The Markdown table appears instantly on the right.',
      },
      {
        question: 'What delimiters are supported?',
        answer:
          'Comma, tab, semicolon, and pipe delimiters are auto-detected.',
      },
      {
        question: 'Can I set column alignment?',
        answer:
          'Yes. Use the alignment toggles to set left, center, or right alignment per column.',
      },
    ],
    related: ['json-to-markdown', 'markdown-table', 'html-to-markdown'],
    howTo: [
      { step: 'Paste CSV data', detail: 'Paste your CSV content or upload a .csv file.' },
      { step: 'Adjust settings', detail: 'Toggle header row, set column alignment.' },
      { step: 'Copy the table', detail: 'Copy the generated Markdown table to your clipboard.' },
    ],
  },
  {
    slug: 'json-to-markdown',
    title: 'JSON to Markdown Converter - Free Online',
    h1: 'JSON to Markdown Converter',
    description:
      'Free JSON to Markdown converter. Transform arrays into tables, objects into lists, or wrap in code blocks. Runs in your browser.',
    category: 'converter',
    priority: 'P1',
    keywords: ['json to markdown', 'json to markdown table', 'json markdown converter'],
    faq: [
      {
        question: 'How do I convert JSON to Markdown?',
        answer:
          'Paste your JSON into the input area and select a conversion mode: table, key-value list, or code block.',
      },
      {
        question: 'What JSON structures are supported?',
        answer:
          'Arrays of objects become tables. Single objects become key-value lists. Nested JSON is supported.',
      },
      {
        question: 'Can I convert nested JSON?',
        answer:
          'Yes. Nested objects and arrays are flattened into readable Markdown. Deeply nested structures are rendered as indented lists or wrapped in code blocks depending on the output mode.',
      },
    ],
    related: ['csv-to-markdown', 'markdown-table', 'html-to-markdown'],
    howTo: [
      { step: 'Paste JSON', detail: 'Enter your JSON data in the left panel.' },
      { step: 'Choose output mode', detail: 'Select table, key-value list, or code block format.' },
      { step: 'Copy result', detail: 'Copy the generated Markdown to your clipboard.' },
    ],
  },
  {
    slug: 'markdown-editor',
    title: 'Markdown Editor - Free Online',
    h1: 'Markdown Editor',
    description:
      'Free online Markdown editor with live preview. Syntax highlighting, formatting toolbar, and export to .md or HTML. No sign-up required.',
    category: 'tool',
    priority: 'P1',
    keywords: ['markdown editor', 'markdown editor online', 'online markdown editor'],
    faq: [
      {
        question: 'What features does the editor have?',
        answer:
          'Syntax highlighting, live preview, formatting toolbar, and export to .md or HTML.',
      },
      {
        question: 'Is my content saved?',
        answer:
          'Content is stored in your browser only. Nothing is uploaded to any server.',
      },
      {
        question: 'Does the editor support GFM tables?',
        answer:
          'Yes. The editor renders GitHub Flavored Markdown including tables, task lists, strikethrough, and fenced code blocks with syntax highlighting.',
      },
    ],
    related: ['markdown-to-html', 'markdown-table', 'markdown-formatter'],
    howTo: [
      { step: 'Write Markdown', detail: 'Type or paste Markdown in the editor with syntax highlighting.' },
      { step: 'Preview in real-time', detail: 'See the rendered output update live as you type.' },
      { step: 'Export', detail: 'Download as .md, copy Markdown, or copy the generated HTML.' },
    ],
  },
  {
    slug: 'markdown-table',
    title: 'Markdown Table Generator - Free Online',
    h1: 'Markdown Table Generator',
    description:
      'Build Markdown tables visually. Add rows, columns, set alignment, and copy the output. Free, no sign-up.',
    category: 'tool',
    priority: 'P1',
    keywords: ['markdown table', 'markdown table generator', 'markdown table builder'],
    faq: [
      {
        question: 'How do I create a Markdown table?',
        answer:
          'Use the visual grid to add rows and columns, type content into cells, and set alignment. The Markdown output updates live below.',
      },
      {
        question: 'Can I import data from a spreadsheet?',
        answer:
          'Yes. Paste CSV or tab-separated data and it will be converted into the table grid.',
      },
      {
        question: 'How many rows and columns are supported?',
        answer:
          'There is no hard limit. The tool runs in your browser, so performance depends on your device. Tables with hundreds of rows and dozens of columns work on modern hardware.',
      },
    ],
    related: ['csv-to-markdown', 'json-to-markdown', 'markdown-editor'],
    howTo: [
      { step: 'Build visually', detail: 'Add rows and columns, click cells to type content.' },
      { step: 'Set alignment', detail: 'Toggle left, center, or right alignment per column.' },
      { step: 'Copy Markdown', detail: 'Copy the generated Markdown table to your clipboard.' },
    ],
  },
  {
    slug: 'markdown-diff',
    title: 'Markdown Diff Tool - Free Online',
    h1: 'Markdown Diff Tool',
    description:
      'Free Markdown diff tool to compare two documents side by side. Highlights additions, deletions, and modifications in your browser.',
    category: 'tool',
    priority: 'P2',
    keywords: ['markdown diff', 'markdown compare', 'diff markdown'],
    faq: [
      {
        question: 'How does the diff tool work?',
        answer:
          'Paste two Markdown documents and the tool highlights differences - additions in green, deletions in red, and modifications in yellow.',
      },
      {
        question: 'Can I compare large documents?',
        answer:
          'Yes. The diff runs entirely in your browser with no size limits. Performance depends on your device, but documents with thousands of lines work well on modern hardware.',
      },
      {
        question: 'What diff algorithm is used?',
        answer:
          'The tool uses a line-level diff algorithm that identifies inserted, deleted, and changed lines. It groups adjacent changes into hunks for easier reading.',
      },
    ],
    related: ['markdown-editor', 'markdown-formatter', 'html-to-markdown'],
    howTo: [
      { step: 'Paste both documents', detail: 'Enter the original and modified Markdown in the two editors.' },
      { step: 'View differences', detail: 'Additions, deletions, and changes are highlighted automatically.' },
      { step: 'Toggle view', detail: 'Switch between side-by-side and inline diff views.' },
    ],
  },
  {
    slug: 'markdown-formatter',
    title: 'Markdown Formatter - Free Online',
    h1: 'Markdown Formatter',
    description:
      'Free Markdown formatter and beautifier. Normalizes headings, list markers, and spacing for clean, consistent Markdown. Runs in your browser.',
    category: 'tool',
    priority: 'P2',
    keywords: ['markdown formatter', 'markdown beautifier', 'format markdown'],
    faq: [
      {
        question: 'What does the formatter do?',
        answer:
          'It normalizes heading styles, list markers, spacing around blocks, and trims trailing whitespace for consistent, clean Markdown.',
      },
      {
        question: 'Does it change my content?',
        answer:
          'No. The formatter only changes whitespace, heading styles, and list markers. Your actual text content, links, images, and code blocks remain unchanged.',
      },
      {
        question: 'What style does it normalize to?',
        answer:
          'ATX headings (# style), consistent dash list markers, single blank lines between blocks, and no trailing whitespace. This matches common Markdown linter defaults.',
      },
    ],
    related: ['markdown-editor', 'markdown-diff', 'html-to-markdown'],
    howTo: [
      { step: 'Paste Markdown', detail: 'Enter your Markdown in the input editor.' },
      { step: 'Format', detail: 'The formatter normalizes styles, spacing, and list markers.' },
      { step: 'Copy result', detail: 'Copy the cleaned-up Markdown to your clipboard.' },
    ],
  },
  {
    slug: 'readme-generator',
    title: 'README Generator - Free Online',
    h1: 'README Generator',
    description:
      'Free README generator with guided form. Create professional README.md files with project name, installation, usage, and API docs.',
    category: 'tool',
    priority: 'P2',
    keywords: ['readme generator', 'readme template', 'generate readme'],
    faq: [
      {
        question: 'How do I generate a README?',
        answer:
          'Fill in the guided form with your project details - name, description, installation, usage - and the README is generated live.',
      },
      {
        question: 'Can I customize the sections?',
        answer:
          'Yes. Toggle sections on or off, reorder them, and customize the content for each.',
      },
    ],
    related: ['markdown-editor', 'markdown-formatter', 'markdown-to-html'],
    howTo: [
      { step: 'Fill in project details', detail: 'Enter project name, description, badges, and installation steps.' },
      { step: 'Toggle sections', detail: 'Enable or disable API docs, contributing guidelines, license, etc.' },
      { step: 'Copy or download', detail: 'Copy the generated README.md or download it.' },
    ],
  },
];

/** Slugs that have a built component - gates hub page links and static params. */
export const implementedSlugs = new Set([
  'html-to-markdown',
  'markdown-to-html',
  'markdown-to-docx',
  'csv-to-markdown',
  'json-to-markdown',
  'markdown-editor',
  'markdown-table',
  'markdown-diff',
  'markdown-formatter',
  'readme-generator',
]);

export function getToolBySlug(slug: string): ToolConfig | undefined {
  return tools.find((t) => t.slug === slug);
}

export function getRelatedTools(slugs: string[]): ToolConfig[] {
  return slugs.map((s) => tools.find((t) => t.slug === s)).filter(Boolean) as ToolConfig[];
}
