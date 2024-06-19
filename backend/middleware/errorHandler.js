const errorHandler = (err, req, res, next) => {
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = res.message;

    res.status(statusCode).json({
        message,
        stack: process.env.NODE_ENV === 'production' ? "" : err.stack,
    })
}

export default errorHandler;