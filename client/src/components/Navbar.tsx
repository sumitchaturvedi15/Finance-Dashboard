import { motion } from "framer-motion";

const Navbar = () => {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative w-full px-6 py-4 flex items-center justify-between 
      bg-white/70 dark:bg-[#0B0F0F]/70 backdrop-blur-md 
      border-b border-gray-200 dark:border-gray-800 
      sticky top-0 z-50 overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-10 left-1/3 w-72 h-72 
        bg-green-400/20 blur-3xl rounded-full" />
        <div className="absolute -top-10 right-1/3 w-72 h-72 
        bg-emerald-400/20 blur-3xl rounded-full" />
      </div>

      <motion.div
        whileHover={{ scale: 1.05 }}
        className="relative text-2xl font-semibold tracking-tight flex items-center cursor-pointer"
      >
        <span className="text-gray-900 dark:text-white">Fin</span>

        <motion.span
          className="ml-1 relative bg-gradient-to-r 
          from-green-400 via-emerald-400 to-teal-400 
          bg-clip-text text-transparent"
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%"],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            backgroundSize: "250% 250%",
          }}
        >
          Pilot

          <motion.span
            className="absolute inset-0 bg-gradient-to-r 
            from-transparent via-white/50 to-transparent opacity-0"
            whileHover={{ opacity: 1, x: ["-120%", "120%"] }}
            transition={{ duration: 0.9 }}
          />
        </motion.span>

        <div className="absolute inset-0 blur-xl opacity-25 
        bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400" />
      </motion.div>

      <motion.div
        className="absolute bottom-0 left-0 h-[2px] w-full 
        bg-gradient-to-r from-transparent via-green-400 to-transparent"
        animate={{
          backgroundPosition: ["0% 0%", "100% 0%"],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{ backgroundSize: "200% 100%" }}
      />
    </motion.nav>
  );
};

export default Navbar;