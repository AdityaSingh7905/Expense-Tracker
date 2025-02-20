"use client";
import { ReactNode, useState, createContext, useEffect } from "react";

interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  category: string;
}

type MonthlyData = Record<string, number>;

type ExpenseContextType = {
  transactions: Transaction[];
  monthlyExpenses: MonthlyData;
  getTransaction: () => void;
  addTransaction: (transaction: Omit<Transaction, "id">) => void;
  updateTransaction: (
    id: string,
    updatedTransaction: Omit<Transaction, "id">
  ) => void;
  deleteTransaction: (id: string) => void;
  setEditingTransaction: (transaction: Transaction) => void;
  editingTransaction: Transaction | null;
  setBudgetHandler: (category: string, amount: number) => void;
  budgets: Record<string, number>[];
};

const ExpenseContext = createContext<ExpenseContextType>({
  transactions: [],
  monthlyExpenses: {},
  getTransaction: () => {},
  addTransaction: () => {},
  updateTransaction: () => {},
  deleteTransaction: () => {},
  setEditingTransaction: () => {},
  editingTransaction: null,
  setBudgetHandler: () => {},
  budgets: [],
});

const API_URL = "http://localhost:8000/api/transactions";

export const ExpenseContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [monthlyExpenses, setMonthlyExpenses] = useState<MonthlyData>({});
  const [editingTransaction, setEditingTransaction] =
    useState<Transaction | null>(null);
  const [budgets, setBudgets] = useState<Record<string, number>[]>([]);

  const getBudgetHandler = async () => {
    const res = await fetch("http://localhost:8000/api/budgets", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      throw new Error("Failed to fetch budgets!!");
    }
    const data = await res.json();
    console.log(data);
    setBudgets(data);
  };

  const setBudgetHandler = async (category: string, amount: number) => {
    const newBudget = {
      category,
      amount,
    };
    console.log(newBudget);
    const res = await fetch("http://localhost:8000/api/budgets", {
      method: "POST",
      body: JSON.stringify(newBudget),
      headers: {
        "Content-Type": "application/json",
      },
    });
    // console.log("Req Status: ", res.status);
    // console.log("Req, Message", res.text());
    // console.log(res.ok);
    if (!res.ok) {
      throw new Error("Failed to add budget!!");
    }
    const data = await res.json();
    console.log("Added Budget: ", data);

    // setBudgets((prev) => [...prev, data]);
    getBudgetHandler();
  };

  const getMonthlyExpenses = (transactions: Transaction[]): MonthlyData => {
    return transactions.reduce<MonthlyData>((acc, txn) => {
      const month: string = txn.date.slice(0, 7); // Extract YYYY-MM

      acc[month] = (acc[month] || 0) + txn.amount;
      return acc;
    }, {});
  };

  // get all transactions
  const getTransactionHandler = async () => {
    const res = await fetch(API_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      throw new Error("Failed to fetch transactions!!");
    }
    const data = await res.json();
    console.log("Fetched Transactions: ", data);
    setTransactions(data);
    setMonthlyExpenses(getMonthlyExpenses(data));
  };

  // fetch data on mount
  useEffect(() => {
    getTransactionHandler();
    getBudgetHandler();
  }, []);

  useEffect(() => {
    if (transactions) {
      setMonthlyExpenses(getMonthlyExpenses(transactions));
    }
  }, [transactions]);

  // Add Transaction Function
  const addTransactionHandler = async (
    newTransaction: Omit<Transaction, "id">
  ) => {
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        body: JSON.stringify(newTransaction),
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Response Status:", res.status);
      // console.log("Response Text:", await res.text());

      if (!res.ok) {
        throw new Error("Failed to add transaction!!");
      }

      const data = await res.json();
      console.log("Added Transaction: ", data);

      setTransactions((prev) => [...prev, data]);
      setMonthlyExpenses((prevExpenses) =>
        getMonthlyExpenses([...transactions, data])
      );
    } catch (error: any) {
      console.error("Error adding transaction:", error.message);
    }
  };

  const updateTransactionHandler = async (
    id: string,
    updatedTransaction: Omit<Transaction, "id">
  ) => {
    // update expense in the database
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      body: JSON.stringify(updatedTransaction),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      throw new Error("Failed to update transaction!!");
    }
    const data = await res.json();
    console.log("Updated Transaction: ", data);
    setTransactions((prev) =>
      prev.map((txn) =>
        txn.id === id ? { ...txn, ...updatedTransaction } : txn
      )
    );
    setEditingTransaction(null);
  };

  const deleteTransactionHandler = async (id: string) => {
    // delete expense from the database
    const res = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      throw new Error("Failed to delete transaction!!");
    }
    const data = await res.json();
    console.log("Deleted Transaction: ", data);
    setTransactions((prev) => prev.filter((txn) => txn.id !== id));
  };

  const expenseContext: ExpenseContextType = {
    transactions,
    monthlyExpenses,
    getTransaction: getTransactionHandler,
    addTransaction: addTransactionHandler,
    updateTransaction: updateTransactionHandler,
    deleteTransaction: deleteTransactionHandler,
    setEditingTransaction,
    editingTransaction,
    setBudgetHandler,
    budgets,
  };

  return (
    <ExpenseContext.Provider value={expenseContext}>
      {children}
    </ExpenseContext.Provider>
  );
};

export default ExpenseContext;
