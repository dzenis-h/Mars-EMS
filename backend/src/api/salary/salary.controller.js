const express = require("express");
const { SalaryService } = require("../salary/salary.service");
const { asyncHandler } = require("../../global/handler");
const route = express.Router();
//service
const salary = new SalaryService();

route.post("/generate",asyncHandler(async (req, res) => {
    const data = await salary.generateSalary(req.body);
    return res.status(data.statusCode).json(data);
  }));

route.get("/report",asyncHandler(async(req,res)=>{
    const data=await salary.salaryReport(req.body)
    return res.status(data.statusCode).json(data)
}));

route.get("/report_details/",asyncHandler(async(req,res)=>{
    const data=await salary.salaryReportDetails(req.query)
    return res.status(data.statusCode).json(data)
}));


route.get("/employee_salary_details",asyncHandler(async(req,res)=>{
    const data=await salary.employeeSalaryDetail(req.query)
    return res.status(data.statusCode).json(data)
}));

route.post('/confirm_salary',asyncHandler(async(req,res)=>{
    const data=await salary.salaryconfirmation(req.body)
    return res.status(data.statusCode).json(data)
}))


module.exports.salaryRoute = route
