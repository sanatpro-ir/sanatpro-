// import { useState, useEffect, useRef } from "react";
// import axios from "axios";
// import { motion, AnimatePresence } from "framer-motion";
// import { Link } from "react-router-dom";

// import { API_URL as BASE_URL } from "../config";
// const API_URL = `${BASE_URL}/api/equipments`;

// const CATEGORY_URL = "https://sanatpro-backend.onrender.com/api/categories";

// export default function Shop() {
//   const [search, setSearch] = useState("");
//   const [activeCategory, setActiveCategory] = useState(null);
//   const [categories, setCategories] = useState([]);
//   const [productsVIP, setProductsVIP] = useState([]);
//   const [productsHot, setProductsHot] = useState([]);
//   const [productsEco, setProductsEco] = useState([]);
//   const [productsNormal, setProductsNormal] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [shopAds, setShopAds] = useState([]);

//   // ================= گیف‌های تبلیغاتی (تزئینی، هاردکد باقی می‌ماند) =================
//   const trustLogos = [
//     "/images/logos/logo1.png",
//     "/images/logos/logo2.png",
//     "/images/logos/logo3.png",
//     "/images/logos/logo4.png",
//   ];

//   // ================= FETCH SHOP ADS =================
//   useEffect(() => {
//     axios
//       .get("https://sanatpro-backend.onrender.com/api/home-sections?type=shop_ad")
//       .then((res) => setShopAds(res.data))
//       .catch((err) => console.error(err));
//   }, []);

//   // ================= FETCH CATEGORIES =================
//   useEffect(() => {
//     axios
//       .get(CATEGORY_URL)
//       .then((res) => setCategories(res.data))
//       .catch((err) => console.error(err));
//   }, []);

//   // ================= FETCH PRODUCTS (بر اساس تگ) =================
//   useEffect(() => {
//     const fetchAll = async () => {
//       setLoading(true);
//       try {
//         const params = {};
//         if (activeCategory) params.category = activeCategory;
//         if (search) params.search = search;

//         const [vipRes, hotRes, ecoRes, normalRes] = await Promise.all([
//           axios.get(API_URL, { params: { ...params, tag: "vip" } }),
//           axios.get(API_URL, { params: { ...params, tag: "hot" } }),
//           axios.get(API_URL, { params: { ...params, tag: "eco" } }),
//           axios.get(API_URL, { params: { ...params, tag: "normal" } }),
//         ]);

//         setProductsVIP(vipRes.data.equipments || []);
//         setProductsHot(hotRes.data.equipments || []);
//         setProductsEco(ecoRes.data.equipments || []);
//         setProductsNormal(normalRes.data.equipments || []);
//       } catch (err) {
//         console.error(err);
//       }
//       setLoading(false);
//     };
//     fetchAll();
//   }, [activeCategory, search]);

//   const featured = [...productsVIP, ...productsHot];

//   /* ================= COMPONENTS ================= */

//   function Header() {
//     return (
//       <div className="relative h-[55vh] overflow-hidden">
//         <img src="/videos/hero.gif" alt="hero" className="absolute w-full h-full object-cover" />
//         <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
//           <h1 className="text-5xl md:text-6xl font-bold text-yellow-400 text-center">فروشگاه صنعتی MinePro</h1>
//         </div>
//       </div>
//     );
//   }

//   function CategoryBox() {
//     return (
//       <div className="bg-[#020617] rounded-xl p-4 text-white sticky top-24">
//         <h3 className="font-bold mb-3">⚙️ دسته‌بندی</h3>
//         <div
//           className={`py-2 hover:text-yellow-400 cursor-pointer ${!activeCategory ? "text-yellow-400 font-bold" : ""}`}
//           onClick={() => setActiveCategory(null)}
//         >
//           ▸ همه محصولات
//         </div>
//         {categories.map((c) => (
//           <div
//             key={c._id}
//             className={`py-2 hover:text-yellow-400 cursor-pointer ${activeCategory === c._id ? "text-yellow-400 font-bold" : ""}`}
//             onClick={() => setActiveCategory(activeCategory === c._id ? null : c._id)}
//           >
//             ▸ {c.name}
//           </div>
//         ))}
//       </div>
//     );
//   }

//   function AdsColumn() {
//     const fallbackGifs = ["/videos/hero.gif", "/videos/hero2.gif", "/videos/hero3.gif"];

//     const items =
//       shopAds.length > 0
//         ? shopAds.map((ad) => ({
//             image: ad.image ? "https://sanatpro-backend.onrender.com" + ad.image : "/videos/hero.gif",
//             text: ad.title || "پیشنهاد ویژه صنعتی",
//           }))
//         : fallbackGifs.map((gif) => ({ image: gif, text: "پیشنهاد ویژه صنعتی" }));

//     return (
//       <aside className="flex flex-col gap-6 sticky top-24">
//         {items.map((item, i) => (
//           <motion.div key={i} whileHover={{ scale: 1.05 }} className="relative rounded-xl overflow-hidden shadow-2xl">
//             <img src={item.image} alt="تبلیغ صنعتی" className="w-full h-[160px] object-cover" />
//             <div className="absolute bottom-0 w-full bg-black/60 text-white text-center py-1">{item.text}</div>
//           </motion.div>
//         ))}
//       </aside>
//     );
//   }

//   function ProductCard({ product }) {
//     return (
//       <Link to={`/product/${product._id}`}>
//         <motion.div
//           whileHover={{ scale: 1.05 }}
//           className="relative bg-[#020617] border border-gray-700 rounded-xl p-4 text-white flex flex-col items-center shadow-lg cursor-pointer"
//         >
//           <div className="rotating-border absolute -inset-1 rounded-xl -z-10" />
//           {product.images?.[0] ? (
//             <img
//               src={`https://sanatpro-backend.onrender.com${product.images[0]}`}
//               alt={product.title}
//               className="h-32 w-full object-contain mb-3"
//             />
//           ) : (
//             <div className="h-32 w-full bg-gray-800 rounded-lg mb-3 flex items-center justify-center text-gray-500 text-xs">
//               بدون تصویر
//             </div>
//           )}
//           <h4 className="text-sm font-semibold text-center leading-tight line-clamp-2 min-h-[40px]">{product.title}</h4>
//           <span className="text-yellow-400 font-bold mt-2 text-sm">
//             {product.price?.toLocaleString("fa-IR")} تومان
//           </span>
//           <span className="text-xs text-gray-400 mt-1">تماس: 0912-000-0000</span>
//         </motion.div>
//       </Link>
//     );
//   }

//   function ProductRow({ title, emoji, products }) {
//     if (!products || products.length === 0) return null;

//     return (
//       <section>
//         <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-2">
//           {emoji} {title}
//         </h2>

//         <div className="grid grid-cols-12 gap-8 max-w-7xl mx-auto">
//           <div className="col-span-2 hidden md:block">
//             <CategoryBox />
//           </div>

//           <div className="col-span-12 md:col-span-8 relative">
//             <div className="rotating-border absolute -inset-2 rounded-xl -z-10" />
//             <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
//               {products.slice(0, 8).map((p) => (
//                 <ProductCard key={p._id} product={p} />
//               ))}
//             </div>
//           </div>

//           <div className="col-span-2 hidden md:block">
//             <AdsColumn />
//           </div>
//         </div>
//       </section>
//     );
//   }

//   function FeaturedRow() {
//     const perFrame = 5;
//     const frames = [];
//     for (let i = 0; i < featured.length; i += perFrame) {
//       frames.push(featured.slice(i, i + perFrame));
//     }

//     const [active, setActive] = useState(0);

//     useEffect(() => {
//       if (!frames.length) return;
//       const t = setInterval(() => setActive((p) => (p + 1) % frames.length), 4000);
//       return () => clearInterval(t);
//     }, [frames.length]);

//     if (featured.length === 0) return null;

//     return (
//       <section className="my-28">
//         <h2 className="text-2xl font-bold text-white mb-10 text-center">🌟 گلچین محصولات</h2>

//         <div className="flex justify-center min-h-[280px]">
//           <AnimatePresence mode="wait">
//             {frames.map(
//               (frame, i) =>
//                 i === active && (
//                   <motion.div
//                     key={i}
//                     initial={{ opacity: 0, y: 40 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0, y: -40 }}
//                     className="grid grid-cols-2 md:grid-cols-5 gap-6"
//                   >
//                     {frame.map((p) => (
//                       <ProductCard key={p._id} product={p} />
//                     ))}
//                   </motion.div>
//                 )
//             )}
//           </AnimatePresence>
//         </div>
//       </section>
//     );
//   }

//   function IndustryHub() {
//     const ref = useRef();
//     const [inView, setInView] = useState(false);

//     useEffect(() => {
//       const obs = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.3 });
//       if (ref.current) obs.observe(ref.current);
//       return () => obs.disconnect();
//     }, []);

//     return (
//       <div ref={ref} className="my-28 text-center">
//         <h2 className="text-3xl font-bold text-white mb-12">قلب صنایع MinePro</h2>
//         <div className="flex justify-center gap-10 flex-wrap">
//           {["🧱 فولاد", "⛏️ معدن", "⚙️ تجهیزات"].map((t) => (
//             <motion.div
//               key={t}
//               animate={inView ? { scale: [0.9, 1.1, 1] } : {}}
//               transition={{ duration: 1, repeat: Infinity }}
//               className="bg-[#020617] px-10 py-8 rounded-2xl text-white shadow-xl"
//             >
//               {t}
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     );
//   }

//   function TrustSignals() {
//     return (
//       <div className="my-28 flex justify-center gap-10 flex-wrap">
//         {trustLogos.map((logo, i) => (
//           <motion.img key={i} src={logo} alt="نماد اعتماد" className="h-16 grayscale hover:grayscale-0" whileHover={{ scale: 1.1 }} />
//         ))}
//       </div>
//     );
//   }

//   return (
//     <>
//       <style>{`
//         .rotating-border {
//           background: linear-gradient(270deg,#ffae00,#ffae0060,#ffae00);
//           background-size: 400% 400%;
//           animation: glow 4s linear infinite;
//           filter: blur(8px);
//         }
//         @keyframes glow {
//           0% { background-position: 0% 50%; }
//           100% { background-position: 400% 50%; }
//         }
//       `}</style>

//       <div className="bg-black min-h-screen">
//         <Header />

//         <div className="max-w-7xl mx-auto px-4 pt-10">
//           <div className="relative">
//             <input
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               placeholder="جستجو در محصولات صنعتی..."
//               className="w-full bg-[#020617] border border-gray-700 rounded-xl px-5 py-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 z-10 relative"
//             />
//             <div className="rotating-border absolute -inset-1 rounded-xl -z-10"></div>
//           </div>
//         </div>

//         <div className="max-w-7xl mx-auto px-4 py-24 space-y-32">
//           {loading ? (
//             <p className="text-white text-center py-20">در حال بارگذاری...</p>
//           ) : productsVIP.length === 0 &&
//             productsHot.length === 0 &&
//             productsEco.length === 0 &&
//             productsNormal.length === 0 ? (
//             <p className="text-gray-400 text-center py-20">
//               هنوز محصولی ثبت نشده. از پنل ادمین (بخش محصولات) اضافه کن.
//             </p>
//           ) : (
//             <>
//               <ProductRow title="محصولات VIP" emoji="⭐" products={productsVIP} />
//               <ProductRow title="پرفروش‌ترین‌ها" emoji="🔥" products={productsHot} />
//               <ProductRow title="اقتصادی" emoji="💰" products={productsEco} />
//               <ProductRow title="سایر محصولات" emoji="📦" products={productsNormal} />

//               <FeaturedRow />
//             </>
//           )}
//           <IndustryHub />
//           <TrustSignals />
//         </div>
//       </div>
//     </>
//   );
// }












import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  FaShieldAlt,
  FaCertificate,
  FaHandshake,
  FaAward,
  FaComments,
  FaPaperPlane,
} from "react-icons/fa";

import { API_URL as BASE_URL } from "../config";

const API_URL = `${BASE_URL}/api/equipments`;
const CATEGORY_URL = `${BASE_URL}/api/categories`;

const FALLBACK_ADS = [
  {
    type: "vip",
    title: "محصولات ویژه",
    image: "/videos/hero.gif",
  },
  {
    type: "eco",
    title: "محصولات اقتصادی",
    image: "/videos/hero2.gif",
  },
  {
    type: "popular",
    title: "محبوب‌ترین محصولات",
    image: "/videos/hero.gif",
  },
];

function shuffleArray(array) {
  const arr = [...array];

  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  return arr;
}

export default function Shop() {
  const { i18n } = useTranslation();

  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState(null);

  const [categories, setCategories] = useState([]);
  const [allProducts, setAllProducts] = useState([]);

  const [shopAds, setShopAds] = useState([]);

  const [loading, setLoading] = useState(true);
  const [chatOpen, setChatOpen] = useState(false);
  const [message, setMessage] = useState("");

  // =========================
  // Categories
  // =========================

  useEffect(() => {
    axios
      .get(CATEGORY_URL)
      .then((res) => {
        setCategories(Array.isArray(res.data) ? res.data : []);
      })
      .catch((err) => {
        console.error("Category error:", err);
        setCategories([]);
      });
  }, []);

  // =========================
  // Ads
  // =========================

  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/home-sections?type=shop_ad`)
      .then((res) => {
        const ads = Array.isArray(res.data) ? res.data : [];

        if (ads.length) {
          setShopAds(ads);
        } else {
          setShopAds(FALLBACK_ADS);
        }
      })
      .catch((err) => {
        console.error("Shop ads error:", err);
        setShopAds(FALLBACK_ADS);
      });
  }, []);

  // =========================
  // Products
  // =========================

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);

      try {
        const params = {};

        if (activeCategory) {
          params.category = activeCategory;
        }

        if (search.trim()) {
          params.search = search.trim();
        }

        const res = await axios.get(API_URL, { params });

        const products = res.data?.equipments || [];

        setAllProducts(products);
      } catch (err) {
        console.error("Products error:", err);
        setAllProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [activeCategory, search]);

  // =========================
  // Product groups
  // =========================

  const vipProducts = useMemo(
    () => allProducts.filter((p) => p.tag === "vip"),
    [allProducts]
  );

  const ecoProducts = useMemo(
    () => allProducts.filter((p) => p.tag === "eco"),
    [allProducts]
  );

  const popularProducts = useMemo(
    () =>
      allProducts.filter(
        (p) => p.tag === "hot" || p.tag === "popular"
      ),
    [allProducts]
  );

  // =========================
  // Main products
  // =========================

  const displayedProducts = useMemo(() => {
    return allProducts;
  }, [allProducts]);

  // =========================
  // Product Card
  // =========================

  function ProductCard({ product }) {
    const image =
      product.images && product.images.length
        ? `${BASE_URL}${product.images[0]}`
        : null;

    return (
      <Link
        to={`/product/${product._id}`}
        className="block h-full"
      >
        <motion.article
          whileHover={{ y: -6 }}
          transition={{ duration: 0.2 }}
          className="
            h-full
            min-h-[330px]
            bg-[#020617]
            border border-gray-800
            rounded-2xl
            overflow-hidden
            shadow-xl
            hover:border-yellow-400/60
            flex flex-col
            cursor-pointer
          "
        >
          <div className="h-[190px] bg-[#0b1120] flex items-center justify-center overflow-hidden">
            {image ? (
              <img
                src={image}
                alt={product.title || "محصول"}
                className="w-full h-full object-contain p-4"
              />
            ) : (
              <div className="text-gray-500 text-sm">
                تصویر موجود نیست
              </div>
            )}
          </div>

          <div className="p-5 flex flex-col flex-1 text-right">
            <h3 className="text-white font-bold text-base leading-7 line-clamp-2 min-h-[56px]">
              {product.title || "محصول بدون نام"}
            </h3>

            <div className="mt-auto pt-5">
              {product.brand && (
                <p className="text-gray-400 text-sm mb-2">
                  برند: {product.brand}
                </p>
              )}

              {product.price ? (
                <p className="text-yellow-400 font-extrabold">
                  {Number(product.price).toLocaleString(
                    i18n.language === "en" ? "en-US" : "fa-IR"
                  )}{" "}
                  تومان
                </p>
              ) : (
                <p className="text-gray-400 text-sm">
                  جهت استعلام قیمت تماس بگیرید
                </p>
              )}
            </div>
          </div>
        </motion.article>
      </Link>
    );
  }

  // =========================
  // Categories
  // =========================

  function CategorySidebar() {
    return (
      <aside
        dir="rtl"
        className="
          bg-[#020617]
          border border-gray-800
          rounded-2xl
          p-5
          sticky
          top-24
          shadow-xl
        "
      >
        <h2 className="text-white text-lg font-extrabold text-right mb-5">
          دسته‌بندی صنایع
        </h2>

        <button
          onClick={() => setActiveCategory(null)}
          className={`
            w-full
            text-right
            px-4
            py-3
            rounded-xl
            mb-2
            transition
            font-bold
            ${
              !activeCategory
                ? "bg-yellow-400 text-black"
                : "text-gray-300 hover:bg-gray-800 hover:text-yellow-400"
            }
          `}
        >
          همه محصولات
        </button>

        {categories.map((category) => {
          const active = activeCategory === category._id;

          return (
            <button
              key={category._id}
              onClick={() =>
                setActiveCategory(
                  active ? null : category._id
                )
              }
              className={`
                w-full
                text-right
                px-4
                py-3
                rounded-xl
                mb-1
                transition
                font-semibold
                ${
                  active
                    ? "bg-yellow-400 text-black"
                    : "text-gray-300 hover:bg-gray-800 hover:text-yellow-400"
                }
              `}
            >
              {category.name}
            </button>
          );
        })}
      </aside>
    );
  }

  // =========================
  // Left Ads
  // =========================

  function AdsSidebar() {
    const ads =
      shopAds.length > 0
        ? shopAds.slice(0, 3)
        : FALLBACK_ADS;

    return (
      <aside
        dir="rtl"
        className="flex flex-col gap-5"
      >
        {ads.map((ad, index) => {
          const image = ad.image
            ? ad.image.startsWith("http")
              ? ad.image
              : `${BASE_URL}${ad.image}`
            : FALLBACK_ADS[index]?.image;

          const title =
            ad.title ||
            FALLBACK_ADS[index]?.title ||
            "پیشنهاد ویژه";

          return (
            <motion.div
              key={ad._id || index}
              whileHover={{ y: -5 }}
              className="
                relative
                h-[175px]
                rounded-2xl
                overflow-hidden
                border border-gray-800
                shadow-xl
                bg-[#020617]
              "
            >
              <img
                src={image}
                alt={title}
                className="w-full h-full object-cover"
              />

              <div
                className="
                  absolute
                  inset-x-0
                  bottom-0
                  bg-black/75
                  backdrop-blur-sm
                  text-white
                  text-center
                  font-bold
                  py-3
                "
              >
                {title}
              </div>
            </motion.div>
          );
        })}
      </aside>
    );
  }

  // =========================
  // Five Product Slider
  // =========================

  function FiveProductSlider() {
    const groups = useMemo(() => {
      const shuffled = shuffleArray(allProducts);
      const result = [];

      for (let i = 0; i < shuffled.length; i += 5) {
        result.push(shuffled.slice(i, i + 5));
      }

      return result;
    }, [allProducts]);

    const [index, setIndex] = useState(0);

    useEffect(() => {
      setIndex(0);
    }, [activeCategory, search]);

    useEffect(() => {
      if (groups.length <= 1) return;

      const timer = setInterval(() => {
        setIndex((current) => (current + 1) % groups.length);
      }, 4500);

      return () => clearInterval(timer);
    }, [groups.length]);

    if (!groups.length) return null;

    const current = groups[index] || [];

    return (
      <section
        dir="rtl"
        className="mt-20"
      >
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-extrabold text-white">
            محصولات پیشنهادی
          </h2>

          <p className="text-gray-500 mt-2">
            محصولات منتخب و تصادفی
          </p>
        </div>

        <div className="overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{
                opacity: 0,
                x: index % 2 === 0 ? 80 : -80,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              exit={{
                opacity: 0,
                x: index % 2 === 0 ? -80 : 80,
              }}
              transition={{ duration: 0.5 }}
              className="
                grid
                grid-cols-2
                md:grid-cols-3
                lg:grid-cols-5
                gap-5
              "
            >
              {current.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {groups.length > 1 && (
          <div className="flex justify-center gap-2 mt-6">
            {groups.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`
                  w-2.5
                  h-2.5
                  rounded-full
                  transition
                  ${
                    i === index
                      ? "bg-yellow-400 w-7"
                      : "bg-gray-700"
                  }
                `}
                aria-label={`اسلاید ${i + 1}`}
              />
            ))}
          </div>
        )}
      </section>
    );
  }

  // =========================
  // Trust
  // =========================

  function TrustSignals() {
    const items = [
      {
        icon: <FaShieldAlt />,
        title: "خرید مطمئن",
      },
      {
        icon: <FaCertificate />,
        title: "تضمین اصالت",
      },
      {
        icon: <FaHandshake />,
        title: "تأمین‌کنندگان معتبر",
      },
      {
        icon: <FaAward />,
        title: "تجربه صنعتی",
      },
    ];

    return (
      <section
        dir="rtl"
        className="
          mt-20
          grid
          grid-cols-2
          md:grid-cols-4
          gap-4
        "
      >
        {items.map((item) => (
          <motion.div
            key={item.title}
            whileHover={{ y: -4 }}
            className="
              bg-[#020617]
              border border-gray-800
              rounded-2xl
              p-6
              text-center
            "
          >
            <div className="text-yellow-400 text-3xl flex justify-center mb-3">
              {item.icon}
            </div>

            <p className="text-white font-bold">
              {item.title}
            </p>
          </motion.div>
        ))}
      </section>
    );
  }

  // =========================
  // Live Chat UI
  // =========================

  function LiveChat() {
    return (
      <section
        dir="rtl"
        className="mt-20"
      >
        <div
          className="
            bg-[#020617]
            border border-gray-800
            rounded-2xl
            overflow-hidden
            shadow-2xl
          "
        >
          <button
            onClick={() => setChatOpen((value) => !value)}
            className="
              w-full
              flex
              items-center
              justify-between
              px-6
              py-5
              text-right
              hover:bg-gray-900
              transition
              cursor-pointer
            "
          >
            <div className="flex items-center gap-4">
              <div className="
                w-12
                h-12
                rounded-full
                bg-yellow-400
                text-black
                flex
                items-center
                justify-center
                text-xl
              ">
                <FaComments />
              </div>

              <div>
                <h2 className="text-white font-extrabold text-lg">
                  گفت‌وگوی آنلاین
                </h2>

                <p className="text-gray-500 text-sm">
                  با کاربران و کارشناسان صنعت گفتگو کنید
                </p>
              </div>
            </div>

            <span className="text-yellow-400 text-xl">
              {chatOpen ? "−" : "+"}
            </span>
          </button>

          <AnimatePresence>
            {chatOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="border-t border-gray-800">
                  <div className="h-[300px] p-5 overflow-y-auto">
                    <div className="
                      max-w-[80%]
                      bg-gray-900
                      rounded-2xl
                      rounded-tr-sm
                      p-4
                      text-gray-300
                      text-sm
                    ">
                      👋 به گفت‌وگوی آنلاین صنعت پرو خوش آمدید.
                      <br />
                      برای شروع پیام خود را ارسال کنید.
                    </div>
                  </div>

                  <div className="
                    border-t
                    border-gray-800
                    p-4
                    flex
                    gap-3
                  ">
                    <input
                      value={message}
                      onChange={(e) =>
                        setMessage(e.target.value)
                      }
                      onKeyDown={(e) => {
                        if (
                          e.key === "Enter" &&
                          message.trim()
                        ) {
                          setMessage("");
                        }
                      }}
                      placeholder="پیام خود را بنویسید..."
                      className="
                        flex-1
                        bg-[#0f172a]
                        border border-gray-700
                        rounded-xl
                        px-4
                        py-3
                        text-white
                        outline-none
                        focus:border-yellow-400
                      "
                    />

                    <button
                      type="button"
                      onClick={() => {
                        if (!message.trim()) return;
                        setMessage("");
                      }}
                      className="
                        w-12
                        rounded-xl
                        bg-yellow-400
                        text-black
                        flex
                        items-center
                        justify-center
                        hover:bg-yellow-300
                        transition
                        cursor-pointer
                      "
                    >
                      <FaPaperPlane />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    );
  }

  // =========================
  // Page
  // =========================

  return (
    <div
      dir="rtl"
      className="bg-black min-h-screen text-white"
    >
      {/* Header */}
      <section className="relative h-[42vh] min-h-[350px] overflow-hidden">
        <img
          src="/videos/hero.gif"
          alt="بازار تجهیزات صنعتی"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="
          absolute
          inset-0
          bg-black/65
          flex
          items-center
          justify-center
          px-5
        ">
          <div className="text-center">
            <h1 className="
              text-4xl
              md:text-6xl
              font-black
              text-yellow-400
            ">
              فروشگاه تجهیزات صنعتی
            </h1>

            <p className="
              text-gray-300
              mt-5
              text-base
              md:text-lg
            ">
              تجهیزات معدن، فولاد و صنایع تخصصی
            </p>
          </div>
        </div>
      </section>

      {/* Search */}
      <div className="max-w-7xl mx-auto px-5 -mt-7 relative z-10">
        <div className="
          bg-[#020617]
          border border-gray-800
          rounded-2xl
          p-3
          shadow-2xl
        ">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="جستجو در محصولات..."
            className="
              w-full
              bg-transparent
              text-white
              text-right
              px-5
              py-4
              outline-none
              placeholder:text-gray-600
            "
          />
        </div>
      </div>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-5 py-16">
        {loading ? (
          <div className="
            min-h-[400px]
            flex
            items-center
            justify-center
            text-gray-400
          ">
            در حال بارگذاری محصولات...
          </div>
        ) : (
          <>
            {/* Main 3-column layout */}
            <section
              className="
                grid
                grid-cols-1
                lg:grid-cols-12
                gap-7
                items-start
              "
            >
              {/* RIGHT - categories */}
              <div className="lg:col-span-2 order-1">
                <CategorySidebar />
              </div>

              {/* CENTER - products */}
              <div className="lg:col-span-7 order-2">
                <div className="mb-7">
                  <h2 className="text-2xl font-extrabold text-white text-center">
                    {activeCategory
                      ? categories.find(
                          (c) => c._id === activeCategory
                        )?.name || "محصولات"
                      : "همه محصولات"}
                  </h2>

                  <p className="text-gray-500 text-center mt-2">
                    {displayedProducts.length} محصول
                  </p>
                </div>

                {displayedProducts.length === 0 ? (
                  <div className="
                    min-h-[350px]
                    border border-dashed
                    border-gray-800
                    rounded-2xl
                    flex
                    items-center
                    justify-center
                    text-gray-500
                    text-center
                    p-8
                  ">
                    محصولی در این دسته‌بندی موجود نیست.
                  </div>
                ) : (
                  <div className="
                    grid
                    grid-cols-1
                    sm:grid-cols-2
                    xl:grid-cols-3
                    gap-5
                  ">
                    {displayedProducts.map((product) => (
                      <ProductCard
                        key={product._id}
                        product={product}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* LEFT - ads */}
              <div className="lg:col-span-3 order-3">
                <AdsSidebar />
              </div>
            </section>

            {/* Five product slider */}
            <FiveProductSlider />

            {/* Trust */}
            <TrustSignals />

            {/* Chat */}
            <LiveChat />
          </>
        )}
      </main>
    </div>
  );
}