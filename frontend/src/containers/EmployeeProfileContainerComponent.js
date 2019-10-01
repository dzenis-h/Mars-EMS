import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import * as employeeActions from '../actions/employeeActions';
import EmployeeProfile from "../components/employees/employee-profile/EmployeeProfile";

class EmployeeProfileContainerComponent extends React.Component {
    render() {
        return (
            <div>
                <EmployeeProfile
                     employees={this.props.employees}  
                     history={this.props.history}
                />
            </div>
        )
    }
}

EmployeeProfileContainerComponent.propTypes = {
    employees: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    return {
        employees: state.employees,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(employeeActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeProfileContainerComponent);
