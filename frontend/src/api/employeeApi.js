import axios from "axios";
import { baseApiUrl } from "../config/config";

const employeeApiUrl = baseApiUrl + "employee/";

class EmployeeApi {
  static getEmployees() {
    return axios({
      method: "get",
      url: employeeApiUrl + "getEmployees"
    });
  }

  static getEmployee(value) {
    return axios({
      method: "get",
      url: `${employeeApiUrl}getEmployee?employeeSheetName=${value}`
    });
  }

  static addEmployee(employee, lastRowNumber) {
    return axios({
      method: "post",
      url: employeeApiUrl + "addEmployee",
      data: {
        employee,
        lastRowNumber
      },
      headers: {
        "Content-Type": "application/json"
      }
    });
  }

  static changeEmployeeStatus(rowNumber, date) {
    return axios({
      method: "put",
      url: employeeApiUrl + "disableEmployee",
      data: {
        rowNumber,
        date
      },
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
}

export default EmployeeApi;
