"use client";
import { useContext } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import ExpenseContext from "../context/ExpenseContextProvider";
import { Card, CardContent } from "@/components/ui/card";

const categories = [
  "Bills&Utilities",
  "Sports&Entertainment",
  "Food",
  "Household",
  "Shopping",
  "Travel&Transport",
  "Others",
];

const BudgetVsActualChart = () => {
  const expenseCtx = useContext(ExpenseContext);

  // Aggregate actual expenses per category
  const categoryTotals: { [key: string]: number } = {};
  expenseCtx.transactions.forEach((txn) => {
    if (!categoryTotals[txn.category]) {
      categoryTotals[txn.category] = 0;
    }
    categoryTotals[txn.category] += txn.amount;
  });

  // Aggregate budget per category from the database
  const budgetTotals: { [key: string]: number } = {};
  expenseCtx.budgets.forEach((budget) => {
    if (!budgetTotals[budget.category]) {
      budgetTotals[budget.category] = 0;
    }
    budgetTotals[budget.category] += budget.amount;
  });

  // Prepare data for the chart
  const chartData = categories.map((category) => ({
    category,
    Budget: budgetTotals[category] || 0,
    Actual: categoryTotals[category] || 0,
  }));

  return (
    <Card className="w-full h-[280px] shadow-md border border-gray-300 rounded-xl">
      <CardContent className="p-2">
        <h2 className="text-lg font-semibold text-center mb-1">
          Budget V/S Actual Spending
        </h2>
        <ResponsiveContainer width="100%" height={230}>
          <BarChart
            data={chartData}
            margin={{ top: 5, right: 10, left: 10, bottom: 25 }}
          >
            <XAxis
              dataKey="category"
              tick={{ fontSize: 11 }}
              angle={-15}
              textAnchor="end"
              interval={0}
            />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="Budget" fill="#4F46E5" radius={[3, 3, 0, 0]} />
            <Bar dataKey="Actual" fill="#F87171" radius={[3, 3, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default BudgetVsActualChart;
