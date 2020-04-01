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
      loanData: [],
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
    const {
      amount,
      installment,
      unit,
      description,
      employee
    } = this.state.loanForm;

    let newLoan = {
      amount,
      installment,
      unit,
      date: new Date(),
      description,
      employee: employee.value
    };
    this.setState(prevState => ({
      loanData: [...prevState.loanData, newLoan]
    }));
    setTimeout(() => {
      let LoansContent = Object.assign([], this.state.loanData);
      LoansContent.map(loan => {
        loan.employeeJMBG = loan.employee.jmbg;
        delete loan.employee;
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
    const loanData = [];
    this.setState({
      loanForm,
      loanData
    });
  };

  setLoansData = () => {
    const { loans } = this.props;
    const data = Object.values(loans);
    if (data) {
      data.map(loan => {
        if (loan.remainingPayment > 0) {
          this.setState(prevState => ({
            currentSession: {
              peopleData: [...prevState.currentSession.peopleData, loan.name],
              activeLoan: [
                ...prevState.currentSession.activeLoan,
                loan.lastLoan
              ],
              currentInstallment: [
                ...prevState.currentSession.currentInstallment,
                loan.lastInstallment
              ],
              loansData: [...prevState.currentSession.loansData, loan.loansSum],
              installmentsData: [
                ...prevState.currentSession.installmentsData,
                loan.installmentsSum
              ],
              remainingPaymentData: [
                ...prevState.currentSession.remainingPaymentData,
                loan.remainingPayment
              ],
              notesData: [...prevState.currentSession.notesData, loan.notes]
            },
            isLoading: loan.isLoading
          }));
        }
        return {};
      });
    }
  };

  componentDidMount() {
    this.setLoansData();
  }

  componentWillReceiveProps(newProps) {
    if (newProps.isLoading !== this.props.isLoading) {
      setTimeout(() => {
        this.setLoansData();
      }, 100);
    }
  }

  render() {
    const {
      currentSession: {
        peopleData,
        activeLoan,
        currentInstallment,
        loansData,
        installmentsData,
        remainingPaymentData,
        notesData
      },
      loanForm,
      isLoading
    } = this.state;

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
                <form className="portlet-body" onSubmit={this.addLoan}>
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Employee</label>
                    <Select
                      name="employee"
                      value={loanForm.employee}
                      onChange={this.handleEmployeeChange}
                      options={employeesFormated}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Amount</label>
                    <input
                      type="number"
                      className="form-control"
                      id="loanAmount"
                      placeholder="Enter Amount"
                      name="amount"
                      onChange={this.handleValueChange}
                      value={loanForm.amount}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Installment</label>
                    <input
                      type="number"
                      className="form-control"
                      id="loanInstallment"
                      placeholder="Enter installment"
                      name="installment"
                      onChange={this.handleValueChange}
                      value={loanForm.installment}
                      required
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
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                      type="number"
                      className="form-control"
                      id="loanDescription"
                      placeholder="Enter Description"
                      name="description"
                      onChange={this.handleValueChange}
                      value={loanForm.description}
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    style={{ float: "left" }}
                    className="btn btn-primary"
                    // onClick={this.addLoan}
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

                {isLoading && ( // if doing asyng things
                  <div className="flexCenter">
                    <ReactLoading type={"bars"} color={"#48c6ef"} />
                  </div>
                )}

                {!isLoading &&
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
            transform: "translateY(-50%)",
            width: "fit-content"
          }}
        >
          {
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Loans [totaled]</th>
                  <th>Installments [totaled]</th>
                  <th>Remaining Debt</th>
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
