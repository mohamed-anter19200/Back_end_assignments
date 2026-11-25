import multer, { diskStorage } from "multer";
import { AppError } from "../../error/error.js";

export function multerUpload(fileSize = toBytes(10, "MB")) {
    const allowedTypes = [
        "image/png",
        "image/jpeg",
        "image/webp",
        "image/jpg",
    ];

    return multer({
        storage: diskStorage({
            destination: "uploads",

            filename: (req, file, callback) => {
                const safeName = file.originalname.replace(/\s+/g, "-");

                callback(null, safeName);
            },
        }),

        limits: {
            fileSize,
        },

        fileFilter: (req, file, cb) => {
            if (!allowedTypes.includes(file.mimetype)) {
                return cb(
                    new AppError("Invalid file format", 400)
                );
            }

            cb(null, true);
        },
    });
}



export function uploadFile(fieldName, fileSize) {
    return multerUpload(fileSize).single(fieldName);
}

export function uploadFiles(fieldName, maxCount = 5, fileSize) {
    return multerUpload(fileSize).array(fieldName, maxCount);
}




export function toBytes(size, unit) {
    switch (unit) {
        case "MB":
            return size * 1024 * 1024;

        case "KB":
            return size * 1024;

        case "B":
            return size;

        default:
            throw new Error("Invalid size unit");
    }
}