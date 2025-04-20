import { Query } from "appwrite";
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

async function listAllProducts() {
  try {
    const documents = await databases.listDocuments(
      databaseID,
      productCollectionId
    );
    return documents;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function readProductRequestById(id) {
  try {
    const document = await databases.getDocument(
      databaseID,
      productRequestsCollectionId,
      id
    );
    return document;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function listProductRequests() {
  try {
    const documents = await databases.listDocuments(
      databaseID,
      productRequestsCollectionId
    );
    return documents;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
async function listProductsByCategory(category) {
  try {
    const documents = await databases.listDocuments(
      databaseID,
      productCollectionId,
      [
        // Appwrite Query to filter by category
        Query.equal("category", category),
      ]
    );
    return documents;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function listProductsByPriceRange(minPrice, maxPrice) {
  try {
    const documents = await databases.listDocuments(
      databaseID,
      productCollectionId,
      [
        Query.greaterThanEqual("price", minPrice),
        Query.lessThanEqual("price", maxPrice),
      ]
    );
    return documents;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
