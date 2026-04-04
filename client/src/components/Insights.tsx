import { useMemo } from "react";
import { motion } from "framer-motion";
import useFinanceStore from "../store/dummyStore";

type CategoryData = {
  category: string;
  amount: number;
  percentage: number;
};

const COLORS = [
  "from-green-400 to-green-600",
  "from-blue-400 to-blue-600",
  "from-purple-400 to-purple-600",
];

const Insights = () => {
  const transactions = useFinanceStore((state) => state.transactions);

  const sortedCategories: CategoryData[] = useMemo(() => {
    const expenses = transactions.filter((t) => t.type === "expense");

    const totalExpense = expenses.reduce((sum, t) => sum + t.amount, 0);

    const categoryTotals: Record<string, number> = {};

    expenses.forEach((t) => {
      categoryTotals[t.category] =
        (categoryTotals[t.category] || 0) + t.amount;
    });

    return Object.entries(categoryTotals)
      .map(([category, amount]) => ({
        category,
        amount,
        percentage: totalExpense
          ? Math.round((amount / totalExpense) * 100)
          : 0,
      }))
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 3);
  }, [transactions]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white/70 dark:bg-zinc-950/70 backdrop-blur-md p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-zinc-800 mt-6"
    >
      <h3 className="text-lg font-semibold mb-6 text-gray-900 dark:text-white">
        Spending Insights
      </h3>

      {sortedCategories.length === 0 ? (
        <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-6">
          No expense data available
        </p>
      ) : (
        <div className="space-y-6">
          {sortedCategories.map((item, index) => (
            <motion.div
              key={item.category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ scale: 1.02 }}
              className="group p-3 rounded-xl transition-all duration-300 hover:bg-gray-100/60 dark:hover:bg-zinc-900/40"
            >
              <div className="flex justify-between items-center mb-2">

                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold px-2 py-1 rounded-md bg-gray-200 dark:bg-zinc-800">
                    #{index + 1}
                  </span>

                  <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                    {item.category}
                  </span>
                </div>

                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.2 + 0.2 }}
                  className="text-xs md:text-sm text-gray-500 dark:text-gray-400"
                >
                  ₹{item.amount} • {item.percentage}%
                </motion.span>
              </div>

              <div className="relative w-full h-3 bg-gray-200 dark:bg-zinc-800 rounded-full overflow-hidden">

                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${item.percentage}%` }}
                  transition={{
                    duration: 1,
                    delay: index * 0.25,
                    ease: "easeOut",
                  }}
                  className={`h-full rounded-full bg-gradient-to-r ${COLORS[index % COLORS.length]} shadow-md`}
                />

                <motion.div
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{
                    repeat: Infinity,
                    duration: 2,
                    ease: "linear",
                  }}
                  className="absolute top-0 left-0 h-full w-1/3 bg-white/20 blur-sm"
                />

                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300">
                  <div className="w-full h-full bg-white/20 blur-md" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default Insights;