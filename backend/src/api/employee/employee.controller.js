const express = require('express')
const { EmploymentService } = require('./employee.service')
const { asyncHandler } = require('../../global/handler')
const route = express.Router()
//service
const service = new EmploymentService()

//#region  create employee  route
route.post('/create', asyncHandler(async (req, res) => {
    const data = await service.createNewEmploy(req.body)
    return res.status(data.statusCode).json(data)
}))
//#endregion

//#region  get sheet data route
route.get('/get', asyncHandler(async (req, res) => {
    const data = await service.getEmployeeList(req.query)
    return res.status(data.statusCode).json(data)
}))
//#endregion


//#region  get employee data for dropdown route
route.get('/drop-down', asyncHandler(async (req, res) => {
    const data = await service.getEmployeeListDropdown(req.query)
    return res.status(data.statusCode).json(data)
}))
//#endregion

// #region softdelete employee info
route.post('/delete/:employee_id', asyncHandler(async (req, res) => {
    const data = await service.deleteEmployee(req.params)
    return res.status(data.statusCode).json(data)
}))
//#endregion

// #region update employee info
route.post('/update/:employee_id', asyncHandler(async (req, res) => {
    const data = await service.updateEmployee(req.params, req.body)
    return res.status(data.statusCode).json(data)
}))
//#endregion





module.exports.employeeRoute = route