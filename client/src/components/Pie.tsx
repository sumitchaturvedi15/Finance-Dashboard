import { useMemo, useState } from "react";
import {
  PieChart,
  Pie as RechartsPie,
  Tooltip,
  Cell,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";
import useFinanceStore from "../store/dummyStore";

type Transaction = {
  id: string;
  category: string;
  amount: number;
  type: string;
  date: string;
};

type PieItem = {
  name: string;
  value: number;
};

const COLORS = [
  "#22c55e",
  "#ef4444",
  "#3b82f6",
  "#f59e0b",
  "#8b5cf6",
];

const PieChartComponent = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const transactions = useFinanceStore(
    (state) => state.transactions as Transaction[]
  );

  const data: PieItem[] = useMemo(() => {
    const map: Record<string, PieItem> = {};

    transactions
      .filter((t) => t.type === "expense")
      .forEach((t) => {
        if (!map[t.category]) {
          map[t.category] = { name: t.category, value: 0 };
        }
        map[t.category].value += t.amount;
      });

    return Object.values(map);
  }, [transactions]);

  const total = data.reduce((acc, curr) => acc + curr.value, 0);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="w-full h-[320px] flex flex-col items-center justify-center relative"
    >
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <RechartsPie
            data={data}
            dataKey="value"
            innerRadius={65}
            outerRadius={105}
            paddingAngle={3}
            cornerRadius={8}
            onMouseEnter={(_, index) => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(null)}
          >
            {data.map((_, index) => (
              <Cell
                key={index}
                fill={COLORS[index % COLORS.length]}
                style={{
                  filter:
                    activeIndex === index
                      ? "brightness(1.2)"
                      : "brightness(0.85)",
                  transition: "all 0.3s ease",
                }}
              />
            ))}
          </RechartsPie>

          <Tooltip
            contentStyle={{
              borderRadius: "10px",
              border: "none",
              background: "rgba(24,24,27,0.9)",
              backdropFilter: "blur(10px)",
              color: "#fff",
              fontSize: "12px",
              padding: "8px 12px",
            }}
            cursor={{ fill: "rgba(255,255,255,0.05)" }}
          />
        </PieChart>
      </ResponsiveContainer>

      <div className="absolute flex flex-col items-center justify-center pointer-events-none">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xs text-gray-500 dark:text-gray-400"
        >
          Total Expense
        </motion.span>

        <motion.span
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1 }}
          className="text-xl font-bold"
        >
          ₹{total}
        </motion.span>
      </div>

      <div className="flex flex-wrap justify-center gap-3 mt-4">
        {data.map((item, index) => (
          <motion.div
            key={item.name}
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 text-xs px-2 py-1 rounded-lg 
            bg-white/60 dark:bg-zinc-900/60 backdrop-blur-md 
            border border-gray-200 dark:border-zinc-800"
          >
            <span
              className="w-3 h-3 rounded-full"
              style={{
                backgroundColor: COLORS[index % COLORS.length],
              }}
            />
            {item.name}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default PieChartComponent;