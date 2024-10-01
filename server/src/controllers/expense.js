const User = require("../models/user");
const Group = require("../models/group");
const Expense = require("../models/expense");
const catchAsync = require("../utils/catch-async");
const AppError = require("../utils/app-error");

// Create a new expense
const createExpense = catchAsync(async (req, res, next) => {
  const { groupId, paidBy, totalAmount, description, items } = req.body;
  const expense = new Expense({
    groupId,
    paidBy,
    totalAmount,
    description,
    items,
  });
  await expense.save();

  const group = await Group.findById(groupId);
  if (!group) {
    return next(new AppError("Group not found", 404));
  }
  group.expenses.push(expense._id);
  await group.save();

  res.status(201).json(expense);
});

const finalizeExpense = catchAsync(async (req, res, next) => {
  const { expenseId } = req.body;
  const expense = await Expense.findById(expenseId).populate("items");
  if (!expense) {
    return next(new AppError("Expense not found", 404));
  }

  // Initialize user shares
  const userShares = {};

  // Calculate share for each user
  expense.items.forEach((item) => {
    const sharedUsers = item.sharedBy.filter(
      (user) => !item.exemptedBy.includes(user)
    );
    const perUserShare = item.price / sharedUsers.length;

    sharedUsers.forEach((userId) => {
      if (!userShares[userId]) userShares[userId] = 0;
      userShares[userId] += perUserShare;
    });
  });

  // Update user balances
  const users = await User.find({ _id: { $in: Object.keys(userShares) } });
  await Promise.all(
    users.map((user) => {
      const balanceAdjustment =
        user._id.toString() === expense.paidBy.toString()
          ? -userShares[user._id]
          : userShares[user._id];
      user.balance += balanceAdjustment;
      return user.save();
    })
  );

  // Save the expense with the share details
  expense.sharedWith = userShares;
  await expense.save();

  res.status(200).json({ message: "Expense finalized", userShares });
});

// Get expense details
const getExpenseDetails = catchAsync(async (req, res, next) => {
  const { expenseId } = req.params;
  const expense = await Expense.findById(expenseId).populate("items");
  if (!expense) {
    return next(new AppError("Expense not found", 404));
  }
  res.status(200).json(expense);
});

module.exports = {
  createExpense,
  finalizeExpense,
  getExpenseDetails,
};
