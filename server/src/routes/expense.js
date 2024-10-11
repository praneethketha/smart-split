const express = require("express");
const {
  createExpense,
  finalizeExpense,
  getExpenseDetails,
  getAllExpenses,
  deleteExpense,
  upload,
} = require("../controllers/expense");
const { addItemToExpense, getItemsByExpense } = require("../controllers/item");

const router = express.Router();

router.get("/", getAllExpenses);
router.post("/", upload.single("image"), createExpense);
router.get("/:expenseId", getExpenseDetails);
router.delete("/:expenseId", deleteExpense);
router.post("/finalize", finalizeExpense);
router.post("/:expenseId/items", addItemToExpense);
router.get("/:expenseId/items", getItemsByExpense);

module.exports = router;
