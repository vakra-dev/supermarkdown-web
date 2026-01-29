export interface NavItem {
  title: string;
  href: string;
  children?: NavItem[];
}

export const docsNav: NavItem[] = [
  {
    title: 'Getting Started',
    href: '/docs/getting-started',
  },
  {
    title: 'API Reference',
    href: '/docs/api',
    children: [
      { title: 'convert()', href: '/docs/api#convert' },
      { title: 'convertAsync()', href: '/docs/api#convertasync' },
      { title: 'Options', href: '/docs/options' },
    ],
  },
  {
    title: 'Elements',
    href: '/docs/elements',
    children: [
      { title: 'Block Elements', href: '/docs/elements#block-elements' },
      { title: 'Inline Elements', href: '/docs/elements#inline-elements' },
      { title: 'Tables', href: '/docs/elements#tables' },
    ],
  },
  {
    title: 'Edge Cases',
    href: '/docs/edge-cases',
    children: [
      { title: 'Character Escaping', href: '/docs/edge-cases#character-escaping' },
      { title: 'Lists', href: '/docs/edge-cases#lists' },
      { title: 'Code Blocks', href: '/docs/edge-cases#code-blocks' },
      { title: 'Links', href: '/docs/edge-cases#links' },
    ],
  },
  {
    title: 'Rust',
    href: '/docs/rust',
  },
];

export function getPrevNext(currentPath: string) {
  const flatNav = docsNav.flatMap((item) => [item, ...(item.children || [])]);
  const currentIndex = flatNav.findIndex((item) => item.href === currentPath);

  return {
    prev: currentIndex > 0 ? flatNav[currentIndex - 1] : null,
    next: currentIndex < flatNav.length - 1 ? flatNav[currentIndex + 1] : null,
  };
}
