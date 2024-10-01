const express = require("express");
const { createUser, getUserDetails } = require("../controllers/user");

const router = express.Router();

router.post("/", createUser);
router.get("/:userId", getUserDetails);

module.exports = router;
