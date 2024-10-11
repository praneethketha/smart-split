const express = require("express");
const {
  createGroup,
  addUserToGroup,
  getGroupDetails,
  getGroups,
  getUsersInGroup,
  getUserBalancesByGroup,
} = require("../controllers/group");

const router = express.Router();

router.post("/", createGroup);
router.get("/", getGroups);
router.post("/add-user", addUserToGroup);
router.get("/user-balances/:userId", getUserBalancesByGroup); // New route
router.get("/:groupId", getGroupDetails);
router.get("/:groupId/users", getUsersInGroup);

module.exports = router;
