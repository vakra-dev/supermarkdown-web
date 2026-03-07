'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { docsNav, NavItem } from '@/lib/docs-nav';

function NavLink({
  item,
  depth = 0,
  currentHash,
  onHashChange
}: {
  item: NavItem;
  depth?: number;
  currentHash: string;
  onHashChange: (hash: string) => void;
}) {
  const pathname = usePathname();

  // Check if this is a hash link
  const hasHash = item.href.includes('#');
  const [itemPath, itemHash] = hasHash ? item.href.split('#') : [item.href, ''];

  // For hash links: active when path AND hash match
  // For non-hash links: active when path matches exactly
  const pathMatches = pathname === itemPath;
  const isActive = hasHash
    ? pathMatches && currentHash === itemHash
    : pathMatches;

  const handleClick = () => {
    // Update hash state when clicking
    onHashChange(itemHash);
  };

  return (
    <li className="relative">
      <Link
        href={item.href}
        onClick={handleClick}
        className={`block py-1.5 px-3 text-sm rounded-sm transition-colors ${
          depth > 0 ? 'ml-3 text-[13px]' : ''
        } ${
          isActive
            ? 'text-accent-fg bg-elevated/40'
            : 'text-fg-secondary hover:text-fg hover:bg-elevated/30'
        }`}
      >
        {item.title}
      </Link>
      {item.children && (
        <ul className="mt-1 ml-3 pl-3 border-l border-edge">
          {item.children.map((child) => (
            <NavLink key={child.href} item={child} depth={depth + 1} currentHash={currentHash} onHashChange={onHashChange} />
          ))}
        </ul>
      )}
    </li>
  );
}

export function Sidebar() {
  const [currentHash, setCurrentHash] = useState('');

  useEffect(() => {
    // Get initial hash
    setCurrentHash(window.location.hash.slice(1));

    // Listen for hash changes
    const handleHashChange = () => {
      setCurrentHash(window.location.hash.slice(1));
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <aside className="w-56 shrink-0 border-r border-edge/50 bg-surface/30 sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto">
      <nav className="py-6 px-3">
        <div className="text-xs font-medium text-fg-muted uppercase tracking-wider px-3 mb-3">
          Documentation
        </div>
        <ul className="space-y-0.5">
          {docsNav.map((item) => (
            <NavLink key={item.href} item={item} currentHash={currentHash} onHashChange={setCurrentHash} />
          ))}
        </ul>
      </nav>
    </aside>
  );
}
