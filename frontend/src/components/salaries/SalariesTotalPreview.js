import PropTypes from "prop-types";
import React from "react";
import ReactHTMLTableToExcel from "react-html-table-to-excel";

const SalariesTotalPreview = ({ employeesSalaries }) => {
  const totalNumberOfSalaries = employeesSalaries.length;
  const totalNumberOfPayoneerSalaries = employeesSalaries.filter(
    obj => obj.isPayoneer
  ).length;
  const totalNumberOfHandSalaries =
    totalNumberOfSalaries - totalNumberOfPayoneerSalaries;

  const totalBankHotMeals = employeesSalaries.reduce(
    (total, amount) => total + amount.bankHotMeal,
    0
  );
  const totalBankNetSalaries = employeesSalaries.reduce(
    (total, amount) => total + amount.bankNetSallary,
    0
  );
  const totalBankSalaries = (totalBankHotMeals + totalBankNetSalaries).toFixed(
    2
  );

  const totalBankContributes = employeesSalaries
    .reduce((total, amount) => total + amount.bankContributes, 0)
    .toFixed(2);

  const payoneerSalaries = employeesSalaries.filter(e => e.isPayoneer);
  const handSalariesSalaries = employeesSalaries.filter(e => !e.isPayoneer);
  const totalPayoneerSalaries = payoneerSalaries
    .reduce((total, amount) => total + amount.handTotal, 0)
    .toFixed(2);
  const totalHandSalaries = handSalariesSalaries
    .reduce((total, amount) => total + amount.handTotal, 0)
    .toFixed(2);

  return (
    <div className="portlet-body portlet-body-salaries">
      <ReactHTMLTableToExcel
        id="salaries-total-table-xls-button"
        className="btn btn-hollow plus"
        table="salariesTotalTable"
        filename="Salaries Total Preview"
        sheet="Total Preview"
        buttonText="Download as XLS"
      />
      <table
        className="table table-striped table-responsive"
        id="salariesTotalTable"
      >
        <thead>
          <tr>
            <th>Total Salaries</th>
            <th>Payoneer-Hand Salaries No</th>
            <th>Bank Total</th>
            <th>Bank Contributes</th>
            <th>Payoneer Total</th>
            <th>Hand Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{totalNumberOfSalaries}</td>
            <td>
              {totalNumberOfPayoneerSalaries} - {totalNumberOfHandSalaries}
            </td>
            <td>{totalBankSalaries}</td>
            <td>{totalBankContributes}</td>
            <td>{totalPayoneerSalaries}</td>
            <td>{totalHandSalaries}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

SalariesTotalPreview.propTypes = {
  employeesSalaries: PropTypes.array.isRequired
};

export default SalariesTotalPreview;
