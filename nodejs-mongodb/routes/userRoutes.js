const express = require("express");
const router = express();

const {
  registerUser,
  loginUser,
  getUsers,
  updateUser,
  deleteUser,
  getMe,
} = require("../controllers/userController");

const protect = require("../middleware/authMiddleware");

router.route("/").get(getUsers).post(registerUser);
router.route("/login").post(loginUser);
router.route("/me").get(protect, getMe);
router.route("/:id").put(protect, updateUser).delete(protect, deleteUser);

module.exports = router;
