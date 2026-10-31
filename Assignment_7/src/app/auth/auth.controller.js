import * as authService from './auth.service.js';

export async function createUser(req, res, next) {
    try {
        const newUser = await authService.signUp(req.body);
        return res.status(201).json({
            message:"User created successfully",
            success: true,
            data: newUser
        });

    } catch (err) {
        next(err);
    }
}

export async function loginUser(req, res, next) {
    try{
        const loggedUser = await authService.logIn(req.body);
        return res.status(200).json({
            message:"User logged in successfully",
            success: true,
            data: loggedUser
        })

    }catch(err){
        next(err);
    }
}