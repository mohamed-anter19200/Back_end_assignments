export const globalError = (err, req, res, next) => {
    return res.status(err.cause?.status || 500).json({
        message: err.message || "Internal server error",
        errors: err.errors
    });
};