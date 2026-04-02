type CardProps = {
  title: string;
  value: string;
  change: string;
};

export default function Card({ title, value, change }: CardProps) {
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-xl p-5 shadow-sm border border-gray-200 dark:border-gray-800 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
      
      <h4 className="text-sm text-gray-500 dark:text-gray-400 mb-2">
        {title}
      </h4>

      <div className="flex items-center justify-between">
        <span className="text-xl font-semibold">{value}</span>

        <span
          className={`text-sm font-medium ${
            change.startsWith("+")
              ? "text-green-500"
              : "text-red-500"
          }`}
        >
          {change}
        </span>
      </div>
    </div>
  );
}