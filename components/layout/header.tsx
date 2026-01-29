'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Github } from 'lucide-react';

export function Header() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === '/docs') return pathname?.startsWith('/docs');
    return pathname === path;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-neutral-800/50 bg-neutral-950/80 backdrop-blur-xl">
      <div className="container mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-1 font-semibold text-xl group">
          <span className="text-accent-500 transition-colors group-hover:text-accent-400">super</span>
          <span className="text-neutral-100">markdown</span>
        </Link>

        <nav className="flex items-center gap-1">
          <Link
            href="/docs"
            className={`px-3 py-1.5 text-base rounded transition-colors ${
              isActive('/docs')
                ? 'text-neutral-100 bg-neutral-800/50'
                : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/30'
            }`}
          >
            Docs
          </Link>
          <Link
            href="/playground"
            className={`px-3 py-1.5 text-base rounded transition-colors ${
              isActive('/playground')
                ? 'text-neutral-100 bg-neutral-800/50'
                : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/30'
            }`}
          >
            Playground
          </Link>
          <div className="w-px h-4 bg-neutral-800 mx-2" />
          <a
            href="https://github.com/vakra-dev/supermarkdown"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-neutral-400 hover:text-neutral-200 transition-colors"
            aria-label="GitHub"
          >
            <Github className="w-5 h-5" />
          </a>
        </nav>
      </div>
    </header>
  );
}
