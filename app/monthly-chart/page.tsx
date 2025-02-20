"use client";
import MonthlyExpensesChart from "../ui/MonthlyExpensesChart";
import Sidebar from "../ui/Sidebar";

const Page = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex justify-center items-center bg-gray-100 p-6">
        <MonthlyExpensesChart />
      </div>
    </div>
  );
};

export default Page;
