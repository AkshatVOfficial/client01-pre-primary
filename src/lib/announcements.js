import { tablesDB, ID, Query } from './appwrite';
import { appwriteConfig, features } from './appwriteConfig';

function assertConfigured() {
  if (!features.announcements) throw new Error('ANNOUNCEMENTS_NOT_CONFIGURED');
}

const ids = () => ({
  databaseId: appwriteConfig.databaseId,
  tableId: appwriteConfig.announcementsTableId,
});

/** Only internal paths ("/contact") or http(s) URLs are allowed as links. */
export function isSafeLink(value) {
  if (!value) return true;
  return /^\/(?!\/)/.test(value) || /^https?:\/\//i.test(value);
}

/** Public: the newest active announcement, or null if none is active. */
export async function getActiveAnnouncement() {
  assertConfigured();
  const result = await tablesDB.listRows({
    ...ids(),
    queries: [Query.equal('isActive', true), Query.orderDesc('$createdAt'), Query.limit(1)],
  });
  return result.rows[0] ?? null;
}

export async function listAnnouncements() {
  assertConfigured();
  const result = await tablesDB.listRows({
    ...ids(),
    queries: [Query.orderDesc('$createdAt'), Query.limit(50)],
  });
  return result.rows;
}

export async function saveAnnouncement(rowId, { text, linkLabel, linkTo, isActive }) {
  assertConfigured();
  const data = {
    text: text.trim(),
    linkLabel: linkLabel.trim(),
    linkTo: linkTo.trim(),
    isActive: Boolean(isActive),
  };
  if (rowId) return tablesDB.updateRow({ ...ids(), rowId, data });
  return tablesDB.createRow({ ...ids(), rowId: ID.unique(), data });
}

export async function setAnnouncementActive(rowId, isActive) {
  assertConfigured();
  return tablesDB.updateRow({ ...ids(), rowId, data: { isActive } });
}

export async function deleteAnnouncement(rowId) {
  assertConfigured();
  return tablesDB.deleteRow({ ...ids(), rowId });
}
