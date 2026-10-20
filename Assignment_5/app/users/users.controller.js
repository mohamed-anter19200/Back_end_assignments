
import * as usersService from "./users.service.js";

export const signup = async (req, res, next) => {
    try {
        const user = await usersService.signup(req.body);

        return res.status(201).json({
            message: "User created successfully",
            data: user,
        });
    } catch (error) {
        next(error);
    }
};

export const createOrUpdateUser = async (req, res, next) => {
    try {
        const user = await usersService.createOrUpdateUser(
            req.params.id,
            req.body
        );

        return res.status(200).json({
            message: "User created or updated successfully",
            data: user,
        });
    } catch (error) {
        next(error);
    }
};

export const getUserByEmail = async (req, res, next) => {
    try {
        const user = await usersService.getUserByEmail(
            req.query.email
        );

        if (!user) {
            const error = new Error("User not found");
            error.statusCode = 404;
            throw error;
        }

        return res.status(200).json({ data: user });
    } catch (error) {
        next(error);
    }
};

export const getUserById = async (req, res, next) => {
    try {
        const user = await usersService.getUserById(req.params.id);

        if (!user) {
            const error = new Error("User not found");
            error.statusCode = 404;
            throw error;
        }

        return res.status(200).json({ data: user });
    } catch (error) {
        next(error);
    }
};
