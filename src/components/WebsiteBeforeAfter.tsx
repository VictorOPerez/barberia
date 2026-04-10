'use client';

import { useRef } from 'react';

interface WebsiteBeforeAfterProps {
  beforeUrl: string;
  afterUrl: string;
  iframeHeight?: number;
  mobileHeight?: number;
}

export default function WebsiteBeforeAfter({
  beforeUrl,
  afterUrl,
  iframeHeight = 6000,
  mobileHeight = 812,
}: WebsiteBeforeAfterProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Append ?iframe=true to afterUrl if not already present
  const afterSrc = (() => {
    const url = new URL(afterUrl, window.location.origin);
    if (!url.searchParams.has('iframe')) {
      url.searchParams.set('iframe', 'true');
    }
    return url.toString();
  })();

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Before (old website) */}
      <div className="relative">
        <h3 className="bg-black/80 text-white text-center py-2 text-sm font-bold uppercase tracking-widest">
          Before
        </h3>
        <div
          className="relative overflow-hidden mx-auto"
          style={{ width: 390, height: mobileHeight }}
        >
          <iframe
            src={beforeUrl}
            title="Website Before"
            className="absolute top-0 left-0 w-full border-0"
            style={{ height: iframeHeight }}
          />
        </div>
      </div>

      {/* After (new website) */}
      <div className="relative mt-8">
        <h3 className="bg-black/80 text-white text-center py-2 text-sm font-bold uppercase tracking-widest">
          After
        </h3>
        <div
          className="relative overflow-hidden mx-auto"
          style={{ width: 390, height: mobileHeight }}
        >
          <iframe
            src={afterSrc}
            title="Website After"
            className="absolute top-0 left-0 w-full border-0"
            style={{ height: iframeHeight }}
          />
        </div>
      </div>
    </div>
  );
}
