import { useEffect } from 'react';

/**
 * Locks body scroll while `locked` is true — used by the mobile menu
 * and the gallery lightbox so the page behind a modal doesn't scroll.
 */
export function useLockBodyScroll(locked) {
  useEffect(() => {
    if (!locked) return undefined;

    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = overflow;
    };
  }, [locked]);
}

export default useLockBodyScroll;
