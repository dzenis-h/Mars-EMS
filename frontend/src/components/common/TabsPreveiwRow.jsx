import moment from "moment";
import React from "react";
import { FiXCircle } from "react-icons/fi";

const TabsPreveiwRow = ({ empData, onRemove }) => {
  if (empData?.length < 1) return;
  return (
    <>
      {empData?.map((el, idx) => (
        <tr key={idx}>
          <td className="col-md-3">{el?.employee_id?.full_name}</td>
          <td className="col-md-2">{moment(el?.date).format("YYYY-MM-DD")}</td>
          <td className="col-md-2">{`${el?.amount}`}</td>
          <td className="col-md-4">{el?.description}</td>
          <td className="col-md-1">
            <a className="table-actions" onClick={() => onRemove(el?._id)}>
              <FiXCircle size="18" />
            </a>
          </td>
        </tr>
      ))}
    </>
  );
};

export default TabsPreveiwRow;
