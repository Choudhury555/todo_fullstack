export default class ErrorHandler extends Error{//this class we are building for sending custmize "statuscode"
    constructor(message,statusCode){
        super(message);//this will call the parent class constructor(original "Error" class in this case)
        this.statusCode = statusCode;
    }
}

export const errorMiddleware = (err, req, res, next) => {
    err.message = err.message || "Internal Server Error";
    err.statusCode = err.statusCode || 500;


    res.status(err.statusCode).json({ success: false, message: err.message });
}