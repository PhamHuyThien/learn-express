const mongoose = require("mongoose");

var userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: {
        type: String,
        validate: {
            validator: function(text){
                return /^[a-z0-9_]{3,}$/g.test(text.toLowerCase());
            },
            message: "tài khoản chỉ bao gồm chữ, số, _ và trên 3 kí tự.",
        },
        unique: true,
        required: true,
    },
    password: {
        type: String,
        validate: {
            validator: function(text){
                return true || /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}$/g.test(text);
            },
            message: "Mật khẩu phải bao gồm in hoa, in thường, kí tự đặc biệt và trên 8 kí tự."
        },
        required: true
    },
    role: {
        type: String,
        validate: {
            validator: function(text){
                return ["USER", "ADMIN"].includes(text);
            },
            message: "Quyền không hợp lệ.",
        },
        required: true,
    },
    status: {
        type: String,
        validate: {
            validator: function(text){
                return ["ACTIVE", "DEACTIVE", "LOCKED"].includes(text);
            },
            message: "Tình trạng không hợp lệ.",
        },
        required: true,
    },
    createAt: Number,
    updateAt: Number,
    disableAt: Number
}, {versionKey: false});

module.exports = mongoose.model("User", userSchema);