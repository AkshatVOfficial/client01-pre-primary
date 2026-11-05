import { Account, Client, ID, Query, Storage, TablesDB } from 'appwrite';
import { appwriteConfig, hasClientConfig } from './appwriteConfig';

/**
 * Single Appwrite client for the whole app. It is only created when the
 * endpoint and project ID are configured, so the public site keeps working
 * (with static fallbacks) when Appwrite has not been set up yet.
 *
 * Uses the current TablesDB API (databases → tables → rows), not the
 * deprecated Databases collections/documents API.
 */
let client = null;
let account = null;
let tablesDB = null;
let storage = null;

if (hasClientConfig) {
  client = new Client().setEndpoint(appwriteConfig.endpoint).setProject(appwriteConfig.projectId);
  account = new Account(client);
  tablesDB = new TablesDB(client);
  storage = new Storage(client);
}

export { client, account, tablesDB, storage, ID, Query };
