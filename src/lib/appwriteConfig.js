/**
 * Reads Appwrite settings from Vite environment variables.
 * Nothing here is secret — these are public identifiers. No API keys belong
 * in frontend code. Nothing is hardcoded: set the values in `.env` / Vercel.
 */
const env = import.meta.env;

const clean = (value) => (typeof value === 'string' ? value.trim() : '');

export const appwriteConfig = {
  endpoint: clean(env.VITE_APPWRITE_ENDPOINT),
  projectId: clean(env.VITE_APPWRITE_PROJECT_ID),
  databaseId: clean(env.VITE_APPWRITE_DATABASE_ID),
  enquiriesTableId: clean(env.VITE_APPWRITE_ENQUIRIES_TABLE_ID),
  galleryTableId: clean(env.VITE_APPWRITE_GALLERY_TABLE_ID),
  announcementsTableId: clean(env.VITE_APPWRITE_ANNOUNCEMENTS_TABLE_ID),
  galleryBucketId: clean(env.VITE_APPWRITE_GALLERY_BUCKET_ID),
};

/** Endpoint + project are enough to talk to Appwrite (e.g. sign in). */
export const hasClientConfig = Boolean(appwriteConfig.endpoint && appwriteConfig.projectId);

/** Per-feature flags, so one missing ID only disables that feature. */
export const features = {
  auth: hasClientConfig,
  enquiries: hasClientConfig && Boolean(appwriteConfig.databaseId && appwriteConfig.enquiriesTableId),
  gallery:
    hasClientConfig &&
    Boolean(appwriteConfig.databaseId && appwriteConfig.galleryTableId && appwriteConfig.galleryBucketId),
  announcements:
    hasClientConfig && Boolean(appwriteConfig.databaseId && appwriteConfig.announcementsTableId),
};

/** Names of env variables that are still empty (used in admin warnings). */
export function missingEnvNames() {
  const map = {
    VITE_APPWRITE_ENDPOINT: appwriteConfig.endpoint,
    VITE_APPWRITE_PROJECT_ID: appwriteConfig.projectId,
    VITE_APPWRITE_DATABASE_ID: appwriteConfig.databaseId,
    VITE_APPWRITE_ENQUIRIES_TABLE_ID: appwriteConfig.enquiriesTableId,
    VITE_APPWRITE_GALLERY_TABLE_ID: appwriteConfig.galleryTableId,
    VITE_APPWRITE_ANNOUNCEMENTS_TABLE_ID: appwriteConfig.announcementsTableId,
    VITE_APPWRITE_GALLERY_BUCKET_ID: appwriteConfig.galleryBucketId,
  };
  return Object.entries(map)
    .filter(([, value]) => !value)
    .map(([name]) => name);
}
