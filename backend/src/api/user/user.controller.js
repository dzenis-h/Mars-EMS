const express = require('express')
const { asyncHandler } = require('../../global/handler')
const { UserService } = require('./user.service')
const route = express.Router()

const service = new UserService()

route.post('/createUser', asyncHandler(async (req, res) => {
    const data = await service.createUser(req.body)
    return res.status(data.statusCode).json(data)
}))


module.exports.userRoute = route