import React, { useEffect } from "react";
import { FiActivity } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { httpService } from "../services/httpService";
import { GET_REPORT } from "../const/endpoints";
import { addReport } from "../store/slices/employeesSlice";
import { toast } from "react-hot-toast";
import { getMonthName } from "../helper";

const Reports = () => {
  const reports = useSelector((state) => state.employees?.reports);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getReports = async () => {
    try {
      const res = await httpService.get(GET_REPORT);
      dispatch(addReport(res?.data?.data));
    } catch (error) {
      toast.error(error?.response?.message);
    }
  };
  useEffect(() => {
    getReports();
  }, []);
  const dataTable = reports?.map((el, idx) => (
    <tr key={idx}>
      <td>{el?.year}</td>
      <td>{getMonthName(el?.month)}</td>
      {/* <td>{el.net}</td> */}
      <td>{el?.loan}</td>
      <td>{el?.penaltyTotal}</td>
      <td>{el?.bonusTotal}</td>
      <td>{el?.salaryTotal}</td>
      <td>{el?.employeeCount}</td>

      <td className="table-actions">
        <div
          onClick={() =>
            navigate("/reports/details", {
              state: {
                time: {
                  month: Number(el?.month),
                  year: el?.year,
                },
              },
            })
          }
        >
          <FiActivity size="20" />
        </div>
      </td>
    </tr>
  ));
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

            {false && ( // if doing asyng things
              <div className="flexCenter">
                <h1>Loading....</h1>
              </div>
            )}

            {true && (
              <div className="portlet-body" style={{ marginTop: "20px" }}>
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>YEAR</th>
                      <th>MONTH</th>
                      {/* <th>NET</th> */}
                      <th>LOAN</th>
                      <th>PENALTY</th>
                      <th>BONUS</th>
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
};

export default Reports;
