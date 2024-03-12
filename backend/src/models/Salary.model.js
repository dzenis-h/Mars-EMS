const mongoose = require("mongoose");
const { MODEL_NAMES } = require("../global/constant");

const SalarySchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },

  generateDate: {
    type: Date,
  },

  description: {
    type: String,
  },

  month: {
    type: Number,
    required: true,
  },

  year: {
    type: Number,
    required: true,
  },

  employee_id: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: MODEL_NAMES.Employee,
  },
  is_finalized: {
    type: Number,
    default: 0,
    enum: [0, 1],
  },
});

const Salary = mongoose.model(MODEL_NAMES.Salary, SalarySchema);

module.exports = { Salary };
