import crypto from 'crypto'
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import {encryption_key} from "../../config/config.js";

export function generateOTP(){
    return crypto.randomInt(100_000,999_999)
}

export async function hashPassword(password){
    return bcrypt.hash(password, 12)
}

export async function comparePassword(password1,password2 ){
    return bcrypt.compare(password1,password2)
}



export function generateToken(payload){
    return jwt.sign(payload, encryption_key ,  {expiresIn: "1h"});
}
