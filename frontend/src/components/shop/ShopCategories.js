import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const data = [
  {
    title: "صنعت فولاد",
    icon: "🏭",
    items: [
      "میلگرد",
      "تیرآهن",
      "ورق فولادی",
      "پروفیل صنعتی",
    ],
  },
  {
    title: "صنعت معدن",
    icon: "⛏️",
    items: [
      "دستگاه حفاری",
      "سنگ‌شکن",
      "نوار نقاله",
      "تجهیزات استخراج",
    ],
  },
  {
    title: "تجهیزات صنعتی",
    icon: "⚙️",
    items: [
      "کمپرسور",
      "پمپ",
      "ژنراتور",
      "ماشین‌آلات",
    ],
  },
];

export default function ShopCategories() {
  const [open, setOpen] = useState(0);

  return (
    <aside className="bg-[#0b1220] border border-slate-800 rounded-2xl p-4 shadow-xl">

      <div className="flex items-center gap-2 mb-5 pb-4 border-b border-slate-800">
        <span className="text-xl">☰</span>

        <h3 className="text-white font-extrabold text-lg">
          دسته‌بندی محصولات
        </h3>
      </div>

      <div className="space-y-2">

        {data.map((cat, i) => (
          <div key={cat.title}>

            <button
              type="button"
              onClick={() => setOpen(open === i ? null : i)}
              className={`
                w-full flex items-center justify-between
                px-4 py-3 rounded-xl
                transition-all duration-200
                ${
                  open === i
                    ? "bg-[#ffc000] text-black"
                    : "bg-[#111c30] text-white hover:bg-[#1b2a43]"
                }
              `}
            >

              <span className="flex items-center gap-2 font-bold">
                <span>{cat.icon}</span>
                {cat.title}
              </span>

              <span className="text-sm">
                {open === i ? "−" : "+"}
              </span>

            </button>

            <AnimatePresence>
              {open === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >

                  <div className="mt-1 mr-2 border-r border-slate-700">

                    {cat.items.map((item) => (
                      <button
                        key={item}
                        type="button"
                        className="
                          block w-full text-right
                          px-4 py-2.5
                          text-sm text-slate-300
                          hover:text-[#ffc000]
                          transition
                        "
                      >
                        {item}
                      </button>
                    ))}

                  </div>

                </motion.div>
              )}
            </AnimatePresence>

          </div>
        ))}

      </div>
    </aside>
  );
}