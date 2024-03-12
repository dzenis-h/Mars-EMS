import React, { useState } from "react";
import AddPenlaltyForm from "../components/section/employeeForms/AddPenlaltyForm";
import AddBonusForm from "../components/section/employeeForms/AddBonusForm";
import EmployeePenaltyPreview from "../components/section/previewTabs/EmployeePenaltyPreview";
import EmployeeBonusPreview from "../components/section/previewTabs/EmployeeBonusPreview";
import Title from "../components/common/Title";

const Home = () => {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4">
          <div className="portlet portlet-boxed">
            <div className="portlet-header">
              <div className="d-flex flex-row align-items-center justify-content-between">
                <Title
                  active={activeTab === 0 ? true : false}
                  text="Enter multiple penalties"
                  onClick={() => setActiveTab(0)}
                />
                <Title
                  active={activeTab === 1 ? true : false}
                  text="Add Bonus"
                  onClick={() => setActiveTab(1)}
                />
              </div>
            </div>
            {activeTab === 0 ? <AddPenlaltyForm /> : <AddBonusForm />}
          </div>
        </div>
        <div className="col-md-8">
          {activeTab === 0 ? (
            <EmployeePenaltyPreview />
          ) : (
            <EmployeeBonusPreview />
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
