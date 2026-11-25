// function
// 2 params ==> req.body , contract ( DTO) >> fit contract >>> continue
/// if not fit throw error

import {z} from "zod";
import {AppError} from "../common/error/error.js";

export function validationMiddleware(dto) {
    return (req, res, next) => {

       const { success, data, error}= z.safeParse(dto, req.body)
        if (!success) {
            const messageErrors = error.issues.map((issue) =>
                `${issue.path[0]}: ${issue.message}`
            );
            console.log(messageErrors);
            throw new AppError(`Validation failed:  ${messageErrors}`,400);
        }
        req.body = data
        next()
    }
}