const mongoose = require('mongoose');
const { MODEL_NAMES, USER_STATUS, EMP_STATUS } = require('../global/constant');

const EmployeeSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
    },

    last_name: {
        type: String,
        required: true,
    },
    full_name: {
        type: String,
    },

    dob: {
        type: Date,
        required: true,
    },
    gender: {
        type: String,
        enum: ['male', 'female'],
        required: true,

    },
    position: {
        type: String,
        default: 'N/A',
        required: true,
    },
    employeeJMBG: {
        type: String,
        required: true,
    },
    start_date: {
        type: Date,
        required: true,
    },
    is_released: {
        type: Number,
        enum: Object.values(EMP_STATUS),
        default: EMP_STATUS.ACTIVE,
    },
    end_date: {
        type: Date,
    },
    salary: {
        type: Number,
        required: true,
    },
    is_active: {
        type: Number,
        default: USER_STATUS.ACTIVE,
        enum: Object.values(USER_STATUS),
    }
}, {
    timestamps: true,
});

EmployeeSchema.pre('save', function (next) {
    // For new documents, update the full_name field
    if (this.isNew) {
        this.full_name = `${this.first_name} ${this.last_name}`;
    }
    next();
});

EmployeeSchema.pre('findOneAndUpdate', function (next) {
    // For updates, set the full_name field in the update object
    this._update.full_name = `${this._update.first_name} ${this._update.last_name}`;
    next();
});

const Employee = mongoose.model(MODEL_NAMES.Employee, EmployeeSchema);

module.exports = { Employee };
