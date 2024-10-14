const Group = require("../models/group");
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

const getUserProfile = catchAsync(async (req, res, next) => {
  const userId = req.userId;
  const user = await User.findById(userId)
    .populate("expensesOwed")
    .populate("expensesPaid");

  if (!user) {
    return next(AppError("User not found", 404));
  }
  res.status(200).json({ status: "success", data: user });
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

const updateUser = catchAsync(async (req, res, next) => {
  const userId = req.userId;
  const { name } = req.body;
  const user = await User.findById(userId)
    .populate("expensesOwed")
    .populate("expensesPaid");

  user.name = name;
  user.save();

  res.status(200).json({ status: "success", data: user });
});

const getUserProfileWithDebtInfo = catchAsync(async (req, res, next) => {
  const userId = req.userId;
  console.log({ userId });

  // Fetch the user's profile data (excluding password)
  const userProfile = await User.findById(userId).select("-password");
  if (!userProfile) {
    return res.status(404).json({
      status: "fail",
      message: "User not found",
    });
  }

  console.log({ userProfile });

  // Fetch all groups where the user is a member
  const groups = await Group.find({ members: userId })
    .populate("members", "-password")
    .populate({
      path: "expenses",
      select: "description totalAmount paidBy sharedWith",
      populate: {
        path: "paidBy",
        select: "name email",
      },
    });

  console.log({ groups });

  if (!groups || groups.length === 0) {
    return res.status(404).json({
      status: "fail",
      message: "No groups found for the user",
    });
  }

  const netDebtRelations = {};

  groups.forEach((group) => {
    group.expenses.forEach((expense) => {
      const paidBy = expense.paidBy;
      const userShare = expense.sharedWith.find(
        (share) => share.user.toString() === userId
      );

      if (userShare) {
        const shareAmount = userShare.shareAmount;

        if (paidBy._id.toString() !== userId) {
          if (!netDebtRelations[paidBy._id]) {
            netDebtRelations[paidBy._id] = {
              _id: paidBy._id,
              name: paidBy.name,
              email: paidBy.email,
              netAmount: 0,
            };
          }

          netDebtRelations[paidBy._id].netAmount -= shareAmount;
        } else {
          expense.sharedWith.forEach((share) => {
            if (share.user.toString() !== userId) {
              const sharedUser = group.members.find(
                (member) => member._id.toString() === share.user.toString()
              );
              if (sharedUser) {
                if (!netDebtRelations[sharedUser._id]) {
                  netDebtRelations[sharedUser._id] = {
                    _id: sharedUser._id,
                    name: sharedUser.name,
                    email: sharedUser.email,
                    netAmount: 0,
                  };
                }
                netDebtRelations[sharedUser._id].netAmount += share.shareAmount;
              }
            }
          });
        }
      }
    });
  });

  const userDebts = Object.values(netDebtRelations).map((debt) => ({
    _id: debt._id,
    name: debt.name,
    email: debt.email,
    amount: Math.abs(debt.netAmount),
    owedToMe: debt.netAmount > 0,
  }));

  res.status(200).json({
    status: "success",
    data: {
      ...userProfile.toObject(),
      users: userDebts,
    },
  });
});

module.exports = {
  createUser,
  getUserDetails,
  getUsers,
  getUserProfile,
  getUserProfileWithDebtInfo,
  updateUser,
};
