'use client';

import { useEffect } from 'react';

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    document.body.classList.add('tools-page');
    return () => {
      document.body.classList.remove('tools-page');
    };
  }, []);

  return <>{children}</>;
}
