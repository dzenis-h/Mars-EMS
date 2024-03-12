import { toast } from "react-hot-toast";
import { CREATE_PENALTY } from "../../../const/endpoints";
import { httpService } from "../../../services/httpService";
import { addPenalty } from "../../../store/slices/employeesSlice";
import { getEmployeeName } from "../../../helper";
import moment from "moment";
import { RxCrossCircled } from "react-icons/rx";
import noPenaltiesIl from "/assets/img/no-penalties-illustration.png";
import { useDispatch, useSelector } from "react-redux";
import Title from "../../common/Title";

const EmployeePenaltyPreview = () => {
  const employeeDetails = useSelector((state) => state?.employees);
  const dispatch = useDispatch();
  const onSave = async () => {
    try {
      const res = await httpService.post(CREATE_PENALTY, {
        payload: employeeDetails?.penalties,
      });
      toast.success(res?.data?.message);
      dispatch(addPenalty([]));
    } catch (error) {
      toast.error(error?.response?.message);
    }
  };

  const penaltiesList = employeeDetails?.penalties?.map((item, idx) => (
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
        <Title text="Add new penalties overview" />
      </div>
      {employeeDetails?.penalties.length < 1 && (
        <div className="portlet-body no-penalties__wrapper">
          <img
            src={noPenaltiesIl}
            alt="Missing data illustration"
            className="no-data__image"
          />
          <p className="no-data">
            There are no penalties added at the moment! <br />
            You can add them by filling out te form on the left.
          </p>
        </div>
      )}
      {employeeDetails?.penalties.length > 0 && (
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
            <tbody>{penaltiesList}</tbody>
          </table>

          <button type="submit" className="btn btn-primary" onClick={onSave}>
            Save all penalties
          </button>
        </div>
      )}
    </div>
  );
};

export default EmployeePenaltyPreview;
