'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Github, ChevronDown, Sun, Moon, Menu, X } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useTheme } from '@/components/theme-provider';

const toolLinks = [
  { label: 'All Tools', href: '/tools' },
  { type: 'separator' as const },
  { label: 'HTML → Markdown', href: '/tools/html-to-markdown' },
  { label: 'Markdown → HTML', href: '/tools/markdown-to-html' },
  { label: 'Markdown → DOCX', href: '/tools/markdown-to-docx' },
  { label: 'CSV → Markdown', href: '/tools/csv-to-markdown' },
  { label: 'JSON → Markdown', href: '/tools/json-to-markdown' },
  { type: 'separator' as const },
  { label: 'Markdown Editor', href: '/tools/markdown-editor' },
  { label: 'Table Generator', href: '/tools/markdown-table' },
  { label: 'Markdown Diff', href: '/tools/markdown-diff' },
  { label: 'Markdown Formatter', href: '/tools/markdown-formatter' },
  { label: 'README Generator', href: '/tools/readme-generator' },
] as const;

export function Header() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const [bannerVisible, setBannerVisible] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const toolsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkBanner = () => {
      const bannerDismissed = localStorage.getItem('supermarkdown-top-promo-dismissed');
      setBannerVisible(!bannerDismissed);
    };

    checkBanner();
    window.addEventListener('storage', checkBanner);
    return () => window.removeEventListener('storage', checkBanner);
  }, []);

  // Close tools dropdown on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (toolsRef.current && !toolsRef.current.contains(e.target as Node)) {
        setToolsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
    setToolsOpen(false);
  }, [pathname]);

  const isActive = (path: string) => {
    if (path === '/docs') return pathname?.startsWith('/docs');
    if (path === '/tools') return pathname?.startsWith('/tools');
    return pathname === path;
  };

  const navLinkClass = (path: string) =>
    `px-3 py-1.5 text-base rounded transition-colors ${
      isActive(path)
        ? 'text-fg bg-elevated/50'
        : 'text-fg-muted hover:text-fg-secondary hover:bg-elevated/30'
    }`;

  return (
    <header
      className="fixed left-0 right-0 z-50 border-b border-edge/50 bg-page/80 backdrop-blur-xl transition-all duration-300"
      style={{ top: bannerVisible ? '40px' : '0' }}
    >
      <div className="container mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-1 font-semibold text-xl group">
          <span className="text-accent-fg transition-colors group-hover:text-accent-500">super</span>
          <span className="text-fg">markdown</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          <Link href="/docs" className={navLinkClass('/docs')}>
            Docs
          </Link>

          <Link href="/playground" className={navLinkClass('/playground')}>
            Playground
          </Link>

          {/* Tools dropdown */}
          <div ref={toolsRef} className="relative">
            <button
              onClick={() => setToolsOpen(!toolsOpen)}
              className={`flex items-center gap-1 px-3 py-1.5 text-base rounded transition-colors ${
                isActive('/tools')
                  ? 'text-fg bg-elevated/50'
                  : 'text-fg-muted hover:text-fg-secondary hover:bg-elevated/30'
              }`}
            >
              Tools
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${toolsOpen ? 'rotate-180' : ''}`} />
            </button>

            {toolsOpen && (
              <div className="absolute right-0 top-full mt-2 w-52 py-1.5 bg-page border border-edge rounded-md shadow-lg">
                {toolLinks.map((item, i) =>
                  'type' in item && item.type === 'separator' ? (
                    <div key={i} className="my-1 border-t border-edge" />
                  ) : 'href' in item ? (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setToolsOpen(false)}
                      className={`block px-4 py-1.5 text-sm transition-colors ${
                        pathname === item.href
                          ? 'text-accent-fg bg-elevated/50'
                          : 'text-fg-secondary hover:text-fg hover:bg-elevated/30'
                      }`}
                    >
                      {item.label}
                    </Link>
                  ) : null
                )}
              </div>
            )}
          </div>

          <div className="w-px h-4 bg-edge mx-2" />

          <button
            onClick={toggleTheme}
            className="p-2 text-fg-muted hover:text-fg-secondary transition-colors"
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          <a
            href="https://github.com/vakra-dev/supermarkdown"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-fg-muted hover:text-fg-secondary transition-colors"
            aria-label="GitHub"
          >
            <Github className="w-5 h-5" />
          </a>
        </nav>

        {/* Mobile nav controls */}
        <div className="flex md:hidden items-center gap-1">
          <button
            onClick={toggleTheme}
            className="p-2 text-fg-muted hover:text-fg-secondary transition-colors"
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 text-fg-muted hover:text-fg-secondary transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-edge/50 bg-page">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-1">
            <Link href="/docs" className={navLinkClass('/docs')}>
              Docs
            </Link>
            <Link href="/playground" className={navLinkClass('/playground')}>
              Playground
            </Link>
            <Link href="/tools" className={navLinkClass('/tools')}>
              Tools
            </Link>
            <div className="my-2 border-t border-edge" />
            <a
              href="https://github.com/vakra-dev/supermarkdown"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-1.5 text-base text-fg-muted hover:text-fg-secondary transition-colors"
            >
              <Github className="w-4 h-4" />
              GitHub
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
