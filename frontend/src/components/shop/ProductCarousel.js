import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const data = [
  {
    title: "🧱 صنعت فولاد",
    items: [
      "میلگرد",
      "تیرآهن",
      "ورق فولادی",
      "پروفیل صنعتی",
    ],
  },
  {
    title: "⛏️ صنعت معدن",
    items: [
      "دستگاه حفاری",
      "سنگ‌شکن",
      "نوار نقاله",
      "تجهیزات استخراج",
    ],
  },
];

export default function ShopCategories() {
  const [open, setOpen] = useState(null);

  return (
    <aside className="w-full bg-[#0f172a] text-white rounded-xl p-4 shadow-xl">
      <h3 className="text-lg font-bold mb-4">⚙️ دسته‌بندی صنایع</h3>

      {data.map((cat, i) => (
        <div key={i} className="mb-3">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex justify-between items-center bg-[#1e293b] px-4 py-3 rounded-lg hover:bg-[#334155] transition"
          >
            <span>{cat.title}</span>
            <span>{open === i ? "➖" : "➕"}</span>
          </button>

          <AnimatePresence>
            {open === i && (
              <motion.ul
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden bg-[#020617] rounded-lg mt-2"
              >
                {cat.items.map((item, idx) => (
                  <li
                    key={idx}
                    className="px-5 py-2 text-sm hover:bg-yellow-400 hover:text-black cursor-pointer transition"
                  >
                    ▸ {item}
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
      ))}
    </aside>
  );
}
