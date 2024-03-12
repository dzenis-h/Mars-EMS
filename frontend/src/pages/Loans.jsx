import AddLoanForm from "../components/section/loans/AddLoanForm";
import LoansPreview from "../components/section/loans/LoansPreview";
import Title from "../components/common/Title";
import { httpService } from "../services/httpService";
import { GET_LOAN } from "../const/endpoints";
import { addLoan } from "../store/slices/employeesSlice";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const Loans = () => {
  const dispatch = useDispatch();
  const getLoans = async () => {
    try {
      const res = await httpService.get(GET_LOAN);
      dispatch(addLoan(res?.data?.data));
    } catch (error) {
      toast.error(error?.response?.message);
    }
  };
  useEffect(() => {
    getLoans();
  }, []);
  return (
    <div className="container">
      <div className="row">
        <div className="row">
          <div className="col-md-4">
            <div className="portlet portlet-boxed">
              <div className="portlet-header">
                <Title text="Enter multiple loans" />
              </div>
              <AddLoanForm />
            </div>
          </div>
          <div className="col-md-8">
            <LoansPreview />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loans;
