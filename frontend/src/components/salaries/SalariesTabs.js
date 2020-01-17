import React, { Component } from "react";
import PropTypes from "prop-types";
import { confirmAlert } from "react-confirm-alert";
import profileTabItems from "../../models/profileTabs";
import ContentApi from "../../api/contentApi";
import moment from "moment/moment";
import SalaryContentApi from "../../api/salaryContentApi";
import { XCircle } from "react-feather";

export default class SalariesTabs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabs: profileTabItems,
      activeTab: {},
      displayData: []
    };
  }

  confirmTabAction = () => {
    let tabs = Object.assign([], this.state.tabs);
    const updatedTabs = tabs.map(item => {
      if (item.id === this.state.activeTab.id) {
        item.confirmed = true;
        return item;
      }
      return item;
    });
    this.setState({
      tabs: updatedTabs
    });
  };

  setTabAsActive = selectedTab => {
    let tabs = Object.assign([], this.state.tabs);
    const updatedTabs = tabs.map(item => {
      if (item.id === selectedTab.id) {
        item.active = true;
        return item;
      }
      item.active = false;
      return item;
    });
    const activeTab = updatedTabs.filter(tab => tab.active);
    this.setState({
      tabs: updatedTabs,
      activeTab: Object.assign({}, activeTab[0])
    });
    setTimeout(() => {
      this.getByIdActiveTabContent(this.props.year, this.props.month);
    }, 100);
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
    ContentApi.delete(id, this.state.activeTab.url)
      .then(response => {
        setTimeout(() => {
          this.getByIdActiveTabContent(
            this.state.activeTab.url,
            this.props.year,
            this.props.month
          );
        }, 100);
      })
      .catch(error => {
        console.log("error while adding raise salary", error);
        throw error;
      });
  };

  getByIdActiveTabContent = (year, month) => {
    SalaryContentApi.get(this.state.activeTab.url, year, month)
      .then(response => {
        this.setState({
          displayData: Object.assign([], response.data)
        });
      })
      .catch(error => {
        console.log("error while getting data", error);
        throw error;
      });
  };

  componentWillMount() {
    this.setState({
      activeTab: Object.assign({}, this.state.tabs[0])
    });
    setTimeout(() => {
      // this.confirmTabAction();
      this.getByIdActiveTabContent(this.props.year, this.props.month);
    }, 100);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      activeTab: Object.assign({}, this.state.tabs[0])
    });
    this.getByIdActiveTabContent(nextProps.year, nextProps.month);
  }

  getEmployeeFullName = item => {
    let fullName = "";
    this.props.employeesSalaries.map(emp => {
      if (Number(emp.jmbg) === Number(item.employeeJMBG)) {
        return (fullName = emp.name);
      }
      return fullName;
    });
  };

  confirmSalaryAction = () => {
    this.confirmTabAction();
    switch (this.state.activeTab.id) {
      case 1:
        this.props.updateEmployeesSalaryRaises(this.state.displayData);
        break;
      case 2:
        this.props.updateEmployeesBonuses(this.state.displayData);
        break;
      case 3:
        this.props.updateEmployeesPenalties(this.state.displayData);
        break;
      case 4:
        this.props.updateEmployeesLoans(this.state.displayData);
        break;
      case 5:
        this.props.updateEmployeesLoanNotes(this.state.displayData);
        break;
      case 6:
        this.props.updateEmployeesLoanExtraPayments(this.state.displayData);
        break;
      default:
        break;
    }
  };

  render() {
    const displayTabContent = this.state.displayData.map(item => {
      return (
        <tr key={item.date.toString()}>
          <td className="col-md-3">{this.getEmployeeFullName(item)}</td>
          <td className="col-md-2">{moment(item.date).format("MM-DD-YYYY")}</td>
          <td className="col-md-2">
            {item.amount} {item.unit}
          </td>
          <td className="col-md-4">{item.description}</td>
          <td className="col-md-1">
            <a
              className="table-actions"
              onClick={this.openDeleteConfirmModal.bind(this, item.id)}
            >
              <XCircle size="18" />
            </a>
          </td>
        </tr>
      );
    });

    const tabs = this.state.tabs.map(item => {
      return (
        <li
          className={`${item.active && "active"}`}
          key={item.id}
          onClick={() => this.setTabAsActive(item)}
        >
          <a data-toggle="tab">{item.name}</a>
        </li>
      );
    });

    return (
      <div className="portlet portlet-boxed">
        <div className="portlet-body portlet-body-salaries">
          <ul id="myTab1" className="nav nav-tabs">
            {tabs}
          </ul>
          <div id="myTab1Content">
            <div className="tab-pane fade active in">
              <button
                className="btn btn-primary ml-20"
                disabled={this.state.activeTab.confirmed}
                onClick={this.confirmSalaryAction}
              >
                {this.state.activeTab.confirmed && <span>Confirmed</span>}
                {!this.state.activeTab.confirmed && <span>Confirm</span>}
              </button>
              <table className="table table-striped mt-20">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Description</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>{displayTabContent}</tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

SalariesTabs.propTypes = {
  year: PropTypes.number.isRequired,
  month: PropTypes.number.isRequired,
  employeesSalaries: PropTypes.array.isRequired,
  addEmployeesSalaries: PropTypes.func.isRequired,
  updateEmployeesSalaryRaises: PropTypes.func.isRequired,
  updateEmployeesBonuses: PropTypes.func.isRequired,
  updateEmployeesPenalties: PropTypes.func.isRequired,
  updateEmployeesLoans: PropTypes.func.isRequired,
  updateEmployeesLoanNotes: PropTypes.func.isRequired,
  updateEmployeesLoanExtraPayments: PropTypes.func.isRequired
};
