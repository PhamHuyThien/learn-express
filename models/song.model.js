const mongoose = require("mongoose");

module.exports = mongoose.model("Song", mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true,
    },
    singer: {
        type: String
    },
    path: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
}, { versionKey: false }));