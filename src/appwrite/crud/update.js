import {
  databaseID,
  databases,
  productCollectionId,
  productRequestsCollectionId,
} from "../appwrite";
/*
format.
{
    category,
    product_description,
    name,
    product_image_1,
    image_2,
    image_3,
    image_4,
    price
}
    */
async function updateProduct(updatedFormat, productId) {
  try {
    await databases.updateDocument(
      databaseID,
      productCollectionId,
      productId,
      updatedFormat
    );
    return null;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

/*
format.
{
    product
    to
    isRead
    bid_price
    name
    message
    contact_no
}
*/
async function updateProductRequest(updatedFormat, productRequestId) {
  try {
    await databases.updateDocument(
      databaseID,
      productRequestsCollectionId,
      productRequestId,
      updatedFormat
    );
    return null;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
export { updateProduct, updateProductRequest };