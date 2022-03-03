const asyncHandler = require("express-async-handler");
const Goal = require("../models/goalsModel");
const User = require("../models/userModel");
const protect = require("../middleware/authMiddleware");

// @desc    Get all goals
// @route   GET /api/v1/
// @acess   Private
const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find({ user: req.user.id });
  res.status(200).json(goals);
});

// @desc    Create a new goal
// @route   POST /api/v1/
// @access  Private
const createGoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400).json({ message: "Please add a goal" });
  }
  const goal = await Goal.create({
    text: req.body.text,
    user: req.user.id,
  });
  res.status(200).json(goal);
});

// @desc    Update a goal
// @route   PUT /api/v1/:id
// @access  Private
const updateGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    res.status(400);
    throw new Error("Goal not found");
  }

  // Check if user exists
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Check to see logged in user matches goal user
  if (goal.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorised!");
  }
  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updatedGoal);
});

// @desc    Delete a goal
// @route   /api/v1/:id
// @access  Private
const deleteGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    throw new Error("Sorry, that goal doesn't exist");
  }

  // Check if user exists
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Check to see if user is logged in
  if (goal.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorised!");
  }

  // If all okay, delete goal
  await goal.deleteOne();
  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getGoals,
  createGoal,
  updateGoal,
  deleteGoal,
};
