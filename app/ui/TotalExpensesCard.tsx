"use client";
import { useContext } from "react";
import ExpenseContext from "../context/ExpenseContextProvider";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const TotalExpensesCard = () => {
  const expenseCtx = useContext(ExpenseContext);
  // console.log(expenseCtx.budgets);

  const totalBudget = expenseCtx.budgets.reduce(
    (total, budget) => total + (budget.amount || 0),
    0
  );

  const spentBudget = (expenseCtx.transactions ?? []).reduce(
    (total: number, txn: { amount: number }) => total + (txn.amount || 0),
    0
  );

  const remainingBudget = totalBudget - spentBudget;
  const spendingPercentage =
    totalBudget > 0 ? Math.min((spentBudget / totalBudget) * 100, 100) : 0;

  return (
    <Card className="w-full h-[250px] shadow-lg border border-gray-300">
      <CardContent className="p-6 flex flex-col justify-between h-full">
        <h2 className="text-lg font-bold text-center">Budget Overview</h2>

        <div className="flex flex-col gap-2">
          <p className="flex justify-between text-sm">
            <span className="font-semibold">Total Budget:</span>
            <span>${totalBudget.toFixed(2)}</span>
          </p>
          <p className="flex justify-between text-sm">
            <span className="font-semibold">Spent Budget:</span>
            <span className="text-red-500">${spentBudget.toFixed(2)}</span>
          </p>
          <p className="flex justify-between text-sm">
            <span className="font-semibold">Remaining Budget:</span>
            <span className="text-green-500">
              ${remainingBudget.toFixed(2)}
            </span>
          </p>
        </div>

        <div className="mt-3">
          <p className="text-sm font-semibold mb-1">Spending Progress</p>
          <Progress value={spendingPercentage} className="h-2 bg-gray-200" />
          <p className="text-center text-xs mt-1">
            {spendingPercentage.toFixed(1)}% Spent
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default TotalExpensesCard;
