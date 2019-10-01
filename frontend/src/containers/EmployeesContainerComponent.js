import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import * as employeeActions from '../actions/employeeActions';
import Employees from "../components/employees/Employees";

class EmployeesContainerComponent extends React.Component {
    render() {
        return (
            <div>
                <Employees employees={this.props.employees}
                           addEmployee={this.props.actions.addEmployeeAsync}
                           removeEmployee={this.props.actions.removeEmployeeAsync}
                />
            </div>
        )
    }
}

EmployeesContainerComponent.propTypes = {
    employees: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    return {
        employees: state.employees
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(employeeActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EmployeesContainerComponent);
