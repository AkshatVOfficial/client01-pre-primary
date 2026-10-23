import { useState } from 'react';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';
import { schoolConfig } from '../../config/schoolConfig';

/**
 * Slim dismissible banner for admissions/announcements.
 * Controlled entirely by schoolConfig.announcement — set `show: false` to disable.
 */
export function AnnouncementBar() {
  const { announcement } = schoolConfig;
  const [dismissed, setDismissed] = useState(false);

  if (!announcement.show || dismissed) return null;

  return (
    <div className="relative bg-forest text-cream">
      <div className="container-site flex items-center justify-center gap-3 py-2.5 text-center text-xs sm:text-sm">
        <p className="leading-snug">
          <span className="font-semibold">{announcement.text}</span>
          {announcement.linkLabel && (
            <>
              {' '}
              <Link
                to={announcement.linkTo}
                className="underline decoration-peach decoration-2 underline-offset-2 hover:text-peach"
              >
                {announcement.linkLabel}
              </Link>
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
