const {
    parseDate,
    HTTP_STATUS_CODE,
    EMP_STATUS,
    USER_STATUS
} = require("../../global/constant");
const {
    HttpError,
    requiredFields,
    successResponse,
} = require("../../global/handler");
const { Errors, SUCCESS } = require("../../global/string");
const { Employee } = require("../../models/Employ.model");

module.exports.EmploymentService = class {
    constructor() { }

    //#region  create new employee
    async createNewEmploy(body) {
        //check validation
        requiredFields(body, {
            required: ['first_name',
                'last_name',
                'gender',
                'position',
                'dob',
                'salary',
                'employeeJMBG']
        })
        body.dob = parseDate(body.dob)
        body.start_date = parseDate(body.start_date)
        body.employeeJMBG = body.employeeJMBG.toLowerCase()
        body.gender = body.gender.toLowerCase()
        const checkEmp = await Employee.findOne({ employeeJMBG: body.employeeJMBG }).select(['_id'])
        if (checkEmp) throw new HttpError(Errors.recordExists, HTTP_STATUS_CODE.bad_request)
        //create new employee
        const newEmp = await Employee(body).save()
        return successResponse(SUCCESS.empCreated, HTTP_STATUS_CODE.create_success, newEmp)
    }
    //#endregion

    //#region get employee list
    async getEmployeeList(body) {
        const list = await Employee.find({ is_active: USER_STATUS.ACTIVE }).select([
            '_id',
            'first_name',
            "last_name",
            'employeeJMBG',
            'dob',
            'gender',
            'start_date',
            'end_date',
            'position',
            'salary',
            'is_released'])

        return successResponse(SUCCESS.dataFetched, HTTP_STATUS_CODE.success, list)
    }
    //#endregion

    //#region get employee list
    async getEmployeeListDropdown(body) {
        const list = await Employee.find({ is_active: USER_STATUS.ACTIVE }).select([
            '_id',
            'full_name'])
        return successResponse(SUCCESS.dataFetched, HTTP_STATUS_CODE.success, list)
    }
    //#endregion

    // #region soft delete employee
    async deleteEmployee(body) {
        requiredFields(body, {
            required: ["employee_id"]
        })
        await Employee.updateOne({ _id: body.employee_id },
            { is_released: EMP_STATUS.RELEASED, end_date: new Date() })
        return successResponse(SUCCESS.empDeleted, HTTP_STATUS_CODE.success);
    }
    //#endregion

    // #region update employee
    async updateEmployee(params, body) {
        requiredFields(params, { required: ['employee_id'] })
        requiredFields(body, {
            required: ['first_name',
                'last_name',
                'gender',
                'position',
                'dob',
                'salary',
                'employeeJMBG']
        })

        const existEmployee = await Employee.findOne({ _id: params.employee_id, is_active: USER_STATUS.ACTIVE })
        if (!existEmployee) {
            throw new HttpError(Errors.userNotExists, HTTP_STATUS_CODE.bad_request)
        }
        body.end_date = parseDate(body.end_date)
        body.dob = parseDate(body.dob)
        body.start_date = parseDate(body.start_date)
        await Employee.findOneAndUpdate({ _id: params.employee_id }, body)
        return successResponse(SUCCESS.empUpdate, HTTP_STATUS_CODE.success);
    }

    //#endregion
};
