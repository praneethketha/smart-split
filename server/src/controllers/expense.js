const User = require("../models/user");
const Group = require("../models/group");
const Expense = require("../models/expense");
const catchAsync = require("../utils/catch-async");
const AppError = require("../utils/app-error");
const Item = require("../models/item");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "..", "uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}_${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 5000000,
  },
  fileFilter: (req, file, cb) => {
    const allowedFileType = ["jpg", "jpeg", "png"];
    if (allowedFileType.includes(file.mimetype.split("/")[1])) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
});

// Create a new expense
const createExpense = catchAsync(async (req, res, next) => {
  const { groupId, paidBy, totalAmount, description, date } = req.body;
  const expense = new Expense({
    group: groupId,
    paidBy,
    totalAmount,
    description,
    date,
    image: req.file ? `/uploads/${req.file.filename}` : null,
  });
  await expense.save();

  const group = await Group.findById(groupId);
  if (!group) {
    return next(new AppError("Group not found", 404));
  }
  group.expenses.push(expense._id);
  await group.save();

  // fetch group members and shared the total amount across the members
  const members = group.members.map((member) => ({
    user: member._id,
    shareAmount: totalAmount / group.members.length,
  }));
  expense.sharedWith = members;

  expense.save();

  res.status(201).json({ status: "success", data: expense });
});

const deleteImage = (filePath) => {
  console.log("inside delete Image");
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error("Failed to delete old image:", err);
    } else {
      console.log("Old image deleted:", filePath);
    }
  });
};

const updateExpense = catchAsync(async (req, res, next) => {
  const { expenseId } = req.params;
  const { groupId, paidBy, totalAmount, description, date } = req.body;
  console.log({ expenseId, groupId });

  const expense = await Expense.findById(expenseId);
  if (!expense) {
    return next(new AppError("Expense not found", 404));
  }

  if (expense.image && req.file) {
    const oldImagePath = path.join(__dirname, `../${expense.image}`);
    deleteImage(oldImagePath);
  }

  expense.group = groupId || expense.group;
  expense.paidBy = paidBy || expense.paidBy;
  expense.totalAmount = totalAmount || expense.totalAmount;
  expense.description = description || expense.description;
  expense.date = date || expense.date;
  expense.image = req.file ? `/uploads/${req.file.filename}` : expense.image;

  const updatedExpense = await expense.save();

  res.status(200).json({ status: "success", data: updatedExpense });
});

const finalizeExpense = catchAsync(async (req, res, next) => {
  const { expenseId } = req.body;

  const expense = await Expense.findById(expenseId);
  if (!expense) {
    return next(new AppError("Expense not found", 404));
  }

  // Fetch all items associated with this expense
  const items = await Item.find({ expense: expenseId });

  // Initialize user shares
  const userShares = {};

  // Calculate share for each user
  items.forEach((item) => {
    const sharedUsers = item.sharedBy.filter(
      (user) => !item.exemptedBy.includes(user)
    );
    const perUserShare = item.price / sharedUsers.length;

    sharedUsers.forEach((userId) => {
      if (!userShares[userId])
        userShares[userId] = { exemptedItems: [], shareAmount: 0 };
      userShares[userId] = {
        ...userShares[userId],
        shareAmount: userShares[userId]?.shareAmount + perUserShare,
      };
    });

    item.exemptedBy.forEach((userId) => {
      if (!userShares[userId])
        userShares[userId] = { exemptedItems: [item.name], shareAmount: 0 };
      else
        userShares[userId] = {
          ...userShares[userId],
          exemptedItems: [...userShares[userId].exemptedItems, item.name],
        };
    });
  });

  // Update user balances
  const users = await User.find({ _id: { $in: Object.keys(userShares) } });

  await Promise.all(
    users.map((user) => {
      // Calculate balance adjustment
      const balanceAdjustment =
        user._id.toString() === expense.paidBy.toString()
          ? -userShares[user._id].shareAmount
          : userShares[user._id].shareAmount;
      user.balance += balanceAdjustment;

      // Update `expensesPaid` or `expensesOwed`
      if (user._id.toString() === expense.paidBy.toString()) {
        if (!user.expensesPaid.includes(expense._id)) {
          user.expensesPaid.push(expense._id);
        }
      } else {
        if (!user.expensesOwed.includes(expense._id)) {
          user.expensesOwed.push(expense._id);
        }
      }

      return user.save();
    })
  );

  // Save the expense with the share details
  expense.sharedWith = Object.keys(userShares).map((user) => ({
    user,
    ...userShares[user],
  }));
  await expense.save();

  res.status(200).json({ status: "success", data: expense.sharedWith });
});

// Get expense details
const getExpenseDetails = catchAsync(async (req, res, next) => {
  const { expenseId } = req.params;
  const userId = req.userId;

  const expense = await Expense.findById(expenseId)
    .populate("paidBy", "name email")
    .populate({
      path: "sharedWith.user",
      select: "name email",
    });

  if (!expense) {
    return next(new AppError("Expense not found", 404));
  }

  let totalOwed = 0;
  let totalReturned = 0;

  const paidBy = expense.paidBy;
  const userShare = expense.sharedWith.find(
    (share) => share.user._id.toString() === userId
  );

  // If the user is involved in this expense
  if (userShare) {
    const shareAmount = userShare.shareAmount;

    // Check if the user is the one who paid
    const isOwed = paidBy._id.toString() !== userId;

    // Update the balances
    if (isOwed) {
      totalOwed = shareAmount;
    } else {
      totalReturned += shareAmount;
    }
  }

  const result = {
    _id: expense._id,
    description: expense.description,
    totalAmount: expense.totalAmount,
    paidBy: expense.paidBy,
    sharedWith: expense.sharedWith,
    date: expense.date,
    image: expense.image,
    group: expense.group,
    totalOwed,
    totalReturned,
  };

  // Get items by expenseId
  const items = await Item.find({ expense: expenseId })
    .populate("sharedBy", "name email")
    .populate("exemptedBy", "name email");

  res.status(200).json({ status: "success", data: { ...result, items } });
});

const getAllExpenses = catchAsync(async (req, res, next) => {
  const userId = req.userId;

  // Fetch groups where the user is a member
  const groups = await Group.find({ members: userId });

  // Extract the group IDs
  const groupIds = groups.map((group) => group._id);

  const expenses = await Expense.find({ group: { $in: groupIds } })
    .populate("paidBy", "name email")
    .populate({
      path: "sharedWith.user",
      select: "name email",
    });

  const expensesData = expenses.map((expense) => {
    let totalOwed = 0;
    let totalReturned = 0;

    const paidBy = expense.paidBy;
    const userShare = expense.sharedWith.find(
      (share) => share.user._id.toString() === userId
    );

    // If the user is involved in this expense
    if (userShare) {
      const shareAmount = userShare.shareAmount;

      // Check if the user is the one who paid
      const isOwed = paidBy._id.toString() !== userId;

      // Update the balances
      if (isOwed) {
        totalOwed = shareAmount;
      } else {
        totalReturned += shareAmount;
      }
    }

    return {
      _id: expense._id,
      description: expense.description,
      totalAmount: expense.totalAmount,
      paidBy: expense.paidBy,
      sharedWith: expense.sharedWith,
      date: expense.date,
      image: expense.image,
      group: expense.group,
      totalOwed,
      totalReturned,
    };
  });

  res.status(200).json({ status: "success", data: expensesData });
});

const deleteExpense = catchAsync(async (req, res, next) => {
  const { expenseId } = req.params;
  const expense = await Expense.findByIdAndDelete(expenseId);

  if (!expense) {
    return next(new AppError("Expense not found", 404));
  }

  res
    .status(204)
    .json({ status: "success", data: "Expense deleted successfully" });
});

module.exports = {
  upload,
  createExpense,
  updateExpense,
  finalizeExpense,
  getExpenseDetails,
  getAllExpenses,
  deleteExpense,
};
