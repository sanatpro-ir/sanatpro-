import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function FeaturedStrip({ featured = [] }) {
  const [start, setStart] = useState(0);

  const products = useMemo(() => {
    if (!featured?.length) return [];

    return [...featured]
      .sort(() => Math.random() - 0.5)
      .slice(0, Math.min(featured.length, 12));
  }, [featured]);

  useEffect(() => {
    if (products.length <= 5) return;

    const timer = setInterval(() => {
      setStart((prev) => (prev + 1) % products.length);
    }, 3500);

    return () => clearInterval(timer);
  }, [products.length]);

  if (!products.length) {
    return null;
  }

  const visibleProducts = Array.from(
    { length: Math.min(5, products.length) },
    (_, index) => products[(start + index) % products.length]
  );

  return (
    <section className="mb-10">

      <div className="flex items-center justify-between mb-5">

        <div>
          <h2 className="text-xl md:text-2xl font-extrabold text-white">
            محصولات پیشنهادی
          </h2>

          <p className="text-slate-400 text-sm mt-1">
            انتخابی از محصولات موجود در فروشگاه
          </p>
        </div>

      </div>

      <div className="
        grid
        grid-cols-2
        sm:grid-cols-3
        lg:grid-cols-5
        gap-3
        overflow-hidden
      ">

        {visibleProducts.map((product, index) => (

          <motion.div
            key={`${product.id}-${start}-${index}`}
            initial={{ opacity: 0, x: 25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35 }}
          >

            <Link
              to={`/product/${product.id}`}
              className="
                block
                bg-[#020617]
                border border-slate-800
                rounded-xl
                overflow-hidden
                hover:border-[#ffc000]
                hover:-translate-y-1
                transition-all
              "
            >

              <div className="h-32 overflow-hidden">

                <img
                  src={
                    product.image ||
                    product.img ||
                    "/images/placeholder.jpg"
                  }
                  alt={product.name || product.title || "محصول"}
                  className="w-full h-full object-cover"
                />

              </div>

              <div className="p-3">

                <h3 className="
                  text-white
                  font-bold
                  text-sm
                  line-clamp-2
                  min-h-[40px]
                ">
                  {product.name || product.title}
                </h3>

                {product.brand && (
                  <p className="text-xs text-slate-500 mt-1">
                    {product.brand}
                  </p>
                )}

              </div>

            </Link>

          </motion.div>

        ))}

      </div>

    </section>
  );
}