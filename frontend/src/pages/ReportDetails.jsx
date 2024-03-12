import React, { useEffect, useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import ReactApexChart from "react-apexcharts";
import {
  activeOptions,
  maleFemaleoptions,
  roleOptions,
} from "../const/chartOptions";
import { FiActivity } from "react-icons/fi";
import Title from "../components/common/Title";
import moment from "moment";
import { httpService } from "../services/httpService";
import { GET_REPORT_DETAILS } from "../const/endpoints";
import { toast } from "react-hot-toast";
import { getMonthName } from "../helper";

const ReportDetails = () => {
  const [reportsData, setReportsData] = useState([]);
  const [chartsData, setChartsData] = useState({});
  const navigate = useNavigate();
  const { time } = useLocation()?.state;
  const date = moment();
  const currentDate = date.format("YYYY-MM-DD");
  const displayDate = `${getMonthName(time?.month)} of ${time?.year}`;
  const maleData = chartsData?.totalMale * 100;
  const femaleData = chartsData?.totalFemale * 100;
  const activeStats = chartsData?.active_employees * 100;
  const notActiveStats = chartsData?.inactive_employees * 100;
  const rawStats = {
    devStats: chartsData?.Developer,
    qaStats: chartsData?.QA,
    adminStats: chartsData?.Admin,
    managementStats: chartsData?.Executive,
    designStats: chartsData?.Other,
    internStats: chartsData?.Intern,
  };

  const totalRoles = Object.values(rawStats)?.reduce(
    (total, count) => total + count,
    0
  );

  // Calculate percentage of each role
  const roleStats = {};
  for (const role in rawStats) {
    const percentage = (rawStats[role] / totalRoles) * 100;
    roleStats[role] = Number(percentage?.toFixed(2));
  }

  const dataTable = reportsData?.map((el, idx) => (
    <tr key={idx}>
      <td>{idx + 1}</td>
      <td>{el?.employeeDetails?.full_name ?? 0}</td>
      <td>{el?.bonusData[0]?.totalBonus ?? 0}</td>
      <td>{el?.penaltiesData[0]?.totalPenalty ?? 0}</td>
      <td>{el?.loanData[0]?.totalInstallment ?? 0}</td>
      <td>{el?.employeeDetails?.salary ?? 0}</td>
      <td className="table-actions">
        <div
          onClick={() =>
            navigate(`${el?.employeeDetails?._id}`, { state: { details: el } })
          }
        >
          <FiActivity size="20" />
        </div>
      </td>
    </tr>
  ));

  const getReportDetails = async () => {
    try {
      const res = await httpService.get(
        `${GET_REPORT_DETAILS}?month=${time?.month}&year=${time?.year}&status=1`
      );
      setReportsData(res?.data?.data?.reportDetails);
      setChartsData(res?.data?.data?.chartData);
    } catch (error) {
      toast.error(error?.response?.message);
    }
  };

  useEffect(() => {
    getReportDetails();
  }, []);
  return (
    <div className="container">
      <div className="row navigation-row-2">
        <NavLink to="/reports" className="btn">
          <FaArrowLeftLong size="18" className="button-left-icon" /> Go back to
          reports
        </NavLink>
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
                  <th>NO</th>
                  <th>NAME</th>
                  <th>BONUSES</th>
                  <th>PENALALTIES</th>
                  <th>LOANS</th>
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
                    fontSize: "2rem",
                  }}
                >
                  {" "}
                  {dataTable?.length}{" "}
                </span>
              </h6>
            </div>
          </div>

          <div className="portlet portlet-boxed">
            <div className="portlet-header">
              <Title text="Male vs. Female Ratio" />
            </div>
            <div
              className="portlet-body"
              style={{
                textAlign: "center",
                fontWeight: "400",
                letterSpacing: "2px",
              }}
            >
              <p>
                {" "}
                <span
                  style={{
                    fontFamily: "Arial",
                    color: "#1E91B5",
                    fontWeight: "bold",
                    letterSpacing: "2px",
                  }}
                >
                  Male
                </span>{" "}
                <i className={`fa fa-long-arrow-right`} />{" "}
                {Number(maleData.toFixed(2))} %
              </p>
              <p>
                <span
                  style={{
                    fontFamily: "Arial",
                    color: "#BE95C4",
                    fontWeight: "bold",
                    letterSpacing: "2px",
                  }}
                >
                  Female
                </span>{" "}
                <i className={`fa fa-long-arrow-right`} />{" "}
                {Number(femaleData.toFixed(2))} %
              </p>
              <div className="col-md-4"></div>
              <ReactApexChart
                type="donut"
                height={250}
                width={250}
                options={maleFemaleoptions}
                series={[maleData, femaleData]}
              />
            </div>
          </div>

          <div className="portlet portlet-boxed">
            <div className="portlet-header">
              <h4 className="portlet-title">
                <span>Active vs. Inactive Stats</span>
                <hr />
                <span className="">
                  ON DATE <i className={`fa fa-long-arrow-right`} />
                  <span
                    style={{
                      fontFamily: "Arial",
                      color: "#3291b6",
                      fontWeight: "bold",
                      letterSpacing: "2px",
                    }}
                  >
                    {currentDate}
                  </span>
                </span>
              </h4>
            </div>
            <div
              className="portlet-body"
              style={{
                textAlign: "center",
                fontWeight: "400",
                letterSpacing: "2px",
              }}
            >
              <p>
                {" "}
                <span
                  style={{
                    fontFamily: "Arial",
                    color: "#36b35e",
                    fontWeight: "bold",
                    letterSpacing: "2px",
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
                    letterSpacing: "2px",
                  }}
                >
                  Inactive
                </span>{" "}
                <i className={`fa fa-long-arrow-right`} /> {notActiveStats} %
              </p>
              <ReactApexChart
                type="donut"
                height={250}
                width={250}
                options={activeOptions}
                series={[activeStats, notActiveStats]}
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
                letterSpacing: "2px",
              }}
            >
              <p>
                {" "}
                <span
                  style={{
                    fontFamily: "Arial",
                    color: "#3566ba",
                    fontWeight: "bold",
                    letterSpacing: "2px",
                  }}
                >
                  DEV
                </span>{" "}
                <i className={`fa fa-long-arrow-right`} /> {roleStats.devStats}{" "}
                %
              </p>
              <p>
                <span
                  style={{
                    fontFamily: "Arial",
                    color: "#5db84e",
                    fontWeight: "bold",
                    letterSpacing: "2px",
                  }}
                >
                  QA
                </span>{" "}
                <i className={`fa fa-long-arrow-right`} /> {roleStats.qaStats} %
              </p>
              <p>
                <span
                  style={{
                    fontFamily: "Arial",
                    color: "#c43323",
                    fontWeight: "bold",
                    letterSpacing: "2px",
                  }}
                >
                  ADMIN
                </span>{" "}
                <i className={`fa fa-long-arrow-right`} />{" "}
                {roleStats.adminStats} %
              </p>
              <p>
                <span
                  style={{
                    fontFamily: "Arial",
                    color: "#b5872b",
                    fontWeight: "bold",
                    letterSpacing: "2px",
                  }}
                >
                  INTERN
                </span>{" "}
                <i className={`fa fa-long-arrow-right`} />{" "}
                {roleStats.internStats} %
              </p>
              <p>
                <span
                  style={{
                    fontFamily: "Arial",
                    color: "#9620db",
                    fontWeight: "bold",
                    letterSpacing: "2px",
                  }}
                >
                  UI/ UX
                </span>{" "}
                <i className={`fa fa-long-arrow-right`} />{" "}
                {roleStats.designStats} %
              </p>
              <p>
                <span
                  style={{
                    fontFamily: "Arial",
                    color: "#eb7b3d",
                    fontWeight: "bold",
                    letterSpacing: "2px",
                  }}
                >
                  EXECUTIVE
                </span>{" "}
                <i className={`fa fa-long-arrow-right`} />{" "}
                {roleStats.managementStats} %
              </p>
              <ReactApexChart
                type="donut"
                height={250}
                width={250}
                options={roleOptions}
                series={[
                  roleStats.devStats,
                  roleStats.designStats,
                  roleStats.managementStats,
                  roleStats.qaStats,
                  roleStats.internStats,
                  roleStats.adminStats,
                ]}
              />
              {/* <PieChart
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
                      color: "#eb7b3d",
                    },
                  ]}
                  styles={{
                    ".chart_text": {
                      fontSize: "2em",
                      fontFamily: "serif",
                      fontWeight: "bold",
                      fill: "#00000",
                    },
                  }}
                /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportDetails;
