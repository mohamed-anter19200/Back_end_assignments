import * as logsService from "./logs.service.js";

export async function createCappedLogs(req, res, next) {
    try {
        await logsService.createCappedLogs();

        res.status(201).json({
            success: true,
            message: "Capped logs collection created successfully"
        });
    } catch (error) {
        next(error);
    }
}

export async function insertLog(req, res, next) {
    try {
        const result = await logsService.insertLog(req.body);

        res.status(201).json({
            success: true,
            message: "Log inserted successfully",
            insertedId: result.insertedId
        });
    } catch (error) {
        next(error);
    }
}