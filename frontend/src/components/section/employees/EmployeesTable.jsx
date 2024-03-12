import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RxCrossCircled } from "react-icons/rx";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import CustomModal from "../../common/Modal";
import { httpService } from "../../../services/httpService";
import { REMOVE_EMPLOYEE } from "../../../const/endpoints";
import { toast } from "react-hot-toast";
import {
  editEmployee,
  updateEmployees,
} from "../../../store/slices/employeesSlice";

const EmployeesTable = () => {
  const employees = useSelector((state) => state.employees?.employees);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [clickedEmpId, setClickedEmpId] = useState("");
  const onSuccess = async () => {
    try {
      const res = await httpService.post(`${REMOVE_EMPLOYEE}${clickedEmpId}`);
      toast.success(res?.data?.message);
      dispatch(updateEmployees());
      setIsOpen(false);
    } catch (error) {
      toast.error(error?.response?.message);
    }
  };

  const onOpen = (id) => {
    setIsOpen(true);
    setClickedEmpId(id);
  };
  const listEmployees = employees?.map((item, idx) => {
    return (
      <tr
        key={idx}
        style={{ cursor: "pointer" }}
        onClick={() => dispatch(editEmployee(item))}
      >
        <td>{item.first_name}</td>
        <td>{item.last_name}</td>
        <td>{item.position}</td>
        <td className="status-column">
          <i
            className={`fa fa-circle ${
              item.is_released === 0 ? "employeeactive" : "employeeinactive"
            }`}
          ></i>
        </td>
        <td>
          {item.is_released === 0 ? (
            <a
              className="table-actions"
              title="Set the employee as inactive?"
              style={{ cursor: "pointer" }}
              onClick={() => onOpen(item?._id)}
            >
              <RxCrossCircled size="18" />
            </a>
          ) : (
            <a
              className="table-actions"
              style={{ cursor: "pointer" }}
              title="Set the employee as active, again?"
              // onClick={this.setEmployeeAsActive.bind(this, item.rowNumber)}
            >
              <IoMdCheckmarkCircleOutline size="18" color="lime" />
            </a>
          )}
        </td>
      </tr>
    );
  });
  return (
    <>
      <div className="portlet-body">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Surname</th>
              <th>Position</th>
              <th className="status-column">Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>{listEmployees}</tbody>
        </table>
      </div>
      <CustomModal
        show={isOpen}
        handleClose={() => setIsOpen(false)}
        onSuccess={onSuccess}
      />
    </>
  );
};

export default EmployeesTable;
