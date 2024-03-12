import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { httpService } from "../../../services/httpService";
import { CREATE_BONUS } from "../../../const/endpoints";
import { addBonus } from "../../../store/slices/employeesSlice";
import { toast } from "react-hot-toast";
import { RxCrossCircled } from "react-icons/rx";
import noPenaltiesIl from "/assets/img/no-penalties-illustration.png";
import { getEmployeeName } from "../../../helper";
import moment from "moment";
import Title from "../../common/Title";

const EmployeeBonusPreview = () => {
  const employeeDetails = useSelector((state) => state?.employees);
  const dispatch = useDispatch();
  const onSave = async () => {
    try {
      const res = await httpService.post(CREATE_BONUS, {
        payload: employeeDetails?.bonuses,
      });
      toast.success(res?.data?.message);
      dispatch(addBonus([]));
    } catch (error) {
      toast.error(error?.response?.message);
    }
  };

  const bonusesList = employeeDetails?.bonuses?.map((item, idx) => (
    <tr key={idx}>
      <td className="col-md-4">
        {getEmployeeName(employeeDetails?.employees, item?.employee_id)}
      </td>
      <td className="col-md-3">{moment(item.date).format("MM-DD-YYYY")}</td>
      <td className="col-md-2">
        {item?.amount} {item?.unit}
      </td>
      <td className="col-md-3">{item?.description}</td>
    </tr>
  ));
  return (
    <div className="portlet portlet-boxed">
      <div className="portlet-header">
        <Title text="Add new bonuses overview" />
      </div>
      {employeeDetails?.bonuses.length < 1 && (
        <div className="portlet-body no-penalties__wrapper">
          <img
            src={noPenaltiesIl}
            alt="Missing data illustration"
            className="no-data__image"
          />
          <p className="no-data">
            There are no bonuses added at the moment! <br />
            You can add them by filling out te form on the left.
          </p>
        </div>
      )}
      {employeeDetails?.bonuses.length > 0 && (
        <div className="portlet-body penalties__wrapper">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>{bonusesList}</tbody>
          </table>

          <button type="submit" className="btn btn-primary" onClick={onSave}>
            Save all bonuses
          </button>
        </div>
      )}
    </div>
  );
};

export default EmployeeBonusPreview;
