import * as authorsService from "./authors.service.js";

export async function insertAuthor(req, res, next) {
    try {
        const result = await authorsService.insertAuthor(req.body);

        res.status(201).json({
            success: true,
            message: "Author added successfully",
            insertedId: result.insertedId
        });
    } catch (error) {
        next(error);
    }
}