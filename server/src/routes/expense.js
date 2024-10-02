const express = require("express");
const {
  createExpense,
  finalizeExpense,
  getExpenseDetails,
  getAllExpenses,
} = require("../controllers/expense");
const { addItemToExpense, getItemsByExpense } = require("../controllers/item");

const router = express.Router();

router.get("/", getAllExpenses);
router.post("/", createExpense);
router.post("/finalize", finalizeExpense);
router.get("/:expenseId", getExpenseDetails);
router.post("/:expenseId/items", addItemToExpense);
router.get("/:expenseId/items", getItemsByExpense);

module.exports = router;
