import React, { Component } from "react";
import GenerateSalariesApi from "../../api/generateSalariesApi";
import SalariesTable from "./SalariesTable";
import SalariesTabs from "./SalariesTabs";
import months from "../../models/months";
import Select from "react-select";
import PropTypes from "prop-types";
import SalariesTotalPreview from "./SalariesTotalPreview";
import ClearDataApi from "../../api/clearDataApi";
import { ArrowRightCircle } from "react-feather";
import generateSalaryIl from "../../img/generate-salary-illustration.png";
import { ToastContainer, toast } from "react-toastify";

class Salaries extends Component {
  constructor(props) {
    super(props);
    this.state = {
      months: months,
      month: 0,
      year: "",
      shouldDisplayEmployeesDataTable: false,
      shouldDisplayContentTabs: false,
      shouldDisplayTotalPreview: false,
      disableGenerateSalaryButton: false,
      actionButtonStates: ["Next", "Final Preview", "Import"],
      currentButtonState: "Next"
    };
  }

  generateSalaries = () => {
    this.setState({ disableGenerateSalaryButton: true });
    this.props.removeEmployeesSalaries();
    GenerateSalariesApi.GetDataFromAccountantSpreadsheet(
      months[this.state.month].label
    ).then(response => {
      let employeeDataFromAccountant = response.data;
      GenerateSalariesApi.GetDataFromMainSpreadsheet()
        .then(res => {
          employeeDataFromAccountant.map(item => {
            for (let i = 0; i < res.data.length; i++) {
              // merging data from accountant and CEO's doc
              if (item.jmbg === res.data[i].jmbg) {
                item.name = res.data[i].name;
                item.lastRowNumber = res.data[i].lastRowNumber;
                item.isPayoneer = res.data[i].isPayoneer;
                item.totalNetSalary = res.data[i].totalNetSalary;
                item.installment = res.data[i].installment;
                item.totalGrossSalary =
                  item.totalNetSalary + item.bankContributes;
                item.handSalary =
                  item.totalNetSalary - item.bankNetSallary - item.bankHotMeal;
                item.handBonus = 0;
                item.handPenalty = 0;
                item.handTotal = item.handSalary - item.installment; //+ item.handBonus - item.handPenalty - will be added later on
                item.note = "";
                item.loan = 0;
                break;
              }
            }
            return employeeDataFromAccountant;
          });

          this.props.addEmployeesSalaries(employeeDataFromAccountant);
          this.setState({
            shouldDisplayEmployeesDataTable: true,
            shouldDisplayContentTabs: false
          });
        })
        .catch(error => {
          console.log(
            "error while getting data from accountant spreadsheet",
            error
          );
          throw error;
        });
    });
  };

  success = () => toast.info("Used data deleted", { autoClose: 2000 });

  handleYearChange = event => {
    event.preventDefault();
    this.setState({ year: event.target.value });
  };

  handleMonthChange = selectedOption => {
    const selectedValue = selectedOption ? selectedOption.value : "";
    this.setState({ month: selectedValue });
  };

  getLastRowIndex = () => {
    return (
      Math.max(...this.props.employeesSalaries.map(elt => elt.lastRowNumber)) +
      1
    );
  };

  goToNextStep = () => {
    const index = this.state.actionButtonStates.indexOf(
      this.state.currentButtonState
    );
    this.setState({
      shouldDisplayEmployeesDataTable: index === 0 ? false : true,
      shouldDisplayContentTabs: index === 0 ? true : false,
      currentButtonState: this.state.actionButtonStates[index + 1]
    });

    if (this.state.currentButtonState === this.state.actionButtonStates[2]) {
      GenerateSalariesApi.ImportDataIntoSpreadsheet(
        this.state.year,
        this.state.months[this.state.month].label,
        this.getLastRowIndex(),
        this.props.employeesSalaries
      )
        .then(res => {
          ClearDataApi.remove(this.state.month, this.state.year)
            .then(res => {
              console.log("Successfully deleted used data");
              this.success();
            })
            .catch(error => {
              console.log("error while inserting data into spreadsheet", error);
              alert("Error while deleting old data");
            });
          this.setState({
            shouldDisplayEmployeesDataTable: false,
            shouldDisplayContentTabs: false,
            shouldDisplayTotalPreview: true
          });
        })
        .catch(error => {
          console.log("error while inserting data into spreadsheet", error);
          alert(error);
          throw error;
        });
    }
  };

  render() {
    return (
      <div>
        <div className="container">
          {!this.state.shouldDisplayEmployeesDataTable &&
            !this.state.shouldDisplayContentTabs &&
            !this.state.shouldDisplayTotalPreview && (
              <div className="portlet portlet-boxed">
                <div className="portlet-header">
                  <h4 className="portlet-title">Generate salary</h4>
                </div>
                <div className="portlet-body">
                  <div className="row">
                    <div className="col-md-9">
                      <form>
                        <div className="row">
                          <div className="form-group col-md-4">
                            <label htmlFor="exampleInputEmail1">Month</label>
                            <Select
                              value={this.state.month}
                              onChange={this.handleMonthChange}
                              options={this.state.months}
                            />
                          </div>
                          <div className="form-group col-md-4">
                            <label htmlFor="exampleInputPassword1">Year</label>
                            <input
                              type="text"
                              className="form-control"
                              id="year"
                              placeholder="Enter year"
                              name="year"
                              onChange={this.handleYearChange}
                              value={this.state.year}
                            />
                          </div>
                          <div className="col-md-2 generate-salary__wrapper">
                            <button
                              type="button"
                              className="btn btn-primary submit-button"
                              disabled={
                                this.state.disableGenerateSalaryButton ||
                                !Number.isInteger(this.state.month) ||
                                !this.state.year
                              }
                              onClick={this.generateSalaries}
                            >
                              Generate salary
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                    <div className="col-md-3 generate-salary-illustration_wrapper">
                      <img
                        src={generateSalaryIl}
                        alt="Generate Salaty Illustration"
                        className="generate-salary-illustration"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          {(this.state.shouldDisplayEmployeesDataTable ||
            this.state.shouldDisplayContentTabs ||
            this.state.shouldDisplayTotalPreview) && (
            <div className="portlet portlet-boxed">
              <div className="portlet-header tab-content-portlet-header portlet-salaries">
                <h4 className="portlet-title">
                  {this.state.months[this.state.month].label}, {this.state.year}
                </h4>
                {!this.state.shouldDisplayTotalPreview && (
                  <button
                    type="button"
                    className="btn btn-primary btn-salaries"
                    onClick={this.goToNextStep}
                  >
                    {this.state.currentButtonState}{" "}
                    <ArrowRightCircle size="18" />
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
        <div>
          {this.state.shouldDisplayEmployeesDataTable && (
            <SalariesTable
              employeesSalaries={this.props.employeesSalaries}
              getEmployeesSalaries={this.props.getEmployeesSalaries}
            />
          )}
          {this.state.shouldDisplayContentTabs && (
            <SalariesTabs
              year={parseInt(this.state.year, 10)}
              month={this.state.month}
              employeesSalaries={this.props.employeesSalaries}
              addEmployeesSalaries={this.props.addEmployeesSalaries}
              updateEmployeesSalaryRaises={
                this.props.updateEmployeesSalaryRaises
              }
              updateEmployeesBonuses={this.props.updateEmployeesBonuses}
              updateEmployeesPenalties={this.props.updateEmployeesPenalties}
              updateEmployeesLoans={this.props.updateEmployeesLoans}
              updateEmployeesLoanNotes={this.props.updateEmployeesLoanNotes}
              updateEmployeesLoanExtraPayments={
                this.props.updateEmployeesLoanExtraPayments
              }
            />
          )}
          {this.state.shouldDisplayTotalPreview && (
            <SalariesTotalPreview
              employeesSalaries={this.props.employeesSalaries}
            />
          )}
        </div>
        <ToastContainer autoClose={3000} closeOnClick />
      </div>
    );
  }
}

Salaries.propTypes = {
  employeesSalaries: PropTypes.array.isRequired,
  getEmployeesSalaries: PropTypes.func.isRequired,
  addEmployeesSalaries: PropTypes.func.isRequired,
  updateEmployeesSalaryRaises: PropTypes.func.isRequired,
  updateEmployeesBonuses: PropTypes.func.isRequired,
  updateEmployeesPenalties: PropTypes.func.isRequired,
  updateEmployeesLoans: PropTypes.func.isRequired,
  updateEmployeesLoanNotes: PropTypes.func.isRequired,
  updateEmployeesLoanExtraPayments: PropTypes.func.isRequired,
  removeEmployeesSalaries: PropTypes.func.isRequired
};

export default Salaries;
