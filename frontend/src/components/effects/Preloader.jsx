import { motion } from "framer-motion";

export default function Preloader() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 1.5, delay: 2.8 }}
      className="fixed inset-0 z-[9999] bg-[#030712] flex items-center justify-center"
    >
      <div className="text-center">

        <motion.h1
          initial={{ scale: .8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: .8 }}
          className="text-6xl md:text-8xl font-black text-cyan-300 tracking-[10px]"
        >
          MINEPRO
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: .8 }}
          className="mt-6 text-gray-500 tracking-[4px] text-xs md:text-sm"
        >
          INITIALIZING INDUSTRIAL CORE...
        </motion.p>

        <motion.div
          initial={{ width: 0 }}
          animate={{ width: 220 }}
          transition={{ delay: 1, duration: 1.6 }}
          className="mt-5 h-[2px] bg-cyan-300 mx-auto"
        />

      </div>
    </motion.div>
  );
}