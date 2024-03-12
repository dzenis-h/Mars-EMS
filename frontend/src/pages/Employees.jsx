import React from "react";
import AddEmployeeRightPanel from "../components/section/employees/AddEmployeeRightPanel";
import EmployeesTable from "../components/section/employees/EmployeesTable";
import Title from "../components/common/Title";

const Employees = () => {
  return (
    <div className="container">
      <div className="row">
        <AddEmployeeRightPanel />
        <div className="col-md-8">
          <div className="portlet portlet-boxed">
            <div className="portlet-header">
              <Title text="Employees" />
            </div>
            <EmployeesTable />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Employees;
