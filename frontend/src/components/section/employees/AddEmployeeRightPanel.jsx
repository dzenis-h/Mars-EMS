import React from "react";
import AddEmployeeForm from "../employeeForms/AddEmployeeForm";
import Title from "../../common/Title";

const AddEmployeeRightPanel = () => {
  return (
    <div className="col-md-4">
      <div className="portlet portlet-boxed">
        <div className="portlet-header">
          <Title text="Add new employee" />
        </div>
        <div className="portlet-body">
          <div id="settings-content" className="stacked-content">
            <div className="tab-pane  in active" id="profile-tab">
              <AddEmployeeForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEmployeeRightPanel;
