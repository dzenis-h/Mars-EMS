import React from 'react';
import PropTypes from 'prop-types';
import AddEmployeeForm from "../redux-forms/AddEmployeeForm";
import * as _ from "lodash";
import moment from 'moment'

class AddEmployeeRightPanel extends React.Component {

    getLastNumberRowOfEmployeeSheet = () => {
        const lastIndex = _.maxBy(this.props.employees, item => item.rowNumber);
        return lastIndex['rowNumber'] + 1;
    }
    
    addEmployee = (values) => {
        let formData = Object.assign({}, values);
        formData.isPayoneer = formData.isPayoneer || false;
        if (formData.birthdate !== undefined && formData.startdate !== undefined) {
            formData.birthdate = moment(formData.birthdate).format('MM-DD-YYYY');
            formData.startdate = moment(formData.startdate).format('MM-DD-YYYY');
        }
        this.props.addEmployee(formData, this.getLastNumberRowOfEmployeeSheet());
    }

    render() {
        return (
            <div className="col-md-4">
                <div className="portlet portlet-boxed">
                    <div className="portlet-header">
                        <h4 className="portlet-title">
                            Add new employee
                        </h4>
                    </div>
                    <div className="portlet-body">
                        <div id="settings-content" className="stacked-content">
                            <div className="tab-pane fade in active" id="profile-tab">
                                <AddEmployeeForm addEmployee={this.addEmployee}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

AddEmployeeRightPanel.propTypes = {
    employees: PropTypes.array.isRequired,
    addEmployee: PropTypes.func
};

export default AddEmployeeRightPanel;