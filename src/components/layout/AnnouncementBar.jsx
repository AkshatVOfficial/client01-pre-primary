import { useState } from 'react';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';
import { useAnnouncement } from '../../hooks/useAnnouncement';

/**
 * Slim dismissible banner for admissions/announcements.
 * Content comes from the admin-managed `announcements` table when Appwrite is
 * configured, otherwise from schoolConfig.announcement (set `show: false` there to hide).
 */
export function AnnouncementBar() {
  const announcement = useAnnouncement();
  const [dismissed, setDismissed] = useState(false);

  if (!announcement || !announcement.text || dismissed) return null;

  const isInternal = announcement.linkTo?.startsWith('/');
  const linkClass =
    'underline decoration-peach decoration-2 underline-offset-2 hover:text-peach';

  return (
    <div className="relative bg-forest text-cream">
      <div className="container-site flex items-center justify-center gap-3 py-2.5 text-center text-xs sm:text-sm">
        <p className="leading-snug">
          <span className="font-semibold">{announcement.text}</span>
          {announcement.linkLabel && announcement.linkTo && (
            <>
              {' '}
              {isInternal ? (
                <Link to={announcement.linkTo} className={linkClass}>
                  {announcement.linkLabel}
                </Link>
              ) : (
                <a href={announcement.linkTo} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  {announcement.linkLabel}
                </a>
              )}
            </>
          )}
        </p>
        <button
          type="button"
          onClick={() => setDismissed(true)}
          aria-label="Dismiss announcement"
          className="absolute right-4 inline-flex rounded-full p-1 text-cream/70 hover:bg-cream/10 hover:text-cream"
        >
          <X size={14} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

export default AnnouncementBar;
