import { Account, Client, Databases, Storage } from "appwrite";

const client = new Client()
  .setEndpoint(import.meta.env.VITE_PROJECT_URL) // Your Endpoint
  .setProject(import.meta.env.VITE_PROJECT_ID); // Your project ID

export const databases = new Databases(client);
export const storage = new Storage(client);
export const account = new Account(client);

export const projectID = import.meta.env.VITE_PROJECT_ID;
export const databaseID = import.meta.env.VITE_DATABASE_ID;

export const appwriteAPIKey = import.meta.env.VITE_APPWRITE_API_KEY;

export const productCollectionId = import.meta.env
  .VITE_APPWRITE_PRODUCT_COLLECTION_ID;
export const productRequestsCollectionId = import.meta.env
  .VITE_APPWRITE_PRODUCT_REQUESTS_COLLECTION_ID;
export const bucketId = import.meta.env.VITE_APPWRITE_BUCKET_ID;
