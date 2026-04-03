"use client";
import { useState, useMemo } from "react";
import { LayoutDashboard, ArrowUpDown, Bell, Menu, X } from "lucide-react";
import Card from "./Card";
import useFinanceStore from "../store/dummyStore";
import PieChartComponent from "./Pie";
import Insights from "./Insights";
import Transactions from "./Transactions";

export default function Body() {
  const [activeTab, setActiveTab] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const tabs = [
    { label: "Dashboard", icon: LayoutDashboard },
    { label: "Transactions", icon: ArrowUpDown },
    { label: "Notifications", icon: Bell },
  ];

  const transactions = useFinanceStore((state) => state.transactions);

  const { income, expenses, savings, totalBalance, recentTransactions } =
    useMemo(() => {
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

      return { income, expenses, savings, totalBalance, recentTransactions };
    }, [transactions]);

  return (
    <div className="flex flex-col md:flex-row h-screen overflow-hidden bg-white text-gray-900 dark:bg-zinc-950 dark:text-white">

      <div className="md:hidden flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
        <div
          role="button"
          tabIndex={0}
          onClick={() => setIsOpen(true)}
          onKeyDown={(e) => e.key === "Enter" && setIsOpen(true)}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 cursor-pointer"
        >
          <Menu className="w-5 h-5" />
        </div>

        <h2 className="text-base font-semibold">
          {tabs[activeTab].label}
        </h2>
      </div>

      <aside
        className={`fixed md:static top-0 left-0 h-full w-64 bg-white dark:bg-zinc-950 border-r border-gray-200 dark:border-zinc-800 p-4 z-50 transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        <div className="flex items-center justify-between md:hidden mb-6">
          <span className="font-semibold text-lg">Menu</span>

          <div
            role="button"
            tabIndex={0}
            onClick={() => setIsOpen(false)}
            onKeyDown={(e) => e.key === "Enter" && setIsOpen(false)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </div>
        </div>

        <nav className="space-y-2">
          {tabs.map((tab, index) => {
            const Icon = tab.icon;
            const isActive = activeTab === index;

            return (
              <div
                key={index}
                role="button"
                tabIndex={0}
                onClick={() => {
                  setActiveTab(index);
                  setIsOpen(false);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    setActiveTab(index);
                    setIsOpen(false);
                  }
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-300
                  ${
                    isActive
                      ? "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400"
                      : "hover:bg-gray-100 dark:hover:bg-zinc-800 text-gray-600 dark:text-gray-400"
                  }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{tab.label}</span>
              </div>
            );
          })}
        </nav>
      </aside>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <main className="flex-1 min-w-0 overflow-y-auto p-4 md:p-6 bg-gray-50 dark:bg-zinc-900">

        <h2 className="hidden md:block text-2xl font-semibold mb-6">
          {tabs[activeTab].label}
        </h2>

        <div key={activeTab}>

          {activeTab === 0 && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
                <Card title="Total Balance" value={`₹${totalBalance}`} change="+2.5%" />
                <Card title="Income" value={`₹${income}`} change="+1.8%" />
                <Card title="Expenses" value={`₹${expenses}`} change="-0.8%" />
                <Card title="Savings" value={`₹${savings}`} change="+3.2%" />
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

                <div className="bg-white dark:bg-zinc-950 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-zinc-800">
                  <h3 className="text-lg font-semibold mb-4">
                    Expense Breakdown
                  </h3>
                  <div className="flex justify-center">
                    <PieChartComponent />
                  </div>
                </div>

                <div className="bg-white dark:bg-zinc-950 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-zinc-800">
                  <h3 className="text-lg font-semibold mb-4">
                    Recent Transactions
                  </h3>

                  <div className="space-y-3 max-h-[350px] overflow-y-auto">
                    {recentTransactions.map((t) => (
                      <div
                        key={t.id}
                        className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 transition"
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
              </div>

              <Insights />
            </>
          )}

          {activeTab === 1 && (
            <div className="bg-white dark:bg-zinc-950 rounded-xl p-4 md:p-6 shadow-sm border border-gray-200 dark:border-zinc-800">
              <Transactions />
            </div>
          )}

          {activeTab === 2 && (
            <div className="bg-white dark:bg-zinc-950 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-zinc-800 text-center text-gray-500 dark:text-gray-400">
              You have no new notifications.
            </div>
          )}
        </div>
      </main>
    </div>
  );
}