"use client";
import { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import ExpenseContext from "../context/ExpenseContextProvider";
import { Card, CardContent } from "@/components/ui/card";
import { MdEdit, MdDelete } from "react-icons/md";
import TransactionCard from "./TransactionCard";

interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  category: string;
}

const TransactionList = () => {
  const expenseCtx = useContext(ExpenseContext);
  const router = useRouter();
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);

  // Sorting transactions by date (newest first)
  const sortedTransactions = expenseCtx.transactions
    ?.slice()
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const confirmDeleteHandler = (id: string) => {
    if (selectedTransaction) {
      expenseCtx.deleteTransaction(id);
      setSelectedTransaction(null);
    }
  };

  return (
    <Card className="w-full h-full shadow-lg border border-gray-300">
      <CardContent className="p-6 h-full flex flex-col">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Transactions List
        </h2>

        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="sticky top-0 bg-gray-200 z-10">
              <tr className="border-b text-gray-700">
                <th className="p-3">Date</th>
                <th className="p-3">Description</th>
                <th className="p-3">Amount</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedTransactions?.length ? (
                sortedTransactions.map((txn) => (
                  <tr key={txn?.id} className="border-b hover:bg-gray-100">
                    <td className="p-3">{txn.date}</td>
                    <td className="p-3">{txn.description}</td>
                    <td className="p-3 font-semibold text-green-600">
                      ${txn.amount}
                    </td>
                    <td className="p-3 text-center">
                      <div className="flex justify-center gap-4">
                        <button
                          onClick={() => {
                            expenseCtx.setEditingTransaction(txn);
                            router.push("/add-expense");
                          }}
                          className="text-blue-500 hover:text-blue-700"
                        >
                          <MdEdit size={20} />
                        </button>
                        <button
                          onClick={() => setSelectedTransaction(txn)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <MdDelete size={20} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="text-center text-gray-500 p-4">
                    No transactions available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile View - Card Layout */}
        <div className="md:hidden flex flex-col gap-4">
          {sortedTransactions?.length ? (
            sortedTransactions.map((txn) => (
              <div
                key={txn?.id}
                className="border border-gray-300 p-4 rounded-lg shadow-sm bg-white"
              >
                <p className="text-sm text-gray-500">{txn.date}</p>
                <h3 className="text-lg font-semibold">{txn.description}</h3>
                <p className="text-green-600 font-bold">${txn.amount}</p>

                <div className="flex justify-between mt-2">
                  <button
                    onClick={() => {
                      expenseCtx.setEditingTransaction(txn);
                      router.push("/add-expense");
                    }}
                    className="text-blue-500 hover:text-blue-700 flex items-center gap-1"
                  >
                    <MdEdit size={18} />
                    Edit
                  </button>
                  <button
                    onClick={() => setSelectedTransaction(txn)}
                    className="text-red-500 hover:text-red-700 flex items-center gap-1"
                  >
                    <MdDelete size={18} />
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">
              No transactions available.
            </p>
          )}
        </div>
      </CardContent>

      {selectedTransaction && (
        <TransactionCard
          transaction={selectedTransaction}
          setTransaction={setSelectedTransaction}
          onConfirm={confirmDeleteHandler}
        />
      )}
    </Card>
  );
};

export default TransactionList;
