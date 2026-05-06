export const sendSuccess = (
    res,
    data = null,
    message = "SUCCESS",
    statusCode = 200
) => {
    return res.status(statusCode).json({
        status : "SUCCESS",
        message,
        data
    });
};