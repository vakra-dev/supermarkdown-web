export function Footer() {
  return (
    <footer className="border-t border-edge/50 pt-12 pb-6 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-12">
          {/* Product */}
          <div>
            <h3 className="text-sm font-semibold text-fg mb-3">Product</h3>
            <ul className="space-y-2 text-sm text-fg-tertiary">
              <li><a href="/" className="hover:text-fg-secondary transition-colors">Home</a></li>
              <li><a href="/docs/getting-started" className="hover:text-fg-secondary transition-colors">Docs</a></li>
              <li><a href="/playground" className="hover:text-fg-secondary transition-colors">Playground</a></li>
              <li><a href="/tools" className="hover:text-fg-secondary transition-colors">Tools</a></li>
            </ul>
          </div>

          {/* Free Tools */}
          <div>
            <h3 className="text-sm font-semibold text-fg mb-3">Free Tools</h3>
            <ul className="space-y-2 text-sm text-fg-tertiary">
              <li><a href="/tools/html-to-markdown" className="hover:text-fg-secondary transition-colors">HTML to Markdown</a></li>
              <li><a href="/tools/markdown-to-html" className="hover:text-fg-secondary transition-colors">Markdown to HTML</a></li>
              <li><a href="/tools/markdown-to-docx" className="hover:text-fg-secondary transition-colors">Markdown to Word</a></li>
              <li><a href="/tools/csv-to-markdown" className="hover:text-fg-secondary transition-colors">CSV to Markdown</a></li>
              <li><a href="/tools/json-to-markdown" className="hover:text-fg-secondary transition-colors">JSON to Markdown</a></li>
              <li><a href="/tools/markdown-editor" className="hover:text-fg-secondary transition-colors">Markdown Editor</a></li>
              <li><a href="/tools/markdown-table" className="hover:text-fg-secondary transition-colors">Markdown Table Generator</a></li>
              <li><a href="/tools/markdown-diff" className="hover:text-fg-secondary transition-colors">Markdown Diff</a></li>
              <li><a href="/tools/markdown-formatter" className="hover:text-fg-secondary transition-colors">Markdown Formatter</a></li>
              <li><a href="/tools/readme-generator" className="hover:text-fg-secondary transition-colors">README Generator</a></li>
            </ul>
          </div>

          {/* Docs */}
          <div>
            <h3 className="text-sm font-semibold text-fg mb-3">Docs</h3>
            <ul className="space-y-2 text-sm text-fg-tertiary">
              <li><a href="/docs/getting-started" className="hover:text-fg-secondary transition-colors">Getting Started</a></li>
              <li><a href="/docs/api" className="hover:text-fg-secondary transition-colors">API Reference</a></li>
              <li><a href="/docs/elements" className="hover:text-fg-secondary transition-colors">Supported Elements</a></li>
              <li><a href="/docs/edge-cases" className="hover:text-fg-secondary transition-colors">Edge Cases</a></li>
              <li><a href="/docs/rust" className="hover:text-fg-secondary transition-colors">Rust Usage</a></li>
            </ul>
          </div>

          {/* Developers */}
          <div>
            <h3 className="text-sm font-semibold text-fg mb-3">Developers</h3>
            <ul className="space-y-2 text-sm text-fg-tertiary">
              <li>
                <a href="https://github.com/vakra-dev/supermarkdown" target="_blank" rel="noopener noreferrer" className="hover:text-fg-secondary transition-colors">
                  GitHub
                </a>
              </li>
              <li>
                <a href="https://www.npmjs.com/package/@vakra-dev/supermarkdown" target="_blank" rel="noopener noreferrer" className="hover:text-fg-secondary transition-colors">
                  npm
                </a>
              </li>
              <li>
                <a href="https://crates.io/crates/supermarkdown" target="_blank" rel="noopener noreferrer" className="hover:text-fg-secondary transition-colors">
                  crates.io
                </a>
              </li>
              <li><span>MIT License</span></li>
            </ul>
          </div>

          {/* Reader */}
          <div>
            <h3 className="text-sm font-semibold text-fg mb-3">Reader</h3>
            <p className="text-sm text-fg-tertiary mb-3">
              Need live webpages as Markdown? Reader turns public webpages into clean Markdown for AI agents, RAG pipelines, and data workflows.
            </p>
            <ul className="space-y-2 text-sm text-fg-tertiary">
              <li>
                <a href="https://reader.dev" target="_blank" rel="noopener noreferrer" className="hover:text-fg-secondary transition-colors">
                  Reader
                </a>
              </li>
              <li>
                <a href="https://reader.dev/scrape" target="_blank" rel="noopener noreferrer" className="hover:text-fg-secondary transition-colors">
                  Scrape API
                </a>
              </li>
              <li>
                <a href="https://reader.dev/crawl" target="_blank" rel="noopener noreferrer" className="hover:text-fg-secondary transition-colors">
                  Crawl API
                </a>
              </li>
              <li>
                <a href="https://reader.dev/extract" target="_blank" rel="noopener noreferrer" className="hover:text-fg-secondary transition-colors">
                  Extract API
                </a>
              </li>
              <li>
                <a href="https://reader.dev/browser" target="_blank" rel="noopener noreferrer" className="hover:text-fg-secondary transition-colors">
                  Browser API
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-edge/50 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-fg-tertiary">
          <div className="flex items-center gap-3">
            <span>MIT License</span>
            <span className="text-edge">·</span>
            <a
              href="https://github.com/vakra-dev/supermarkdown"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-fg-secondary transition-colors"
            >
              GitHub
            </a>
            <span className="text-edge">·</span>
            <a
              href="https://www.npmjs.com/package/@vakra-dev/supermarkdown"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-fg-secondary transition-colors"
            >
              npm
            </a>
            <span className="text-edge">·</span>
            <a
              href="https://crates.io/crates/supermarkdown"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-fg-secondary transition-colors"
            >
              crates.io
            </a>
          </div>
          <div className="text-fg-tertiary">
            Built with{' '}
            <a
              href="https://www.rust-lang.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent-fg/80 hover:text-accent-fg transition-colors"
            >
              Rust
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
