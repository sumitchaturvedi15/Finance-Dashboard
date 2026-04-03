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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white dark:bg-zinc-950 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-zinc-800 mt-6"
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
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 }}
              className="group"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                  {index + 1}. {item.category}
                </span>

                <span className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
                  ₹{item.amount} • {item.percentage}%
                </span>
              </div>

              <div className="relative w-full h-3 bg-gray-200 dark:bg-zinc-800 rounded-full overflow-hidden">

                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${item.percentage}%` }}
                  transition={{
                    duration: 0.8,
                    delay: index * 0.2,
                    ease: "easeOut",
                  }}
                  className={`h-full rounded-full bg-gradient-to-r ${COLORS[index % COLORS.length]} shadow-md`}
                />

                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300">
                  <div className="w-full h-full bg-white/20 blur-sm" />
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