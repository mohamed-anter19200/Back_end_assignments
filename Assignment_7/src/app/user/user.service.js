import * as userRepository from './user.repository.js'
import { createError } from '../../middlewares/customError.js';

export async function updateUser(id, body) {
    const user = await userRepository.findUserById(id);
    if (!user) {createError('User not found', 404);}

    const { password, ...updatedData } = body;
    if (updatedData.email && updatedData.email !== user.email) {

        if (!updatedData.email.includes("@")) {
            createError("Invalid Email", 400);
        }

        const emailExist = await userRepository.findUserByEmail(
            updatedData.email
        );

        if (emailExist) {
            createError("Email already exists", 409);
        }
    }
    const updatedUser = await userRepository.updateUser(
        id,
        updatedData
    );
    return updatedUser;
}

export async function getUserById(id) {
    const user = await userRepository.findUserById(id);
    if (!user) {createError('User not found', 404);}
    return user;
}

export async function deleteUser(id) {
    const user = await userRepository.findUserById(id);
    if (!user) {createError('User not found', 404);}
    await userRepository.deleteUser(id);
    return true;
}