import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { httpService } from "../../../services/httpService";
import { CREATE_LOAN } from "../../../const/endpoints";
import { toast } from "react-hot-toast";
import { addLoan } from "../../../store/slices/employeesSlice";

const AddLoanForm = () => {
  const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();
  const employeeDetails = useSelector((state) => state?.employees);

  const onSubmit = async (data) => {
    try {
      const res = await httpService.post(CREATE_LOAN, data);
      // dispatch(addLoan(res?.data?.data));
      toast.success(res?.data?.message);
      reset();
    } catch (error) {
      toast.error(error?.response?.message);
    }
  };
  return (
    <form className="portlet-body" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
        <label htmlFor="employee_id">Employee</label>
        <select
          name="employee_id"
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
        <label htmlFor="exampleInputPassword1">Amount</label>
        <input
          type="number"
          className="form-control"
          id="loanAmount"
          placeholder="Enter Amount"
          name="amount"
          required
          {...register("amount")}
        />
      </div>
      <div className="form-group">
        <label htmlFor="installment">Installment Amount</label>
        <input
          type="number"
          className="form-control"
          id="installment"
          placeholder="Enter installment"
          name="installment"
          required
          {...register("installment")}
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          type="number"
          className="form-control"
          id="loanDescription"
          placeholder="Enter Description"
          name="description"
          required
          {...register("description")}
        />
      </div>
      <button
        type="submit"
        style={{ float: "left" }}
        className="btn btn-primary"
        // onClick={this.addLoan}
      >
        Save loan(s)
      </button>
    </form>
  );
};

export default AddLoanForm;
