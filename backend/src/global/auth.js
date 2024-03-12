const { User } = require("../models/User.model");
const { HTTP_STATUS_CODE } = require("./constant");
const { CryptService } = require("./crypt.service");
const { HttpError } = require("./handler");
const { Errors } = require("./string");

module.exports.userAuth = async (req, res, next) => {
    const cryptService = new CryptService()
    const headers = req.headers;
    const token = headers?.authorization
    if (!token)
        throw new HttpError(
            Errors.authorizationFailed,
            HTTP_STATUS_CODE.unauthorized,
        );
    const is_verified = await cryptService.verifyJWTToken(token);
    if (!is_verified || !is_verified?.email)
        throw new HttpError(
            Errors.authorizationFailed,
            HTTP_STATUS_CODE.unauthorized,
        );
    const checkUser = await User.findOne({ email: is_verified.email, token });
    if (!checkUser)
        throw new HttpError(
            Errors.authorizationFailed,
            HTTP_STATUS_CODE.unauthorized,
        );
    req.body.userId = checkUser._id;
    req.query.userId = checkUser._id;
    next();
}