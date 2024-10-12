const express = require("express");
const {
  createExpense,
  finalizeExpense,
  getExpenseDetails,
  getAllExpenses,
  deleteExpense,
  upload,
  updateExpense,
} = require("../controllers/expense");
const { addItemToExpense, getItemsByExpense } = require("../controllers/item");
const { verifyToken } = require("../controllers/auth");

const router = express.Router();

router.get("/", verifyToken, getAllExpenses);
router.post("/", upload.single("image"), createExpense);
router.patch("/:expenseId", upload.single("image"), updateExpense);
router.get("/:expenseId", verifyToken, getExpenseDetails);
router.delete("/:expenseId", verifyToken, deleteExpense);
router.post("/finalize", verifyToken, finalizeExpense);
router.post("/:expenseId/items", verifyToken, addItemToExpense);
router.get("/:expenseId/items", verifyToken, getItemsByExpense);

module.exports = router;
