import { months } from "../const";

export const getEmployeeName = (employees, id) => {
  const arr = employees?.filter((item) => item?._id === id);
  return `${arr[0]?.first_name} ${arr[0]?.last_name}`;
};

export const getMonthName = (id) => {
  const filtered = months.filter((item) => item.value === id);
  console.log(filtered, id, "filtered");
  return filtered[0]?.label;
};
