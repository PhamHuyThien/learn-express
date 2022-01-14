const mongoose = require("mongoose");
const regex = require("../utils/regex.const");

module.exports = mongoose.model("User", mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        validate: {
            validator: function (text) {
                return ["USER", "ADMIN"].includes(text);
            },
            message: "Quyền không hợp lệ.",
        },
        required: true,
    },
    status: {
        type: String,
        validate: {
            validator: function (text) {
                return ["ACTIVE", "DEACTIVE", "LOCKED"].includes(text);
            },
            message: "Tình trạng không hợp lệ.",
        },
        required: true,
    },
    createAt: Number,
    updateAt: Number,
    disableAt: Number
}, { versionKey: false }));