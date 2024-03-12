const { HttpError } = require("./handler");
const jwt = require("jsonwebtoken");
const {Errors}=require("./string")
module.exports.CryptService = class {
    constructor() {
        this.tokenSecret = process.env.WEB_TOKEN_SECRET
    }
    async generateWebToken(
        options,
        expireTime = null,
    ) {
        const otherOptions = {};
        if (expireTime) otherOptions.expiresIn = expireTime;
        const tokenDetails = await jwt.sign(options, this.tokenSecret, otherOptions);
        if (!tokenDetails) throw new HttpError(Errors.errotTokenNotCreated);
        return tokenDetails;
    }
    //#endregion

    //#region  verify token
    async verifyJWTToken(token) {
        try { return await jwt.verify(token, this.tokenSecret); } catch (e) {
             throw new HttpError(Errors.errotTokenNotCreated); }
    }

}