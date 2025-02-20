"use client";

import { useState, useContext, useEffect } from "react";
import ExpenseContext from "../context/ExpenseContextProvider";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

const categories = [
  "Bills&Utilities",
  "Sports&Entertainment",
  "Food",
  "Household",
  "Shopping",
  "Travel&Transport",
  "Others",
];

const Budget = () => {
  const { setBudgetHandler, budgets } = useContext(ExpenseContext);
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [selectKey, setSelectKey] = useState(Date.now());

  // Validation state
  const [catIsTouched, setCatIsTouched] = useState(false);
  const [amountIsTouched, setAmountIsTouched] = useState(false);

  // Validation functions
  const validateCategory = (category: string) => category.trim().length > 0;
  const validateAmount = (amount: string) =>
    !isNaN(Number(amount)) && Number(amount) > 0;

  const catIsValid = validateCategory(category);
  const catHasError = !catIsValid && catIsTouched;

  const amountIsValid = validateAmount(amount);
  const amountHasError = !amountIsValid && amountIsTouched;

  const formIsValid = catIsValid && amountIsValid;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formIsValid) return;

    // send data to the database
    setBudgetHandler(category, Number(amount));

    // Reset Fields
    setCategory("");
    setAmount("");
    setCatIsTouched(false);
    setAmountIsTouched(false);
    setSelectKey(Date.now());
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4 overflow-hidden">
      <div className="flex flex-col md:flex-row gap-6 md:gap-8 w-full max-w-4xl">
        <Card className="bg-white shadow-lg rounded-2xl border border-gray-300 p-6 flex-1 w-full md:w-[45%]">
          <CardContent className="space-y-6">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 text-center">
              Set Monthly Budget
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Select
                key={selectKey}
                onValueChange={(value) => {
                  setCategory(value);
                  setCatIsTouched(true);
                }}
              >
                <SelectTrigger
                  className={`w-full border ${
                    catHasError ? "bg-red-100" : "border-gray-300"
                  }`}
                  onBlur={() => setCatIsTouched(true)}
                >
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {catHasError && (
                <p className="text-red-500 text-sm">
                  Please select a category.
                </p>
              )}

              <Input
                type="number"
                placeholder="Enter Budget Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                onBlur={() => setAmountIsTouched(true)}
                className={`border ${
                  amountHasError ? "bg-red-100" : "border-gray-300"
                }`}
              />
              {amountHasError && (
                <p className="text-red-500 text-sm">
                  Please enter a valid amount.
                </p>
              )}

              <Button
                type="submit"
                className="w-full bg-gray-800 text-white hover:bg-gray-900"
                disabled={!formIsValid}
              >
                Set Budget
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-lg rounded-2xl border border-gray-300 p-6 flex-1 w-full md:w-[45%]">
          <CardContent>
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 text-center mb-4">
              Current Budgets
            </h3>
            <ul className="space-y-3">
              {categories.map((cat) => (
                <li
                  key={cat}
                  className="flex justify-between bg-gray-100 p-3 rounded-md"
                >
                  <span>{cat}</span>
                  <span className="font-semibold">
                    $
                    {budgets.find(
                      (budget: Record<string, number>) =>
                        String(budget.category) === cat
                    )?.amount ?? 0}
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Budget;
