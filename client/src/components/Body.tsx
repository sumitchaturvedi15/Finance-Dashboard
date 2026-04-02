"use client";
import { useState } from "react";
import { LayoutDashboard, ArrowUpDown, Bell } from "lucide-react";
import Card from "./Card";
import useFinanceStore from "../store/dummyStore";

export default function Body() {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { label: "Dashboard", icon: LayoutDashboard },
    { label: "Transactions", icon: ArrowUpDown },
    { label: "Notifications", icon: Bell },
  ];

  const transactions = useFinanceStore((state) => state.transactions);

  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, t) => acc + t.amount, 0);

  const expenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => acc + t.amount, 0);

  const savings = transactions
    .filter((t) => t.type === "savings")
    .reduce((acc, t) => acc + t.amount, 0);

  const totalBalance = income - expenses + savings;

  const recentTransactions = [...transactions]
    .sort(
      (a, b) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
    )
    .slice(0, 5);

  return (
    <div className="flex min-h-[calc(100vh-80px)] bg-[#F8FAFC] dark:bg-[#060707] text-gray-900 dark:text-white">

      <aside className="w-64 p-4 border-r border-gray-200 dark:border-gray-800 relative">
        <span
          className="absolute left-0 w-1 bg-green-500 rounded-r-lg transition-all duration-300"
          style={{
            top: `${activeTab * 56 + 8}px`,
            height: "40px",
          }}
        />

        <nav className="space-y-2">
          {tabs.map((tab, index) => {
            const Icon = tab.icon;
            const isActive = activeTab === index;

            return (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group
                  ${
                    isActive
                      ? "bg-gradient-to-r from-green-500/20 to-emerald-500/10 text-green-500"
                      : "hover:bg-gray-100 dark:hover:bg-zinc-900 text-gray-600 dark:text-gray-400"
                  }`}
              >
                <Icon
                  className={`w-5 h-5 transition ${
                    isActive
                      ? "text-green-500"
                      : "group-hover:text-green-400"
                  }`}
                />
                <span className="font-medium">{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </aside>

      <main className="flex-1 p-6">
        <h2 className="text-2xl font-semibold mb-6">
          {tabs[activeTab].label}
        </h2>

        <div key={activeTab} className="animate-fadeSlide">

          {activeTab === 0 && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <Card title="Total Balance" value={`₹${totalBalance}`} change="+2.5%" />
                <Card title="Income" value={`₹${income}`} change="+1.8%" />
                <Card title="Expenses" value={`₹${expenses}`} change="-0.8%" />
                <Card title="Savings" value={`₹${savings}`} change="+3.2%" />
              </div>

              <div className="bg-white dark:bg-zinc-900 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-800">
                <h3 className="text-lg font-semibold mb-4">
                  Recent Transactions
                </h3>

                <div className="space-y-4">
                  {recentTransactions.map((t) => (
                    <div
                      key={t.id}
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-zinc-800 transition"
                    >
                      <div>
                        <p className="font-medium">{t.category}</p>
                        <p className="text-sm text-gray-500">{t.date}</p>
                      </div>

                      <span
                        className={`font-semibold ${
                          t.type === "income"
                            ? "text-green-500"
                            : t.type === "expense"
                            ? "text-red-500"
                            : "text-blue-500"
                        }`}
                      >
                        {t.type === "expense" ? "-" : "+"}₹{t.amount}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {activeTab === 1 && (
            <div className="bg-white dark:bg-zinc-900 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-800">
              <p className="text-gray-600 dark:text-gray-400">
                Your recent transactions will appear here.
              </p>
            </div>
          )}

          {activeTab === 2 && (
            <div className="bg-white dark:bg-zinc-900 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-800">
              <p className="text-gray-600 dark:text-gray-400">
                You have no new notifications.
              </p>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}