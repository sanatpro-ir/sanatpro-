import { useState, useEffect, useRef, useMemo } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FaShieldAlt, FaCertificate, FaHandshake, FaAward, FaWhatsapp, FaComments } from "react-icons/fa";

import { API_URL as BASE_URL } from "../config";
const API_URL = `${BASE_URL}/api/equipments`;

const CATEGORY_URL = "https://sanatpro-backend.onrender.com/api/categories";
const WHATSAPP_NUMBER = "989302850915";

function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = a[i];
    a[i] = a[j];
    a[j] = temp;
  }
  return a;
}

export default function Shop() {
  const { t, i18n } = useTranslation();

  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [productsVIP, setProductsVIP] = useState([]);
  const [productsHot, setProductsHot] = useState([]);
  const [productsEco, setProductsEco] = useState([]);
  const [productsNormal, setProductsNormal] = useState([]);
  const [loading, setLoading] = useState(true);
  const [shopAds, setShopAds] = useState([]);

  useEffect(() => {
    axios
      .get("https://sanatpro-backend.onrender.com/api/home-sections?type=shop_ad")
      .then((res) => setShopAds(res.data))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    axios
      .get(CATEGORY_URL)
      .then((res) => setCategories(res.data))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      try {
        const params = {};
        if (activeCategory) params.category = activeCategory;
        if (search) params.search = search;

        const [vipRes, hotRes, ecoRes, normalRes] = await Promise.all([
          axios.get(API_URL, { params: { ...params, tag: "vip" } }),
          axios.get(API_URL, { params: { ...params, tag: "hot" } }),
          axios.get(API_URL, { params: { ...params, tag: "eco" } }),
          axios.get(API_URL, { params: { ...params, tag: "normal" } }),
        ]);

        setProductsVIP(vipRes.data.equipments || []);
        setProductsHot(hotRes.data.equipments || []);
        setProductsEco(ecoRes.data.equipments || []);
        setProductsNormal(normalRes.data.equipments || []);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };
    fetchAll();
  }, [activeCategory, search]);

  const featured = [...productsVIP, ...productsHot];

  const allProducts = useMemo(() => {
    const combined = [...productsVIP, ...productsHot, ...productsEco, ...productsNormal];
    const seen = new Set();
    return combined.filter((p) => {
      if (seen.has(p._id)) return false;
      seen.add(p._id);
      return true;
    });
  }, [productsVIP, productsHot, productsEco, productsNormal]);

  function Header() {
    return (
      <div className="relative h-[55vh] overflow-hidden">
        <img src="/videos/hero.gif" alt="hero" className="absolute w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
          <h1 className="text-5xl md:text-6xl font-bold text-yellow-400 text-center">{t("shop_header_title")}</h1>
        </div>
      </div>
    );
  }

  function CategoryBox() {
    return (
      <div className="bg-[#020617] rounded-xl p-4 text-white sticky top-24">
        <h3 className="font-bold mb-3">{t("shop_category_title")}</h3>
        <div
          className={`py-2 hover:text-yellow-400 cursor-pointer ${!activeCategory ? "text-yellow-400 font-bold" : ""}`}
          onClick={() => setActiveCategory(null)}
        >
          {t("shop_category_all")}
        </div>
        {categories.map((c) => (
          <div
            key={c._id}
            className={`py-2 hover:text-yellow-400 cursor-pointer ${activeCategory === c._id ? "text-yellow-400 font-bold" : ""}`}
            onClick={() => setActiveCategory(activeCategory === c._id ? null : c._id)}
          >
            {c.name}
          </div>
        ))}
      </div>
    );
  }

  function AdsColumn() {
    const fallbackGifs = ["/videos/hero.gif", "/videos/hero2.gif", "/videos/hero3.gif"];

    const items =
      shopAds.length > 0
        ? shopAds.map((ad) => ({
            image: ad.image ? "https://sanatpro-backend.onrender.com" + ad.image : "/videos/hero.gif",
            text: ad.title || t("shop_ads_default_text"),
          }))
        : fallbackGifs.map((gif) => ({ image: gif, text: t("shop_ads_default_text") }));

    return (
      <aside className="flex flex-col gap-6 sticky top-24">
        {items.map((item, i) => (
          <motion.div key={i} whileHover={{ scale: 1.05 }} className="relative rounded-xl overflow-hidden shadow-2xl">
            <img src={item.image} alt={t("shop_ads_default_text")} className="w-full h-[160px] object-cover" />
            <div className="absolute bottom-0 w-full bg-black/60 text-white text-center py-1">{item.text}</div>
          </motion.div>
        ))}
      </aside>
    );
  }

  function ProductCard({ product }) {
    return (
      <Link to={`/product/${product._id}`}>
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="relative bg-[#020617] border border-gray-700 rounded-xl p-4 text-white flex flex-col items-center shadow-lg cursor-pointer"
        >
          <div className="rotating-border absolute -inset-1 rounded-xl -z-10" />
          {product.images && product.images[0] ? (
            <img
              src={`https://sanatpro-backend.onrender.com${product.images[0]}`}
              alt={product.title}
              className="h-32 w-full object-contain mb-3"
            />
          ) : (
            <div className="h-32 w-full bg-gray-800 rounded-lg mb-3 flex items-center justify-center text-gray-500 text-xs">
              {t("shop_no_image")}
            </div>
          )}
          <h4 className="text-sm font-semibold text-center leading-tight line-clamp-2 min-h-[40px]">{product.title}</h4>
          <span className="text-yellow-400 font-bold mt-2 text-sm">
            {product.price ? product.price.toLocaleString(i18n.language === "en" ? "en-US" : "fa-IR") : ""} {t("shop_currency")}
          </span>
          <span className="text-xs text-gray-400 mt-1">{t("shop_contact_label")}: 0912-000-0000</span>
        </motion.div>
      </Link>
    );
  }

  function ProductRow({ title, emoji, products }) {
    const isEmpty = !products || products.length === 0;

    return (
      <section>
        <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-2">
          {emoji} {title}
        </h2>

        <div className="grid grid-cols-12 gap-8 max-w-7xl mx-auto">
          <div className="col-span-2 hidden md:block">
            <CategoryBox />
          </div>

          <div className="col-span-12 md:col-span-8 relative">
            {isEmpty ? (
              <div className="flex items-center justify-center h-40 text-gray-500 border border-dashed border-gray-700 rounded-xl">
                {t("shop_category_empty")}
              </div>
            ) : (
              <div>
                <div className="rotating-border absolute -inset-2 rounded-xl -z-10" />
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
                  {products.slice(0, 8).map((p) => (
                    <ProductCard key={p._id} product={p} />
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="col-span-2 hidden md:block">
            <AdsColumn />
          </div>
        </div>
      </section>
    );
  }

  function FeaturedRow() {
    const perFrame = 5;
    const frames = [];
    for (let i = 0; i < featured.length; i += perFrame) {
      frames.push(featured.slice(i, i + perFrame));
    }

    const [active, setActive] = useState(0);

    useEffect(() => {
      if (!frames.length) return;
      const timer = setInterval(() => setActive((p) => (p + 1) % frames.length), 4000);
      return () => clearInterval(timer);
    }, [frames.length]);

    if (featured.length === 0) return null;

    return (
      <section className="my-28">
        <h2 className="text-2xl font-bold text-white mb-10 text-center">{t("shop_featured_title")}</h2>

        <div className="flex justify-center min-h-[280px]">
          <AnimatePresence mode="wait">
            {frames.map((frame, i) => {
              if (i !== active) return null;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -40 }}
                  className="grid grid-cols-2 md:grid-cols-5 gap-6"
                >
                  {frame.map((p) => (
                    <ProductCard key={p._id} product={p} />
                  ))}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </section>
    );
  }

  function IndustryHub() {
    const ref = useRef();
    const [inView, setInView] = useState(false);

    useEffect(() => {
      const obs = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.3 });
      if (ref.current) obs.observe(ref.current);
      return () => obs.disconnect();
    }, []);

    const industryTags = [t("shop_industry_steel"), t("shop_industry_mining"), t("shop_industry_equipment")];

    return (
      <div ref={ref} className="my-28 text-center">
        <h2 className="text-3xl font-bold text-white mb-12">{t("shop_industry_title")}</h2>
        <div className="flex justify-center gap-10 flex-wrap">
          {industryTags.map((tag) => (
            <motion.div
              key={tag}
              animate={inView ? { scale: [0.9, 1.1, 1] } : {}}
              transition={{ duration: 1, repeat: Infinity }}
              className="bg-[#020617] px-10 py-8 rounded-2xl text-white shadow-xl"
            >
              {tag}
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  function TrustSignals() {
    const badges = [
      { icon: <FaShieldAlt />, label: t("shop_trust_1") },
      { icon: <FaCertificate />, label: t("shop_trust_2") },
      { icon: <FaHandshake />, label: t("shop_trust_3") },
      { icon: <FaAward />, label: t("shop_trust_4") },
    ];

    return (
      <div className="my-28 flex justify-center gap-8 flex-wrap">
        {badges.map((b, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.08, y: -4 }}
            className="flex flex-col items-center gap-3 bg-[#020617] border border-gray-800 rounded-2xl px-8 py-6 text-gray-300"
          >
            <span className="text-3xl text-yellow-400">{b.icon}</span>
            <span className="text-sm font-bold text-white">{b.label}</span>
          </motion.div>
        ))}
      </div>
    );
  }

  function RandomBannerSlider() {
    const groups = useMemo(() => {
      if (allProducts.length === 0) return [];
      const shuffled = shuffleArray(allProducts);
      const chunks = [];
      for (let i = 0; i < shuffled.length; i += 5) {
        const chunk = shuffled.slice(i, i + 5);
        if (chunk.length > 0) chunks.push(chunk);
      }
      return chunks;
    }, [allProducts]);

    const [groupIndex, setGroupIndex] = useState(0);

    useEffect(() => {
      if (groups.length <= 1) return;
      const timer = setInterval(() => {
        setGroupIndex((p) => (p + 1) % groups.length);
      }, 4500);
      return () => clearInterval(timer);
    }, [groups.length]);

    if (groups.length === 0) return null;

    const direction = groupIndex % 2 === 0 ? 1 : -1;
    const currentGroup = groups[groupIndex] || [];

    return (
      <section className="my-24">
        <h2 className="text-2xl font-bold text-white mb-8 text-center">{t("shop_banner_title")}</h2>

        <div className="max-w-7xl mx-auto px-4 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={groupIndex}
              initial={{ opacity: 0, x: 80 * direction }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -80 * direction }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-5"
            >
              {currentGroup.map((p) => (
                <Link key={p._id} to={`/product/${p._id}`}>
                  <motion.div
                    whileHover={{ scale: 1.06, y: -6 }}
                    className="relative rounded-xl overflow-hidden border border-gray-800 shadow-xl bg-[#020617] h-40 cursor-pointer"
                  >
                    {p.images && p.images[0] ? (
                      <img
                        src={`https://sanatpro-backend.onrender.com${p.images[0]}`}
                        alt={p.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-600 text-xs">
                        {t("shop_no_image")}
                      </div>
                    )}
                    <div className="absolute bottom-0 w-full bg-black/70 text-white text-xs text-center py-2 px-1 line-clamp-1">
                      {p.title}
                    </div>
                  </motion.div>
                </Link>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    );
  }

  function ChatCTA() {
    const waLink = "https://wa.me/" + WHATSAPP_NUMBER;
    return (
      <section className="my-24">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            whileHover={{ scale: 1.01 }}
            className="bg-gradient-to-r from-[#0f131c] to-[#020617] border border-gray-800 rounded-2xl p-10 text-center shadow-2xl"
          >
            <div className="flex justify-center mb-4">
              <span className="text-4xl text-yellow-400">
                <FaComments />
              </span>
            </div>
            <h3 className="text-2xl font-extrabold text-white mb-3">{t("shop_chat_title")}</h3>
            <p className="text-gray-400 mb-8">{t("shop_chat_desc")}</p>
            
           <a href={waLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#1ebe57] text-white px-8 py-4 rounded-xl font-bold transition">
              <FaWhatsapp size={20} />
              <span>{t("shop_chat_button")}</span>
            </a>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <div className="bg-black min-h-screen">
      <style>{".rotating-border{background:linear-gradient(270deg,#ffae00,#ffae0060,#ffae00);background-size:400% 400%;animation:glow 4s linear infinite;filter:blur(8px);}@keyframes glow{0%{background-position:0% 50%;}100%{background-position:400% 50%;}}"}</style>

      <Header />

      <div className="max-w-7xl mx-auto px-4 pt-10">
        <div className="relative">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t("shop_search_placeholder")}
            className="w-full bg-[#020617] border border-gray-700 rounded-xl px-5 py-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 z-10 relative"
          />
          <div className="rotating-border absolute -inset-1 rounded-xl -z-10"></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-24 space-y-32">
        {loading ? (
          <p className="text-white text-center py-20">{t("shop_loading")}</p>
        ) : productsVIP.length === 0 && productsHot.length === 0 && productsEco.length === 0 && productsNormal.length === 0 ? (
          <p className="text-gray-400 text-center py-20">{t("shop_empty")}</p>
        ) : (
          <div className="space-y-32">
            <ProductRow title={t("shop_row_vip")} emoji="" products={productsVIP} />
            <ProductRow title={t("shop_row_hot")} emoji="" products={productsHot} />
            <ProductRow title={t("shop_row_eco")} emoji="" products={productsEco} />
            <ProductRow title={t("shop_row_normal")} emoji="" products={productsNormal} />
            <FeaturedRow />
          </div>
        )}

        <IndustryHub />
        <TrustSignals />
        <RandomBannerSlider />
        <ChatCTA />
      </div>
    </div>
  );
}
