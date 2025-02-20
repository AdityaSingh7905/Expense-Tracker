"use client";
import AddExpense from "../ui/AddExpense";
import Sidebar from "../ui/Sidebar";

const Page = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <div className="flex justify-center items-center flex-1 bg-gray-100 p-6">
          <AddExpense />
        </div>
      </div>
    </div>
  );
};

export default Page;
