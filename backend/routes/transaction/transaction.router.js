const express = require("express");
const {
  getTransactions,
  getSingleTransaction,
  postTransactions,
  updateTransactions,
  deleteTransactions,
} = require("./transaction.controller");

const transactionRouter = express.Router();

transactionRouter.get("/", getTransactions);
transactionRouter.get("/:id", getSingleTransaction);
transactionRouter.post("/", postTransactions);
transactionRouter.put("/:id", updateTransactions);
transactionRouter.delete("/:id", deleteTransactions);

module.exports = transactionRouter;
