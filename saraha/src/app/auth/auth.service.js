
import * as userRepository from '../user/user.repository.js';
import * as authRepository from "./auth.repository.js";
import * as cache from "../../common/services/cache/redis.js";
import { sendEmail } from "../../common/services/email/nodemailer.js";
import { comparePassword, generateOTP, hashPassword } from "../../utils/auth/auth.js";
import { toMS, toSeconds } from "../../utils/time.js";
import { verifyIdToken } from "../../common/services/auth/google/google-auth.js";
import { generateToken } from "../../utils/auth/auth.js";
import { userNotFound, userAlreadyExist, OTPExpired, invalidOTP, invalidCredentials, userNotVerified } from "../../common/error/error.js";

export async function register(email, userName, password) {
    const user = await userRepository.findUserByEmail(email);

    if (user) {
        throw userAlreadyExist;
    }

    const hashedPassword = await hashPassword(password);

    let createdUser = await userRepository.createUser({
        email,
        password: hashedPassword,
        userName
    });

    const otp = generateOTP();

    await cache.set(`otp:${email}`, otp, toSeconds(15, 'm'));

    await sendEmail(email, "Verify your account", `<h3>Your code to verify your account is ${otp}</h3>`);

    delete createdUser.password;
    createdUser.password = undefined;

    return createdUser;
}

export async function verifyAccount(email, code) {
    const user = await userRepository.findUserByEmail(email);

    if (!user) {
        throw userNotFound;
    }

    const cachedCode = await cache.get(`otp:${email}`);

    if (!cachedCode) {
        throw OTPExpired;
    }

    if (cachedCode !== code) {
        throw invalidOTP;
    }

    await userRepository.updateUser(user._id, { isVerified: true });

    await cache.del(`otp:${email}`);
}

export async function sendOtp(email) {
    const user = await userRepository.findUserByEmail(email);

    if (!user) {
        throw userNotFound;
    }

    await cache.del(`otp : ${email}`);

    const otp = generateOTP();

    await cache.set(`otp:${email}`, otp, toSeconds(15, 'm'));

    await sendEmail(email, "new otp", `<h3>Your new otp is ${otp}</h3>`);
}

export async function login(email, password) {
    const user = await userRepository.findUserByEmail(email);

    console.log(user);

    if (!user) {
        throw userNotFound;
    }

    if (user.isVerified === false) {
        throw userNotVerified;
    }

    const match = await comparePassword(password, user.password);

    if (!match) {
        throw invalidCredentials;
    }

    const payload = {
        name: user.userName,
        email: user.email,
        id: user._id
    };

    return generateToken(payload);
}

export async function loginWithGoogle(idToken) {
    const payload = await verifyIdToken(idToken);

    const user = await userRepository.findUserByEmail(payload.email);

    if (user) {
        return generateToken({ email: createdUser.email, sub: createdUser._id });
    }

    const createdUser = await userRepository.createUser({
        email: payload.email,
        userName: payload.name,
        provider: 'google',
        isVerified: true,
        profilePicPath: payload.picture,
    });

    return generateToken({ email: createdUser.email, sub: createdUser._id });
}
