import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

import { API_URL as BASE_URL } from "../config";
const API_URL = `${BASE_URL}/api/equipments`;

const CATEGORY_URL = "https://sanatpro-backend.onrender.com/api/categories";

export default function Shop() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [productsVIP, setProductsVIP] = useState([]);
  const [productsHot, setProductsHot] = useState([]);
  const [productsEco, setProductsEco] = useState([]);
  const [productsNormal, setProductsNormal] = useState([]);
  const [loading, setLoading] = useState(true);
  const [shopAds, setShopAds] = useState([]);

  // ================= گیف‌های تبلیغاتی (تزئینی، هاردکد باقی می‌ماند) =================
  const trustLogos = [
    "/images/logos/logo1.png",
    "/images/logos/logo2.png",
    "/images/logos/logo3.png",
    "/images/logos/logo4.png",
  ];

  // ================= FETCH SHOP ADS =================
  useEffect(() => {
    axios
      .get("https://sanatpro-backend.onrender.com/api/home-sections?type=shop_ad")
      .then((res) => setShopAds(res.data))
      .catch((err) => console.error(err));
  }, []);

  // ================= FETCH CATEGORIES =================
  useEffect(() => {
    axios
      .get(CATEGORY_URL)
      .then((res) => setCategories(res.data))
      .catch((err) => console.error(err));
  }, []);

  // ================= FETCH PRODUCTS (بر اساس تگ) =================
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

  /* ================= COMPONENTS ================= */

  function Header() {
    return (
      <div className="relative h-[55vh] overflow-hidden">
        <img src="/videos/hero.gif" alt="hero" className="absolute w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
          <h1 className="text-5xl md:text-6xl font-bold text-yellow-400 text-center">فروشگاه صنعتی MinePro</h1>
        </div>
      </div>
    );
  }

  function CategoryBox() {
    return (
      <div className="bg-[#020617] rounded-xl p-4 text-white sticky top-24">
        <h3 className="font-bold mb-3">⚙️ دسته‌بندی</h3>
        <div
          className={`py-2 hover:text-yellow-400 cursor-pointer ${!activeCategory ? "text-yellow-400 font-bold" : ""}`}
          onClick={() => setActiveCategory(null)}
        >
          ▸ همه محصولات
        </div>
        {categories.map((c) => (
          <div
            key={c._id}
            className={`py-2 hover:text-yellow-400 cursor-pointer ${activeCategory === c._id ? "text-yellow-400 font-bold" : ""}`}
            onClick={() => setActiveCategory(activeCategory === c._id ? null : c._id)}
          >
            ▸ {c.name}
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
            text: ad.title || "پیشنهاد ویژه صنعتی",
          }))
        : fallbackGifs.map((gif) => ({ image: gif, text: "پیشنهاد ویژه صنعتی" }));

    return (
      <aside className="flex flex-col gap-6 sticky top-24">
        {items.map((item, i) => (
          <motion.div key={i} whileHover={{ scale: 1.05 }} className="relative rounded-xl overflow-hidden shadow-2xl">
            <img src={item.image} alt="تبلیغ صنعتی" className="w-full h-[160px] object-cover" />
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
          {product.images?.[0] ? (
            <img
              src={`https://sanatpro-backend.onrender.com${product.images[0]}`}
              alt={product.title}
              className="h-32 w-full object-contain mb-3"
            />
          ) : (
            <div className="h-32 w-full bg-gray-800 rounded-lg mb-3 flex items-center justify-center text-gray-500 text-xs">
              بدون تصویر
            </div>
          )}
          <h4 className="text-sm font-semibold text-center leading-tight line-clamp-2 min-h-[40px]">{product.title}</h4>
          <span className="text-yellow-400 font-bold mt-2 text-sm">
            {product.price?.toLocaleString("fa-IR")} تومان
          </span>
          <span className="text-xs text-gray-400 mt-1">تماس: 0912-000-0000</span>
        </motion.div>
      </Link>
    );
  }

  function ProductRow({ title, emoji, products }) {
    if (!products || products.length === 0) return null;

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
            <div className="rotating-border absolute -inset-2 rounded-xl -z-10" />
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
              {products.slice(0, 8).map((p) => (
                <ProductCard key={p._id} product={p} />
              ))}
            </div>
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
      const t = setInterval(() => setActive((p) => (p + 1) % frames.length), 4000);
      return () => clearInterval(t);
    }, [frames.length]);

    if (featured.length === 0) return null;

    return (
      <section className="my-28">
        <h2 className="text-2xl font-bold text-white mb-10 text-center">🌟 گلچین محصولات</h2>

        <div className="flex justify-center min-h-[280px]">
          <AnimatePresence mode="wait">
            {frames.map(
              (frame, i) =>
                i === active && (
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
                )
            )}
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

    return (
      <div ref={ref} className="my-28 text-center">
        <h2 className="text-3xl font-bold text-white mb-12">قلب صنایع MinePro</h2>
        <div className="flex justify-center gap-10 flex-wrap">
          {["🧱 فولاد", "⛏️ معدن", "⚙️ تجهیزات"].map((t) => (
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

  function TrustSignals() {
    return (
      <div className="my-28 flex justify-center gap-10 flex-wrap">
        {trustLogos.map((logo, i) => (
          <motion.img key={i} src={logo} alt="نماد اعتماد" className="h-16 grayscale hover:grayscale-0" whileHover={{ scale: 1.1 }} />
        ))}
      </div>
    );
  }

  return (
    <>
      <style>{`
        .rotating-border {
          background: linear-gradient(270deg,#ffae00,#ffae0060,#ffae00);
          background-size: 400% 400%;
          animation: glow 4s linear infinite;
          filter: blur(8px);
        }
        @keyframes glow {
          0% { background-position: 0% 50%; }
          100% { background-position: 400% 50%; }
        }
      `}</style>

      <div className="bg-black min-h-screen">
        <Header />

        <div className="max-w-7xl mx-auto px-4 pt-10">
          <div className="relative">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="جستجو در محصولات صنعتی..."
              className="w-full bg-[#020617] border border-gray-700 rounded-xl px-5 py-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 z-10 relative"
            />
            <div className="rotating-border absolute -inset-1 rounded-xl -z-10"></div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-24 space-y-32">
          {loading ? (
            <p className="text-white text-center py-20">در حال بارگذاری...</p>
          ) : productsVIP.length === 0 &&
            productsHot.length === 0 &&
            productsEco.length === 0 &&
            productsNormal.length === 0 ? (
            <p className="text-gray-400 text-center py-20">
              هنوز محصولی ثبت نشده. از پنل ادمین (بخش محصولات) اضافه کن.
            </p>
          ) : (
            <>
              <ProductRow title="محصولات VIP" emoji="⭐" products={productsVIP} />
              <ProductRow title="پرفروش‌ترین‌ها" emoji="🔥" products={productsHot} />
              <ProductRow title="اقتصادی" emoji="💰" products={productsEco} />
              <ProductRow title="سایر محصولات" emoji="📦" products={productsNormal} />

              <FeaturedRow />
            </>
          )}
          <IndustryHub />
          <TrustSignals />
        </div>
      </div>
    </>
  );
}