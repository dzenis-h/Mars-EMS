import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import * as generateSalariesActions from '../actions/generateEmployeesSalariesActions';
import Salaries from "../components/salaries/Salaries";

class GenerateSalariesContainerComponent extends React.Component {
    render() {
        return (
            <div>
                <Salaries employeesSalaries={this.props.employeesSalaries}
                          getEmployeesSalaries={this.props.actions.getEmployeesSalaries}
                          addEmployeesSalaries={this.props.actions.addEmployeesSalaries}
                          updateEmployeesSalaryRaises={this.props.actions.updateEmployeesSalaryRaises}
                          updateEmployeesBonuses={this.props.actions.updateEmployeesBonuses}
                          updateEmployeesPenalties={this.props.actions.updateEmployeesPenalties}
                          updateEmployeesLoans={this.props.actions.updateEmployeesLoans}
                          updateEmployeesLoanNotes={this.props.actions.updateEmployeesLoanNotes}
                          updateEmployeesLoanExtraPayments={this.props.actions.updateEmployeesLoanExtraPayments}
                          removeEmployeesSalaries ={this.props.actions.deleteEmployeeSalaries}
                />
            </div>
        )
    }
}

GenerateSalariesContainerComponent.propTypes = {
    employeesSalaries: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    return {
        employeesSalaries: state.employeesSalaries
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(generateSalariesActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(GenerateSalariesContainerComponent);
