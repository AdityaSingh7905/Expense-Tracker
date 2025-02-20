"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const Sidebar = () => {
  const pathname = usePathname();
  const [activeLink, setActiveLink] = useState("");

  useEffect(() => {
    setActiveLink(pathname);
  }, [pathname]);

  return (
    <aside className="w-64 bg-gray-900 text-white h-screen p-5 space-y-4">
      <h2 className="text-xl font-semibold">Expense Tracker</h2>

      <nav className="space-y-2">
        <Link
          href="/"
          prefetch={false}
          className={`block p-2 rounded-lg ${
            activeLink === "/" ? "bg-gray-600" : "hover:bg-gray-800"
          }`}
        >
          Dashboard
        </Link>
        <Link
          href="/add-expense"
          prefetch={false}
          className={`block p-2 rounded-lg ${
            activeLink === "/add-expense" ? "bg-gray-600" : "hover:bg-gray-800"
          }`}
        >
          Add Expense
        </Link>
        <Link
          href="/budget"
          prefetch={false}
          className={`block p-2 rounded-lg ${
            activeLink === "/budget" ? "bg-gray-600" : "hover:bg-gray-800"
          }`}
        >
          Set Monthly Budget
        </Link>
        <Link
          href="/monthly-chart"
          prefetch={false}
          className={`block p-2 rounded-lg ${
            activeLink === "/monthly-chart"
              ? "bg-gray-600"
              : "hover:bg-gray-800"
          }`}
        >
          Monthly Chart
        </Link>
        <Link
          href="/transactions"
          prefetch={false}
          className={`block p-2 rounded-lg ${
            activeLink === "/transactions" ? "bg-gray-600" : "hover:bg-gray-800"
          }`}
        >
          Transactions List
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
