import React from 'react';
import PropTypes from 'prop-types';
import { XCircle } from 'react-feather';
import {confirmAlert} from 'react-confirm-alert';
import Link from "react-router-dom/es/Link";
import * as _ from "lodash";

const EmployeesTable = ({employees, removeEmployee}) => {

    const deleteEmployee = (rowNumber) => {
        confirmAlert({
            title: 'Confirm',
            message: 'Set employee as inactive',
            confirmLabel: 'Confirm',
            cancelLabel: 'Cancel',
            onConfirm: () => removeEmployee(rowNumber),
        })
    };

   const sortedEmployees = _.orderBy(employees, ['enddate', 'name'], ['desc', 'asc']);

    const listEmployees = sortedEmployees.map(item => {
        return (
        <tr key={item.jmbg}>
            <td><Link to={`/employees/${item.jmbg}`}> {item.name} </Link> </td>
            <td>{item.surname}</td>
            <td>{item.position}</td>
            <td className="status-column">
                <i className={`fa fa-circle ${!item.enddate ? 'employeeactive' : 'employeeinactive'}`}></i>
            </td>
            <td>
                <a className="table-actions" onClick={deleteEmployee.bind(this, item.rowNumber)}>
                <XCircle size="18"/></a>
            </td>
        </tr>
    )});

    return (
    <div className="portlet-body">
        <table className="table table-striped">
            <thead>
            <tr>
                <th>Name</th>
                <th>Surname</th>
                <th>Position</th>
                <th className="status-column">Status</th>
                <th></th>
            </tr>
            </thead>
            <tbody>
            {listEmployees}
            </tbody>
        </table>
    </div>
);
}

EmployeesTable.propTypes = {
    employees: PropTypes.array.isRequired,
    removeEmployee: PropTypes.func.isRequired
};

export default EmployeesTable;