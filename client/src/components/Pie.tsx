import { useMemo } from "react";
import {
  PieChart,
  Pie as RechartsPie,
  Tooltip,
  Cell,
  ResponsiveContainer,
} from "recharts";
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

const COLORS = ["#22c55e", "#ef4444", "#3b82f6", "#f59e0b", "#8b5cf6"];

const PieChartComponent = () => {
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

  return (
    <div className="w-full h-[300px] flex flex-col items-center justify-center">

      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <RechartsPie
            data={data}
            dataKey="value"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={3}
            cornerRadius={6}
          >
            {data.map((_, index) => (
              <Cell
                key={index}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </RechartsPie>

          <Tooltip
            contentStyle={{
              borderRadius: "8px",
              border: "none",
              backgroundColor: "#111",
              color: "#fff",
              fontSize: "12px",
            }}
          />
        </PieChart>
      </ResponsiveContainer>

      <div className="flex flex-wrap justify-center gap-3 mt-4">
        {data.map((item, index) => (
          <div
            key={item.name}
            className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-300"
          >
            <span
              className="w-3 h-3 rounded-full"
              style={{
                backgroundColor: COLORS[index % COLORS.length],
              }}
            />
            {item.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PieChartComponent;