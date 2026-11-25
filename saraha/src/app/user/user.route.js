import {Router} from "express";
import {toBytes, uploadFile} from "../../common/services/multer/multer.js";
import {fileValidation} from "../../middleware/file.validation.middleware.js";

export const userRouter = Router()

userRouter.post(
    "/upload-profile-pic",
    uploadFile("pp", toBytes(10, "MB")),
    fileValidation,
    (req, res, next) => {
        console.log(req.file);
        res.send("success");
    }
);
