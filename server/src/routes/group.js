const express = require("express");
const {
  createGroup,
  addUserToGroup,
  getGroupDetails,
  getGroups,
  getUsersInGroup,
} = require("../controllers/group");

const router = express.Router();

router.get("/", getGroups);
router.post("/", createGroup);
router.post("/add-user", addUserToGroup);
router.get("/:groupId", getGroupDetails);
router.get("/:groupId/users", getUsersInGroup);

module.exports = router;
