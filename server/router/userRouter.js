const express = require("express");
const router = express.Router();
const { upload } = require("../utils/multer");
const {
	getUser,
	getSingleUser,
	createUser,
	deleteSingleUser,
	signInUser,
	updateSingleUser,
	getAllUser,
} = require("../controller/userController");

router.route("/").get(getUser);
router.route("/register").post(upload, createUser);
router.route("/signin").post(signInUser);

router.route("/saved").get(getAllUser);

router
	.route("/:id")
	.get(getSingleUser)
	.delete(deleteSingleUser)
	.patch(upload, updateSingleUser);

module.exports = router;
