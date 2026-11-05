import { features, missingEnvNames } from '../../lib/appwriteConfig';
import { AdminNotice } from './AdminNotice';

const LABELS = {
  enquiries: 'enquiries',
  gallery: 'gallery',
  announcements: 'announcements',
};

/**
 * Wraps an admin screen. If its Appwrite settings are missing it shows what to
 * configure instead of letting requests fail.
 */
export function ConfigGate({ feature, children }) {
  if (features[feature]) return children;
  return (
    <AdminNotice tone="info" title={`Appwrite is not configured for ${LABELS[feature]} yet`}>
      <p>
        Add these variables to your <code>.env</code> file (and to Vercel), then restart the dev server:
      </p>
      <ul className="mt-2 list-disc pl-5">
        {missingEnvNames().map((name) => (
          <li key={name}>
            <code>{name}</code>
          </li>
        ))}
      </ul>
      <p className="mt-2">Follow APPWRITE_SETUP.md to create the matching resources.</p>
    </AdminNotice>
  );
}

export default ConfigGate;
