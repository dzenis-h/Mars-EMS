const {
  HTTP_STATUS_CODE,
  USER_STATUS,
  MODEL_NAMES,
  getDayRange,
  EMP_STATUS,
} = require("../../global/constant");
const {
  HttpError,
  requiredFields,
  successResponse,
} = require("../../global/handler");
const { Errors, SUCCESS } = require("../../global/string");
const { Employee } = require("../../models/Employ.model");
const { Salary } = require("../../models/Salary.model");
const { LoanPenalty } = require("../../models/Penalty.model");
const { Bonus } = require("../../models/Bonus.model");
const { Loan } = require("../../models/Loan.model");
const { Report } = require("../../models/Report.model");

module.exports.SalaryService = class {
  constructor() {}

  async generateSalary(body) {
    requiredFields(body, { required: ["month", "year"] });

    // Validate that the specified month and year are not in the future compared to the current date
    const currentDate = new Date();
    const specifiedDate = new Date(body.year, body.month - 1);
    if (specifiedDate > currentDate) {
      throw new HttpError(
        Errors.futureDateNotAllowed,
        HTTP_STATUS_CODE.bad_request
      );
    }

    const tempSalary = await Salary.find({
      month: body.month,
      year: body.year,
      is_finalized: 0,
    });

    if (tempSalary) {
      await Salary.deleteMany({
        month: body.month,
        year: body.year,
        is_finalized: 0,
      });
    }

    const existGeneratedSalary = await Salary.find({
      month: body.month,
      year: body.year,
      is_finalized: 1,
    });

    if (!existGeneratedSalary.length == 0)
      throw new HttpError(
        Errors.salaryRecordExist,
        HTTP_STATUS_CODE.bad_request
      );

    const list = await Employee.find({
      is_active: USER_STATUS.ACTIVE,
      is_released: EMP_STATUS.ACTIVE,
    }).select(["_id", "salary"]);
    const emp_ids = [];
    const data = list.map((employee) => {
      emp_ids.push(employee._id);
      return {
        month: body.month,
        year: body.year,
        employee_id: employee._id,
        amount: employee.salary,
        generateDate: new Date(),
        description: body.description,
      };
    });
    //loan data
    const chartDetetails = {};

    const chartData = await Employee.aggregate([
      {
        $group: {
          _id: null,
          maleCount: {
            $sum: { $cond: [{ $eq: ["$gender", "male"] }, 1, 0] },
          },
          femaleCount: {
            $sum: { $cond: [{ $eq: ["$gender", "female"] }, 1, 0] },
          },
          activeCount: {
            $sum: { $cond: [{ $eq: ["$is_active", 1] }, 1, 0] },
          },
          inactiveCount: {
            $sum: { $cond: [{ $eq: ["$is_active", 0] }, 1, 0] },
          },
          Developer: {
            $sum: { $cond: [{ $eq: ["$position", "Developer"] }, 1, 0] },
          },
          QA: {
            $sum: { $cond: [{ $eq: ["$position", "Qa"] }, 1, 0] },
          },
          Admin: {
            $sum: { $cond: [{ $eq: ["$position", "Admin"] }, 1, 0] },
          },
          Intern: {
            $sum: { $cond: [{ $eq: ["$position", "Intern"] }, 1, 0] },
          },
          Executive: {
            $sum: { $cond: [{ $eq: ["$position", "Executive"] }, 1, 0] },
          },
          Other: {
            $sum: { $cond: [{ $eq: ["$position", "Other"] }, 1, 0] },
          },
        },
      },
    ]);

    chartDetetails.data = chartData[0];

    // console.log("chartDetetails", chartDetetails);

    await Report.insertMany({
      month: body.month,
      year: body.year,
      totalMale:
        chartDetetails.data.maleCount /
        (chartDetetails.data.maleCount + chartDetetails.data.femaleCount),
      totalFemale:
        chartDetetails.data.femaleCount /
        (chartDetetails.data.maleCount + chartDetetails.data.femaleCount),
      active_employees:
        chartDetetails.data.activeCount /
        (chartDetetails.data.activeCount + chartDetetails.data.inactiveCount),
      inactive_employees:
        chartDetetails.data.inactiveCount /
        (chartDetetails.data.activeCount + chartDetetails.data.inactiveCount),
      Developer: chartDetetails.data.Developer,
      QA: chartDetetails.data.QA,
      Admin: chartDetetails.data.Admin,
      Intern: chartDetetails.data.Intern,
      Executive: chartDetetails.data.Executive,
      Other: chartDetetails.data.Other,
    });

    const generatedSalary = await Salary.insertMany(data);
    return successResponse(
      SUCCESS.salaryAdded,
      HTTP_STATUS_CODE.success,
      generatedSalary
    );
  }

  async salaryReport(body) {
    // const employee = await Employee.findOne({ _id: body.employee_id });
    const salaryData = await Salary.find({ is_finalized: 1 });

    // Initialize an object to store monthly data
    const monthlyReport = {};
    // console.log(salaryData);

    // Process salary data
    salaryData.forEach((salary) => {
      const key = `${salary.month}-${salary.year}`;
      if (!monthlyReport[key]) {
        monthlyReport[key] = {
          month: salary.month,
          year: salary.year,
          salaryTotal: salary.amount,
          penaltyTotal: 0,
          bonusTotal: 0,
          employeeCount: 1,
          loan: 0,
        };
      } else {
        monthlyReport[key].salaryTotal += salary.amount;
        monthlyReport[key].employeeCount++;
      }
    });

    // Fetch penalty data
    const penaltyData = await LoanPenalty.find({ is_confirm: 1 });

    // Process penalty data
    penaltyData.forEach((penalty) => {
      const key = `${penalty.month}-${penalty.year}`;
      if (monthlyReport[key]) {
        monthlyReport[key].penaltyTotal += penalty.amount;
        monthlyReport[key].salary -= penalty.amount;
      }
    });

    // Fetch bonus data
    const bonusData = await Bonus.find({ is_confirm: 1 });

    // Process bonus data
    bonusData.forEach((bonus) => {
      const key = `${bonus.month}-${bonus.year}`;
      if (monthlyReport[key]) {
        monthlyReport[key].bonusTotal += bonus.amount;
        monthlyReport[key].salaryTotal += bonus.amount;
      }
    });

    // Format the monthly report into an array

    const loanData = await Loan.find({ is_confirm: 1 });

    // console.log('loanData ==>' ,loanData);
    // Process bonus data
    loanData.forEach((loanData) => {
      const key = `${loanData.month}-${loanData.year}`;
      if (monthlyReport[key]) {
        // Initialize total installment amount for the month
        // monthlyReport[key].loan += loanData.amount;

        monthlyReport[key].loan += loanData.installment;
        monthlyReport[key].salaryTotal -= loanData.installment;
      }
    });

    // Format the monthly report into an array
    const monthlyReportArray = Object.values(monthlyReport);

    monthlyReportArray.sort((a, b) => {
      // First, compare years
      if (a.year !== b.year) {
        return b.year - a.year;
      }
      // If years are the same, compare months
      return b.month - a.month;
    });

    // Return the formatted monthly report
    return successResponse(
      SUCCESS.salaryGenerated,
      HTTP_STATUS_CODE.success,
      monthlyReportArray
    );
  }

  async salaryReportDetails(body) {
    body.month = Number(body.month);
    body.year = Number(body.year);
    body.status = Number(body.status);
    requiredFields(body, { required: ["month", "year"] });

    const final_details = {};

    // console.log("body ==>", body);
    const report_Details = await Salary.aggregate([
      {
        $match: {
          month: body.month,
          year: body.year,
          is_finalized: body.status == 1 ? 1 : 0,
        },
      },
      {
        $lookup: {
          from: MODEL_NAMES.Employee,
          localField: "employee_id",
          foreignField: "_id",
          as: "employeeDetails",
          pipeline: [
            {
              $project: {
                full_name: 1,
                salary: 1,
              },
            },
          ],
        },
      },
      {
        $lookup: {
          from: MODEL_NAMES.Bonus,
          localField: "employee_id",
          foreignField: "employee_id",
          as: "bonusData",
          pipeline: [
            {
              $match: {
                month: body.month,
                year: body.year,
                is_confirm: body.status == 1 ? 1 : 0,
              },
            },
            {
              $group: {
                _id: {
                  month: "$month",
                  year: "$year",
                },
                totalBonus: {
                  $sum: "$amount",
                },
              },
            },
          ],
        },
      },
      {
        $lookup: {
          from: MODEL_NAMES.LoanPenalty,
          localField: "employee_id",
          foreignField: "employee_id",
          as: "penaltiesData",
          pipeline: [
            {
              $match: {
                month: body.month,
                year: body.year,
                is_confirm: body.status == 1 ? 1 : 0,
              },
            },
            {
              $group: {
                _id: {
                  month: "$month",
                  year: "$year",
                },
                totalPenalty: {
                  $sum: "$amount",
                },
              },
            },
          ],
        },
      },
      {
        $lookup: {
          from: MODEL_NAMES.Loan,
          localField: "employee_id",
          foreignField: "employee_id",
          as: "loanData",
          pipeline: [
            {
              $match: {
                month: body.month,
                year: body.year,
                is_confirm: body.status == 1 ? 1 : 0,
              },
            },
            {
              $group: {
                _id: {
                  month: "$month",
                  year: "$year",
                },
                totalLoan: {
                  $sum: "$amount",
                },
                totalInstallment: {
                  $sum: "$installment",
                },
              },
            },
          ],
        },
      },
      {
        $unwind: "$employeeDetails",
      },
      {
        $project: {
          loanData: 1,
          bonusData: 1,
          employeeDetails: 1,
          penaltiesData: 1,
          month: 1,
          year: 1,
        },
      },
    ]);

    const chartData = await Report.findOne({
      month: body.month.toString(),
      year: body.year.toString(),
    });

    const reportDetails = report_Details.map((employee) => {
      let salary = employee.employeeDetails.salary;
      let bonuses = employee.bonusData.reduce(
        (total, bonus) => total + bonus.totalBonus,
        0
      );
      let penalties = employee.penaltiesData.reduce(
        (total, penalty) => total + penalty.totalPenalty,
        0
      );

      let loans = employee.loanData.reduce(
        (total, loanInst) => total + loanInst.totalInstallment,
        0
      );

      // Update the salary for the employee
      employee.employeeDetails.salary = salary - penalties + bonuses - loans;

      // Return the updated employee
      return employee;
    });

    final_details.reportDetails = reportDetails;
    final_details.chartData = chartData;

    return successResponse(
      SUCCESS.dataFetched,
      HTTP_STATUS_CODE.success,
      final_details
    );
  }

  async employeeSalaryDetail(body) {
    // const employee = await Employee.findOne({ _id: body.employee_id });
    const salaryData = await Salary.find({
      employee_id: body.employee_id,
      is_finalized: 1,
    });

    // Group salary data by month and year
    const salaryByMonthYear = {};
    salaryData.forEach((salary) => {
      const key = `${salary.month}-${salary.year}`;
      if (!salaryByMonthYear[key]) {
        salaryByMonthYear[key] = {
          month: salary.month,
          year: salary.year,
          salary: salary.amount,
          penalty: 0,
          bonus: 0,
          loan: 0,
        };
      } else {
        salaryByMonthYear[key].salary += salary.amount;
      }
    });
    // Query MongoDB to find penalty data
    const penaltyData = await LoanPenalty.find({
      employee_id: body.employee_id,
      is_confirm: 1,
    });

    // Add penalty data to corresponding month and year
    penaltyData.forEach((penalty) => {
      const key = `${penalty.month}-${penalty.year}`;
      if (salaryByMonthYear[key]) {
        salaryByMonthYear[key].penalty += penalty.amount;
        salaryByMonthYear[key].salary -= penalty.amount;
      }
    });

    const BonusData = await Bonus.find({
      employee_id: body.employee_id,
      is_confirm: 1,
    });

    // Add penalty data to corresponding month and year
    BonusData.forEach((bonus) => {
      const key = `${bonus.month}-${bonus.year}`;
      if (salaryByMonthYear[key]) {
        salaryByMonthYear[key].bonus += bonus.amount;
        salaryByMonthYear[key].salary += bonus.amount;
      }
    });

    const LoanData = await Loan.find({
      employee_id: body.employee_id,
      is_confirm: 1,
    });

    // Add penalty data to corresponding month and year
    LoanData.forEach((loan) => {
      const key = `${loan.month}-${loan.year}`;
      if (salaryByMonthYear[key]) {
        salaryByMonthYear[key].loan += loan.installment;
        salaryByMonthYear[key].salary -= loan.installment;
      }
    });
    // Convert salary data to array
    const result = Object.values(salaryByMonthYear);

    result.sort((a, b) => {
      // First, compare years in descending order
      if (a.year !== b.year) {
        return b.year - a.year;
      }
      // If years are the same, compare months in descending order
      return b.month - a.month;
    });

    return successResponse(
      SUCCESS.salaryGenerated,
      HTTP_STATUS_CODE.success,
      result
    );
  }

  async salaryconfirmation(body) {
    requiredFields(body, { required: ["month", "year"] });
    body.month = Number(body.month);
    body.year = Number(body.year);
    await Salary.updateMany(
      { month: body.month, year: body.year, is_finalized: 0 },
      {
        is_finalized: 1,
      }
    );
    return successResponse(SUCCESS.salaryGenerated, HTTP_STATUS_CODE.success);
  }
};
