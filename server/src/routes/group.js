const express = require("express");
const {
  createGroup,
  addUserToGroup,
  getGroupDetails,
  getGroups,
  getUsersInGroup,
  updateGroup,
  deleteGroup,
} = require("../controllers/group");

const router = express.Router();

router.post("/", createGroup);
router.get("/", getGroups);
router.post("/add-user", addUserToGroup);
router.get("/:groupId", getGroupDetails);
router.patch("/:groupId", updateGroup);
router.delete("/:groupId", deleteGroup);
router.get("/:groupId/users", getUsersInGroup);

module.exports = router;
