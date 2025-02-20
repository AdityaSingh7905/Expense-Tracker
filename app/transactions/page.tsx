"use client";

import TransactionList from "../ui/TransactionList";
import Sidebar from "../ui/Sidebar";

const Page = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-6">
        <div className="bg-white shadow-md rounded-lg p-4 h-full">
          <TransactionList />
        </div>
      </div>
    </div>
  );
};

export default Page;
