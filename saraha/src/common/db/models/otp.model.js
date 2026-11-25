import {model,Schema} from 'mongoose'

const otpSchema = new Schema({
    code :{type:String, required:true},
    userId:{type:Schema.Types.ObjectId, ref:"User", required:true},
    expiresAt:{type:Date, index: {expires:0} ,default:Date.now, required:true},
})

export const otp = model ("OTP", otpSchema)