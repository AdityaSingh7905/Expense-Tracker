import { useContext } from "react";
import ExpenseContext from "../context/ExpenseContextProvider";
import { Card, CardContent } from "@/components/ui/card";

const RecentTransactions = () => {
  const { transactions } = useContext(ExpenseContext);

  // Sorting transactions by date (newest first)
  const sortedTransactions = transactions
    ?.slice() // Create a copy to avoid mutating the original array
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // Get the latest 5 transactions
  const latestTransactions = sortedTransactions.slice(0, 5);

  return (
    <Card className="w-full h-[250px] shadow-md border border-gray-300 rounded-xl flex flex-col">
      <CardContent className="p-4 flex-1 overflow-y-auto">
        <h3 className="text-md font-semibold text-gray-800 text-center mb-2">
          Recent Transactions
        </h3>
        <ul className="space-y-2">
          {latestTransactions.length > 0 ? (
            latestTransactions.map((transaction) => (
              <li
                key={transaction.id}
                className="flex justify-between items-center bg-gray-50 p-2 rounded-md"
              >
                <p className="text-xs text-gray-500">{transaction.category}</p>
                <div className="text-right">
                  <p
                    className={`text-sm font-semibold ${
                      transaction.amount < 0 ? "text-red-500" : "text-green-500"
                    }`}
                  >
                    ${Math.abs(transaction.amount)}
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(transaction.date).toLocaleDateString()}
                  </p>
                </div>
              </li>
            ))
          ) : (
            <p className="text-gray-500 text-center text-sm">
              No recent transactions.
            </p>
          )}
        </ul>
      </CardContent>
    </Card>
  );
};

export default RecentTransactions;
