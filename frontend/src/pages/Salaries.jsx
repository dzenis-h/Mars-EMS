import React, { useState } from "react";
import generateSalaryIl from "/assets/img/generate-salary-illustration.png";
import { FaArrowRightLong } from "react-icons/fa6";
import { months } from "../const";
import SalariesTable from "../components/section/salaries/SalariesTable";
import Title from "../components/common/Title";
import { useForm } from "react-hook-form";
import { httpService } from "../services/httpService";
import { CONFIRM_SALARY, GENERATE_SALARY } from "../const/endpoints";
import { toast } from "react-hot-toast";
import SalariesTabs from "../components/section/salaries/SalariesTabs";
import { getMonthName } from "../helper";

const Salaries = () => {
  const [isGenerated, setIsGenerated] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [isFinalPreview, setIsFinalPreview] = useState(false);
  const [finalData, setFinalData] = useState({});
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    setFinalData(data);
    try {
      const res = await httpService.post(GENERATE_SALARY, {
        ...data,
        month: data.month,
        status: 0,
      });
      toast.success(res?.data?.message);
      setIsGenerated(true);
      reset();
      // dispatch(addSalary(res?.data?.data));
    } catch (error) {
      toast.error(error?.response?.error);
    }
  };

  const onClickNext = () => {
    setIsGenerated(false);
    setIsVerified(true);
  };

  const onImport = async () => {
    try {
      const res = await httpService.post(CONFIRM_SALARY, {
        month: Number(finalData.month),
        year: finalData?.year,
      });
      toast.success(res?.data?.message);
      setIsVerified(false);
      setIsGenerated(false);
    } catch (error) {
      toast.error(error?.response?.message);
    }
  };

  return (
    <div>
      <div className="container">
        {!isGenerated && !isVerified && (
          <div className="portlet portlet-boxed">
            <div className="portlet-header">
              <Title text="Generate salary" />
            </div>
            <div className="portlet-body">
              <div className="row">
                <div className="col-md-9">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="row">
                      <div className="form-group col-md-4">
                        <label htmlFor="month">Month</label>
                        <select
                          name="month"
                          id="month"
                          className="form-control"
                          required
                          {...register("month")}
                        >
                          <option value=""></option>
                          {months?.map((item, idx) => (
                            <option key={idx} value={item?.value}>
                              {item?.label}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="form-group col-md-4">
                        <label htmlFor="year">Year</label>
                        <input
                          type="number"
                          className="form-control"
                          id="year"
                          placeholder="Enter year"
                          name="year"
                          required
                          {...register("year")}
                        />
                      </div>
                      <div className="col-md-2 generate-salary__wrapper">
                        <button className="btn btn-primary">
                          Generate salary
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
                <div className="col-md-3 generate-salary-illustration_wrapper">
                  <img
                    src={generateSalaryIl}
                    alt="Generate Salaty Illustration"
                    className="generate-salary-illustration"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
        {(isGenerated || isVerified) && (
          <div className="portlet portlet-boxed">
            <div className="portlet-header tab-content-portlet-header portlet-salaries">
              <Title
                text={`${getMonthName(+finalData?.month)} ${finalData?.year}`}
              />
              {isGenerated && !isFinalPreview && (
                <button
                  type="button"
                  className="btn btn-primary btn-salaries"
                  onClick={onClickNext}
                >
                  Next
                  <FaArrowRightLong size="18" />
                </button>
              )}
              {isVerified && (
                <button
                  type="button"
                  className="btn btn-primary btn-salaries"
                  onClick={onImport}
                >
                  Import
                  <FaArrowRightLong size="18" />
                </button>
              )}
              {isVerified && isGenerated && (
                <button
                  type="button"
                  className="btn btn-primary btn-salaries"
                  onClick={onImport}
                >
                  Import
                  <FaArrowRightLong size="18" />
                </button>
              )}
              {isGenerated && isFinalPreview && (
                <button
                  type="button"
                  className="btn btn-primary btn-salaries"
                  onClick={onImport}
                >
                  Next
                  <FaArrowRightLong size="18" />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
      <div>
        {isGenerated && <SalariesTable date={finalData} />}
        {isVerified && (
          <SalariesTabs month={+finalData?.month} year={finalData?.year} />
        )}
      </div>
    </div>
  );
};

export default Salaries;
