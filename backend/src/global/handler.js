const { HTTP_STATUS_CODE } = require("./constant");
const { SUCCESS } = require("./string");
//custom async handler which catch the thrown error from http
const asyncHandler =
    (fn) => (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch((errorObj) => {
            if (errorObj instanceof HttpError) {
                return res
                    .status(errorObj.statusCode)
                    .json({ error: errorObj.message, statusCode: errorObj.statusCode, valid: false });
            } else {
                console.log(errorObj)
                const message = errorObj?.error ?? "Internal Server Error"
                // Handle other types of errors
                return res
                    .status(HTTP_STATUS_CODE.internal_error)
                    .json({ error: message, statusCode: HTTP_STATUS_CODE.internal_error, valid: false });
            }
        });
    };
//custom error handler 
const HttpError = class extends Error {
    statusCode;
    constructor(
        message,
        statusCode = HTTP_STATUS_CODE.internal_error,
    ) {
        super(message);
        this.statusCode = statusCode ?? HTTP_STATUS_CODE.internal_error;
        this.name = this.constructor.name;
    }
}
//required data function
const requiredFields = (body, options = { optional: [], required: [] }) => {
    const requiredObj = options.required.length > 0 ? options.required : Object.keys(body)
    for (let i = 0; i < requiredObj.length; i++) {
        const key = requiredObj[i]
        const isOptional = (options?.optional ?? []).some(opn => opn == key)
        if (isOptional) continue
        else if (!isOptional && !body[key]) throw new HttpError(`${key}: is required`, HTTP_STATUS_CODE.bad_request)
    }

}
//success response
const successResponse = (message, statusCode = HTTP_STATUS_CODE.success, data = null) => {
    return {
        statusCode: statusCode ?? HTTP_STATUS_CODE.success,
        valid: true,
        message: message ?? SUCCESS.dataFetched,
        data
    }
}

module.exports = { HttpError, requiredFields, asyncHandler, successResponse }