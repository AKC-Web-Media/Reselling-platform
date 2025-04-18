import { projectID, storage, bucketId } from "../appwrite";
import { ID } from "appwrite";

async function uploadImage(image) {
    try {
        const { $id } = await storage.createFile(
            bucketId,
            ID.unique(),
            image
        );

        const fileUrl = `https://cloud.appwrite.io/v1/storage/buckets/${bucketId}/files/${$id}/view?project=${projectID}&mode=admin`;

        return fileUrl;
    }
    catch (error) {
        throw error;
    }
}

export {uploadImage}