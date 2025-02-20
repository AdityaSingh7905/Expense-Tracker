import { useContext } from "react";
import ExpenseContext from "../context/ExpenseContextProvider";
import { Card, CardContent } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const MonthlyExpensesChart = () => {
  const { monthlyExpenses } = useContext(ExpenseContext);
  // console.log(monthlyExpenses);
  // Convert object to array and sort it based on monthOrder
  const chartData = Object.keys(monthlyExpenses)
    .map((month) => ({
      month,
      amount: monthlyExpenses[month],
    }))
    .sort((a, b) => a.month.localeCompare(b.month)); // Sorts in ascending order

  return (
    <Card className="shadow-xl rounded-xl border-2 border-gray-800 bg-white-800 w-full max-w-[600px] mx-auto">
      <CardContent className="p-4 sm:p-6">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4 text-center">
          Monthly Expenses
        </h2>

        <div className="w-full flex justify-center">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={chartData}
              margin={{ top: 10, right: 20, left: 0, bottom: 30 }}
              barCategoryGap={chartData.length > 6 ? "10%" : "30%"}
            >
              <XAxis
                dataKey="month"
                tick={{ fill: "#4B5563" }}
                angle={-30} // Adjusted for readability
                textAnchor="end"
                interval={0}
              />
              <YAxis tick={{ fill: "#4B5563" }} />
              <Tooltip
                contentStyle={{ backgroundColor: "#fff", borderRadius: "8px" }}
              />
              <Bar
                dataKey="amount"
                fill="#3b82f6"
                radius={[6, 6, 0, 0]}
                className="transition-all duration-300 hover:fill-blue-400"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default MonthlyExpensesChart;
