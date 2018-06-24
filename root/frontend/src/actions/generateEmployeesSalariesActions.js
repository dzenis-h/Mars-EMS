import * as actionTypes from '../actionTypes/actionTypes';

export const getEmployeesSalaries = (data) => {
    return {
        type: actionTypes.GET_EMPLOYEE_SALARIES,
        data
    }
}

export const addEmployeesSalaries = (data) => {
    return {
        type: actionTypes.ADD_EMPLOYEE_SALARIES,
        data
    }
}

export const updateEmployeesSalaryRaises = (data) => {
    return {
        type: actionTypes.UPDATE_EMPLOYEE_SALARY_RAISES,
        data
    }
}

export const updateEmployeesBonuses = (data) => {
    return {
        type: actionTypes.UPDATE_EMPLOYEE_BONUSES,
        data
    }
}

export const updateEmployeesPenalties = (data) => {
    return {
        type: actionTypes.UPDATE_EMPLOYEE_PENALTIES,
        data
    }
}

export const updateEmployeesLoans = (data) => {
    return {
        type: actionTypes.UPDATE_EMPLOYEE_LOANS,
        data
    }
}

export const updateEmployeesLoanNotes = (data) => {
    return {
        type: actionTypes.UPDATE_EMPLOYEE_LOAN_NOTES,
        data
    }
}

export const updateEmployeesLoanExtraPayments = (data) => {
    return {
        type: actionTypes.UPDATE_EMPLOYEE_EXTRA_LOAN_PAYMENTS,
        data
    }
}

export const deleteEmployeeSalaries = (data) => {
    return {
        type: actionTypes.REMOVE_EMPLOYEE_SALARIES,
        data
    }
}