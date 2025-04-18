import { ID } from "appwrite";
import { account } from "./appwrite";

async function auth({ type, email, password }) {
  try {
    switch (type) {
      case "getuser":
        const user = await account.get();
        return user;

      case "login":
        const res = await account.createEmailPasswordSession(email, password);
        return res;

      case "signup":
        const response = await account.create(ID.unique(), email, password);
        return response;

      case "logout":
        await account.deleteSession("current");
        return;

      default:
        throw new Error(type, "is not being handled");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export { auth };