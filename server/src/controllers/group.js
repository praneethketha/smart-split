const Expense = require("../models/expense");
const Group = require("../models/group");
const User = require("../models/user");
const AppError = require("../utils/app-error");
const catchAsync = require("../utils/catch-async");

const createGroup = catchAsync(async (req, res, next) => {
  const { name } = req.body;
  const group = new Group({ name, users: [] });
  await group.save();

  res.status(201).json({ status: "success", data: group });
});

const deleteGroup = catchAsync(async (req, res, next) => {
  const { groupId } = req.params;
  const group = await Group.findByIdAndDelete(groupId);

  if (!group) {
    return next(new AppError("Group not found", 404));
  }

  res
    .status(204)
    .json({ status: "success", data: "Group deleted successfully!" });
});

const updateGroup = catchAsync(async (req, res, next) => {
  const { groupId } = req.params;
  const { name } = req.body;

  const group = await Group.findByIdAndUpdate(
    groupId,
    { name },
    { new: true, runValidators: true }
  );

  if (!group) {
    return next(new AppError("Group not found", 404));
  }

  res.status(200).json({ status: "success", data: group });
});

const addUserToGroup = catchAsync(async (req, res, next) => {
  const { groupId, userId } = req.body;
  const group = await Group.findById(groupId);

  if (!group) {
    return next(new AppError("Group not found", 404));
  }

  const user = await User.findById(userId);
  if (!user) {
    return next(new AppError("User not found", 404));
  }

  // Add user to the group if not already present
  if (!group.members.includes(userId)) {
    group.members.push(userId);
  }

  console.log({ updatedGroup: group });

  const dbGroup = await group.save();
  console.log({ dbGroup });
  res.status(200).json({ status: "success", data: group });
});

const getGroups = catchAsync(async (req, res, next) => {
  const { userId } = req.query;

  // Fetch all groups with members and expenses
  const groups = await Group.find()
    .populate("members", "-password")
    .populate({
      path: "expenses",
      select: "description totalAmount paidBy sharedWith",
      populate: {
        path: "paidBy",
        select: "name email",
      },
    });

  // Structure to store totalOwed and totalReturned for each group
  const groupsWithTotals = groups.map((group) => {
    let totalOwed = 0;
    let totalReturned = 0;

    group.expenses.forEach((expense) => {
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
          totalOwed += shareAmount;
        } else {
          totalReturned += shareAmount;
        }
      }
    });

    return {
      _id: group._id,
      name: group.name,
      members: group.members,
      expenses: group.expenses,
      totalOwed,
      totalReturned,
    };
  });

  // Send the response with calculated totals
  res.status(200).json({
    status: "success",
    data: groupsWithTotals,
  });
});

const getGroupDetails = catchAsync(async (req, res, next) => {
  const { groupId } = req.params;
  const { userId } = req.query;
  console.log({ groupId, userId });

  const group = await Group.findById(groupId)
    .populate("members", "-password")
    .populate({
      path: "expenses",
      select: "description totalAmount paidBy sharedWith",
      populate: {
        path: "paidBy",
        select: "name email",
      },
    });

  if (!group) {
    return next(new AppError("Group not found", 404));
  }

  // Iterate over each expense to calculate the amounts owed or received by user
  const expenses = group.expenses.map((expense) => {
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

      return {
        _id: expense._id,
        description: expense.description,
        totalAmount: expense.totalAmount,
        paidBy: expense.paidBy,
        sharedWith: expense.sharedWith,
        date: expense.date,
        totalOwed,
        totalReturned,
      };
    }
  });

  const result = {
    _id: group._id,
    name: group.name,
    members: group.members,
    createdAt: group.createdAt,
    expenses,
  };

  res.status(200).json({ status: "success", data: result });
});

const getUsersInGroup = catchAsync(async (req, res, next) => {
  const { groupId } = req.params;
  // Find the group by ID and populate the 'members' field with user data
  const group = await Group.findById(groupId).populate(
    "members",
    "name email balance"
  );

  // If no group is found, return a 404
  if (!group) {
    return next(new AppError("Group not found", 404));
  }

  // Return the list of users in the group
  res.status(200).json(group.members);
});

module.exports = {
  createGroup,
  deleteGroup,
  updateGroup,
  addUserToGroup,
  getGroups,
  getGroupDetails,
  getUsersInGroup,
};
