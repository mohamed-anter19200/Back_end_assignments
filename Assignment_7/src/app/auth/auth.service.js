import * as userRepository from '../user/user.repository.js';
import { createError } from '../../middlewares/customError.js';

export async function signUp(body) {

    const errors = [];
    const { email, password, age, phone, name } = body;

    if (!name) errors.push("Name is required");
    if (!email) errors.push("Email is required");
    if (!password) errors.push("Password is required");
    if (!phone) errors.push("Phone is required");

    if (!email.includes("@")) {
        errors.push("Email is not valid");
    }

    if (age === undefined || age === null || age === '') {
        errors.push("Age is required");
    } else if (!Number.isInteger(Number(age))) {
        errors.push("Age must be a valid number");
    } else if (Number(age) < 18 || Number(age) > 60) {
        errors.push("Age must be between 18 and 60");
    }

    if (errors.length > 0) {
        createError("Validation failed", 400, errors);
    }

    const emailExist = await userRepository.findUserByEmail(email);
    if (emailExist) {
        createError("Email already exists", 409);
    }

    const newUser = await userRepository.createUser({
        name,
        email,
        password,
        phone,
        age: Number(age)
    });

    const user = newUser.toObject();
    delete user.password;

    return user;
}


export async function logIn(body) {

    const errors = [];
    const { email, password } = body;

    if (!email) errors.push("Email is required");
    if (!password) errors.push("Password is required");
    if (errors.length > 0) {
        createError("Validation failed", 400, errors);
    }

    const userExist = await userRepository.findUserByEmail(email);
    if (!userExist) {createError("User not found", 401);}
    if (userExist.password !== password) {createError("Invalid password", 401);}
    const user = userExist.toObject();
    delete user.password;

    return user;
}