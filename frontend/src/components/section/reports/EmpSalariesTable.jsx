import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { httpService } from "../../../services/httpService";
import toast from "react-hot-toast";
import { GET_EMP_SALARY } from "../../../const/endpoints";
import { getMonthName } from "../../../helper";

const EmpSalariesTable = ({ emp_id }) => {
  const [stats, setStats] = useState([]);

  const getEmployeeStats = async () => {
    try {
      const res = await httpService.get(
        `${GET_EMP_SALARY}?employee_id=${emp_id}`
      );
      setStats(res?.data?.data);
    } catch (error) {
      toast.error(error?.response?.message);
    }
  };

  useEffect(() => {
    getEmployeeStats();
  }, []);

  const tableBody = stats?.map((el) => (
    <tr>
      <td>{el?.year}</td>
      <td>{getMonthName(el?.month)}</td>
      <td>{el?.bonus}</td>
      <td>{el?.loan}</td>
      <td>{el?.penalty}</td>
      <td>{el?.salary}</td>
    </tr>
  ));

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Year</th>
            <th>Month</th>
            <th>Bonus</th>
            <th>Loan</th>
            <th>Penalty</th>
            <th>Salary</th>
          </tr>
        </thead>
        <tbody>{tableBody}</tbody>
      </Table>
    </>
  );
};

export default EmpSalariesTable;
