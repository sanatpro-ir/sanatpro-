import { motion } from "framer-motion";

export default function ProductCard({ product }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="relative bg-[#020617] border border-gray-700 rounded-xl p-4 text-white flex flex-col items-center shadow-lg"
    >
      <div className="rotating-border absolute -inset-1 rounded-xl -z-10" />

      <img
        src={product.image}
        alt={product.title}
        className="h-28 w-full object-contain mb-3"
      />

      <h4 className="text-sm font-semibold text-center">
        {product.title}
      </h4>

      <span className="text-yellow-400 font-bold mt-2">
        {product.price} تومان
      </span>
    </motion.div>
  );
}
