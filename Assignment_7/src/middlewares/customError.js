export const createError = (message, status = 500, errors = []) => {
    const error = new Error(message);

    error.status = status;
    error.errors = errors;

    throw error;
};