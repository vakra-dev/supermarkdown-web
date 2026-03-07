export function Footer() {
  return (
    <footer className="border-t border-edge/50 py-6 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-base text-fg-tertiary">
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
