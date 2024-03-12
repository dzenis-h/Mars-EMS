const mongoose = require('mongoose');
const { MODEL_NAMES, CONFIRM_STATUS } = require('../global/constant');

const loanPenaltySchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true,
    },

    unit: {
        type: String,
        enum: ['%', 'BAM'],
        default: '%',
    },

    date: {
        type: Date,
        required: true,
    },

    description: {
        type: String,
    },

    employee_id: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: MODEL_NAMES.Employee,
    },
    is_confirm: {
        type: Number,
        default: CONFIRM_STATUS.PENDING
    },
    month:{
        type:Number,
    },
    year:{
        type:Number
    }
});

const LoanPenalty = mongoose.model(MODEL_NAMES.LoanPenalty, loanPenaltySchema);

module.exports = {LoanPenalty};
