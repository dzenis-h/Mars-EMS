import initialState from '../initial/initialState';
import * as actionTypes from '../actionTypes/actionTypes';

const generateSalariesReducer = (state = initialState.employeesSalaries, action) => {
    switch (action.type) {
        case actionTypes.GET_EMPLOYEE_SALARIES:
            return Object.assign([], action.data);

        case actionTypes.ADD_EMPLOYEE_SALARIES:
            return Object.assign(...state, action.data);

        case actionTypes.UPDATE_EMPLOYEE_SALARY_RAISES:
            let updatedData = state.map(value => Object.assign({}, value));
            for (let i = 0; i < action.data.length; i++) {
                for (let j = 0; j < updatedData.length; j++) {
                    if (action.data[i].employeeJMBG === updatedData[j].jmbg) {
                        updatedData[j].totalNetSalary += action.data[i].amount;
                        updatedData[j].note += `${action.data[i].description};`;
                        break;
                    }
                }
            }
            return updatedData;

        case actionTypes.UPDATE_EMPLOYEE_BONUSES:
            let updatedBonusesData = state.map(value => Object.assign({}, value));
            for (let i = 0; i < action.data.length; i++) {
                for (let j = 0; j < updatedBonusesData.length; j++) {
                    if (action.data[i].employeeJMBG === updatedBonusesData[j].jmbg) {
                        updatedBonusesData[j].handBonus += action.data[i].amount;
                        updatedBonusesData[j].handTotal += action.data[i].amount;
                        updatedBonusesData[j].note += `${action.data[i].description};`;
                        break;
                    }
                }
            }
            return updatedBonusesData;

        case actionTypes.UPDATE_EMPLOYEE_PENALTIES:
            let updatedPenaltiesData = state.map(value => Object.assign({}, value));
            console.log('action', action);
            for (let i = 0; i < action.data.length; i++) {
                for (let j = 0; j < updatedPenaltiesData.length; j++) {
                    if (action.data[i].employeeJMBG === updatedPenaltiesData[j].jmbg) {
                        if (action.data[i].unit === 'BAM') {
                            updatedPenaltiesData[j].handPenalty += action.data[i].amount;
                            updatedPenaltiesData[j].handTotal -= action.data[i].amount;
                        } else { // unit is %
                            updatedPenaltiesData[j].handPenalty += updatedPenaltiesData[j].totalNetSalary * (action.data[i].amount / 100);
                            updatedPenaltiesData[j].handTotal -= updatedPenaltiesData[j].totalNetSalary * (action.data[i].amount / 100);
                        }
                        updatedPenaltiesData[j].note += `${action.data[i].description};`;
                        break;
                    }
                }
            }
            return updatedPenaltiesData;

        case actionTypes.UPDATE_EMPLOYEE_LOANS:
            let updatedLoansData = state.map(value => Object.assign({}, value));
            for (let i = 0; i < action.data.length; i++) {
                for (let j = 0; j < updatedLoansData.length; j++) {
                    if (action.data[i].employeeJMBG === updatedLoansData[j].jmbg) {
                        updatedLoansData[j].loan = action.data[i].amount;
                        updatedLoansData[j].installment = action.data[i].installment;
                        updatedLoansData[j].note += `${action.data[i].description};`;
                        break;
                    }
                }
            }
            return updatedLoansData;

        case actionTypes.UPDATE_EMPLOYEE_LOAN_NOTES:
            let updatedLoanNotesData = state.map(value => Object.assign({}, value));
            for (let i = 0; i < action.data.length; i++) {
                for (let j = 0; j < updatedLoanNotesData.length; j++) {
                    if (action.data[i].employeeJMBG === updatedLoanNotesData[j].jmbg) {
                        updatedLoanNotesData[j].note += `${action.data[i].description};`;
                        updatedLoanNotesData[j].installment -= action.data[i].amount;
                        break;
                    }
                }
            }
            return updatedLoanNotesData;

        case actionTypes.UPDATE_EMPLOYEE_EXTRA_LOAN_PAYMENTS:
            let updatedLoanExtraPaymentsData = state.map(value => Object.assign({}, value));
            for (let i = 0; i < action.data.length; i++) {
                for (let j = 0; j < updatedLoanExtraPaymentsData.length; j++) {
                    if (action.data[i].employeeJMBG === updatedLoanExtraPaymentsData[j].jmbg) {
                        if (action.data[i].description === undefined) {
                            action.data[i].description = 'Extra payment'
                        }
                        updatedLoanExtraPaymentsData[j].note += `${action.data[i].description};`;
                        updatedLoanExtraPaymentsData[j].installment += action.data[i].amount;
                        break;
                    }
                }
            }
            return updatedLoanExtraPaymentsData;

        case actionTypes.REMOVE_EMPLOYEE_SALARIES:
            return [];

        default:
            return state;
    }
}

export default generateSalariesReducer;