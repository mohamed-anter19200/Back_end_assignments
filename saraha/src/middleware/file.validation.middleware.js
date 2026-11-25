import { fileTypeFromBuffer } from "file-type";
import fs from "fs";
import {AppError} from "../common/error/error.js";

export const fileValidation = async (req, res, next) => {
    try {
        const filePath = req.file.path;
        console.log(req.file);
        const buffer = fs.readFileSync(filePath);
        const type = await fileTypeFromBuffer(buffer);
        const allowedTypes = ["image/png",
            "image/jpeg",
            "image/webp",
            "image/jpg",];
        if (!type || !allowedTypes.includes(type.mime)) {
            fs.unlinkSync(filePath);
            throw new AppError("Invalid file type", 400);
        }

        return next();
    } catch (error) {
        return next(error);
    }
};