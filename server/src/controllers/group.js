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

const addUserToGroup = catchAsync(async (req, res, next) => {
  const { groupId, userId } = req.body;
  console.log({ groupId, userId });
  const group = await Group.findById(groupId);
  console.log({ group });

  if (!group) {
    return next(new AppError("Group not found", 404));
  }

  const user = await User.findById(userId);
  if (!user) {
    return next(new AppError("User not found", 404));
  }

  console.log({ user });

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
  const groups = await Group.find().populate("members");
  console.log({ groups });

  res.status(200).json({ status: "success", data: groups });
});

const getGroupDetails = catchAsync(async (req, res, next) => {
  const { groupId } = req.params;
  console.log({ groupId });
  const group = await Group.findById(groupId).populate("members");

  console.log({ group });

  if (!group) {
    return next(new AppError("Group not found", 404));
  }
  res.status(200).json({ status: "success", data: group });
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
  addUserToGroup,
  getGroups,
  getGroupDetails,
  getUsersInGroup,
};
