"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { useContext } from "react";
import ExpenseContext from "../context/ExpenseContextProvider";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#A569BD",
  "#F39C12",
];

const CategoryPieChart = () => {
  const { transactions } = useContext(ExpenseContext);

  const getCategoryWiseExpenses = () => {
    const categoryData: { [key: string]: number } = {};

    transactions.forEach((transaction) => {
      categoryData[transaction.category] =
        (categoryData[transaction.category] || 0) + transaction.amount;
    });

    return Object.entries(categoryData).map(([category, amount]) => ({
      category,
      amount,
    }));
  };

  const data = getCategoryWiseExpenses();

  return (
    <div className="w-full p-3 bg-white border border-gray-300 rounded-xl shadow-md h-[280px] flex flex-col items-center">
      <h2 className="text-lg font-semibold text-black text-center mb-2">
        Category-wise Expenses
      </h2>
      <ResponsiveContainer width="100%" height={210}>
        <PieChart>
          <Pie
            data={data}
            dataKey="amount"
            nameKey="category"
            cx="50%"
            cy="50%"
            outerRadius={70}
            fill="#8884d8"
            label={({ name, percent }) =>
              `${name.length > 10 ? name.slice(0, 10) + ".." : name} ${(
                percent * 100
              ).toFixed(0)}%`
            }
            labelLine={{ strokeWidth: 1 }}
          >
            {data.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CategoryPieChart;
