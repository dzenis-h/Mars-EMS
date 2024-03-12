import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { httpService } from "../../../services/httpService";
import { GET_REPORT_DETAILS } from "../../../const/endpoints";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const SalariesTable = ({ date }) => {
  const [salaries, setSalaries] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log(salaries, "");

  const getReportDetails = async () => {
    try {
      const res = await httpService.get(
        `${GET_REPORT_DETAILS}?month=${date?.month}&year=${date?.year}&status=0`
      );
      setSalaries(res?.data?.data?.reportDetails);
    } catch (error) {
      toast.error(error?.response?.message);
    }
  };

  useEffect(() => {
    getReportDetails();
  }, []);

  const filtered = salaries?.map((el, idx) => {
    return {
      no: idx + 1,
      fullName: el?.employeeDetails?.full_name ?? 0,
      bonuses: el?.bonusData[0]?.totalBonus ?? 0,
      penalties: el?.penaltiesData[0]?.totalPenalty ?? 0,
      loans: el?.loanData[0]?.totalLoan ?? 0,
      salary: el?.employeeDetails?.salary ?? 0,
    };
  });

  const employeesDataList = filtered?.map((el, idx) => {
    return (
      <tr key={idx}>
        <td>{idx + 1}</td>
        <td>{el?.fullName}</td>
        <td>{el?.bonuses}</td>
        <td>{el?.penalties}</td>
        <td>{el?.loans}</td>
        <td>{el?.salary}</td>
      </tr>
    );
  });

  const exportToExcel = () => {
    const csvContent = [
      Object.keys(filtered[0]).join(","), // Header row
      ...filtered.map((row) => Object.values(row).join(",")), // Data rows
    ].join("\n");

    const encodedUri = encodeURI("data:text/csv;charset=utf-8," + csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "exported_data.csv");
    document.body.appendChild(link);
    link.click();
  };

  return (
    <div className="container portlet portlet-boxed">
      <div className="portlet-body portlet-body-salaries p-5 ">
        <button className="btn btn-primary" onClick={exportToExcel}>
          Export as Excel
        </button>
        <table className="table table-striped mt-20  " id="salariesTable">
          <thead>
            <tr>
              <th>NO</th>
              <th>NAME</th>
              <th>BONUSES</th>
              <th>PENALALTIES</th>
              <th>LOANS</th>
              <th>SALARY</th>
            </tr>
          </thead>
          <tbody>{employeesDataList}</tbody>
        </table>
      </div>
    </div>
  );
};

export default SalariesTable;
