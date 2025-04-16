import { Account, Client, Databases, Storage } from "appwrite";

const client = new Client()
	.setEndpoint(process.env.REACT_APP_PROJECT_URL) // Your Endpoint
	.setProject(process.env.REACT_APP_PROJECT_ID); // Your project ID

export const databases = new Databases(client);
export const storage = new Storage(client);
export const account = new Account(client);



export const projectID = process.env.REACT_APP_PROJECT_ID;
export const databaseID = process.env.REACT_APP_DATABASE_ID;

export const appwriteAPIKey = process.env.REACT_APP_APPWRITE_API_KEY;
