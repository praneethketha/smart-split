const express = require("express");
const { createUser, getUserDetails, getUsers } = require("../controllers/user");

const router = express.Router();

router.get("/", getUsers);
router.post("/", createUser);
router.get("/:userId", getUserDetails);

module.exports = router;
