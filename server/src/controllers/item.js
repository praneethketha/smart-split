const Item = require("../models/item");
const Expense = require("../models/expense");
const AppError = require("../utils/app-error");
const catchAsync = require("../utils/catch-async");

// Add items to an expense
const addItemToExpense = catchAsync(async (req, res, next) => {
  const { expenseId, name, price, sharedBy, exemptedBy } = req.body;

  const item = new Item({
    name,
    price,
    sharedBy,
    exemptedBy,
  });

  await item.save();

  // Add item to the expense
  const expense = await Expense.findById(expenseId);
  if (!expense) {
    return next(new AppError("Expense not found", 404));
  }
  expense.items.push(item._id);
  await expense.save();

  res.status(201).json(item);
});

// Get items under an expense
const getItemsByExpense = catchAsync(async (req, res, next) => {
  const { expenseId } = req.params;
  const expense = await Expense.findById(expenseId).populate("items");
  if (!expense) {
    return next(new AppError("Expense not found", 404));
  }
  res.status(200).json(expense.items);
});

module.exports = {
  addItemToExpense,
  getItemsByExpense,
};
