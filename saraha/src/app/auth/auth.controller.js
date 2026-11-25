import * as authService from './auth.service.js';

export async function registerUser(req, res, next) {
    try {
        const {email , userName , password} = req.body;
        const newUser = await authService.register(email , userName , password);
        res.status(201).json({
            message: 'User registered successfully.',
            success: true,
            data: newUser
        });

    } catch (err) {
        next(err);
    }
}

export async function verifyAccount(req, res, next) {
    try {
        const { email, code} = req.body;
        const newUser = await authService.verifyAccount(email, code);

        res.status(201).json({
            message: 'User Verified successfully.',
            success: true,
            data: newUser
        });

    } catch (err) {
        next(err);
    }
}

export async function sendNewOtp(req, res, next) {
    try{
        const {email} = req.body
        await authService.sendOtp(email)
        res.status(201).json({
            message: 'new otp sent successfully',
            success: true,
        })
    }catch (err){
        next(err);
    }
}

export async function loginUser(req, res, next) {
    try{
        const {email, password} = req.body;
        const token = await authService.login(email, password);
        res.status(201).json({
            message: 'User login successfully.',
            success: true,
            data: token
        })
    }catch(err){
        next(err);
    }
}

export async function loginWithGoogle(req, res, next) {
    try{
        const {idToken} = req.body;
        const token = await authService.loginWithGoogle(idToken);
        res.status(201).json({
            message: 'User login successfully.',
            success: true,
            data: token
        })
    }catch(err){
        next(err);
    }
}