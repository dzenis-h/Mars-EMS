import axios from 'axios';
import {baseApiUrl} from '../config/config';

const employeeApiUrl = baseApiUrl + 'employee/'

class EmployeeApi {
    
    static getEmployees() {
        return axios({
            method: 'get',
            url: employeeApiUrl + 'getEmployees'
        })
    }

    static getEmployee(value) {
        return axios({
            method: 'get',
            url: `${employeeApiUrl}getEmployee?employeeSheetName=${value}`
        })
    }

    static addEmployee(employee, lastRowNumber) {
        return axios({
            method: 'post',
            url: employeeApiUrl + 'addEmployee',
            data: {
                employee: employee,
                lastRowNumber: lastRowNumber
            },
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

    static removeEmployee(number) {
        return axios({
            method: 'put',
            url: employeeApiUrl + 'disableEmployee',
            data: {
                rowNumber: number
            }
        })
    }

}

export default EmployeeApi;