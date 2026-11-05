import { useEffect, useState } from 'react';
import { schoolConfig } from '../config/schoolConfig';
import { features } from '../lib/appwriteConfig';
import { getActiveAnnouncement, isSafeLink } from '../lib/announcements';

const fromConfig = () =>
  schoolConfig.announcement.show
    ? {
        text: schoolConfig.announcement.text,
        linkLabel: schoolConfig.announcement.linkLabel,
        linkTo: schoolConfig.announcement.linkTo,
      }
    : null;

/**
 * Banner content. With Appwrite configured the active announcement row wins
 * (and "none active" hides the bar). If the request fails, or Appwrite is not
 * configured, the banner in schoolConfig.announcement is used instead.
 */
export function useAnnouncement() {
  const [announcement, setAnnouncement] = useState(() => (features.announcements ? null : fromConfig()));

  useEffect(() => {
    if (!features.announcements) return undefined;
    let cancelled = false;
    getActiveAnnouncement()
      .then((row) => {
        if (cancelled) return;
        setAnnouncement(
          row
            ? {
                text: row.text,
                linkLabel: row.linkLabel,
                linkTo: isSafeLink(row.linkTo) ? row.linkTo : '',
              }
            : null,
        );
      })
      .catch(() => {
        if (!cancelled) setAnnouncement(fromConfig());
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return announcement;
}

export default useAnnouncement;
