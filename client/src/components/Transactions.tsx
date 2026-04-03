import React, { useState, useMemo } from "react";
import useFinanceStore from "../store/dummyStore";

type FilterType = "all" | "income" | "expense";

const Transactions = () => {
  const transactions = useFinanceStore((state) => state.transactions);
  const [filter, setFilter] = useState<FilterType>("all");

  const filteredTransactions = useMemo(() => {
    let data = [...transactions];

    if (filter !== "all") {
      data = data.filter((t) => t.type === filter);
    }

    data.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    return data;
  }, [transactions, filter]);

  return (
    <div className="bg-white dark:bg-zinc-900 p-4 rounded-xl shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Recent Transactions</h3>

      <div className="flex gap-2 mb-4 flex-wrap">
        {["all", "income", "expense"].map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type as FilterType)}
            className={`px-3 py-1 rounded-full text-sm border transition ${
              filter === type
                ? "bg-black text-white dark:bg-white dark:text-black"
                : "bg-gray-100 dark:bg-zinc-800"
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      <div className="space-y-2 max-h-[400px] overflow-y-auto">
        {filteredTransactions.length === 0 ? (
          <p className="text-gray-500 text-sm">No transactions found</p>
        ) : (
          filteredTransactions.map((t) => (
            <div
              key={t.id}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-zinc-800 transition"
            >
              <div>
                <p className="font-medium capitalize">{t.category}</p>
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
          ))
        )}
      </div>
    </div>
  );
};

export default Transactions;
