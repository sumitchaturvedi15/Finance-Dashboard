const Navbar = () => {
  return (
    <nav className="w-full px-6 py-4 flex items-center justify-between 
      bg-white/70 dark:bg-[#0B0F0F]/70 backdrop-blur-md 
      border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">

      {/* Logo */}
      <div className="text-2xl font-bold tracking-tight">
        <span className="text-gray-900 dark:text-white">Fin</span>
        <span className="text-green-500">Pilot</span>
      </div>

    </nav>
  );
};

export default Navbar;