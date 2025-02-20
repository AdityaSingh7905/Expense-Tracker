"use client";

import { useState, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import ExpenseContext from "../context/ExpenseContextProvider";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const categories = [
  "Bills&Utilities",
  "Sports&Entertainment",
  "Food",
  "Household",
  "Shopping",
  "Travel&Transport",
  "Others",
];

// Add Expense Form Component
const AddExpense = () => {
  const { addTransaction, updateTransaction, editingTransaction } =
    useContext(ExpenseContext);
  const [date, setDate] = useState("");
  const [desc, setDesc] = useState("");
  const [cat, setCat] = useState("");
  const [amount, setAmount] = useState("");

  const [dateIsTouched, setDateIsTouched] = useState(false);
  const [descIsTouched, setDescIsTouched] = useState(false);
  const [catIsTouched, setCatIsTouched] = useState(false);
  const [amountIsTouched, setAmountIsTouched] = useState(false);

  useEffect(() => {
    if (editingTransaction) {
      setDate(editingTransaction.date);
      setDesc(editingTransaction.description);
      setCat(editingTransaction.category);
      setAmount(editingTransaction.amount.toString());
    }
  }, [editingTransaction]);

  const router = useRouter();

  const isValidDateFormat = (date: string) => {
    return /^\d{4}-\d{2}-\d{2}$/.test(date);
  };
  const isValidDate = (date: string) => {
    if (!isValidDateFormat(date)) return false; // Check format first

    const parsedDate = new Date(date);
    return (
      parsedDate instanceof Date &&
      !isNaN(parsedDate.getTime()) && // Check if it's a real date
      date === parsedDate.toISOString().split("T")[0] // Ensures YYYY-MM-DD format
    );
  };

  const validateDate = (date: string) => {
    if (!isValidDate(date)) return false;
    if (date < Date.now().toString()) return false;
    return true;
  };

  const validateDesc = (desc: string) => {
    if (desc.trim().length > 0) return true;
    return false;
  };

  const validateCat = (cat: string) => {
    if (cat.trim().length > 0) return true;
    return false;
  };

  const validateAmount = (amount: string) => {
    if (!isNaN(Number(amount)) && Number(amount) > 0) return true;
    return false;
  };

  const dateIsValid = validateDate(date);
  const dateHasError = !dateIsValid && dateIsTouched;

  const descIsValid = validateDesc(desc);
  const descHasError = !descIsValid && descIsTouched;

  const catIsValid = validateCat(cat);
  const catHasError = !catIsValid && catIsTouched;

  const amountIsValid = validateAmount(amount);
  const amountHasError = !amountIsValid && amountIsTouched;

  const formIsValid = dateIsValid && descIsValid && catIsValid && amountIsValid;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formIsValid);
    if (!formIsValid) {
      console.log("Form validation failed!");
      return;
    }

    if (editingTransaction) {
      updateTransaction(editingTransaction.id, {
        date: date,
        description: desc,
        amount: +amount,
        category: cat,
      });
    } else {
      const newTransaction = {
        date: date,
        description: desc,
        amount: Number(amount),
        category: cat,
      };

      console.log("Submitting...", newTransaction);
      addTransaction(newTransaction);
    }

    // Reset Form
    setDate("");
    setDesc("");
    setCat("");
    setAmount("");

    setDateIsTouched(false);
    setDescIsTouched(false);
    setCatIsTouched(false);
    setAmountIsTouched(false);
    router.push("/");
  };

  return (
    <Card className="bg-white-800 shadow-lg rounded-2xl border-2 border-gray-800 p-4 sm:p-6 w-full max-w-[550px] mx-auto">
      <CardContent className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 text-center">
          {editingTransaction ? "Edit Expense" : "Add Expense"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              className={`w-full bg-white ${
                dateHasError ? "bg-red-100" : ""
              } focus:ring-2 focus:ring-blue-500`}
              placeholder="Date (YYYY-MM-DD)"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              onBlur={() => setDateIsTouched(true)}
            />
            {dateHasError && (
              <p className="text-red-500 text-sm mt-1">
                Enter a valid date (YYYY-MM-DD).
              </p>
            )}
          </div>

          <div>
            <Input
              className={`w-full bg-white ${
                descHasError ? "bg-red-100" : ""
              } focus:ring-2 focus:ring-blue-500`}
              placeholder="Description"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              onBlur={() => setDescIsTouched(true)}
            />
            {descHasError && (
              <p className="text-red-500 text-sm mt-1">
                Enter a valid description.
              </p>
            )}
          </div>

          <div>
            <select
              className={`w-full bg-white border border-gray-200 text-gray-700 rounded-md p-2 focus:ring-2 focus:ring-gray-500 ${
                catHasError ? "bg-red-100" : ""
              }`}
              value={cat}
              onChange={(e) => setCat(e.target.value)}
              onBlur={() => setCatIsTouched(true)}
            >
              <option value="">Select a Category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            {catHasError && (
              <p className="text-red-500 text-sm mt-1">
                Select a valid category.
              </p>
            )}
          </div>

          <div>
            <Input
              className={`w-full bg-white ${
                amountHasError ? "bg-red-100" : ""
              } focus:ring-2 focus:ring-blue-500`}
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              onBlur={() => setAmountIsTouched(true)}
            />
            {amountHasError && (
              <p className="text-red-500 text-sm mt-1">
                Enter a valid amount (must be &gt; 0).
              </p>
            )}
          </div>

          <Button
            type="submit"
            disabled={!formIsValid}
            className={`w-full sm:w-1/2 mx-auto block py-2.5 text-lg font-medium rounded-lg transition-all duration-300 flex justify-center items-center ${
              formIsValid
                ? "bg-gray-800 hover:bg-gray-900 text-white"
                : "bg-gray-400 text-gray-700 cursor-not-allowed"
            }`}
          >
            {editingTransaction ? "Update Transaction" : "Add Expense"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddExpense;
