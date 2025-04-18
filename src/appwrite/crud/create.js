import { ID } from "appwrite";
import { databaseID, databases, productCollectionId, productRequestsCollectionId } from "../appwrite";

/**
 * Creates a new product document in the database
 * @param {Object} params - The product parameters
 * @param {string} params.userId - ID of the user creating the product
 * @param {string} params.category - Category of the product
 * @param {string} params.product_name - Name of the product
 * @param {string} params.product_description - Description of the product
 * @param {number} params.price - Price of the product
 * @param {string} params.image1 - Primary image URL of the product
 * @param {string} [params.image2] - Optional second image URL
 * @param {string} [params.image3] - Optional third image URL
 * @param {string} [params.image4] - Optional fourth image URL
 * @returns {Promise<Object>} The created document object
 * @throws {Error} If document creation fails
 */
async function createProduct({
    userId,
    category,
    product_name,
    product_description,
    price,
    image1,
    image2,
    image3,
    image4
}) {
    try {
        const document = await databases.createDocument(
            databaseID,
            productCollectionId,
            ID.unique(),
            {
                userId,
                category,
                product_name,
                product_description,
                price,
                image1,
                image2,
                image3,
                image4
            }
        );
        return document;
    } catch (error) {
        throw error;
    }
}

/**
 * Creates a new purchase request document in the database
 * @param {Object} params - The purchase request parameters
 * @param {string} params.product - ID of the product being requested
 * @param {string} params.to - ID of the seller receiving the request
 * @param {number} params.bid_price - Offered price for the product
 * @param {string} params.name - Name of the buyer
 * @param {string} params.message - Message to the seller
 * @param {string} params.contact_no - Contact number of the buyer
 * @returns {Promise<Object>} The created document object
 * @throws {Error} If document creation fails
 */
async function createPurchaseRequest({product, to , bid_price, name, message, contact_no}) {
    try {
        const document = await databases.createDocument(
            databaseID,
            productRequestsCollectionId,
            ID.unique(),
            {
                product, to, bid_price,name, message, contact_no 
            }
        );
        return document;
    } catch (error) {
        throw error;
    }
}

export {createProduct, createPurchaseRequest}