import { databaseID, databases, productCollectionId } from "../appwrite";
async function readProductById(id) {
        try {
            const document= await databases.getDocument(
                databaseID,
                productCollectionId,
                id
            );
            return document;
        } catch (error) {
            console.error(error)
            throw error;
        }
    }

    async function listAllProducts() {
        try {
            const documents= await databases.listDocuments(
                databaseID,
                productCollectionId,
                id
            );
            return documents;
        } catch (error) {
            console.error(error)
            throw error;
        }
    }

    export {readProductById, listAllProducts}