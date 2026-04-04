import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useFinanceStore from "../store/dummyStore";

type FilterType = "all" | "income" | "expense";

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
  });
};

const Transactions = () => {
  const transactions = useFinanceStore((state) => state.transactions);
  const [filter, setFilter] = useState<FilterType>("all");

  const filteredTransactions = useMemo(() => {
    let data = [...transactions];

    if (filter !== "all") {
      data = data.filter((t) => t.type === filter);
    }

    return data.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }, [transactions, filter]);

  return (
    <div className="h-full flex flex-col 
    bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl 
    p-5 rounded-2xl border border-gray-200/60 dark:border-zinc-800 shadow-sm">

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        {/* <h3 className="text-lg font-semibold tracking-tight">
          Transactions
        </h3> */}
        <span className="text-xs text-gray-500">
          {filteredTransactions.length} items
        </span>
      </div>

      
      <div className="flex gap-2 mb-4">
        {["all", "income", "expense"].map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type as FilterType)}
            className={`px-3 py-1.5 text-sm rounded-lg transition
              ${
                filter === type
                  ? "bg-zinc-900 text-white dark:bg-white dark:text-black"
                  : "bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-gray-300 hover:opacity-80"
              }`}
          >
            {type}
          </button>
        ))}
      </div>

      
      <div className="flex-1 space-y-2 overflow-y-auto pr-1">
        <AnimatePresence>
          {filteredTransactions.length === 0 ? (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm text-gray-500"
            >
              No transactions found
            </motion.p>
          ) : (
            filteredTransactions.map((t) => (
              <motion.div
                key={t.id}
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                whileHover={{ scale: 1.01 }}
                className="flex items-center justify-between p-3 rounded-xl
                hover:bg-gray-50 dark:hover:bg-zinc-800 transition cursor-pointer"
              >
                
                <div className="flex items-center gap-3">
                  <div
                    className={`w-2.5 h-2.5 rounded-full ${
                      t.type === "income"
                        ? "bg-green-500"
                        : "bg-red-500"
                    }`}
                  />

                  <div>
                    <p className="text-sm font-medium capitalize">
                      {t.category}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatDate(t.date)}
                    </p>
                  </div>
                </div>

                
                <div className="text-right">
                  <p
                    className={`text-sm font-semibold ${
                      t.type === "income"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {t.type === "expense" ? "-" : "+"}₹{t.amount}
                  </p>

                  <p className="text-xs text-gray-400">
                    {t.type}
                  </p>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Transactions;