import { ID } from "appwrite";
import { databaseID, databases, productCollectionId } from "../appwrite";

// image2, image3, image4 are optional
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
export {createProduct}