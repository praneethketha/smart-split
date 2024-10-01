const Group = require("../models/group");
const User = require("../models/user");
const AppError = require("../utils/app-error");
const catchAsync = require("../utils/catch-async");

const createGroup = catchAsync(async (req, res) => {
  const { name } = req.body;
  const group = new Group({ name, users: [] });
  await group.save();

  res.status(201).json({ status: "success", data: group });
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
  if (!group.users.includes(userId)) {
    group.users.push(userId);
  }

  await group.save();
  res.status(200).json({ status: "success", data: group });
});

const getGroups = catchAsync(async (req, res) => {
  const groups = await Group.find().populate("users").populate("expenses");

  res.status(200).json({ status: "success", data: groups });
});

const getGroupDetails = catchAsync(async (req, res, next) => {
  const { groupId } = req.params;
  const group = await Group.findById(groupId)
    .populate("users")
    .populate("expenses");

  if (!group) {
    return next(new AppError("Group not found", 404));
  }
  res.status(200).json(group);
});

module.exports = {
  createGroup,
  addUserToGroup,
  getGroups,
  getGroupDetails,
};
