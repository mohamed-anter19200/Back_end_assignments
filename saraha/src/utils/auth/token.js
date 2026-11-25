import jwt from 'jsonwebtoken';
import {encryption_key} from "../../config/config.js";

export function generateToken(payload){
    return jwt.sign(payload,encryption_key ,  {expiresIn: "1h"});
}