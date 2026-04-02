import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState<boolean | null>(null);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <nav className="w-full px-6 py-4 flex items-center justify-between 
      bg-white/70 dark:bg-[#0B0F0F]/70 backdrop-blur-md 
      border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">

      {/* Logo */}
      <div className="text-2xl font-bold tracking-tight">
        <span className="text-gray-900 dark:text-white">Fin</span>
        <span className="text-green-500">Pilot</span>
      </div>

      <button
        onClick={() => setDarkMode(!darkMode)}
        className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 
        hover:scale-105 transition"
      >
        {darkMode ? (
          <Sun className="w-5 h-5 text-yellow-400" />
        ) : (
          <Moon className="w-5 h-5 text-gray-700" />
        )}
      </button>
    </nav>
  );
};

export default Navbar;