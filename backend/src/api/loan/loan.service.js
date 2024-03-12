const { Model } = require("mongoose");
const {
  HTTP_STATUS_CODE,
  USER_STATUS,
  MODEL_NAMES,
  PAYMENT_STATUS,
  CONFIRM_STATUS,
  getDayRange,
} = require("../../global/constant");
const {
  requiredFields,
  successResponse,
  HttpError,
} = require("../../global/handler");
const { SUCCESS, Errors } = require("../../global/string");
const { Bonus } = require("../../models/Bonus.model");
const { Loan } = require("../../models/Loan.model");
const { LoanPenalty } = require("../../models/Penalty.model");

module.exports.LoanService = class {
  constructor() {}

  //#region create loan
  async createLoan(body) {
    requiredFields(body, {
      required: ["employee_id", "amount", "installment", "description"],
    });

    // add installmensts array in loan
    body.date = new Date();
    body.month = body.date.getMonth() + 1;
    body.year = body.date.getFullYear();
    body.amount = +(body?.amount ?? 0);
    body.installment = +(body?.installment ?? 0);
    //create new loan
    const newLoan = await Loan(body).save();
    return successResponse(
      SUCCESS.loanCreate,
      HTTP_STATUS_CODE.create_success,
      newLoan
    );
  }
  //#endregion

  //#region  get loan list
  async getLoanList(body) {
    const currentDate = new Date();

    // Get the date range for the current month
    const dateRange = getDayRange(currentDate);

    // Find active loans with installments within the current month
    const loanInstallmentData = await Loan.find({
      is_active: USER_STATUS.ACTIVE,
      is_confirm: 1,
    }).populate("employee_id");

    // Extract required information and format the response
    const ActiveLoans = loanInstallmentData.map((loan) => {
      const { employee_id } = loan;
      const employeeName = employee_id.full_name;
      const loanAmount = loan.amount;
      const installment = loan.installment;
      return { employeeName, loanAmount, installment };
    });

    return successResponse(
      SUCCESS.loanList,
      HTTP_STATUS_CODE.success,
      ActiveLoans
    );
  }

  //#endregion
  // region create penalty
  async createPenalties(body) {
    // Updated function name and parameter
    // Check if payload is an array
    const payload = body?.payload ?? [];
    requiredFields(body, { required: ["payload"] });
    const currentDate = new Date();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    // Check if each penalty object in the array has required fields
    for (const penalty of payload) {
      requiredFields(penalty, {
        required: ["employee_id", "amount", "description"],
      });
      penalty.date = new Date();
      penalty.month = month; // Set month field
      penalty.year = year; // Set year field
    }
    await LoanPenalty.insertMany(payload);
    return successResponse(SUCCESS.penalty, HTTP_STATUS_CODE.create_success);
  }

  // region create bonus
  async createBonus(body) {
    // Check if payload is an array
    const payload = body?.payload ?? [];
    requiredFields(body, { required: ["payload"] });

    // Get current month and year
    const currentDate = new Date();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();

    // Check if each bonus object in the array has required fields
    for (const bonus of payload) {
      requiredFields(bonus, {
        required: ["employee_id", "amount", "description"],
      });
      bonus.date = new Date();
      bonus.month = month; // Set month field
      bonus.year = year; // Set year field
    }

    await Bonus.insertMany(payload);

    return successResponse(SUCCESS.bonus, HTTP_STATUS_CODE.create_success);
  }

  async getBonuses(body) {
    requiredFields(body, { required: ["month", "year"] });
    const data = Bonus.find({
      is_confirm: CONFIRM_STATUS.PENDING,
      month: body.month,
      year: body.year,
    });

    return successResponse(
      SUCCESS.empCreated,
      HTTP_STATUS_CODE.create_success,
      data
    );
  }

  async getPenalties(body) {
    requiredFields(body, { required: ["month", "year"] });
    const data = Bonus.find({
      is_confirm: CONFIRM_STATUS.PENDING,
      month: body.month,
      year: body.year,
    });

    return successResponse(
      SUCCESS.empCreated,
      HTTP_STATUS_CODE.create_success,
      data
    );
  }
  updateConfirmStatus(model, data) {
    requiredFields(data, { required: ["month", "year"] });
    return model.updateMany(
      {
        month: data.month,
        year: data.year,
        is_confirm: CONFIRM_STATUS.PENDING,
      },
      { $set: { is_confirm: CONFIRM_STATUS.CONFIRMED } }
    );
  }

  async updateEmployeeBonus(body) {
    requiredFields(body, { required: ["month", "year"] });
    await this.updateConfirmStatus(Bonus, body);
    return successResponse(SUCCESS.bonus, HTTP_STATUS_CODE.create_success);
  }

  async updateEmployeePenlaties(body) {
    requiredFields(body, { required: ["month", "year"] });
    await this.updateConfirmStatus(LoanPenalty, body);
    return successResponse(
      SUCCESS.penaltyUpdate,
      HTTP_STATUS_CODE.create_success
    );
  }

  async updateEmployeeLoan(body) {
    requiredFields(body, { required: ["month", "year"] });
    await this.updateConfirmStatus(Loan, body);
    return successResponse(SUCCESS.loanUpdate, HTTP_STATUS_CODE.create_success);
  }

  async getfinancialdetails(body) {
    requiredFields(body, { required: ["month", "year"] });
    body.month = parseInt(body.month);
    body.year = parseInt(body.year);

    const financialDetails = {};

    const BonusData = await Bonus.find({
      month: body.month,
      year: body.year,
      is_confirm: 0,
    }).populate("employee_id", "full_name");
    financialDetails.Bonus = BonusData;

    const PenaltyData = await LoanPenalty.find({
      month: body.month,
      year: body.year,
      is_confirm: 0,
    }).populate("employee_id", "full_name");
    financialDetails.Penalties = PenaltyData;

    const LoanData = await Loan.find({
      month: body.month,
      year: body.year,
      is_confirm: 0,
    }).populate("employee_id", "full_name");
    console.log(LoanData);

    financialDetails.Loans = LoanData;
    return successResponse(
      SUCCESS.financialData,
      HTTP_STATUS_CODE.create_success,
      financialDetails
    );
  }

  async deletefinancialDetails(body) {
    requiredFields(body, { required: ["id", "model"] });
    if (body.model === "bonus") await Bonus.deleteOne({ _id: body.id });
    else if (body.model == "penalty")
      await LoanPenalty.deleteOne({ _id: body.id });
    else if (body.model == "loan") await Loan.deleteOne({ _id: body.id });

    return successResponse(
      SUCCESS.loanDeleted,
      HTTP_STATUS_CODE.create_success
    );
  }
};

//  throw new HttpError(ERROR.invalid_request, HTTP_STATUS_CODE.bad_request);
