import {z} from 'zod'

export const registerDTO = z.object({
    email: z.email().trim().toLowerCase() ,
    password: z.string().min(8),
    userName:z.string().trim().min(2).max(30),
    profilePicPath:z.string().optional(),
})

export const verifyAccountDTO = z.object({
    email: z.email().trim().toLowerCase() ,
    code: z.string().length(6),
})

export const sendOtpDTO = z.object({
    email: z.email().trim().toLowerCase() ,
})

export const loginDTO = z.object({
    email: z.email().trim().toLowerCase() ,
    password: z.string().min(8).max(20),
})

export const googleLoginDTO = z.object({
    idToken: z.string(),
})