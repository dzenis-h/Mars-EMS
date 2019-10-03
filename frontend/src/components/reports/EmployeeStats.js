import React, { Component } from "react";
import EmployeeApi from "../../api/employeeApi";
import { ArrowLeft } from "react-feather";
import * as _ from "lodash";
import moment from "moment";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";

class EmployeeStats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentEmployee: {
        salaryInfo: []
      }
    };
  }

  // MAKING IT POSSIBELE TO GO BACK
  static contextTypes = {
    router: () => {}
  };

  getEmployeeSalaryData = async () => {
    // Getting the selected employee
    const { item } = this.props.history.location.state;

    const employee = await EmployeeApi.getEmployee(item);
    this.setState(prevState => ({
      currentEmployee: {
        ...prevState.currentEmployee,
        salaryInfo: Object.assign([], employee.data)
      }
    }));
  };

  componentDidMount() {
    this.getEmployeeSalaryData();
  }

  render() {
    // Getting access to the selected employee
    const { item } = this.props.history.location.state;
    // Getting the salary data from the selected employee
    const { salaryInfo } = this.state.currentEmployee;
    const { employees } = this.props;
    // Getting only the name value from selected fullName property
    const onlyName = item.substr(0, item.indexOf(" "));
    // Making sure only existing values are rendered
    let workedDates = [];

    salaryInfo.forEach(sal => {
      if (sal.totalNetSalary !== "") {
        workedDates.push(sal);
      }
    });

    // GETTING AN ARRAY OF EMPLOYEES START DATES
    let currentEmp = [];
    employees.map(y => {
      if ((y.name + " " + y.surname).toString() === item.toString()) {
        return currentEmp.push(y);
      }
      return null;
    });

    // Getting start & end dates
    const empStartDate = currentEmp.map(x =>
      moment(x.startdate).format("M/YYYY")
    );
    const empEndDate = currentEmp.map(x => {
      if (x.enddate !== undefined) {
        return moment(x.enddate).format("M/YYYY");
      } else {
        return (
          <span key={empStartDate + empEndDate} style={{ color: "#48c6ef" }}>
            Still active
          </span>
        );
      }
    });

    // FORMATTING THE SELECTED REPORT AND REVERSING THE ORDER
    let finalForamt = _.sortBy(workedDates, function(o) {
      return new moment(o.date);
    }).reverse();

    const columns = [
      {
        dataField: "year",
        text: "YEAR"
      },
      {
        dataField: "month",
        text: "MONTH"
      },
      {
        dataField: "totalGrossSalary",
        text: "GROSS"
      },
      {
        dataField: "totalNetSalary",
        text: "NET"
      },
      {
        dataField: "bankHotMeal",
        text: "MEAL"
      },
      {
        dataField: "bankContributes",
        text: "TAX"
      },
      {
        dataField: "handTotal",
        text: "SALARY"
      }
    ];

    let allValues = Number(finalForamt.length);

    const options = {
      paginationSize: 12,
      pageStartIndex: 0,
      firstPageText: "First",
      prePageText: "Back",
      nextPageText: "Next",
      lastPageText: "Last",
      nextPageTitle: "First page",
      prePageTitle: "Pre page",
      firstPageTitle: "Next page",
      lastPageTitle: "Last page",
      sizePerPageList: [
        {
          text: "1 year",
          value: 12
        },
        {
          text: "2 years",
          value: 24
        },
        {
          text: "All years",
          value: allValues
        }
      ]
    };

    return (
      <div className="container">
        <div className="row navigation-row-2">
          <p
            className="btn btn-hollow"
            onClick={this.context.router.history.goBack}
          >
            <ArrowLeft size="18" className="button-left-icon" /> Go back to
            Details
          </p>
        </div>

        <div>
          <header style={{ textAlign: "center" }}>
            <h4>
              {" "}
              <span style={{ color: "#48C6EF", fontStyle: "italic" }}>
                {" "}
                {onlyName}'s
              </span>{" "}
              detailed payment info{" "}
            </h4>
          </header>

          <div className="col-md-6" style={{ textAlign: "center" }}>
            <p>
              START DATE <i className={`fa fa-long-arrow-right`}></i>
              <span
                style={{
                  fontFamily: "Arial",
                  color: "#0ea55c",
                  fontWeight: "bold",
                  letterSpacing: "2px",
                  fontSize: "1,5rem"
                }}
              >
                {" "}
                {empStartDate}
              </span>
            </p>
          </div>
          <div className="col-md-6" style={{ textAlign: "center" }}>
            <p>
              END DATE <i className={`fa fa-long-arrow-right`}></i>
              <span
                style={{
                  fontFamily: "Arial",
                  color: "#da002e",
                  fontWeight: "bold",
                  letterSpacing: "2px",
                  fontSize: "1,5rem"
                }}
              >
                {" "}
                {empEndDate}
              </span>
            </p>
          </div>
          <hr />
        </div>

        <BootstrapTable
          keyField="rowNumber"
          striped
          data={finalForamt}
          columns={columns}
          pagination={paginationFactory(options)}
        />
      </div>
    );
  }
}

export default EmployeeStats;
