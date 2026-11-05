import { tablesDB, ID, Query } from './appwrite';
import { appwriteConfig, features } from './appwriteConfig';

export const ENQUIRY_STATUSES = ['pending', 'contacted', 'enrolled', 'rejected'];
export const STATUS_LABELS = {
  pending: 'Pending',
  contacted: 'Contacted',
  enrolled: 'Enrolled',
  rejected: 'Rejected',
};

function assertConfigured() {
  if (!features.enquiries) throw new Error('ENQUIRIES_NOT_CONFIGURED');
}

const ids = () => ({
  databaseId: appwriteConfig.databaseId,
  tableId: appwriteConfig.enquiriesTableId,
});

/** Public: save a new enquiry. Throws on failure — never pretends it worked. */
export async function createEnquiry({ parentName, phone, childAge, program, message }) {
  assertConfigured();
  return tablesDB.createRow({
    ...ids(),
    rowId: ID.unique(),
    data: {
      parentName: parentName.trim(),
      phone: phone.trim(),
      childAge: childAge.trim(),
      program: program.trim(),
      message: message.trim(),
      consent: true,
      status: 'pending',
    },
  });
}

/** Admin: newest first. Search/filter is done client-side (volumes are small). */
export async function listEnquiries(limit = 500) {
  assertConfigured();
  const result = await tablesDB.listRows({
    ...ids(),
    queries: [Query.orderDesc('$createdAt'), Query.limit(limit)],
  });
  return { rows: result.rows, total: result.total };
}

export async function getEnquiry(rowId) {
  assertConfigured();
  return tablesDB.getRow({ ...ids(), rowId });
}

export async function updateEnquiry(rowId, data) {
  assertConfigured();
  return tablesDB.updateRow({ ...ids(), rowId, data });
}

export async function deleteEnquiry(rowId) {
  assertConfigured();
  return tablesDB.deleteRow({ ...ids(), rowId });
}
