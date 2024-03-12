const mongoose = require('mongoose');
const { MODEL_NAMES } = require('../global/constant');

const UserSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
    },

    last_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },

    token: {
        type: String,
        required: false,
    },
    is_active: {
        type: Number,
        enum: [0, 1, 2],
        default: 1,
    },
}, {
    timestamps: true,
});

const User = mongoose.model(MODEL_NAMES.User, UserSchema);

module.exports = { User };
