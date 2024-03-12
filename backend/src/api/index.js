const cors = require("cors");
const bodyParser = require("body-parser");
const { employeeRoute } = require("./employee/employee.controller");
const { userRoute } = require("./user/user.controller");
const { loanRoute } = require("./loan/loan.controller");
const { salaryRoute } = require("./salary/salary.controller");
const { asyncHandler } = require("../global/handler");
const { userAuth } = require("../global/auth");
module.exports.ApplicationRouting = (app) => {
  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  //routing
  app.use("/api/user/", userRoute);
  app.use("/api/employee/", asyncHandler(userAuth), employeeRoute);
  app.use("/api/loan/", asyncHandler(userAuth), loanRoute);
  app.use("/api/salary/", asyncHandler(userAuth), salaryRoute);
};
