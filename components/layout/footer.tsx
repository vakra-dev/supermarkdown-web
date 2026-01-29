export function Footer() {
  return (
    <footer className="border-t border-neutral-800/50 py-6 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-base text-neutral-300">
          <div className="flex items-center gap-3">
            <span>MIT License</span>
            <span className="text-neutral-700">·</span>
            <a
              href="https://github.com/vakra-dev/supermarkdown"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-neutral-300 transition-colors"
            >
              GitHub
            </a>
            <span className="text-neutral-700">·</span>
            <a
              href="https://www.npmjs.com/package/@vakra-dev/supermarkdown"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-neutral-300 transition-colors"
            >
              npm
            </a>
            <span className="text-neutral-700">·</span>
            <a
              href="https://crates.io/crates/supermarkdown"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-neutral-300 transition-colors"
            >
              crates.io
            </a>
          </div>
          <div className="text-neutral-300">
            Built with{' '}
            <a
              href="https://www.rust-lang.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent-500/80 hover:text-accent-400 transition-colors"
            >
              Rust
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
