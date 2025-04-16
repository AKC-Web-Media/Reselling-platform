import { ID } from "appwrite";
import { account } from "./appwrite";

async function getUser() {
	try {
		const user = await account.get();
		return user;
	} catch (error) {
		console.error(error);
		throw error;
	}
}
async function logout() {
	try {
		await account.deleteSession("current");
	} catch (error) {
		console.error(error);
		throw error;
	}
}
async function login({ email, password }) {
	try {
		const res = await account.createEmailPasswordSession(email, password);
		return res;
	} catch (error) {
		console.error(error);
		throw error;
	}
}
async function signUp({ email, password }) {
	try {
		const response = await account.create(ID.unique(), email, password);
		return response;
	} catch (error) {
		console.error(error);
		throw error;
	}
}

export { signUp, login, getUser, logout };
