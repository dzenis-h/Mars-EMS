import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { addPenalty } from "../../../store/slices/employeesSlice";

const AddPenlaltyForm = () => {
  const { register, handleSubmit, reset } = useForm();
  const employeeDetails = useSelector((state) => state?.employees);
  const dispatch = useDispatch();
  const onSubmit = (data) => {
    dispatch(addPenalty(data));
    reset();
  };
  return (
    <form className="portlet-body" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
        <label htmlFor="exampleInputEmail1">Employee</label>
        <select
          name="employee"
          className="form-control"
          {...register("employee_id")}
        >
          <option></option>
          {employeeDetails?.employees?.map((employee, idx) => (
            <option
              key={idx}
              value={employee._id}
            >{`${employee?.first_name} ${employee?.last_name}`}</option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="amount">Amount</label>
        <input
          type="number"
          className="form-control"
          id="amount"
          placeholder="Enter Amount"
          name="amount"
          required
          {...register("amount")}
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          type="number"
          className="form-control"
          id="penaltyDescription"
          placeholder="Enter Description"
          name="description"
          required
          {...register("description")}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Add penalty
      </button>
    </form>
  );
};

export default AddPenlaltyForm;
