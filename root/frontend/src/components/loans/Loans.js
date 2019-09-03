import React, { Component } from "react";
import { PlusCircle } from "react-feather";
import ReactLoading from "react-loading";
import LoansApi from "../../api/loansApi";
import noPenaltiesIl from "../../img/no-penalties-illustration.png";
import Select from "react-select";
import Rodal from "rodal";
import { ToastContainer, toast } from "react-toastify";

class Loans extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSession: {
        peopleData: [],
        activeLoan: [],
        currentInstallment: [],
        loansData: [],
        installmentsData: [],
        remainingPaymentData: [],
        notesData: []
      },
      loanForm: {
        employee: "",
        amount: "",
        installment: "",
        unit: "",
        description: ""
      },
      kredit: [],
      isLoading: true,
      open: false
    };
  }

  show = () => {
    this.setState({ visibleModal: true });
  };

  hide = () => {
    this.setState({ visibleModal: false });
  };

  success = () => toast.info("Loans successfully saved", { autoClose: 2000 });

  handleEmployeeChange = selectedOption => {
    const selectedValue = selectedOption ? selectedOption : null;
    this.setState(prevState => ({
      loanForm: {
        ...prevState.loanForm,
        employee: selectedValue
      }
    }));
  };

  handleUnitChange = selectedOption => {
    const selectetedValue = selectedOption ? selectedOption.value : "";
    this.setState(prevState => ({
      loanForm: {
        ...prevState.loanForm,
        unit: selectetedValue
      }
    }));
  };

  handleValueChange = event => {
    event.preventDefault();
    let loanForm = this.state.loanForm;
    let name = event.target.name;
    let value = event.target.value;
    loanForm[name] = value;
    this.setState({ loanForm });
  };

  addLoan = event => {
    event.preventDefault();
    let theLoan = {
      amount: this.state.loanForm.amount,
      installment: this.state.loanForm.installment,
      unit: this.state.loanForm.unit,
      date: new Date(),
      description: this.state.loanForm.description,
      employee: this.state.loanForm.employee.value
    };
    this.setState(prevState => ({
      kredit: [...prevState.kredit, theLoan]
    })),
      setTimeout(() => {
        let LoansContent = Object.assign([], this.state.kredit);
        LoansContent.map(penal => {
          penal.employeeJMBG = penal.employee.jmbg;
          delete penal.employee;
          return LoansContent;
        });
        this.saveBulkEmployees(LoansContent);
      }, 100);
  };

  saveBulkEmployees = data => {
    LoansApi.addBulk(data)
      .then(response => {
        this.success();
        console.log(response.config.data);
        this.resetFormAndPenaltiesList();
      })
      .catch(error => {
        console.log("error while adding multiple loans", error);
        throw error;
      });
  };

  resetFormAndPenaltiesList = () => {
    const loanForm = {
      employee: "",
      amount: "",
      installment: "",
      unit: "",
      description: ""
    };
    const kredit = [];
    this.setState({
      loanForm,
      kredit
    });
  };

  relevantLoansData = () => {
    LoansApi.getLoansData().then(res => {
      let backendData = Object.assign({}, res.data);
      let obj = Object.values(backendData);
      let result = obj.map(a => {
        if (a.remainingPayment > 0) {
          this.setState(prevState => ({
            currentSession: {
              ...prevState.currentEmployee,
              peopleData: [...prevState.currentSession.peopleData, a.name],
              activeLoan: [...prevState.currentSession.activeLoan, a.lastLoan],
              currentInstallment: [
                ...prevState.currentSession.currentInstallment,
                a.lastInstallment
              ],
              loansData: [...prevState.currentSession.loansData, a.loansSum],
              installmentsData: [
                ...prevState.currentSession.installmentsData,
                a.installmentsSum
              ],
              remainingPaymentData: [
                ...prevState.currentSession.remainingPaymentData,
                a.remainingPayment
              ],
              notesData: [...prevState.currentSession.notesData, a.notes]
            },
            isLoading: false
          }));
        }
        if (a.remainingPayment === 0) {
          this.setState({ isLoading: false });
        }
        return result;
      });
    });
  };

  componentWillMount() {
    this.relevantLoansData(this.props);
  }

  render() {
    const { employees } = this.props;
    const {
      peopleData,
      activeLoan,
      currentInstallment,
      loansData,
      installmentsData,
      remainingPaymentData,
      notesData
    } = this.state.currentSession;
    const { loanForm } = this.state;

    const employeesFormated = this.props.employees
      .filter(item => item.enddate === undefined)
      .map(emp => {
        return {
          value: emp,
          label: `${emp.name} ${emp.surname}`
        };
      });

    const modalData = peopleData.map((item, idx) => {
      return (
        <tr key={item}>
          <td> {item}</td>
          <td> {loansData[idx]}</td>
          <td> {installmentsData[idx]}</td>
          <td> {remainingPaymentData[idx]}</td>
        </tr>
      );
    });

    const dataTable = peopleData.map((item, idx) => {
      return (
        <tr key={item}>
          <td> {item}</td>
          <td> {activeLoan[idx]}</td>
          <td> {currentInstallment[idx]}</td>
          <td> {remainingPaymentData[idx]}</td>
          <td> {notesData[idx]}</td>
        </tr>
      );
    });

    return (
      <div className="container">
        <div className="row">
          <div className="row">
            <div className="col-md-4">
              <div className="portlet portlet-boxed">
                <div className="portlet-header">
                  <h4 className="portlet-title">Enter multiple loans</h4>
                </div>
                <form className="portlet-body">
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Employee</label>
                    <Select
                      name="employee"
                      value={loanForm.employee}
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
                      value={loanForm.amount}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Installment</label>
                    <input
                      type="number"
                      className="form-control"
                      id="penaltyValue"
                      placeholder="Enter installment"
                      name="installment"
                      onChange={this.handleValueChange}
                      value={loanForm.installment}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="unit">Unit</label>
                    <Select
                      name="unit"
                      value={loanForm.unit}
                      onChange={this.handleUnitChange}
                      options={[
                        { value: "$", label: "$" },
                        { value: "BAM", label: "BAM" }
                      ]}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                      type="number"
                      className="form-control"
                      id="penaltyValue"
                      placeholder="Enter Description"
                      name="description"
                      onChange={this.handleValueChange}
                      value={loanForm.description}
                    />
                  </div>
                  <button
                    type="button"
                    style={{ float: "left" }}
                    className="btn btn-primary"
                    onClick={this.addLoan}
                  >
                    Save loan(s)
                  </button>
                </form>
              </div>
            </div>
            <div className="col-md-8">
              <div className="portlet portlet-boxed">
                <div className="portlet-header">
                  <h4>
                    Currently active loans{" "}
                    <i className={`fa fa-long-arrow-right`} />
                    <span
                      style={{
                        fontFamily: "Arial",
                        color: "#3291b6",
                        fontWeight: "bold",
                        letterSpacing: "3px",
                        fontSize: "30px"
                      }}
                    >
                      {" "}
                      {dataTable.length}{" "}
                    </span>
                  </h4>
                  <p style={{ color: "#48C6EF" }}>
                    Loans stats, monthly instalments, and notes <br />
                  </p>
                </div>

                {this.state.isLoading && ( // if doing asyng things
                  <div className={"col-md-12 col-md-offset-6"}>
                    <ReactLoading type={"bars"} color={"#48c6ef"} />
                    <p style={{ color: "#48C6EF", margin: "0px" }}>
                      {" "}
                      Loading ...
                    </p>
                  </div>
                )}

                {!this.state.isLoading &&
                  this.state.currentSession.peopleData.length === 0 && (
                    <div className="portlet-body no-penalties__wrapper">
                      <img
                        src={noPenaltiesIl}
                        alt="Missing data illustration"
                        className="no-data__image"
                      />
                      <p className="no-data">
                        There are no active loans added at the moment! <br />
                        You can add them by filling out te form on the left.
                      </p>
                    </div>
                  )}
                {this.state.currentSession.peopleData.length > 0 && (
                  <div className="portlet-body">
                    <div>
                      <h6 style={{ color: "#48C6EF", float: "right" }}>
                        Loans summary &nbsp;&nbsp;
                        <PlusCircle
                          style={{ cursor: "pointer" }}
                          size="20"
                          onClick={this.show}
                        />
                      </h6>
                    </div>
                    <table className="table table-striped">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Active Loan</th>
                          <th>Current Installment</th>
                          <th>Still Remaining</th>
                          <th>Note</th>
                        </tr>
                      </thead>
                      <tbody>{dataTable}</tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <Rodal
          visible={this.state.visibleModal}
          onClose={this.hide}
          closeOnEsc={true}
          customStyles={{
            height: "auto",
            bottom: "auto",
            top: "50%",
            transform: "translateY(-50%)"
          }}
        >
          {
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Total loan</th>
                  <th>Total Installment</th>
                  <th>Still Remaining</th>
                </tr>
              </thead>
              <tbody>{modalData}</tbody>
            </table>
          }
        </Rodal>

        <ToastContainer autoClose={3000} closeOnClick />
      </div>
    );
  }
}

export default Loans;
