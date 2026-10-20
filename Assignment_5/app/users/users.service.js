import * as usersRepository from "./users.repository.js";

export const signup = async (userData) => {
    let errors = [];
    if (!userData.email || !userData.password || !userData.name) {
        errors.push("All fields are required : { name , email , password }");
    }

    if (userData.password && userData.password.length <= 6) {
        errors.push("Password must be greater than 6 characters");
    }

    if (userData.name && userData.name.length <= 2) {
        errors.push("Name must be greater than 2 characters");
    }

    if (userData.email && !userData.email.includes("@")) {
        errors.push("Email must be a valid email");
    }

    if (userData.email) {
        const existingUser = await usersRepository.findByEmail(
            userData.email
        );

        if (existingUser) {
            errors.push("Email already exists");
        }
    }
    if (errors.length > 0) {
        const error = new Error("Validation error", {
            cause: { status: 400 }
        });
        error.errors = errors;
        throw error;
    }

    return await usersRepository.createUser(userData);
};

export const createOrUpdateUser = async (id, userData) => {
    const userId = Number(id);
    let errors = [];
    if (!Number.isInteger(userId) || userId <= 0) {
        errors.push("Invalid user ID");
    }
    if (userData.email && !userData.email.includes("@")) {
        errors.push(("Email must be a valid email"));
    }
    if (errors.length > 0) {
        const error = new Error("Validation error", {
            cause: { status: 400 }
        });
        error.errors = errors;
        throw error;
    }
    return await usersRepository.createOrUpdateById(
        userId,
        userData
    );
};

export const getUserByEmail = async (email) => {
    if (!email) {
        const error = new Error("Email is required");
        error.statusCode = 400;
        throw error;
    }
    if (!email.includes("@")) {
        const error = new Error("Invalid email address");
        error.statusCode = 400;
        throw error;
    }
    return await usersRepository.findByEmail(email);
};

export const getUserById = async (id) => {
    const userId = Number(id);

    if (!Number.isInteger(userId) || userId <= 0) {
        const error = new Error("Invalid user ID");
        error.statusCode = 400;
        throw error;
    }

    return await usersRepository.findByIdWithoutRole(userId);
};
