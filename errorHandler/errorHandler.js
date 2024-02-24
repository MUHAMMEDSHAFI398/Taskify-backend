export const errorHandler = (err, req, res, next) => {
    console.error(err);
    
    let statusCode = 500;
    let message = "Internal Server Error";
    
    if (err.statusCode) {
        statusCode = err.statusCode;
    }
    if(err.message) {
        message = err.message
    }
    
    res.status(statusCode).json({ error: message });
};
