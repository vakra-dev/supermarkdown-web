'use client';

import { useEffect } from 'react';

export default function PlaygroundLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    document.body.classList.add('playground-page');
    return () => {
      document.body.classList.remove('playground-page');
    };
  }, []);

  return <>{children}</>;
}
