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

const useFinanceStore = create<FinanceState>((set) => ({
  transactions: [
    { id: "1", amount: 5000, date: "2026-04-01", type: "income", category: "Salary" },
    { id: "2", amount: 1200, date: "2026-04-02", type: "expense", category: "Food" },
    { id: "3", amount: 800, date: "2026-04-02", type: "expense", category: "Transport" },
    { id: "4", amount: 2000, date: "2026-04-03", type: "savings", category: "Investments" },
    { id: "5", amount: 1500, date: "2026-04-04", type: "expense", category: "Shopping" },
    { id: "6", amount: 7000, date: "2026-04-05", type: "income", category: "Freelance" },
    { id: "7", amount: 300, date: "2026-04-05", type: "expense", category: "Snacks" },
    { id: "8", amount: 2500, date: "2026-04-06", type: "savings", category: "Mutual Fund" },
    { id: "9", amount: 900, date: "2026-04-06", type: "expense", category: "Bills" },
    { id: "10", amount: 4000, date: "2026-04-07", type: "income", category: "Bonus" },
    { id: "11", amount: 600, date: "2026-04-07", type: "expense", category: "Fuel" },
    { id: "12", amount: 1800, date: "2026-04-08", type: "expense", category: "Groceries" },
    { id: "13", amount: 3000, date: "2026-04-08", type: "savings", category: "Stocks" },
    { id: "14", amount: 2200, date: "2026-04-09", type: "income", category: "Side Hustle" },
    { id: "15", amount: 500, date: "2026-04-09", type: "expense", category: "Entertainment" },
    { id: "16", amount: 2700, date: "2026-04-10", type: "income", category: "Project" },
    { id: "17", amount: 1100, date: "2026-04-10", type: "expense", category: "Dining" },
    { id: "18", amount: 3500, date: "2026-04-11", type: "savings", category: "FD" },
    { id: "19", amount: 450, date: "2026-04-11", type: "expense", category: "Transport" },
    { id: "20", amount: 8000, date: "2026-04-12", type: "income", category: "Salary" },
  ],

  addTransaction: (t) =>
    set((state) => ({
      transactions: [t, ...state.transactions],
    })),
}));

export default useFinanceStore;