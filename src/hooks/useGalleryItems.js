import { useEffect, useState } from 'react';
import { galleryData } from '../data/galleryData';
import { features } from '../lib/appwriteConfig';
import { listPublishedGallery } from '../lib/gallery';

/**
 * Public gallery data.
 *  - Appwrite not configured → static placeholder entries (source: 'static').
 *  - Configured, request succeeds → live photos, possibly an empty list (source: 'appwrite').
 *  - Configured, request fails → static fallback so the page never breaks (source: 'static', failed: true).
 */
export function useGalleryItems() {
  const [state, setState] = useState(() =>
    features.gallery
      ? { status: 'loading', items: [], source: 'appwrite', failed: false }
      : { status: 'ready', items: galleryData, source: 'static', failed: false },
  );

  useEffect(() => {
    if (!features.gallery) return undefined;
    let cancelled = false;
    listPublishedGallery()
      .then((items) => {
        if (!cancelled) setState({ status: 'ready', items, source: 'appwrite', failed: false });
      })
      .catch(() => {
        if (!cancelled) setState({ status: 'ready', items: galleryData, source: 'static', failed: true });
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}

export default useGalleryItems;
