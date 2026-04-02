import React from "react";
import {
  PieChart,
  Pie as RechartsPie,
  Tooltip,
  Cell,
} from "recharts";
import useFinanceStore from "../store/dummyStore";

const COLORS = ["#22c55e", "#ef4444", "#3b82f6", "#f59e0b", "#8b5cf6"];

const PieData = () => {
  const transactions = useFinanceStore((state) => state.transactions);

  const data = Object.values(
    transactions
      .filter((t) => t.type === "expense")
      .reduce((acc: any, curr) => {
        if (!acc[curr.category]) {
          acc[curr.category] = {
            name: curr.category,
            value: 0,
          };
        }
        acc[curr.category].value += curr.amount;
        return acc;
      }, {})
  );

  return data;
};

const PieChartComponent = () => {
  const data = PieData();

  return (
    <PieChart width={300} height={300}>
      <RechartsPie
        data={data}
        dataKey="value"
        outerRadius={100}
        label
      >
        {data.map((_, index) => (
          <Cell key={index} fill={COLORS[index % COLORS.length]} />
        ))}
      </RechartsPie>

      <Tooltip />
    </PieChart>
  );
};

export default PieChartComponent;