import useFinanceStore from "../store/dummyStore";

type CategoryData = {
  category: string;
  amount: number;
  percentage: number;
};

const Insights = () => {
  const transactions = useFinanceStore((state) => state.transactions);

  const expenses = transactions.filter((t) => t.type === "expense");

  // ✅ Total expense
  const totalExpense = expenses.reduce((sum, t) => sum + t.amount, 0);

  // ✅ Aggregate category-wise
  const categoryTotals: Record<string, number> = expenses.reduce(
    (acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    },
    {} as Record<string, number>
  );

  // ✅ Convert to array + percentage
  const sortedCategories: CategoryData[] = Object.entries(categoryTotals)
    .map(([category, amount]) => ({
      category,
      amount,
      percentage: totalExpense
        ? Math.round((amount / totalExpense) * 100)
        : 0,
    }))
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 3); // 🔥 top 3

  return (
    <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 mt-6">

      <h3 className="text-lg font-semibold mb-4">
        Spending Insights
      </h3>

      {sortedCategories.length === 0 ? (
        <p className="text-gray-500 text-sm">No expense data available</p>
      ) : (
        <div className="space-y-4">
          {sortedCategories.map((item, index) => (
            <div key={item.category}>
              
              {/* Header */}
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium">
                  {index + 1}. {item.category}
                </span>
                <span className="text-gray-500">
                  ₹{item.amount} ({item.percentage}%)
                </span>
              </div>

              {/* 🔥 Progress Bar */}
              <div className="w-full h-2 bg-gray-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-500 transition-all duration-500"
                  style={{ width: `${item.percentage}%` }}
                />
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Insights;