const User = require("../models/user");
const AppError = require("../utils/app-error");
const catchAsync = require("../utils/catch-async");

// Create a new user
const createUser = catchAsync(async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = new User({
    name,
    email,
    password,
    expensesOwed: [],
    expensesPaid: [],
    balance: 0,
  });

  await user.save();
  res.status(201).json({ status: "success", data: user });
});

// Get user details with expenses they owe or paid
const getUserDetails = catchAsync(async (req, res, next) => {
  const { userId } = req.params;
  const user = await User.findById(userId)
    .populate("expensesOwed")
    .populate("expensesPaid");

  if (!user) {
    return next(AppError("User not found", 404));
  }
  res.status(200).json({ status: "success", data: user });
});

const getUsers = catchAsync(async (req, res, next) => {
  const users = await User.find()
    .populate("expensesOwed")
    .populate("expensesPaid");

  res.status(200).json({ status: "success", data: users });
});

module.exports = {
  createUser,
  getUserDetails,
  getUsers,
};
