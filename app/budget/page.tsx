"use client";
import Sidebar from "../ui/Sidebar";
import Budget from "../ui/Budget";

const Page = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <div className="flex justify-center items-center flex-1 bg-gray-100 p-2">
          <Budget />
        </div>
      </div>
    </div>
  );
};

export default Page;
