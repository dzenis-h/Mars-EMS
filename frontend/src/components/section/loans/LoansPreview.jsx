import React from "react";
import noPenaltiesIl from "/assets/img/no-penalties-illustration.png";
import { useSelector } from "react-redux";

const LoansPreview = () => {
  const loans = useSelector((state) => state?.employees?.loans);

  // if (loans.length < 1) {
  //   return;
  // }

  const dataTable = loans?.map((item, idx) => (
    <tr key={idx}>
      <td> {item?.employeeName}</td>
      <td> {item?.installment}</td>
      <td> {item?.loanAmount}</td>
      {/* <td> {item?.description}</td> */}
    </tr>
  ));
  return (
    <div className="portlet portlet-boxed">
      <div className="portlet-header">
        <h4>
          Currently active loans <i className={`fa fa-long-arrow-right`} />
          <span
            style={{
              fontFamily: "Arial",
              color: "#3291b6",
              fontWeight: "bold",
              letterSpacing: "3px",
              fontSize: "30px",
            }}
          >
            {" "}
            {dataTable.length}{" "}
          </span>
        </h4>
        <p style={{ color: "#48C6EF" }}>
          Loans stats, monthly instalments, and notes <br />
        </p>
      </div>

      {dataTable.length < 1 && (
        <div className="portlet-body no-penalties__wrapper">
          <img
            src={noPenaltiesIl}
            alt="Missing data illustration"
            className="no-data__image"
          />
          <p className="no-data">
            There are no active loans added at the moment! <br />
            You can add them by filling out te form on the left.
          </p>
        </div>
      )}
      {dataTable.length > 0 && (
        <div className="portlet-body">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Installment</th>
                <th>Loan Amount</th>
                {/* <th>Still Remaining</th>
                <th>Note</th> */}
              </tr>
            </thead>
            <tbody>{dataTable}</tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default LoansPreview;
