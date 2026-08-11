import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";

export default function FeaturedStrip({ featured = [] }) {
  const perFrame = 5;
  const frames = [];

  for (let i = 0; i < featured.length; i += perFrame) {
    frames.push(featured.slice(i, i + perFrame));
  }

  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!frames.length) return;

    const t = setInterval(() => {
      setActive(p => (p + 1) % frames.length);
    }, 4000);

    return () => clearInterval(t);
  }, [frames.length]);

  return (
    <section className="my-28">
      <h2 className="text-2xl font-bold text-white mb-10 text-center">
        🌟 گلچین محصولات
      </h2>

      <div className="flex justify-center min-h-[280px]">
        <AnimatePresence mode="wait">
          {frames.map((frame, i) =>
            i === active && (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -40 }}
                className="grid grid-cols-2 md:grid-cols-5 gap-6"
              >
                {frame.map(p => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </motion.div>
            )
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
