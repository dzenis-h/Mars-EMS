
const axios = require('axios');
const { HttpError } = require('../../global/handler');

// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
module.exports.GoogleAuth = class {
    constructor(
    ) { }

    //#region 
    async getUserTokenInfo(token) {
        try {
            const data = await axios.get(`https://oauth2.googleapis.com/tokeninfo?id_token=${token}`)
            return data?.data
        } catch (error) {
            throw new HttpError(error)
        }
    }
    //#endregion

}