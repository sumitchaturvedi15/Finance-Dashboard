"use client";
import { motion } from "framer-motion";

type CardProps = {
  title: string;
  value: string;
  change: string;
};

export default function Card({ title, value, change }: CardProps) {
  const isPositive = change.startsWith("+");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6, scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.3 }}
      className="relative overflow-hidden rounded-2xl p-5 
      bg-white/70 dark:bg-zinc-900/70 backdrop-blur-md
      border border-gray-200 dark:border-zinc-800
      shadow-sm hover:shadow-xl transition-all duration-300"
    >

      <div
        className={`absolute top-0 left-0 h-1 w-full ${
          isPositive
            ? "bg-gradient-to-r from-green-400 to-green-600"
            : "bg-gradient-to-r from-red-400 to-red-600"
        }`}
      />

      <h4 className="text-sm text-gray-500 dark:text-gray-400 mb-2 tracking-wide">
        {title}
      </h4>

      <div className="flex items-center justify-between">
        <motion.span
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
          className="text-2xl font-bold tracking-tight"
        >
          {value}
        </motion.span>

        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className={`text-sm font-semibold px-2 py-1 rounded-lg
            ${
              isPositive
                ? "text-green-600 bg-green-100 dark:bg-green-900/30"
                : "text-red-600 bg-red-100 dark:bg-red-900/30"
            }`}
        >
          {change}
        </motion.span>
      </div>

      <div className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 hover:opacity-100 transition duration-300 
        bg-gradient-to-br from-white/20 to-transparent dark:from-zinc-800/20" />
    </motion.div>
  );
}