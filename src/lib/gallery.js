import { storage, tablesDB, ID, Query } from './appwrite';
import { appwriteConfig, features } from './appwriteConfig';

export const MAX_UPLOAD_BYTES = 5 * 1024 * 1024; // must match the bucket's max file size
export const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_DIMENSION = 1800;

function assertConfigured() {
  if (!features.gallery) throw new Error('GALLERY_NOT_CONFIGURED');
}

const ids = () => ({
  databaseId: appwriteConfig.databaseId,
  tableId: appwriteConfig.galleryTableId,
});

/** Public URL of the original file (served by Appwrite storage "view"). */
export function galleryImageUrl(fileId) {
  return storage.getFileView({ bucketId: appwriteConfig.galleryBucketId, fileId });
}

/** Maps a table row to the shape the existing gallery components expect. */
export function toGalleryItem(row) {
  return {
    id: row.$id,
    src: galleryImageUrl(row.fileId),
    alt: row.altText,
    caption: row.caption,
    category: row.category,
  };
}

/** Public: published photos in display order. */
export async function listPublishedGallery() {
  assertConfigured();
  const result = await tablesDB.listRows({
    ...ids(),
    queries: [Query.equal('isPublished', true), Query.orderAsc('displayOrder'), Query.limit(100)],
  });
  return result.rows.map(toGalleryItem);
}

/** Admin: every row including unpublished, in display order. */
export async function listAllGalleryRows() {
  assertConfigured();
  const result = await tablesDB.listRows({
    ...ids(),
    queries: [Query.orderAsc('displayOrder'), Query.limit(200)],
  });
  return result.rows;
}

/**
 * Resizes large photos in the browser (max 1800px, JPEG) so uploads stay small
 * and the public gallery loads fast. Falls back to the original file on failure.
 */
export async function compressImage(file) {
  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, MAX_DIMENSION / Math.max(bitmap.width, bitmap.height));
    if (scale === 1 && file.size <= 1.5 * 1024 * 1024) return file;
    const canvas = document.createElement('canvas');
    canvas.width = Math.round(bitmap.width * scale);
    canvas.height = Math.round(bitmap.height * scale);
    const context = canvas.getContext('2d');
    context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    bitmap.close?.();
    const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/jpeg', 0.85));
    if (!blob || blob.size >= file.size) return file;
    const name = file.name.replace(/\.[^.]+$/, '') + '.jpg';
    return new File([blob], name, { type: 'image/jpeg' });
  } catch {
    return file;
  }
}

/**
 * Upload flow: 1) store the file in the bucket, 2) save its metadata row.
 * If step 2 fails the uploaded file is removed again so nothing is orphaned.
 */
export async function uploadGalleryImage({ file, caption, altText, category, displayOrder, isPublished }) {
  assertConfigured();
  const prepared = await compressImage(file);
  if (prepared.size > MAX_UPLOAD_BYTES) throw new Error('FILE_TOO_LARGE');

  const stored = await storage.createFile({
    bucketId: appwriteConfig.galleryBucketId,
    fileId: ID.unique(),
    file: prepared,
  });

  try {
    return await tablesDB.createRow({
      ...ids(),
      rowId: ID.unique(),
      data: {
        fileId: stored.$id,
        caption: caption.trim(),
        altText: altText.trim(),
        category,
        displayOrder,
        isPublished: Boolean(isPublished),
      },
    });
  } catch (error) {
    try {
      await storage.deleteFile({ bucketId: appwriteConfig.galleryBucketId, fileId: stored.$id });
    } catch {
      /* ignore: surfaced below via the original error */
    }
    throw error;
  }
}

export async function updateGalleryRow(rowId, data) {
  assertConfigured();
  return tablesDB.updateRow({ ...ids(), rowId, data });
}

/**
 * Deletes the metadata row first, then the file. Returns { fileDeleted } so the
 * UI can warn if the row went but the file could not be removed.
 */
export async function deleteGalleryItem(row) {
  assertConfigured();
  await tablesDB.deleteRow({ ...ids(), rowId: row.$id });
  try {
    await storage.deleteFile({ bucketId: appwriteConfig.galleryBucketId, fileId: row.fileId });
    return { fileDeleted: true };
  } catch {
    return { fileDeleted: false };
  }
}
