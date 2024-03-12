const mongoose = require('mongoose');
const { MODEL_NAMES } = require('../global/constant');

const loanNoteSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true,
    },

    description: {
        type: String,
        default: '',
    },

    employeeJMBG: {
        type: String,
        required: true,
    },


}, { timestamps: true });



const LoanNote = mongoose.model(MODEL_NAMES.LoanNote, loanNoteSchema);

module.exports = LoanNote;
