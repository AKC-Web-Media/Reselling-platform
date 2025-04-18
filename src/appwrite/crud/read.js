import {
  databaseID,
  databases,
  productCollectionId,
  productRequestsCollectionId,
} from "../appwrite";
async function readProductById(id) {
  try {
    const document = await databases.getDocument(
      databaseID,
      productCollectionId,
      id
    );
    return document;
  } catch (error) {
    console.error(error);
    throw error;
  }
}


    export {readProductById, listAllProducts}