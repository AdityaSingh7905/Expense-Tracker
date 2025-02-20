import Sidebar from "./Sidebar";
import CategoryPieChart from "./CategoryPieChart";
import RecentTransactions from "./RecentTransactions";
import TotalExpensesCard from "./TotalExpensesCard";
import BudgetVsActualChart from "./BudgetVsActualChart";

const Dashboard = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex-1 p-4 bg-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="order-1">
            <TotalExpensesCard />
          </div>
          <div className="order-2">
            <RecentTransactions />
          </div>
          <div className="order-3">
            <CategoryPieChart />
          </div>
          <div className="order-4">
            <BudgetVsActualChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
