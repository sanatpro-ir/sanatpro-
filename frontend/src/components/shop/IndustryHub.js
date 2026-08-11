import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";

export default function IndustryHub() {
  const ref = useRef();
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => setInView(e.isIntersecting),
      { threshold: 0.3 }
    );

    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="my-28 text-center">
      <h2 className="text-3xl font-bold text-white mb-12">
        قلب صنایع MinePro
      </h2>

      <div className="flex justify-center gap-10 flex-wrap">
        {["🧱 فولاد", "⛏️ معدن", "⚙️ تجهیزات"].map(t => (
          <motion.div
            key={t}
            animate={inView ? { scale: [0.9, 1.1, 1] } : {}}
            transition={{ duration: 1, repeat: Infinity }}
            className="bg-[#020617] px-10 py-8 rounded-2xl text-white shadow-xl"
          >
            {t}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
