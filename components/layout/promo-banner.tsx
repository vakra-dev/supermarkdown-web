'use client';

import { useState, useEffect } from 'react';
import { X, ArrowRight } from 'lucide-react';

export function PromoBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const bannerDismissed = localStorage.getItem('supermarkdown-top-promo-dismissed');
    if (!bannerDismissed) {
      setIsVisible(true);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem('supermarkdown-top-promo-dismissed', 'true');
  };

  if (!isVisible) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] bg-gradient-to-r from-accent-500 to-accent-600 text-white">
      <div className="container mx-auto py-2.5 px-4 flex items-center justify-center relative">
        <div className="flex items-center justify-center gap-2 text-sm font-medium">
          <span>Turn public webpages into LLM-ready Markdown with</span>
          <a
            href="https://reader.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 underline underline-offset-2 hover:opacity-80 transition-opacity font-semibold"
          >
            Reader - Open source & built for AI
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
        <button
          onClick={handleDismiss}
          className="absolute right-4 p-1 hover:bg-white/10 rounded transition-colors"
          aria-label="Dismiss banner"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
