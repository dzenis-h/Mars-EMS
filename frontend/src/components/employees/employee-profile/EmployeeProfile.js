import React, {Component} from 'react';
import salary from '../../../img/salary-illustration.png';
import anniversaryIl from '../../../img/anniversary-illustration.png';
import birthdayIl from '../../../img/birthday-illustration.png';
import EmployeeApi from '../../../api/employeeApi';
import * as _ from "lodash";
import TabsComponent from "./TabsComponent";
import { ArrowLeft, ArrowRight } from 'react-feather';
import {Link} from "react-router-dom";

class EmployeeProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentEmployee: {
                basicInfo: null,
                salaryInfo: null
            },
            salariesHistory: [],
            currentSalary: null,
            loansHistory: [],
            currentLoanStatus: ''
        }
    }

    getCurrentEmployee = (props) => {
        const lastSlashIndex = props.history.location.pathname.lastIndexOf("/");
        const jmbg = props.history.location.pathname.substring(lastSlashIndex + 1)
        for (const emp of props.employees) {
            if (emp.jmbg === jmbg) {
                this.setState(prevState => ({
                    currentEmployee: {
                        ...prevState.currentEmployee,
                        basicInfo: Object.assign({}, emp)
                    }
                }))
                setTimeout(() => {
                    this.getEmployeeSalaryData();
                }, 100);
            }};
        }

    getEmployeeSalaryData = () => {
        const employeeFullName = `${this.state.currentEmployee.basicInfo.name} ${this.state.currentEmployee.basicInfo.surname}`;
        return EmployeeApi.getEmployee(employeeFullName).then(employee => {
            this.setState(prevState => ({
                currentEmployee: {
                    ...prevState.currentEmployee,
                    salaryInfo: Object.assign([], employee.data)
                }
            }))
            setTimeout(() => {
                this.getSalaryHistory(this.state.currentEmployee.salaryInfo);
                this.getLoansHistory(this.state.currentEmployee.salaryInfo);
            }, 100)
        }).catch(error => {
            console.log('error while getting employee', error);
        });
    }

    getSalaryHistory = (data) => {
        const uniqueSalaries = _.uniqBy(data, 'totalNetSalary');
        const copiedUniqueSalaries = Object.assign([], uniqueSalaries)
        const currentSalary = copiedUniqueSalaries.pop();
        this.setState({
                salariesHistory: Object.assign([], uniqueSalaries),
                currentSalary: currentSalary.totalNetSalary
            }
        )
    }

    getLoansHistory = (data) => {
        const uniqueLoans = _.uniqBy(data, 'loan');
        const copiedUniqueLoans = Object.assign([], uniqueLoans)
        const currentLoanStatus = copiedUniqueLoans.pop();
        this.setState({
                loansHistory: Object.assign([], uniqueLoans),
                currentLoanStatus: currentLoanStatus.loan
            }
        )
    }

    componentWillMount() {
        this.getCurrentEmployee(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.getCurrentEmployee(nextProps);
    }

    render() {
        const {currentEmployee, salariesHistory, currentSalary} = this.state;

        const salariesHistoryList = salariesHistory.map(item => {
            return <p key={item.rowNumber}
                      className="list-group-item-text salary-item">{item.month}/{item.year} - {item.totalNetSalary} KM</p>
        });
        return (
            <div>
                {currentEmployee.basicInfo &&
                    <div className="container">
                    <div className="row navigation-row">
                    
                        <Link to="/employees" className="btn btn-hollow">
                        <ArrowLeft size="18" className="button-left-icon"/> Go back to employees</Link>

                        <Link to="/reports" className="btn btn-hollow-right">
                        <ArrowRight size="18" className="button-right-icon"/> Go to reports </Link>
                    </div>

                    <div className="row employee-statistics__wrapper">
                        <div className="col-md-3 employee-image__wrapper">
                            <div className="employee-image"></div>
                            <h4>{currentEmployee.basicInfo.name} {currentEmployee.basicInfo.surname}</h4>
                            <h6>{currentEmployee.basicInfo.position}</h6>
                            <p>{currentEmployee.basicInfo.jmbg} | {currentEmployee.basicInfo.gender}</p>
                        </div>
                        <div className="col-md-3 employee-statistics">
                            <img src={salary} alt="Salary illustration" className="employee-statistics__image"/>
                            <h4 className="list-group-item-text">{currentSalary} KM</h4>
                            <h6 className="list-group-item-heading">Current Sallary</h6>
                        </div>
                        <div className="col-md-3 employee-statistics">
                            <img src={anniversaryIl} alt="Anniversary illustration" className="employee-statistics__image"/>
                            <h4 className="list-group-item-text">{currentEmployee.basicInfo.startdate}</h4>
                            <h6 className="list-group-item-heading">Anniversary</h6>
                            </div>
                        <div className="col-md-3 employee-statistics">
                            <img src={birthdayIl} alt="Birthday illustration" className="employee-statistics__image"/>
                            <h4 className="list-group-item-text">{currentEmployee.basicInfo.birthdate}</h4>
                            <h6 className="list-group-item-heading">Birthday</h6>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-9">
                        <div className="row tab-content">
                            <TabsComponent employeeJMBG={this.state.currentEmployee.basicInfo.jmbg}/></div>
                        </div>
                        <div className="col-md-3">
                            <div className="portlet portlet-boxed">
                                <div className="portlet-header">
                                    <h4 className="portlet-title">Salary history</h4>
                                </div>
                                <div className="portlet-body salary-content">
                                {salariesHistoryList}
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                }
            </div>
        );
    }
}

export default EmployeeProfile;
