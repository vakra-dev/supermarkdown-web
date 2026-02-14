'use client';

import { useState, useEffect } from 'react';

export function MainContent({ children }: { children: React.ReactNode }) {
  const [bannerVisible, setBannerVisible] = useState(false);

  useEffect(() => {
    const checkBanner = () => {
      const bannerDismissed = localStorage.getItem('supermarkdown-top-promo-dismissed');
      setBannerVisible(!bannerDismissed);
    };

    checkBanner();
    window.addEventListener('storage', checkBanner);
    return () => window.removeEventListener('storage', checkBanner);
  }, []);

  return (
    <main
      className="flex-1 transition-all duration-300"
      style={{ paddingTop: bannerVisible ? 'calc(3.5rem + 40px)' : '3.5rem' }}
    >
      {children}
    </main>
  );
}
