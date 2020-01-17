import React, { Component } from "react";
import { ArrowLeft, Activity } from "react-feather";
import { Link } from "react-router-dom";
import moment from "moment";
import { PieChart } from "react-easy-chart";
import _ from "lodash";

import { connect } from "react-redux";
import { saveSelectedDate } from "../../actions/selectedDateActions";
import { getSpecificSalaryData } from "../../actions/reportsDetailsActions";

class ReportsDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSession: {
        salaryInfo: [],
        fullNames: []
      }
    };
  }

  // The relevant data already exists in the Redux store, use that
  // -> [the user selected the same date, or is going back from the Employee Details component]
  dataExists = () => {
    const { details } = this.props;
    this.setState({
      currentSession: {
        fullNames: details.names, // Storing the relevant names
        salaryInfo: Object.values(details.salaryInfo) // Getting the salary data
      }
    });
  };

  getEmployeeSalaryData = () => {
    const { details } = this.props;
    // if the props are available, set the state
    if (!_.isEmpty(details)) {
      this.setState({
        currentSession: {
          fullNames: details.names, // Storing the relevant names
          salaryInfo: Object.values(details.salaryInfo) // Storing the salary data
        }
      });
    }
  };

  componentWillReceiveProps(newProps) {
    // if the props have changed, update the state
    if (newProps.details !== this.props.details) {
      this.getEmployeeSalaryData();
    }
  }

  componentDidMount() {
    // if we already have Report Details available use them, initially
    if (!_.isEmpty(this.props.details)) {
      this.dataExists();
    }
  }

  render() {
    const { employees } = this.props;

    // GETTING THE SELECTED VALUES AS PROPS
    const { relYear } = this.props.history.location.state.dev;
    const { relMonth } = this.props.history.location.state.dev;
    // Specific employee sheets - [ALL]
    const { salaryInfo, fullNames } = this.state.currentSession;

    // FORMATING THE SELECTED DATE
    let displayDate = relMonth + " of " + relYear;

    // Getting the basic emp info used for stats
    let empData = [];

    for (let x = 0; x < fullNames.length; x++) {
      employees.map(y => {
        if ((y.name + " " + y.surname).toString() === fullNames[x].toString()) {
          empData.push(y);
        }
        return null;
      });
    }

    // BASIC FORMATTING:
    // GETTING THE GENDER DATA
    let maleArr = [];
    let femaleArr = [];

    // LOOPING OVER RELEVANT EMPLOYEES AND MAKING MEN vs WOMEN RATIO DATA
    empData.forEach(gen => {
      if (gen.gender.toString() === "M") {
        maleArr.push(gen.gender);
      } else {
        femaleArr.push(gen.gender);
      }
    });

    // GETTING THE POSITION DATA
    let dev = [];
    let qa = [];
    let admin = [];
    let intern = [];
    let design = [];
    let management = [];

    // LOOPING OVER RELEVANT EMPLOYEES AND POSITION DATA
    empData.forEach(type => {
      switch (type.position) {
        case "DEV":
          dev.push(type.position);
          break;
        case "QA":
          qa.push(type.position);
          break;
        case "ADMIN":
          admin.push(type.position);
          break;
        case "INTERN":
          intern.push(type.position);
          break;
        case "DESIGN":
          design.push(type.position);
          break;
        case "EXECUTIVE":
          management.push(type.position);
          break;
        default:
          return null;
      }
    });

    // MAKING MEN vs WOMEN RATIO DATA
    let empNum = empData.length;
    let maleNum = maleArr.length;
    let femaleNum = femaleArr.length;

    //MAKING POSITION STATS:
    let devNum = dev.length;
    let qaNum = qa.length;
    let adminNum = admin.length;
    let internNum = intern.length;
    let designNum = design.length;
    let managementNum = management.length;

    // WORKING vs NOT WORKING STATS
    let stillActive = [];
    let notActive = [];

    empData.map(item => {
      if (item.enddate) {
        return notActive.push(item);
      } else {
        return stillActive.push(item);
      }
    });

    let activeNum = stillActive.length;
    let notActiveNum = notActive.length;

    // MAKING THE FINAL PRCENTAGE DATA
    const maleData = ((maleNum / empNum) * 100).toFixed(2);
    const femaleData = ((femaleNum / empNum) * 100).toFixed(2);
    // ...and the same for positions
    const devStats = ((devNum / empNum) * 100).toFixed(2);
    const qaStats = ((qaNum / empNum) * 100).toFixed(2);
    const adminStats = ((adminNum / empNum) * 100).toFixed(2);
    const internStats = ((internNum / empNum) * 100).toFixed(2);
    const designStats = ((designNum / empNum) * 100).toFixed(2);
    const managementStats = ((managementNum / empNum) * 100).toFixed(2);

    // ...now for the currently working stats
    const activeStats = ((activeNum / empNum) * 100).toFixed(2);
    const notActiveStats = ((notActiveNum / empNum) * 100).toFixed(2);

    // getting the current date
    let currentDate = moment().format("LL");

    // STARTING FROM HERE IS EVERYTHING NEDED TO CALC AND DISPLAY THE PROPER TABLE DATA

    let grossSalary = [];
    let netSalary = [];
    let meals = [];
    let taxes = [];
    let handSalary = [];

    salaryInfo.map(ex => {
      netSalary.push(ex.totalNetSalary);
      grossSalary.push(ex.totalGrossSalary);
      meals.push(ex.bankHotMeal);
      taxes.push(ex.bankContributes);
      handSalary.push(ex.handSalary);
      return null;
    });

    // Generate Ids for the table
    function* createIds() {
      let id = 1;
      while (true) {
        yield id++;
      }
    }

    let getIds = createIds();

    // Preparing the data forrendering
    const dataTable = fullNames.map((item, idx) => {
      return (
        <tr key={item}>
          <td>{getIds.next().value}</td>
          <td>{item}</td>
          <td>{netSalary[idx]}</td>
          <td>{grossSalary[idx]}</td>
          <td>{meals[idx]}</td>
          <td>{taxes[idx]}</td>
          <td>{handSalary[idx]}</td>
          <td className="table-actions">
            <Link
              to={{ pathname: `/reports/details/${item}`, state: { item } }}
            >
              <Activity size="20" />
            </Link>
          </td>
        </tr>
      );
    });

    return (
      <div className="container">
        <div className="row navigation-row-2">
          <Link to="/reports" className="btn btn-hollow">
            <ArrowLeft size="18" className="button-left-icon" /> Go back to
            reports
          </Link>
        </div>

        <div>
          <header style={{ textAlign: "center" }}>
            <h4>
              {" "}
              List of all relevant employees for
              <span style={{ color: "#48C6EF", fontStyle: "italic" }}>
                {" "}
                {displayDate}{" "}
              </span>
            </h4>

            <p style={{ color: "#48C6EF", margin: "0px" }}>
              Further details available by clicking on an icon{" "}
            </p>
          </header>
          <hr />
        </div>

        <div className="row">
          <div className="col-lg-9">
            <div className="portlet-body2">
              <table className="table table-striped auto-index">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>NAME</th>
                    <th>NET</th>
                    <th>GROSS</th>
                    <th>MEALS</th>
                    <th>TAXES</th>
                    <th>SALARY</th>
                    <th>DETAILS</th>
                  </tr>
                </thead>
                <tbody>{dataTable}</tbody>
              </table>
            </div>
          </div>

          <div className="col-lg-3">
            <div className="portlet portlet-boxed">
              <div className="portlet-header">
                <h6>
                  {" "}
                  Total number of employees{" "}
                  <i className={`fa fa-long-arrow-right`} />
                  <span
                    style={{
                      fontFamily: "Arial",
                      color: "#3291b6",
                      fontWeight: "bold",
                      letterSpacing: "3px",
                      fontSize: "2rem"
                    }}
                  >
                    {" "}
                    {dataTable.length}{" "}
                  </span>
                </h6>
              </div>
            </div>

            <div className="portlet portlet-boxed">
              <div className="portlet-header">
                <h4 className="portlet-title">Male vs. Female Ratio</h4>
              </div>
              <div
                className="portlet-body"
                style={{
                  textAlign: "center",
                  fontWeight: "400",
                  letterSpacing: "2px"
                }}
              >
                <p>
                  {" "}
                  <span
                    style={{
                      fontFamily: "Arial",
                      color: "#1E91B5",
                      fontWeight: "bold",
                      letterSpacing: "2px"
                    }}
                  >
                    Male
                  </span>{" "}
                  <i className={`fa fa-long-arrow-right`} /> {maleData} %
                </p>
                <p>
                  <span
                    style={{
                      fontFamily: "Arial",
                      color: "#BE95C4",
                      fontWeight: "bold",
                      letterSpacing: "2px"
                    }}
                  >
                    Female
                  </span>{" "}
                  <i className={`fa fa-long-arrow-right`} /> {femaleData} %
                </p>
                <PieChart
                  className="col-md-4"
                  size={220}
                  innerHoleSize={110}
                  data={[
                    { key: "Men", value: maleData, color: "#9cd2e2" },
                    { key: "Women", value: femaleData, color: "#d6badb" }
                  ]}
                  styles={{
                    ".chart_text": {
                      fontSize: "2em",
                      fontFamily: "serif",
                      fontWeight: "bold",
                      fill: "#00000"
                    }
                  }}
                />
              </div>
            </div>

            <div className="portlet portlet-boxed">
              <div className="portlet-header">
                <h4 className="portlet-title">
                  Active vs. Inactive Stats <br />
                  ON DATE <i className={`fa fa-long-arrow-down`} />
                  <br />
                  <span
                    style={{
                      fontFamily: "Arial",
                      color: "#3291b6",
                      fontWeight: "bold",
                      letterSpacing: "2px"
                    }}
                  >
                    {" "}
                    {currentDate}
                  </span>
                </h4>
              </div>
              <div
                className="portlet-body"
                style={{
                  textAlign: "center",
                  fontWeight: "400",
                  letterSpacing: "2px"
                }}
              >
                <p>
                  {" "}
                  <span
                    style={{
                      fontFamily: "Arial",
                      color: "#36b35e",
                      fontWeight: "bold",
                      letterSpacing: "2px"
                    }}
                  >
                    Active
                  </span>{" "}
                  <i className={`fa fa-long-arrow-right`} /> {activeStats} %
                </p>
                <p>
                  <span
                    style={{
                      fontFamily: "Arial",
                      color: "#c93c3c",
                      fontWeight: "bold",
                      letterSpacing: "2px"
                    }}
                  >
                    Inactive
                  </span>{" "}
                  <i className={`fa fa-long-arrow-right`} /> {notActiveStats} %
                </p>
                <PieChart
                  className="col-md-4"
                  size={220}
                  innerHoleSize={110}
                  data={[
                    { key: "Active", value: activeStats, color: "#36b35e" },
                    { key: "Inactive", value: notActiveStats, color: "#c93c3c" }
                  ]}
                  styles={{
                    ".chart_text": {
                      fontSize: "2em",
                      fontFamily: "serif",
                      fontWeight: "bold",
                      fill: "#00000"
                    }
                  }}
                />
              </div>
            </div>

            <div className="portlet portlet-boxed">
              <div className="portlet-header">
                <h4 className="portlet-title">Position Statistics</h4>
              </div>
              <div
                className="portlet-body"
                style={{
                  textAlign: "center",
                  fontWeight: "400",
                  letterSpacing: "2px"
                }}
              >
                <p>
                  {" "}
                  <span
                    style={{
                      fontFamily: "Arial",
                      color: "#3566ba",
                      fontWeight: "bold",
                      letterSpacing: "2px"
                    }}
                  >
                    DEV
                  </span>{" "}
                  <i className={`fa fa-long-arrow-right`} /> {devStats} %
                </p>
                <p>
                  <span
                    style={{
                      fontFamily: "Arial",
                      color: "#5db84e",
                      fontWeight: "bold",
                      letterSpacing: "2px"
                    }}
                  >
                    QA
                  </span>{" "}
                  <i className={`fa fa-long-arrow-right`} /> {qaStats} %
                </p>
                <p>
                  <span
                    style={{
                      fontFamily: "Arial",
                      color: "#c43323",
                      fontWeight: "bold",
                      letterSpacing: "2px"
                    }}
                  >
                    ADMIN
                  </span>{" "}
                  <i className={`fa fa-long-arrow-right`} /> {adminStats} %
                </p>
                <p>
                  <span
                    style={{
                      fontFamily: "Arial",
                      color: "#b5872b",
                      fontWeight: "bold",
                      letterSpacing: "2px"
                    }}
                  >
                    INTERN
                  </span>{" "}
                  <i className={`fa fa-long-arrow-right`} /> {internStats} %
                </p>
                <p>
                  <span
                    style={{
                      fontFamily: "Arial",
                      color: "#9620db",
                      fontWeight: "bold",
                      letterSpacing: "2px"
                    }}
                  >
                    UI/ UX
                  </span>{" "}
                  <i className={`fa fa-long-arrow-right`} /> {designStats} %
                </p>
                <p>
                  <span
                    style={{
                      fontFamily: "Arial",
                      color: "#eb7b3d",
                      fontWeight: "bold",
                      letterSpacing: "2px"
                    }}
                  >
                    EXECUTIVE
                  </span>{" "}
                  <i className={`fa fa-long-arrow-right`} /> {managementStats} %
                </p>
                <PieChart
                  className="col-md-4"
                  size={220}
                  innerHoleSize={110}
                  data={[
                    { key: "DEV", value: devStats, color: "#3566ba" },
                    { key: "QA", value: qaStats, color: "#5db84e" },
                    { key: "ADMIN", value: adminStats, color: "#c43323" },
                    { key: "INTERN", value: internStats, color: "#b5872b" },
                    { key: "DESIGN", value: designStats, color: "#9620db" },
                    {
                      key: "MANAGEMENT",
                      value: managementStats,
                      color: "#eb7b3d"
                    }
                  ]}
                  styles={{
                    ".chart_text": {
                      fontSize: "2em",
                      fontFamily: "serif",
                      fontWeight: "bold",
                      fill: "#00000"
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { relevantDate: state.selectedDate, myData: state.reportsDetails };
};

export default connect(mapStateToProps, {
  saveSelectedDate,
  getSpecificSalaryData
})(ReportsDetails);
