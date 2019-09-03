import React, { Component } from "react";
import ReportsApi from "../../api/reportsApi";
import { Activity } from "react-feather";
import { Link } from "react-router-dom";
import ReactLoading from "react-loading";

class Reports extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSession: {
        yearsData: [],
        monthsData: [],
        netData: [],
        grossData: [],
        mealsData: [],
        taxData: [],
        handSalaryData: [],
        employeeNum: []
      },
      isLoading: true
    };
  }

  // Getting the backend data
  getSalaryDetails = () => {
    ReportsApi.getReports().then(res => {
      console.log(res.data);

      let years = res.data.yearsData.reverse();
      let months = res.data.monthsData.reverse();

      let net = res.data.netoData.reverse();
      let gross = res.data.grossData.reverse();
      let meals = res.data.mealsData.reverse();
      let tax = res.data.taxesData.reverse();
      let hand = res.data.handSalaryData.reverse();
      let empNum = res.data.numOfEmps.reverse();

      this.setState(() => ({
        currentSession: {
          yearsData: years,
          monthsData: months,
          netData: net,
          grossData: gross,
          mealsData: meals,
          taxData: tax,
          handSalaryData: hand,
          employeeNum: empNum
        },
        isLoading: false
      }));
    });
  };

  componentDidMount() {
    this.getSalaryDetails();
  }

  render() {
    const {
      yearsData,
      monthsData,
      netData,
      grossData,
      mealsData,
      taxData,
      handSalaryData,
      employeeNum
    } = this.state.currentSession;

    // Preparing the data forrendering
    const dataTable = yearsData.map((item, idx) => {
      let yearX = item;
      let monthX = monthsData[idx];
      let dev = {};
      dev.relMonth = monthX;
      dev.relYear = yearX;
      return (
        <tr key={yearX + monthX}>
          <td>{item}</td>
          <td>{monthsData[idx]}</td>

          <td>{netData[idx]}</td>
          <td>{grossData[idx]}</td>
          <td>{mealsData[idx]}</td>
          <td>{taxData[idx]}</td>
          <td>{handSalaryData[idx]}</td>
          <td>{employeeNum[idx]}</td>

          <td className="table-actions">
            <Link to={{ pathname: `/reports/details`, state: { dev } }}>
              <Activity size="20" />
            </Link>
          </td>
        </tr>
      );
    });

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="portlet portlet-boxed">
              <div className="portlet-header">
                <h4>
                  List of all reports <br />
                </h4>
                <p className="portlet-title">
                  <span style={{ color: "#48C6EF" }}>
                    Details available by clicking on an icon
                  </span>
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

              {this.state.currentSession.netData.length > 0 && (
                <div className="portlet-body" style={{ marginTop: "20px" }}>
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>YEAR</th>
                        <th>MONTH</th>
                        <th>NET</th>
                        <th>GROSS</th>
                        <th>MEALS</th>
                        <th>TAXES</th>
                        <th>SALARY</th>
                        <th>EMPLOYEES</th>
                        <th>DETAILS</th>
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
    );
  }
}

export default Reports;
