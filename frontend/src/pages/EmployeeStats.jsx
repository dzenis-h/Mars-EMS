import React from "react";
import { FaArrowLeft } from "react-icons/fa6";
import EmpSalariesTable from "../components/section/reports/EmpSalariesTable";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const EmployeeStats = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { details } = useLocation()?.state;
  return (
    <div className="container">
      <div className="row navigation-row-2">
        <p className="btn btn-hollow" onClick={() => navigate(-1)}>
          <FaArrowLeft size="18" className="button-left-icon" /> Go back to
          Details
        </p>
      </div>

      <div>
        <header style={{ textAlign: "center" }}>
          <h4>
            {" "}
            <span style={{ color: "#48C6EF", fontStyle: "italic" }}>
              {details?.employeeDetails?.full_name}
            </span>
            {"'s "}
            detailed payment info{" "}
          </h4>
        </header>

        <hr />
      </div>
      <EmpSalariesTable emp_id={params?.id} />
    </div>
  );
};

export default EmployeeStats;
