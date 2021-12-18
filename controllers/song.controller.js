const Song = require("../models/song.model");
const mongoose = require("mongoose");

module.exports.getSong = async function (req, res) {
    const _id = req.params.id;
    Song.findOne({ _id: _id }).then(function (song) {
        if (song == null)
            return res.status(400).json({ status: false, message: "Bài hát này không tồn tại." });
        return res.json({ status: true, message: "Thành công!", data: song });
    }).catch(function (err) {
        return res.status(400).json({ status: false, message: err.toString() });
    });
}

module.exports.getSongs = async function (req, res) {
    Song.find(
        { user_id: res.locals.user._id }
    ).then(function (songs) {
        return res.json({ status: true, message: "Thành công.", data: songs });
    }).catch(function (err) {
        return res.status(400).json({ status: false, message: err.toString() });
    });
}

module.exports.postSong = async function (req, res) {
    let newSong = new Song({
        ...req.body,
        _id: mongoose.Types.ObjectId(),
        user_id: res.locals.user._id
    });
    newSong.save(function (err) {
        if (err)
            return res.status(400).json({ status: false, message: err.toString() });
        return res.json({ status: true, message: "Thêm mới bài hát thành công!", data: newSong });
    });
}

module.exports.updateSong = async function (req, res) {
    const _id = req.params.id;
    Song.findOneAndUpdate({
        $and: [{ _id: _id }, { user_id: res.locals.user._id }]
    }, {
        ...req.body
    }).then(function (song) {
        if (song == null)
            return res.status(400).json({ status: false, message: "Không tồn tại bài hát này." });
        return res.json({ status: true, message: "Cập nhật bài hát thành công!", data: song });
    }).catch(function (err) {
        return res.status(400).json({ status: false, message: err.toString() });
    });
}

module.exports.deleteSong = async function (req, res) {
    const _id = req.params.id;
    Song.findOneAndDelete({
        $and: [{ _id: _id }, { user_id: res.locals.user._id }]
    }, {}).then(function (song) {
        if (song == null)
            return res.status(400).json({ status: false, message: "Bài hát này không tồn tại." });
        return res.json({ status: false, message: "Xóa bài hát thành công!", data: song });
    }).catch(function (err) {
        return res.status(400).json({ status: false, message: err.toString() })
    });
}