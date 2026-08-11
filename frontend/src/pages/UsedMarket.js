import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const usedProducts = [
  {
    id: 1,
    title: "دریل واگن Atlas Copco",
    category: "معدن",
    condition: "کارکرده – سالم",
    brand: "Atlas Copco",
    img: "https://images.unsplash.com/photo-1597004891225-6e3c2c7a407e"
  },
  {
    id: 2,
    title: "کمپرسور معدنی 900 CFM",
    category: "معدن",
    condition: "استوک پروژه",
    brand: "Kaeser",
    img: "https://images.unsplash.com/photo-1581092580504-8987c1d9d4d6"
  },
  {
    id: 3,
    title: "لودر معدنی XCMG",
    category: "تجهیزات",
    condition: "بازسازی شده",
    brand: "XCMG",
    img: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09"
  }
];

export default function UsedMarket() {
  const [activeCategory, setActiveCategory] = useState("همه");
  const [search, setSearch] = useState("");

  const filteredProducts = usedProducts.filter(p => {
    const matchCategory =
      activeCategory === "همه" || p.category === activeCategory;

    const matchSearch = p.title.includes(search);

    return matchCategory && matchSearch;
  });

  return (
    <div className="bg-black min-h-screen py-24 text-white">

      <h1 className="text-4xl font-extrabold text-center mb-16">
        بازار تجهیزات <span className="text-[#ffc000]">دست دوم</span>
      </h1>

      {/* ===== Filters ===== */}
      <div className="flex justify-center gap-4 mb-12 flex-wrap">
        {["همه", "فولاد", "معدن", "تجهیزات"].map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-8 py-3 rounded-xl font-bold transition
            ${activeCategory === cat
              ? "bg-[#ffc000] text-black"
              : "bg-gray-800 text-gray-300 hover:bg-gray-700"}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* ===== Search ===== */}
      <div className="max-w-3xl mx-auto px-4 mb-16">
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="جستجو در تجهیزات دست دوم..."
          className="w-full bg-[#020617] border border-gray-700 rounded-xl px-5 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#ffc000]"
        />
      </div>

      {/* ===== Grid ===== */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-6">
        {filteredProducts.map(p => (
          <motion.div
            whileHover={{ scale: 1.04 }}
            key={p.id}
            className="bg-[#020617] border border-gray-700 rounded-2xl overflow-hidden shadow-xl"
          >
            <Link to={`/used/${p.id}`}>
              <img src={p.img} className="h-56 w-full object-cover" />
            </Link>

            <div className="p-5 space-y-2">
              <h3 className="font-bold text-lg">{p.title}</h3>
              <p className="text-sm text-gray-400">{p.brand}</p>

              <span className="inline-block bg-[#ffc000] text-black px-4 py-1 rounded-full text-xs font-bold">
                {p.condition}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

    </div>
  );
}
