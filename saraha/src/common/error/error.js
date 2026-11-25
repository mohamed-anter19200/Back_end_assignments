

export class AppError extends Error {
    constructor(message, statusCode ) {
        super(message);
        this.statusCode = statusCode;
    }
}

export const userNotFound = new AppError("User not found", 404);
export const userAlreadyExist = new  AppError('User already exists', 409);
export const invalidCredentials = new AppError('Invalid credentials', 403);
export const invalidOTP = new AppError('Invalid OTP', 400);
export const OTPExpired = new AppError('Expired code', 400);
export const userNotVerified = new AppError('User not verified', 401);