import { db } from "../../common/db/connection.js";

export async function createCappedLogs() {
    return await db.createCollection("logs", {
        capped: true,
        size: 1024 * 1024
    });
}

export async function insertLog(data) {
    return await db.collection("logs").insertOne(data);
}