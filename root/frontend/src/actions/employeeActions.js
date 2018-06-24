import * as actionTypes from '../actionTypes/actionTypes';
import EmployeeApi from "../api/employeeApi";

export const getEmployees = (data) => {
    return {
        type: actionTypes.GET_EMPLOYEES,
        data
    }
}

export const addEmployee = (data) => {
    return {
        type: actionTypes.ADD_EMPLOYEE,
        data
    }
}

export const updateEmployee = (data) => {
    return {
        type: actionTypes.UPDATE_EMPLOYEE,
        data
    }
}

export const removeEmployee = (data) => {
    return {
        type: actionTypes.DISABLE_EMPLOYEE,
        data
    }
}

export const getEmployeesAsync = () => {
    return dispatch => {
        return EmployeeApi.getEmployees()
        .then(employees => {
            dispatch(getEmployees(employees.data));
        }).catch(error => {
            console.log('error while loading employees', error);
            throw(error);
        });
    };
}

export const addEmployeeAsync = (e, index) => {
    return dispatch => {
        return EmployeeApi.addEmployee(e, index).then(employees => {
            dispatch(addEmployee(employees.data));
        }).catch(error => {
            console.log('error while adding new employee',error);
            throw(error);
        });
    };
}

export const removeEmployeeAsync = (e) => {
    return dispatch => {
        return EmployeeApi.removeEmployee(e).then(employees => {
            dispatch(removeEmployee(employees.data));
        }).catch(error => {
            console.log('error while deleting employee',error);
            throw(error);
        });
    };
}