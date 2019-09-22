import PropTypes from "prop-types";
import React from "react";
import ReactHTMLTableToExcel from "react-html-table-to-excel";

const SalariesTable = ({ employeesSalaries }) => {
  const employeesDataList = employeesSalaries.map(item => {
    return (
      <tr key={item.jmbg}>
        <td className="salaries-table__decoration">{item.name}</td>
        <td>{item.totalNetSalary}</td>
        <td className="salaries-table__decoration">{item.totalGrossSalary}</td>
        <td>{item.bankGrossSalary}</td>
        <td>{item.bankNetSallary}</td>
        <td>{item.bankContributes}</td>
        <td className="salaries-table__decoration">{item.bankHotMeal}</td>
        <td>{item.handSalary}</td>
        <td>{item.handBonus}</td>
        <td>{item.handPenalty}</td>
        <td className="salaries-table__decoration">{item.handTotal}</td>
        <td>{item.loan}</td>
        <td>{item.installment}</td>
        <td>{item.note}</td>
      </tr>
    );
  });

  return (
    <div className="portlet portlet-boxed">
      <div className="portlet-body portlet-body-salaries">
        <ReactHTMLTableToExcel
          id="salaries-table-xls-button"
          className="btn btn-hollow plus"
          table="salariesTable"
          filename="Salaries"
          sheet="Preview"
          buttonText="Download as XLS"
        />
        <table className="table table-striped mt-20" id="salariesTable">
          <thead>
            <tr>
              <th className="salaries-table__first-col salaries-table__decoration">
                Full name
              </th>
              <th>Total Net Salary</th>
              <th className="salaries-table__decoration">Total Gross Salary</th>
              <th>Bank Gross Salary</th>
              <th>Bank Net Salary</th>
              <th>Bank Contributes</th>
              <th className="salaries-table__decoration">Bank Hot Meal</th>
              <th>Hand Salary</th>
              <th>Hand Bonus</th>
              <th>Hand Penalty</th>
              <th className="salaries-table__decoration">Hand Total</th>
              <th>Loan</th>
              <th>Installment</th>
              <th>Note</th>
            </tr>
          </thead>
          <tbody>{employeesDataList}</tbody>
        </table>
      </div>
    </div>
  );
};

SalariesTable.propTypes = {
  employeesSalaries: PropTypes.array.isRequired,
  getEmployeesSalaries: PropTypes.func.isRequired
};

export default SalariesTable;
