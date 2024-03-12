import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { httpService } from "../../../services/httpService";
import {
  CREATE_EMPLOYEE,
  GET_EMPLOYEES,
  UPDATE_EMPLOYEE,
} from "../../../const/endpoints";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  addEmployee,
  editEmployee,
} from "../../../store/slices/employeesSlice";
import { positionsOptions } from "../../../const";
import moment from "moment";

const AddEmployeeForm = () => {
  const dispatch = useDispatch();
  const selectedEmployee = useSelector(
    (state) => state.employees?.editingEmployee
  );
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    if (Object.keys(selectedEmployee).length > 0) {
      console.log("inside true");
      reset({
        ...selectedEmployee,
        dob: moment(selectedEmployee.dob).format("YYYY-MM-DD"),
        start_date: moment(selectedEmployee.start_date).format("YYYY-MM-DD"),
        end_date: moment(selectedEmployee.end_date)?.format("YYYY-MM-DD"),
      });
    } else {
      console.log("inside false");

      reset();
    }
  }, [selectedEmployee]);

  const getEmployees = async () => {
    try {
      const res = await httpService.get(GET_EMPLOYEES);
      dispatch(addEmployee(res?.data?.data));
      console.log(res, "response");
    } catch (error) {
      toast.error(error?.response?.message);
    }
  };
  const onSubmit = async (data) => {
    try {
      const endPoint =
        Object.keys(selectedEmployee).length > 0
          ? `${UPDATE_EMPLOYEE}${data?._id}`
          : `${CREATE_EMPLOYEE}`;
      const payload =
        Object.keys(selectedEmployee).length > 0
          ? {
              employeeJMBG: data.employeeJMBG,
              first_name: data.first_name,
              last_name: data.last_name,
              position: data.position,
              salary: data.salary,
              gender: data.gender,
              dob: moment(data.dob).format("DD-MM-YYYY"),
              start_date: moment(data.start_date).format("DD-MM-YYYY"),
              end_date: moment(data.end_date).format("DD-MM-YYYY"),
            }
          : {
              ...data,
              dob: moment(data.dob).format("DD-MM-YYYY"),
              start_date: moment(data.start_date).format("DD-MM-YYYY"),
            };
      const res = await httpService.post(endPoint, payload);
      getEmployees();
      toast.success(res?.data?.message);
      dispatch(editEmployee({}));
      reset();
    } catch (error) {
      toast.error(error?.response?.message);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group form__small">
        <label htmlFor="first_name">Name</label>
        <input
          type="text"
          name="first_name"
          className="form-control"
          required
          {...register("first_name")}
        />
      </div>

      <div className="form-group form__small form__small--right">
        <label htmlFor="last_name">Surname</label>
        <input
          type="text"
          name="last_name"
          className="form-control"
          required
          {...register("last_name")}
        />
      </div>

      <div className="form-group">
        <label htmlFor="employeeJMBG">JMBG</label>
        <input
          type="text"
          name="employeeJMBG"
          className="form-control"
          required
          {...register("employeeJMBG")}
        />
      </div>

      <div className="form-group form__small">
        <label htmlFor="dob">Date Of Birth</label>
        <input
          type="date"
          name="dob"
          className="form-control"
          required
          {...register("dob")}
        />
      </div>

      <div className="form-group form__small form__small--right">
        <label htmlFor="gender">Gender</label>
        <select
          name="gender"
          id="gender"
          className="form-control"
          {...register("gender")}
        >
          <option></option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>

      <hr></hr>

      <div className="form-group">
        <label htmlFor="position">Position</label>
        <select
          name="position"
          id="position"
          className="form-control"
          {...register("position")}
        >
          <option></option>
          {positionsOptions?.map((item, idx) => (
            <option key={idx} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="salary">Salary</label>
        <input
          type="number"
          name="salary"
          className="form-control"
          required
          {...register("salary")}
        />
      </div>

      <div className="form-group">
        <label htmlFor="start_date">Start Date</label>
        <input
          type="date"
          name="start_date"
          className="form-control"
          required
          {...register("start_date")}
        />
      </div>

      {Object.keys(selectedEmployee).length > 0 && (
        <div className="form-group">
          <label htmlFor="end_date">End Date</label>
          <input
            type="date"
            name="end_date"
            className="form-control"
            required
            {...register("end_date")}
          />
        </div>
      )}

      {/* <div className="form-group">
        <input
          type="checkbox"
          name="isPayoneer"
          className="form__small--check"
          // required
          // {...register("first_name")}
        />
        <label htmlFor="isPayoneer" className="form__small--check__label">
          Is Payoneer
        </label>
      </div> */}

      <button
        type="submit"
        className="btn btn-primary submit-button"
        //   onClick={this.reset}
      >
        Submit
      </button>
    </form>
  );
};

export default AddEmployeeForm;
