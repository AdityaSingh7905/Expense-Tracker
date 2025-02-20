const mongoose = require("mongoose");
const Transaction = require("../../models/transaction.model");

const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find();
    const formattedTransactions = transactions.map((txn) => ({
      id: txn._id.toString(),
      date: txn.date,
      description: txn.description,
      amount: txn.amount,
      category: txn.category,
    }));
    res.status(200).json(formattedTransactions);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching transactions", error: err.message });
  }
};

const getSingleTransaction = async (req, res) => {
  try {
    const id = req.params.id;
    const transaction = await Transaction.findById(id);
    if (!transaction) {
      return res.status(404).json({ message: "Transaction Not Found" });
    }
    res.status(201).json(transaction);
  } catch (err) {
    res.status(500).json({
      message: "Error fetching transaction",
      error: err.message,
    });
  }
};

const postTransactions = async (req, res) => {
  try {
    const { date, description, amount, category } = req.body;
    const newTransaction = new Transaction({
      _id: new mongoose.Types.ObjectId(),
      date,
      description,
      amount,
      category,
    });
    await newTransaction.save();
    res.status(201).json(newTransaction);
  } catch (err) {
    res.status(500).json({
      message: "Error adding transaction",
      error: err.message,
    });
  }
};

const updateTransactions = async (req, res) => {
  try {
    const transaction = req.body;
    const id = req.params.id;
    const updatedTransaction = await Transaction.findByIdAndUpdate(
      id,
      transaction,
      {
        new: true,
      }
    );
    if (!updatedTransaction) {
      return res.status(404).json({ message: "Transaction Not Found!!" });
    }
    res.status(201).json(updatedTransaction);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating Transaction", error: err.message });
  }
};

const deleteTransactions = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedTransaction = await Transaction.findByIdAndDelete(id);
    if (!deletedTransaction) {
      return res.status(404).json({ message: "Transaction Not Found!!" });
    }
    res.status(201).json(deletedTransaction);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error deleting Transaction", error: err.message });
  }
};

module.exports = {
  getTransactions,
  getSingleTransaction,
  postTransactions,
  updateTransactions,
  deleteTransactions,
};
