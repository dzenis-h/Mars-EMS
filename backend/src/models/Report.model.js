const mongoose = require("mongoose");
const { MODEL_NAMES } = require("../global/constant");

const ReportSchema = new mongoose.Schema({
  month: {
    type: Number,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  totalMale: {
    type: Number,
  },
  totalFemale: {
    type: Number,
  },
  active_employees: {
    type: Number,
  },
  inactive_employees: {
    type: Number,
  },
  Developer: {
    type: Number,
  },
  QA: {
    type: Number,
  },
  Admin: {
    type: Number,
  },
  Intern: {
    type: Number,
  },
  Executive: {
    type: Number,
  },
  Other: {
    type: Number,
  },
});

const Report = mongoose.model(MODEL_NAMES.Report, ReportSchema);
module.exports = { Report };
