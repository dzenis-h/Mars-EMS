import React, { Component } from "react";
import SpreadSheetApi from "../../api/spreadsheetApi";
import { confirmAlert } from "react-confirm-alert";
import { XCircle } from "react-feather";
import PropTypes from "prop-types";
import Select from "react-select";
import moment from "moment/moment";
import PenaltyApi from "../../api/penaltyApi";
import noPenaltiesIl from "../../img/no-penalties-illustration.png";
import { ToastContainer, toast } from "react-toastify";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: "",
      penaltyForm: {
        employee: "",
        amount: "",
        unit: "",
        description: ""
      },
      penalties: []
    };
  }

  success = () =>
    toast.info("Penalties successfully saved", { autoClose: 2000 });

  openModalToAllowAppUsingSpreadsheetAPI = url => {
    confirmAlert({
      title: "Confirm",
      message:
        "Looks like your app is using Google Spreadsheet API. In order to use it, you have to give an access it to your email for the first time",
      confirmLabel: "Confirm",
      cancelLabel: "Cancel",
      onConfirm: () => (window.location.href = url)
    });
  };

  componentWillReceiveProps(nextProps) {
    let response;
    if (!nextProps.isAppGoogleSpreadsheetAuthenticated) {
      SpreadSheetApi.getToken().then(res => {
        response = res.data;
        this.openModalToAllowAppUsingSpreadsheetAPI(response);
      });
    }
  }

  // After the API code gets verified, the user gets redirected to the Home component and additionally,
  //  the app fires off 3 action creators  => To get the employees, reports, and loans-related data.
  verifyCode = e => {
    e.preventDefault();
    const { code } = this.state;
    SpreadSheetApi.verifyCode(code)
      .then(res => {
        this.props.setGoogleSpreadsheetAuth();
        this.props.getEmployeesAsync();
        this.props.getReportsAsync();
        this.props.getLoansAsync();
      })
      .catch(err => {
        alert("Code is invalid");
        this.props.unsetGoogleSpreadsheetAuth();
      });
  };

  handleInputChange = event => {
    this.setState({ code: event.target.value });
  };

  handleEmployeeChange = selectedOption => {
    const selectedValue = selectedOption ? selectedOption : null;

    this.setState(prevState => ({
      penaltyForm: {
        ...prevState.penaltyForm,
        employee: selectedValue
      }
    }));
  };

  handleUnitChange = selectedOption => {
    const selectetedValue = selectedOption ? selectedOption.value : "";
    this.setState(prevState => ({
      penaltyForm: {
        ...prevState.penaltyForm,
        unit: selectetedValue
      }
    }));
  };

  handleValueChange = event => {
    event.preventDefault();
    let penaltyForm = this.state.penaltyForm;
    let name = event.target.name;
    let value = event.target.value;
    penaltyForm[name] = value;
    this.setState({ penaltyForm });
  };

  addPenalty = event => {
    event.preventDefault();
    let penalty = {
      amount: this.state.penaltyForm.amount,
      unit: this.state.penaltyForm.unit,
      date: new Date(),
      description: this.state.penaltyForm.description,
      employee: this.state.penaltyForm.employee.value
    };
    this.setState(prevState => ({
      penalties: [...prevState.penalties, penalty]
    }));
  };

  save = () => {
    let penaltiesData = Object.assign([], this.state.penalties);
    penaltiesData.map(penal => {
      penal.employeeJMBG = penal.employee.jmbg;
      delete penal.employee;

      return penaltiesData;
    });
    this.saveBulkEmployees(penaltiesData);
  };

  saveBulkEmployees = data => {
    PenaltyApi.addBulk(data)
      .then(response => {
        this.success();
        console.log(response.config.data);
        this.resetFormAndPenaltiesList();
      })
      .catch(error => {
        console.log("error while adding multiple penalties", error);
        throw error;
      });
  };

  resetFormAndPenaltiesList = () => {
    const penaltyForm = {
      employee: null,
      amount: "",
      unit: "",
      description: ""
    };
    const penalties = [];
    this.setState({
      penaltyForm,
      penalties
    });
  };

  openDeleteConfirmModal = id => {
    confirmAlert({
      title: "Confirm",
      message: "Are you sure you want to delete an item?",
      confirmLabel: "Confirm",
      cancelLabel: "Cancel",
      onConfirm: () => this.deleteItem(id)
    });
  };

  deleteItem = id => {
    this.setState(prevState => ({
      penalties: prevState.penalties.filter(item => item.employee.jmbg !== id)
    }));
  };

  render() {
    const { penaltyForm } = this.state;

    const employeesFormated = this.props.employees
      .filter(item => item.enddate === undefined)
      .map(emp => {
        return {
          value: emp,
          label: `${emp.name} ${emp.surname}`
        };
      });

    const penaltiesList = this.state.penalties.map(item => {
      return (
        <tr key={item.date.toString()}>
          <td className="col-md-4">
            {item.employee.name} {item.employee.surname}
          </td>
          <td className="col-md-3">{moment(item.date).format("MM-DD-YYYY")}</td>
          <td className="col-md-2">
            {item.amount} {item.unit}
          </td>
          <td className="col-md-3">{item.description}</td>
          <td>
            <a
              onClick={this.openDeleteConfirmModal.bind(
                this,
                item.employee.jmbg
              )}
            >
              <XCircle size="18" />
            </a>
          </td>
        </tr>
      );
    });

    return (
      <div className="container">
        {!this.props.isAppGoogleSpreadsheetAuthenticated && (
          <div className="row">
            <div className=" col-md-6 validation__wrapper">
              <h5>Missing API</h5>
              <p className="">
                Please validate your google sheets API by entering code in the
                form below.
              </p>
              <br />
              <br />
              <form onSubmit={() => this.verifyCode}>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control validation__input"
                    placeholder="Enter a code"
                    onChange={this.handleInputChange}
                    value={this.state.code}
                  />
                  <span className="input-group-btn">
                    <button
                      className="btn btn-primary"
                      onClick={this.verifyCode}
                    >
                      {" "}
                      Submit
                    </button>
                  </span>
                </div>
              </form>
            </div>
          </div>
        )}
        {this.props.isAppGoogleSpreadsheetAuthenticated && (
          <div className="row">
            <div className="col-md-4">
              <div className="portlet portlet-boxed">
                <div className="portlet-header">
                  <h4 className="portlet-title">Enter multiple penalties</h4>
                </div>
                <form className="portlet-body">
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Employee</label>
                    <Select
                      name="employee"
                      value={penaltyForm.employee}
                      onChange={this.handleEmployeeChange}
                      options={employeesFormated}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Amount</label>
                    <input
                      type="number"
                      className="form-control"
                      id="penaltyValue"
                      placeholder="Enter Amount"
                      name="amount"
                      onChange={this.handleValueChange}
                      value={penaltyForm.amount}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="unit">Unit</label>
                    <Select
                      name="unit"
                      value={penaltyForm.unit}
                      onChange={this.handleUnitChange}
                      options={[
                        { value: "%", label: "%" },
                        { value: "BAM", label: "BAM" }
                      ]}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                      type="number"
                      className="form-control"
                      id="penaltyDescription"
                      placeholder="Enter Description"
                      name="description"
                      onChange={this.handleValueChange}
                      value={penaltyForm.description}
                    />
                  </div>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={this.addPenalty}
                  >
                    Add penalty
                  </button>
                </form>
              </div>
            </div>
            <div className="col-md-8">
              <div className="portlet portlet-boxed">
                <div className="portlet-header">
                  <h4 className="portlet-title">Add new penalties overview</h4>
                </div>
                {this.state.penalties.length === 0 && (
                  <div className="portlet-body no-penalties__wrapper">
                    <img
                      src={noPenaltiesIl}
                      alt="Missing data illustration"
                      className="no-data__image"
                    />
                    <p className="no-data">
                      There are no penalties added at the moment! <br />
                      You can add them by filling out te form on the left.
                    </p>
                  </div>
                )}
                {this.state.penalties.length > 0 && (
                  <div className="portlet-body penalties__wrapper">
                    <table className="table table-striped">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Date</th>
                          <th>Amount</th>
                          <th>Description</th>
                          <th />
                        </tr>
                      </thead>
                      <tbody>{penaltiesList}</tbody>
                    </table>

                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={this.save}
                    >
                      Save all penalties
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        <ToastContainer autoClose={3000} closeOnClick />
      </div>
    );
  }
}

Home.propTypes = {
  isAppGoogleSpreadsheetAuthenticated: PropTypes.bool,
  employees: PropTypes.array,
  reports: PropTypes.object,
  loans: PropTypes.object,
  setGoogleSpreadsheetAuth: PropTypes.func.isRequired,
  unsetGoogleSpreadsheetAuth: PropTypes.func.isRequired
};

export default Home;
