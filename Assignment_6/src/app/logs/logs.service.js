import * as logsRepository from "./logs.repository.js";

export async function createCappedLogs() {
    return await logsRepository.createCappedLogs();
}

export async function insertLog(data) {
    return await logsRepository.insertLog(data);
}