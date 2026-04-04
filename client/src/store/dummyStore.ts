import { create } from "zustand";

export type Transaction = {
  id: string;
  amount: number;
  date: string;
  type: "income" | "expense" | "savings";
  category: string;
};

interface FinanceState {
  transactions: Transaction[];
  addTransaction: (t: Transaction) => void;
}

const categories = {
  income: ["Salary", "Freelance", "Bonus", "Sports", "Project"],
  expense: ["Food", "Transport", "Shopping", "Bills", "Fuel", "Dining", "Groceries", "Entertainment"],
  savings: ["Investments", "Mutual Fund", "Stocks", "FD"],
};

const types: Transaction["type"][] = ["income", "expense", "savings"];

const getRandom = (arr: string[]) =>
  arr[Math.floor(Math.random() * arr.length)];

const generateTransactions = (count: number): Transaction[] => {
  const data: Transaction[] = [];

  for (let i = 1; i <= count; i++) {
    const type = types[Math.floor(Math.random() * types.length)];

    const category = getRandom(categories[type]);

    const amount =
      type === "income"
        ? Math.floor(Math.random() * 10000) + 2000
        : Math.floor(Math.random() * 3000) + 100;

    const date = new Date(
      2026,
      3,
      Math.floor(Math.random() * 30) + 1
    )
      .toISOString()
      .split("T")[0];

    data.push({
      id: i.toString(),
      amount,
      date,
      type,
      category,
    });
  }

  return data;
};

const useFinanceStore = create<FinanceState>((set) => ({
  transactions: generateTransactions(500), 

  addTransaction: (t) =>
    set((state) => ({
      transactions: [t, ...state.transactions],
    })),
}));

export default useFinanceStore;