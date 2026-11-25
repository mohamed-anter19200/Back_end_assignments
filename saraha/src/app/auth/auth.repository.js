import {otp} from "../../common/db/models/otp.model.js";
export async function createOtp(code , userId, expiresAt) {
    return await otp.create({
        code: code,
        userId: userId,
        expiresAt: expiresAt
    })
}

export async function findOtpByUserId(userId){
   return await otp.findOne({userId})
}

export async function deleteOtp(userId){
    return await otp.deleteOne({userId})
}

export async function deleteAllOtp(userId){
    return await otp.deleteMany({userId})
}