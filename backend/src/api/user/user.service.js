const { USER_STATUS, HTTP_STATUS_CODE } = require("../../global/constant")
const { CryptService } = require("../../global/crypt.service")
const { requiredFields, HttpError, successResponse } = require("../../global/handler")
const { Errors, SUCCESS } = require("../../global/string")
const { User } = require("../../models/User.model")
const { GoogleAuth } = require("../thirdparty/google.auth")


module.exports.UserService = class {
    constructor() {
        this.googleService = new GoogleAuth()
        this.cryptService = new CryptService()
    }

    //#region  async create user
    async createUser(body) {
        requiredFields(body, { required: ['token'] })
        const getUserData = await this.googleService.getUserTokenInfo(body.token)
        getUserData.email = getUserData.email.toLowerCase()
        let user = await User.findOne({
            email: getUserData.email,
            is_active: USER_STATUS.ACTIVE
        })
        if (!user) {
            const payload = {
                email: getUserData.email.toLowerCase(),
                first_name: getUserData.given_name,
                last_name: getUserData.family_name,
            }
            payload.token = await this.cryptService.generateWebToken(payload)
            //create new user
            user = await new User(payload).save()
        }
        return successResponse(SUCCESS.userCreate, HTTP_STATUS_CODE.create_success, user)
    }
    //#endregion
}