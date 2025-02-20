const mongoose = require("mongoose");
const Budget = require("../../models/budget.model");

const getBudgets = async (req, res) => {
  try {
    const budgets = await Budget.find();
    const formattedBudgets = budgets.map((budget) => ({
      id: budget._id.toString(),
      category: budget.category,
      amount: budget.amount,
    }));
    res.status(200).json(formattedBudgets);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching budgets", error: err.message });
  }
};

const postBudgets = async (req, res) => {
  try {
    const { category, amount } = req.body;

    console.log("Category: ", category);
    console.log("Amount: ", amount);
    // Validate input
    if (!category || amount === undefined) {
      return res
        .status(400)
        .json({ message: "Category and amount are required" });
    }

    const existingBudget = await Budget.findOne({ category });
    if (existingBudget) {
      existingBudget.amount = amount;
      await existingBudget.save();
      return res.status(200).json(existingBudget);
    }

    // Create and save new budget
    const newBudget = new Budget({ category, amount });
    await newBudget.save();

    res.status(201).json(newBudget);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error adding budget", error: err.message });
  }
};

module.exports = { getBudgets, postBudgets };
