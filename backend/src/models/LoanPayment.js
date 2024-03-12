const mongoose = require('mongoose');
const { MODEL_NAMES } = require('../global/constant');

const loanPaymentSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true,
    },

    date: {
        type: Date,
        required: true,
    },

    description: {
        type: String,
    },

    employeeJMBG: {
        type: String,
        required: true,
    },
});

const LoanPayment = mongoose.model(MODEL_NAMES.LoanPayment, loanPaymentSchema);

module.exports = LoanPayment;