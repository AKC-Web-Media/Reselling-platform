import {
  databaseID,
  databases,
  productCollectionId,
  productRequestsCollectionId,
} from "../appwrite";

async function deletePurchaseRequestById(id) {
  try {
    await databases.deleteDocument(databaseID, productRequestsCollectionId, id);
    console.log(`Purchase request deleted successfully!`);
    return null
  } catch (e) {
    throw e;
  }
}

async function deleteProductById(id) {
  try {
    await databases.deleteDocument(databaseID, productCollectionId, id);
    console.log(`Purchase request deleted successfully!`);

    return null
  } catch (e) {
    throw e;
  }
}

export {deleteProductById, deletePurchaseRequestById}