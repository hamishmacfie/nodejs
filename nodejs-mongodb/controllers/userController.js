const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

// @desc    Register a user
// @route   POST /api/v1/users/
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please complete all fields");
  }

  // Check if user exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create the user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc    Authenticate a user
// @route   POST /api/v1/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check for user email
  const user = await User.findOne({ email });

  // Check user and password match
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid email or password");
  }
});

// @desc    Get all Users
// @route   GET /api/v1/users/
// @access  Private
const getUsers = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Get all users route" });
});

// @desc    Update User
// @route   PUT /api/v1/users/:id
// @access  Private
const updateUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `${req.params.id} updated!` });
});

// @desc    Delete User
// @route   DELETE /api/v1/users/:id
// @access  Private
const deleteUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `${req.params.id} deleted` });
});

// @desc    Get user data
// @route   GET /api/v1/users/me
// access   Private
const getMe = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});

// Generate token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: 60 * 60,
  });
};

module.exports = {
  getUsers,
  updateUser,
  deleteUser,
  registerUser,
  loginUser,
  getMe,
};
