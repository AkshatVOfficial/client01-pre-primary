/**
 * Turns Appwrite SDK errors into short messages that are safe to show.
 * Never shows stack traces or raw server payloads.
 */
export function describeError(error, fallback = 'Something went wrong. Please try again.') {
  if (!error) return fallback;
  const code = error.code;
  const type = error.type || '';

  if (type === 'general_rate_limit_exceeded' || code === 429) {
    return 'Too many attempts. Please wait a minute and try again.';
  }
  if (code === 401 || type === 'user_unauthorized' || type === 'general_unauthorized_scope') {
    return 'You are not authorised to do that. Please sign in again.';
  }
  if (code === 403) return 'Permission denied. Check the table/bucket permissions in Appwrite.';
  if (code === 404) {
    return 'Not found. Check that the table, bucket and IDs in your environment variables exist in Appwrite.';
  }
  if (type === 'user_invalid_credentials') return 'Incorrect email or password.';
  if (type === 'general_query_invalid' || type === 'general_query_limit_exceeded') {
    return 'A query failed. Check that the required indexes exist (see APPWRITE_SETUP.md).';
  }
  if (type === 'storage_file_type_unsupported' || type === 'storage_invalid_file_size') {
    return 'That file type or size is not allowed by the storage bucket settings.';
  }
  if (error.name === 'TypeError' || /network|fetch|failed to fetch/i.test(error.message || '')) {
    return 'Could not reach the server. Check your internet connection and try again.';
  }
  return fallback;
}
