import React, { useEffect, useState } from "react";
import { Tabs } from "react-bootstrap";
import { Tab } from "bootstrap";
import TabsPreveiwRow from "../../common/TabsPreveiwRow";
import { httpService } from "../../../services/httpService";
import { toast } from "react-hot-toast";
import {
  CONFIRM_BONUS,
  CONFIRM_LOAN,
  CONFIRM_PENALTY,
  DELETE_FINANCIAL_DETAILS,
  GET_FINANCIAL_DATA,
} from "../../../const/endpoints";

const SalariesTabs = ({ month, year }) => {
  const [financeData, setFinanceData] = useState([]);

  const getFinancialData = async () => {
    try {
      const res = await httpService.get(
        `${GET_FINANCIAL_DATA}?month=${month}&year=${year}`
      );
      setFinanceData(res?.data?.data);
    } catch (error) {
      toast.error(error?.response?.message);
    }
  };

  useEffect(() => {
    getFinancialData();
  }, []);

  const onConfirm = async (endpoint) => {
    try {
      const res = await httpService.post(endpoint, {
        month: month,
        year: year,
      });
      toast.success(res?.data?.message);
      getFinancialData();
    } catch (error) {
      toast.error(error?.response?.message);
    }
  };

  const onDelete = async (endpoint, payload) => {
    try {
      const res = await httpService.post(endpoint, payload);
      toast.success(res?.data?.message);
      getFinancialData();
    } catch (error) {
      toast.error(error?.response?.message);
    }
  };
  return (
    <div className="portlet portlet-boxed container">
      <div className="portlet-body portlet-body-salaries">
        <Tabs
          defaultActiveKey="bonuses"
          transition={false}
          id="noanim-tab-example"
          className="mb-3"
        >
          <Tab eventKey="bonuses" title="Bonuses">
            {financeData?.Bonus?.length > 0 && (
              <>
                <button
                  className="btn btn-primary ml-20"
                  onClick={() => onConfirm(CONFIRM_BONUS)}
                >
                  Confirm
                </button>
                <table className="table table-striped mt-20">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Date</th>
                      <th>Amount</th>
                      <th>Description</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <TabsPreveiwRow
                      empData={financeData?.Bonus}
                      onRemove={(id) =>
                        onDelete(DELETE_FINANCIAL_DETAILS, {
                          model: "bonus",
                          id: id,
                        })
                      }
                    />
                  </tbody>
                </table>
              </>
            )}
          </Tab>
          <Tab eventKey="penalties" title="Penalties">
            {financeData?.Penalties?.length > 0 && (
              <>
                <button
                  className="btn btn-primary ml-20"
                  onClick={() => onConfirm(CONFIRM_PENALTY)}
                >
                  Confirm
                </button>
                <table className="table table-striped mt-20">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Date</th>
                      <th>Amount</th>
                      <th>Description</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <TabsPreveiwRow
                      empData={financeData?.Penalties}
                      onRemove={(id) =>
                        onDelete(DELETE_FINANCIAL_DETAILS, {
                          model: "penalty",
                          id: id,
                        })
                      }
                    />
                  </tbody>
                </table>
              </>
            )}
          </Tab>
          <Tab eventKey="loans" title="Loans">
            {financeData?.Loans?.length > 0 && (
              <>
                <button
                  className="btn btn-primary ml-20"
                  onClick={() => onConfirm(CONFIRM_LOAN)}
                >
                  Confirm
                </button>
                <table className="table table-striped mt-20">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Date</th>
                      <th>Amount</th>
                      <th>Description</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <TabsPreveiwRow
                      empData={financeData?.Loans}
                      onRemove={(id) =>
                        onDelete(DELETE_FINANCIAL_DETAILS, {
                          model: "loan",
                          id: id,
                        })
                      }
                    />
                  </tbody>
                </table>
              </>
            )}
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default SalariesTabs;
