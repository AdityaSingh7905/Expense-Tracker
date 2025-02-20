const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { mongoConnect } = require("./config/db");
const transactionRouter = require("./routes/transaction/transaction.router");
const budgetRouter = require("./routes/budget/budget.router.js");

dotenv.config();
const app = express();

// database connection
mongoConnect();

// middleware
app.use(express.json());
app.use(cors());

// api routes
app.use("/api/transactions", transactionRouter);
app.use("/api/budgets", budgetRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on the ${PORT}`);
});
