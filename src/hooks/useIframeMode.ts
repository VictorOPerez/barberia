'use client';
import { useState, useEffect } from 'react';

export function useIframeMode() {
  const [isIframe, setIsIframe] = useState(false);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get('iframe') === 'true' || window.self !== window.top) {
        setIsIframe(true);
      }
    }
  }, []);
  return isIframe;
}
