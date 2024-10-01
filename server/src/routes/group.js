const express = require("express");
const {
  createGroup,
  addUserToGroup,
  getGroupDetails,
  getGroups,
} = require("../controllers/group");

const router = express.Router();

router.post("/", createGroup);
router.post("/add-user", addUserToGroup);
router.get("/:groupId", getGroupDetails);
router.get("/", getGroups);

module.exports = router;
