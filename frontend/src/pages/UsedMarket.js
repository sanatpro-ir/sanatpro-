import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { API_URL as BASE_URL } from "../config";

const API_URL = `${BASE_URL}/api/used-equipments`;

export default function UsedMarket() {
  const { t } = useTranslation();

  const [usedProducts, setUsedProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsedProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await fetch(API_URL);

        if (!res.ok) {
          throw new Error("Failed to load used equipment");
        }

        const data = await res.json();
        setUsedProducts(data);
      } catch (err) {
        console.error("UsedMarket error:", err);
        setError(t("used_error"));
      } finally {
        setLoading(false);
      }
    };

    fetchUsedProducts();
  }, [t]);

  const categories = [
    "all",
    ...new Set(
      usedProducts
        .map((item) => item.category)
        .filter(Boolean)
    ),
  ];

  const filteredProducts = usedProducts.filter((p) => {
    const matchCategory =
      activeCategory === "all" ||
      p.category === activeCategory;

    const searchText = search.trim().toLowerCase();

    const matchSearch =
      !searchText ||
      p.title?.toLowerCase().includes(searchText) ||
      p.brand?.toLowerCase().includes(searchText) ||
      p.category?.toLowerCase().includes(searchText);

    return matchCategory && matchSearch;
  });

  const getImageUrl = (image) => {
    if (!image) return "";

    if (image.startsWith("http")) {
      return image;
    }

    return `${BASE_URL}${image}`;
  };

  return (
    <div className="bg-black min-h-screen py-24 text-white">

      {/* TITLE */}
      <div className="text-center mb-12 px-6">
        <h1 className="text-4xl md:text-5xl font-extrabold">
          {t("used_market_title")}{" "}
          <span className="text-[#ffc000]">
            {t("used_market_highlight")}
          </span>
        </h1>

        <p className="text-gray-400 mt-4">
          {t("used_market_subtitle")}
        </p>
      </div>

      {/* LOADING */}
      {loading && (
        <div className="text-center text-gray-400 py-20">
          {t("used_loading")}
        </div>
      )}

      {/* ERROR */}
      {!loading && error && (
        <div className="text-center text-red-400 py-20">
          {error}
        </div>
      )}

      {!loading && !error && (
        <>
          {/* CATEGORIES */}
          <div className="flex justify-center gap-4 mb-10 flex-wrap px-6">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-8 py-3 rounded-xl font-bold transition ${
                  activeCategory === cat
                    ? "bg-[#ffc000] text-black"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
              >
                {cat === "all" ? t("all") : cat}
              </button>
            ))}
          </div>

          {/* SEARCH */}
          <div className="max-w-3xl mx-auto px-4 mb-14">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t("used_search_placeholder")}
              className="w-full bg-[#020617] border border-gray-700 rounded-xl px-5 py-4 text-white focus:outline-none focus:ring-2 focus:ring-[#ffc000]"
            />
          </div>

          {/* PRODUCTS */}
          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-6">

            {filteredProducts.map((p) => {
              const image =
                p.images?.length > 0
                  ? getImageUrl(p.images[0])
                  : "";

              return (
                <motion.div
                  key={p._id}
                  whileHover={{ scale: 1.03 }}
                  className="bg-[#020617] border border-gray-700 rounded-2xl overflow-hidden shadow-xl"
                >

                  <Link to={`/product/used/${p._id}`}>
                    <div className="h-56 bg-gray-900">
                      {image ? (
                        <img
                          src={image}
                          alt={p.title}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="h-full flex items-center justify-center text-gray-500">
                          {t("used_no_image")}
                        </div>
                      )}
                    </div>
                  </Link>

                  <div className="p-5 space-y-3">

                    <h3 className="font-bold text-lg">
                      {p.title}
                    </h3>

                    {p.brand && (
                      <p className="text-sm text-gray-400">
                        {t("used_brand")}: {p.brand}
                      </p>
                    )}

                    {p.condition && (
                      <span className="inline-block bg-[#ffc000] text-black px-4 py-1 rounded-full text-xs font-bold">
                        {p.condition}
                      </span>
                    )}

                    <Link
                      to={`/product/used/${p._id}`}
                      className="block text-center mt-4 bg-[#ffc000] text-black py-3 rounded-xl font-bold hover:bg-[#e6b000] transition"
                    >
                      {t("view_details")}
                    </Link>

                  </div>
                </motion.div>
              );
            })}

          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center text-gray-400 py-16">
              {t("used_no_products")}
            </div>
          )}
        </>
      )}
    </div>
  );
}