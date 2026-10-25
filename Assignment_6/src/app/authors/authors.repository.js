import { db } from "../../common/db/connection.js";

export async function insertAuthor(data) {
    return await db.collection("authors").insertOne(data);
}