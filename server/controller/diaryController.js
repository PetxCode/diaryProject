const userModel = require("../model/userModel");
const diaryModel = require("../model/diaryModel");
const cloudinary = require("../utils/cloudinary");
const mongoose = require("mongoose");

const createDiary = async (req, res) => {
	try {
		const { title, message } = req.body;
		const myImage = await cloudinary.uploader.upload(req.file.path);

		const getUser = await userModel.findById(req.params.id);
		const getDiary = await new diaryModel({
			title,
			message,
			image: myImage.secure_url,
			imageID: myImage.public_id,
		});

		getDiary.user = getUser;
		getDiary.save();

		getUser.diary.push(mongoose.Types.ObjectId(getDiary._id));
		getUser.save();

		res.status(201).json({ message: "created", data: getDiary });
	} catch (err) {
		res.status(404).json({ message: err.message });
	}
};

const getDiary = async (req, res) => {
	try {
		const getUser = await userModel.findById(req.params.id).populate("diary");

		res.status(200).json({ message: "success", data: getUser });
	} catch (err) {
		res.status(404).json({ message: err.message });
	}
};

const updateDiary = async (req, res) => {
	try {
		const { title, message } = req.body;
		const updateData = await diaryModel.findByIdAndUpdate(
			req.params.diary,
			{ title, message },
			{ new: true }
		);

		res.status(201).json({ message: "updated Data", data: updateData });
	} catch (err) {
		res.status(404).json({ message: err.message });
	}
};

const getSingleDiary = async (req, res) => {
	try {
		const diaryData = await diaryModel.findById(req.params.diary);

		res.status(201).json({ message: "found single Diary", data: diaryData });
	} catch (err) {
		res.status(404).json({ message: err.message });
	}
};

const deleteDiary = async (req, res) => {
	try {
		const getUser = await userModel.findById(req.params.id);

		const removeData = await diaryModel.findByIdAndRemove(req.params.diary);

		getUser.diary.pull(removeData);
		getUser.save();

		res.status(201).json({ message: "created", data: getUser });
	} catch (err) {
		res.status(404).json({ message: err.message });
	}
};

module.exports = {
	deleteDiary,
	getDiary,
	updateDiary,
	getSingleDiary,
	createDiary,
};
