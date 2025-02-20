const express = require("express");
const { getBudgets, postBudgets } = require("./budget.controller");

const budgetRouter = express.Router();

budgetRouter.get("/", getBudgets);
budgetRouter.post("/", postBudgets);
// budgetRouter.put("/:id", updateBudget);

module.exports = budgetRouter;
