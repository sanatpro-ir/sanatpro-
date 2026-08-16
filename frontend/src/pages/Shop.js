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











// import { useEffect, useMemo, useState } from "react";
// import axios from "axios";
// import { motion, AnimatePresence } from "framer-motion";
// import { Link } from "react-router-dom";
// import {
//   FaShieldAlt,
//   FaCertificate,
//   FaHandshake,
//   FaAward,
// } from "react-icons/fa";

// import { API_URL as BASE_URL } from "../config";
// import LiveChat from "../components/LiveChat";

// const API_URL = `${BASE_URL}/api/equipments`;
// const CATEGORY_URL = `${BASE_URL}/api/categories`;
// const ADS_URL = `${BASE_URL}/api/home-sections?type=shop_ad`;

// function shuffleArray(items) {
//   const arr = [...items];

//   for (let i = arr.length - 1; i > 0; i -= 1) {
//     const j = Math.floor(Math.random() * (i + 1));
//     [arr[i], arr[j]] = [arr[j], arr[i]];
//   }

//   return arr;
// }

// export default function Shop() {
//   const [search, setSearch] = useState("");
//   const [categories, setCategories] = useState([]);
//   const [activeCategory, setActiveCategory] = useState(null);

//   const [products, setProducts] = useState([]);
//   const [ads, setAds] = useState([]);

//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     axios
//       .get(CATEGORY_URL)
//       .then((res) => {
//         setCategories(Array.isArray(res.data) ? res.data : []);
//       })
//       .catch((err) => {
//         console.error("categories:", err);
//         setCategories([]);
//       });
//   }, []);

//   useEffect(() => {
//     axios
//       .get(ADS_URL)
//       .then((res) => {
//         setAds(Array.isArray(res.data) ? res.data.slice(0, 3) : []);
//       })
//       .catch((err) => {
//         console.error("ads:", err);
//         setAds([]);
//       });
//   }, []);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       setLoading(true);

//       try {
//         const params = {};

//         if (search.trim()) {
//           params.search = search.trim();
//         }

//         if (activeCategory) {
//           params.category = activeCategory;
//         }

//         const res = await axios.get(API_URL, { params });

//         const list = Array.isArray(res.data?.equipments)
//           ? res.data.equipments
//           : Array.isArray(res.data)
//           ? res.data
//           : [];

//         setProducts(list);
//       } catch (err) {
//         console.error("products:", err);
//         setProducts([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, [search, activeCategory]);

//   const activeCategoryName = useMemo(() => {
//     if (!activeCategory) return "همه محصولات";

//     const found = categories.find(
//       (item) => item._id === activeCategory
//     );

//     return found?.name || "محصولات";
//   }, [activeCategory, categories]);

//   const sliderProducts = useMemo(() => {
//     return shuffleArray(products);
//   }, [products]);

//   function ProductCard({ product }) {
//     const image = product?.images?.[0]
//       ? `${BASE_URL}${product.images[0]}`
//       : null;

//     return (
//       <Link to={`/product/${product._id}`} className="block h-full">
//         <motion.div
//           whileHover={{ y: -6 }}
//           transition={{ duration: 0.2 }}
//           className="
//             h-full
//             bg-[#020617]
//             border border-gray-800
//             rounded-2xl
//             overflow-hidden
//             shadow-xl
//             hover:border-yellow-400
//             transition
//           "
//         >
//           <div className="h-48 bg-[#0b1220] flex items-center justify-center">
//             {image ? (
//               <img
//                 src={image}
//                 alt={product.title || "محصول"}
//                 className="w-full h-full object-contain p-4"
//               />
//             ) : (
//               <span className="text-gray-500 text-sm">
//                 بدون تصویر
//               </span>
//             )}
//           </div>

//           <div className="p-4 text-right">
//             <h3 className="text-white font-bold line-clamp-2 min-h-[56px]">
//               {product.title || "بدون عنوان"}
//             </h3>

//             <p className="text-yellow-400 font-extrabold mt-3">
//               {product.price
//                 ? Number(product.price).toLocaleString("fa-IR")
//                 : "استعلام قیمت"}{" "}
//               {product.price ? "تومان" : ""}
//             </p>

//             <p className="text-gray-500 text-xs mt-3">
//               مشاهده جزئیات ←
//             </p>
//           </div>
//         </motion.div>
//       </Link>
//     );
//   }

//   function CategorySidebar() {
//     return (
//       <aside className="bg-[#020617] border border-gray-800 rounded-2xl p-5 sticky top-24">
//         <h2 className="text-white text-lg font-extrabold mb-5 text-right">
//           دسته‌بندی
//         </h2>

//         <button
//           type="button"
//           onClick={() => setActiveCategory(null)}
//           className={`
//             w-full text-right px-4 py-3 rounded-xl mb-2
//             transition font-bold
//             ${
//               !activeCategory
//                 ? "bg-yellow-400 text-black"
//                 : "text-gray-300 hover:bg-gray-800 hover:text-yellow-400"
//             }
//           `}
//         >
//           همه محصولات
//         </button>

//         {categories.map((category) => {
//           const active = activeCategory === category._id;

//           return (
//             <button
//               key={category._id}
//               type="button"
//               onClick={() =>
//                 setActiveCategory(active ? null : category._id)
//               }
//               className={`
//                 w-full text-right px-4 py-3 rounded-xl mb-1
//                 transition font-semibold
//                 ${
//                   active
//                     ? "bg-yellow-400 text-black"
//                     : "text-gray-300 hover:bg-gray-800 hover:text-yellow-400"
//                 }
//               `}
//             >
//               {category.name}
//             </button>
//           );
//         })}
//       </aside>
//     );
//   }

//   function AdsSidebar() {
//     const fallback = [
//       {
//         title: "پیشنهاد ویژه VIP",
//         color:
//           "from-yellow-500/30 via-yellow-400/10 to-transparent",
//       },
//       {
//         title: "محصولات اقتصادی",
//         color:
//           "from-emerald-500/30 via-emerald-400/10 to-transparent",
//       },
//       {
//         title: "محبوب‌ترین محصولات",
//         color:
//           "from-blue-500/30 via-blue-400/10 to-transparent",
//       },
//     ];

//     return (
//       <aside className="space-y-5">
//         {fallback.map((item, index) => {
//           const backendAd = ads[index];

//           const image = backendAd?.image
//             ? backendAd.image.startsWith("http")
//               ? backendAd.image
//               : `${BASE_URL}${backendAd.image}`
//             : null;

//           const title =
//             backendAd?.title || item.title;

//           return (
//             <motion.div
//               key={index}
//               whileHover={{ y: -4 }}
//               className="
//                 relative
//                 h-[175px]
//                 rounded-2xl
//                 overflow-hidden
//                 border border-gray-800
//                 bg-[#020617]
//                 shadow-xl
//               "
//             >
//               {image ? (
//                 <img
//                   src={image}
//                   alt={title}
//                   className="w-full h-full object-cover"
//                 />
//               ) : (
//                 <div
//                   className={`
//                     absolute inset-0
//                     bg-gradient-to-br ${item.color}
//                     flex items-center justify-center
//                   `}
//                 >
//                   <div className="text-white text-lg font-extrabold">
//                     {title}
//                   </div>
//                 </div>
//               )}

//               <div className="absolute bottom-0 inset-x-0 bg-black/75 text-white text-center py-3 font-bold">
//                 {title}
//               </div>
//             </motion.div>
//           );
//         })}
//       </aside>
//     );
//   }

//   function FiveProductSlider() {
//     const groups = [];

//     for (let i = 0; i < sliderProducts.length; i += 5) {
//       groups.push(sliderProducts.slice(i, i + 5));
//     }

//     const [active, setActive] = useState(0);

//     useEffect(() => {
//       setActive(0);
//     }, [products]);

//     useEffect(() => {
//       if (groups.length <= 1) return;

//       const timer = setInterval(() => {
//         setActive((current) => (current + 1) % groups.length);
//       }, 4500);

//       return () => clearInterval(timer);
//     }, [groups.length]);

//     if (!groups.length) return null;

//     return (
//       <section className="mt-20">
//         <div className="text-center mb-8">
//           <h2 className="text-2xl md:text-3xl font-extrabold text-white">
//             محصولات پیشنهادی
//           </h2>

//           <p className="text-gray-500 mt-2">
//             ۵ محصول از کل محصولات فروشگاه
//           </p>
//         </div>

//         <div className="overflow-hidden">
//           <AnimatePresence mode="wait">
//             <motion.div
//               key={active}
//               initial={{
//                 opacity: 0,
//                 x: active % 2 === 0 ? 80 : -80,
//               }}
//               animate={{
//                 opacity: 1,
//                 x: 0,
//               }}
//               exit={{
//                 opacity: 0,
//                 x: active % 2 === 0 ? -80 : 80,
//               }}
//               transition={{ duration: 0.55 }}
//               className="
//                 grid
//                 grid-cols-2
//                 sm:grid-cols-3
//                 lg:grid-cols-5
//                 gap-4
//               "
//             >
//               {groups[active].map((product) => (
//                 <ProductCard
//                   key={product._id}
//                   product={product}
//                 />
//               ))}
//             </motion.div>
//           </AnimatePresence>
//         </div>

//         {groups.length > 1 && (
//           <div className="flex justify-center gap-2 mt-6">
//             {groups.map((_, index) => (
//               <button
//                 key={index}
//                 type="button"
//                 onClick={() => setActive(index)}
//                 className={`
//                   h-2.5 rounded-full transition-all
//                   ${
//                     index === active
//                       ? "w-8 bg-yellow-400"
//                       : "w-2.5 bg-gray-700"
//                   }
//                 `}
//                 aria-label={`اسلاید ${index + 1}`}
//               />
//             ))}
//           </div>
//         )}
//       </section>
//     );
//   }

//   function TrustSignals() {
//     const items = [
//       {
//         icon: <FaShieldAlt />,
//         title: "خرید مطمئن",
//       },
//       {
//         icon: <FaCertificate />,
//         title: "اطلاعات معتبر",
//       },
//       {
//         icon: <FaHandshake />,
//         title: "ارتباط مستقیم",
//       },
//       {
//         icon: <FaAward />,
//         title: "بازار تخصصی صنعت",
//       },
//     ];

//     return (
//       <section className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-4">
//         {items.map((item) => (
//           <div
//             key={item.title}
//             className="
//               bg-[#020617]
//               border border-gray-800
//               rounded-2xl
//               p-6
//               text-center
//             "
//           >
//             <div className="text-yellow-400 text-3xl flex justify-center mb-3">
//               {item.icon}
//             </div>

//             <div className="text-white font-bold">
//               {item.title}
//             </div>
//           </div>
//         ))}
//       </section>
//     );
//   }

//   return (
//     <div dir="rtl" className="bg-black min-h-screen text-white">
//       {/* HERO */}
//       <section className="relative h-[42vh] min-h-[340px] overflow-hidden">
//         <img
//           src="/videos/hero.gif"
//           alt="فروشگاه تجهیزات صنعتی"
//           className="absolute inset-0 w-full h-full object-cover"
//         />

//         <div className="absolute inset-0 bg-black/65 flex items-center justify-center">
//           <div className="text-center px-6">
//             <h1 className="text-4xl md:text-6xl font-black text-yellow-400">
//               فروشگاه تجهیزات صنعتی
//             </h1>

//             <p className="text-gray-300 mt-4 text-lg">
//               صنعت، معدن، فولاد و تجهیزات تخصصی
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* SEARCH */}
//       <div className="max-w-7xl mx-auto px-5 -mt-7 relative z-10">
//         <div className="bg-[#020617] border border-gray-800 rounded-2xl p-3 shadow-2xl">
//           <input
//             type="text"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             placeholder="جستجو در محصولات..."
//             className="
//               w-full
//               bg-transparent
//               text-white
//               px-5 py-4
//               text-right
//               outline-none
//             "
//           />
//         </div>
//       </div>

//       {/* MAIN */}
//       <main className="max-w-7xl mx-auto px-5 py-16">
//         {loading ? (
//           <div className="text-center text-gray-400 py-20">
//             در حال بارگذاری محصولات...
//           </div>
//         ) : (
//           <>
//             <section className="grid grid-cols-12 gap-7 items-start">
//               {/* RIGHT: CATEGORY */}
//               <div className="col-span-12 lg:col-span-2">
//                 <CategorySidebar />
//               </div>

//               {/* CENTER: PRODUCTS */}
//               <div className="col-span-12 lg:col-span-7">
//                 <div className="text-center mb-7">
//                   <h2 className="text-3xl font-extrabold text-white">
//                     {activeCategoryName}
//                   </h2>

//                   <p className="text-gray-500 mt-2">
//                     {products.length} محصول
//                   </p>
//                 </div>

//                 {products.length === 0 ? (
//                   <div className="
//                     min-h-[360px]
//                     rounded-2xl
//                     border border-dashed border-gray-800
//                     flex
//                     items-center
//                     justify-center
//                     text-gray-500
//                   ">
//                     محصولی در این بخش موجود نیست.
//                   </div>
//                 ) : (
//                   <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
//                     {products.map((product) => (
//                       <ProductCard
//                         key={product._id}
//                         product={product}
//                       />
//                     ))}
//                   </div>
//                 )}
//               </div>

//               {/* LEFT: 3 BANNERS */}
//               <div className="col-span-12 lg:col-span-3">
//                 <AdsSidebar />
//               </div>
//             </section>

//             {/* ONE SINGLE SLIDER */}
//             <FiveProductSlider />

//             {/* LIVE CHAT */}
//             <LiveChat />

//             {/* TRUST */}
//             <TrustSignals />
//           </>
//         )}
//       </main>
//     </div>
//   );
// }










import { useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
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
const ADS_URL = `${BASE_URL}/api/home-sections?type=shop_ad`;
const CHAT_URL = `${BASE_URL}/api/chat`;

const FALLBACK_ADS = [
  {
    id: "vip",
    title: "پیشنهاد ویژه VIP",
    type: "vip",
    image: "/videos/hero.gif",
  },
  {
    id: "eco",
    title: "محصولات اقتصادی",
    type: "eco",
    image: "/videos/hero.gif",
  },
  {
    id: "popular",
    title: "محبوب‌ترین محصولات",
    type: "popular",
    image: "/videos/hero.gif",
  },
];

function shuffleArray(items) {
  const array = [...items];

  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
}

function normalizeProducts(data) {
  if (Array.isArray(data)) {
    return data;
  }

  if (Array.isArray(data?.equipments)) {
    return data.equipments;
  }

  if (Array.isArray(data?.products)) {
    return data.products;
  }

  if (Array.isArray(data?.data)) {
    return data.data;
  }

  return [];
}

function ProductCard({ product }) {
  const image =
    product?.images?.[0]
      ? `${BASE_URL}${product.images[0]}`
      : null;

  const price =
    product?.price !== undefined &&
    product?.price !== null &&
    product?.price !== ""
      ? Number(product.price).toLocaleString("fa-IR")
      : null;

  return (
    <Link
      to={`/product/${product._id}`}
      className="block h-full"
    >
      <motion.article
        whileHover={{ y: -5 }}
        transition={{ duration: 0.2 }}
        className="
          h-full
          min-h-[330px]
          bg-[#020617]
          border border-gray-800
          rounded-2xl
          overflow-hidden
          shadow-xl
          hover:border-yellow-400
          flex flex-col
        "
      >
        <div className="h-[185px] bg-[#0b1220] flex items-center justify-center overflow-hidden">
          {image ? (
            <img
              src={image}
              alt={product.title || "محصول"}
              className="w-full h-full object-contain p-4 hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="text-gray-500 text-sm">
              تصویر موجود نیست
            </div>
          )}
        </div>

        <div className="p-4 flex flex-col flex-1 text-right">
          <h3 className="text-white font-bold leading-7 line-clamp-2 min-h-[56px]">
            {product.title || "محصول بدون عنوان"}
          </h3>

          <div className="mt-auto pt-4">
            {product.brand && (
              <div className="text-gray-500 text-xs mb-2">
                برند: {product.brand}
              </div>
            )}

            {price ? (
              <div className="text-yellow-400 font-extrabold">
                {price} تومان
              </div>
            ) : (
              <div className="text-gray-400 text-sm">
                استعلام قیمت
              </div>
            )}

            <div className="text-gray-600 text-xs mt-3">
              مشاهده جزئیات ←
            </div>
          </div>
        </div>
      </motion.article>
    </Link>
  );
}

function CategorySidebar({
  categories,
  activeCategory,
  onCategoryChange,
}) {
  return (
    <aside
      dir="rtl"
      className="
        bg-[#020617]
        border border-gray-800
        rounded-2xl
        p-5
        shadow-xl
        lg:sticky
        lg:top-24
      "
    >
      <div className="flex items-center gap-2 mb-5">
        <span className="text-yellow-400 text-xl">⚙️</span>

        <h2 className="text-white font-extrabold text-lg">
          دسته‌بندی
        </h2>
      </div>

      <button
        type="button"
        onClick={() => onCategoryChange(null)}
        className={`
          w-full
          text-right
          px-4
          py-3
          rounded-xl
          mb-2
          font-bold
          transition
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
        const active =
          activeCategory === category._id;

        return (
          <button
            key={category._id}
            type="button"
            onClick={() =>
              onCategoryChange(
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
              font-semibold
              transition
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

function AdsSidebar({ ads }) {
  const items = [];

  for (let i = 0; i < 3; i += 1) {
    const apiAd = ads[i];

    items.push({
      id: apiAd?._id || FALLBACK_ADS[i].id,
      title:
        apiAd?.title ||
        FALLBACK_ADS[i].title,
      image: apiAd?.image
        ? apiAd.image.startsWith("http")
          ? apiAd.image
          : `${BASE_URL}${apiAd.image}`
        : FALLBACK_ADS[i].image,
    });
  }

  return (
    <aside
      dir="rtl"
      className="space-y-5"
    >
      {items.map((item) => (
        <motion.div
          key={item.id}
          whileHover={{ y: -4 }}
          transition={{ duration: 0.2 }}
          className="
            relative
            h-[175px]
            overflow-hidden
            rounded-2xl
            border border-gray-800
            bg-[#020617]
            shadow-xl
          "
        >
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover"
          />

          <div
            className="
              absolute
              inset-x-0
              bottom-0
              bg-black/75
              text-white
              text-center
              py-3
              px-2
              font-bold
            "
          >
            {item.title}
          </div>
        </motion.div>
      ))}
    </aside>
  );
}

function FiveProductSlider({ products }) {
  const [groups, setGroups] = useState([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const shuffled = shuffleArray(products);
    const nextGroups = [];

    for (let i = 0; i < shuffled.length; i += 5) {
      nextGroups.push(shuffled.slice(i, i + 5));
    }

    setGroups(nextGroups);
    setActive(0);
  }, [products]);

  useEffect(() => {
    if (groups.length <= 1) {
      return undefined;
    }

    const timer = setInterval(() => {
      setActive((current) => {
        if (current >= groups.length - 1) {
          return 0;
        }

        return current + 1;
      });
    }, 4500);

    return () => clearInterval(timer);
  }, [groups.length]);

  if (!groups.length) {
    return null;
  }

  const currentGroup = groups[active] || [];

  return (
    <section
      dir="rtl"
      className="
        mt-20
        w-full
        flex
        flex-col
        items-center
      "
    >
      <div className="text-center mb-8">
        <div className="text-yellow-400 font-bold text-sm">
          پیشنهادهای فروشگاه
        </div>

        <h2 className="text-3xl font-extrabold text-white mt-2">
          محصولات منتخب
        </h2>

        <p className="text-gray-500 mt-2">
          پنج محصول از کل محصولات فروشگاه
        </p>
      </div>

      <div className="w-full max-w-7xl mx-auto overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{
              opacity: 0,
              x: active % 2 === 0 ? 100 : -100,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            exit={{
              opacity: 0,
              x: active % 2 === 0 ? -100 : 100,
            }}
            transition={{
              duration: 0.55,
            }}
            className="
              grid
              grid-cols-1
              sm:grid-cols-2
              md:grid-cols-3
              lg:grid-cols-5
              gap-5
            "
          >
            {currentGroup.map((product) => (
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
          {groups.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setActive(index)}
              aria-label={`نمایش اسلاید ${index + 1}`}
              className={`
                h-2.5
                rounded-full
                transition-all
                ${
                  index === active
                    ? "w-8 bg-yellow-400"
                    : "w-2.5 bg-gray-700"
                }
              `}
            />
          ))}
        </div>
      )}
    </section>
  );
}

function LiveChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [name, setName] = useState(
    localStorage.getItem("chatName") || ""
  );
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  const bottomRef = useRef(null);

  const loadMessages = async () => {
    try {
      const res = await axios.get(CHAT_URL);

      const list = Array.isArray(res.data)
        ? res.data
        : [];

      setMessages(list);
    } catch (err) {
      console.error("chat load:", err);
    }
  };

  useEffect(() => {
    if (!open) {
      return undefined;
    }

    loadMessages();

    const timer = setInterval(() => {
      loadMessages();
    }, 2000);

    return () => clearInterval(timer);
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  const sendMessage = async () => {
    const cleanName = name.trim();
    const cleanMessage = message.trim();

    if (!cleanName) {
      alert("لطفاً نام خود را وارد کنید.");
      return;
    }

    if (!cleanMessage) {
      return;
    }

    setSending(true);

    try {
      await axios.post(CHAT_URL, {
        name: cleanName,
        message: cleanMessage,
      });

      localStorage.setItem("chatName", cleanName);

      setMessage("");

      await loadMessages();
    } catch (err) {
      console.error("chat send:", err);

      alert(
        err.response?.data?.message ||
          "ارسال پیام انجام نشد."
      );
    } finally {
      setSending(false);
    }
  };

  return (
    <section
      dir="rtl"
      className="mt-20"
    >
      <div
        className="
          max-w-5xl
          mx-auto
          bg-[#020617]
          border border-gray-800
          rounded-3xl
          overflow-hidden
          shadow-2xl
        "
      >
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="
            w-full
            px-6
            py-5
            flex
            items-center
            justify-between
            bg-[#0b1220]
            border-b border-gray-800
            text-right
            hover:bg-[#111827]
            transition
          "
        >
          <div className="flex items-center gap-4">
            <div
              className="
                w-12 h-12
                rounded-full
                bg-yellow-400
                text-black
                flex
                items-center
                justify-center
              "
            >
              <FaComments />
            </div>

            <div>
              <h2 className="text-white text-xl font-extrabold">
                گفت‌وگوی زنده فروشگاه
              </h2>

              <p className="text-gray-500 text-sm mt-1">
                گفتگو با کاربران و فروشندگان
              </p>
            </div>
          </div>

          <span className="text-yellow-400 text-2xl">
            {open ? "−" : "+"}
          </span>
        </button>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{
                opacity: 0,
                height: 0,
              }}
              animate={{
                opacity: 1,
                height: "auto",
              }}
              exit={{
                opacity: 0,
                height: 0,
              }}
              className="overflow-hidden"
            >
              <div className="h-[360px] overflow-y-auto p-5 space-y-4 bg-black/20">
                {messages.length === 0 ? (
                  <div className="h-full flex items-center justify-center text-gray-600 text-center">
                    هنوز پیامی ارسال نشده است.
                  </div>
                ) : (
                  messages.map((item) => (
                    <div
                      key={item._id}
                      className="text-right"
                    >
                      <div className="text-yellow-400 text-xs font-bold mb-1">
                        {item.name}
                      </div>

                      <div
                        className="
                          inline-block
                          max-w-[90%]
                          bg-[#111827]
                          border border-gray-800
                          rounded-2xl
                          rounded-tr-sm
                          px-4
                          py-3
                          text-gray-200
                          text-sm
                          leading-7
                        "
                      >
                        {item.message}
                      </div>
                    </div>
                  ))
                )}

                <div ref={bottomRef} />
              </div>

              <div className="border-t border-gray-800 p-4">
                <div className="grid grid-cols-1 md:grid-cols-[180px_1fr_auto] gap-3">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) =>
                      setName(e.target.value)
                    }
                    placeholder="نام شما"
                    className="
                      bg-black
                      border border-gray-800
                      rounded-xl
                      px-4
                      py-3
                      text-white
                      outline-none
                      focus:border-yellow-400
                    "
                  />

                  <input
                    type="text"
                    value={message}
                    onChange={(e) =>
                      setMessage(e.target.value)
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        sendMessage();
                      }
                    }}
                    placeholder="پیام خود را بنویسید..."
                    className="
                      bg-black
                      border border-gray-800
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
                    onClick={sendMessage}
                    disabled={sending}
                    className="
                      min-w-[110px]
                      bg-yellow-400
                      hover:bg-yellow-300
                      disabled:opacity-50
                      text-black
                      rounded-xl
                      px-5
                      py-3
                      font-bold
                      flex
                      items-center
                      justify-center
                      gap-2
                      transition
                    "
                  >
                    <FaPaperPlane />
                    ارسال
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

function TrustSignals() {
  const items = [
    {
      icon: <FaShieldAlt />,
      title: "خرید مطمئن",
    },
    {
      icon: <FaCertificate />,
      title: "اطلاعات معتبر",
    },
    {
      icon: <FaHandshake />,
      title: "ارتباط مستقیم",
    },
    {
      icon: <FaAward />,
      title: "بازار تخصصی صنعت",
    },
  ];

  return (
    <section
      dir="rtl"
      className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4"
    >
      {items.map((item) => (
        <div
          key={item.title}
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

          <div className="text-white font-bold">
            {item.title}
          </div>
        </div>
      ))}
    </section>
  );
}

export default function Shop() {
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] =
    useState(null);

  const [products, setProducts] = useState([]);
  const [ads, setAds] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(CATEGORY_URL)
      .then((res) => {
        const list = Array.isArray(res.data)
          ? res.data
          : [];

        setCategories(list);
      })
      .catch((err) => {
        console.error("categories:", err);
        setCategories([]);
      });
  }, []);

  useEffect(() => {
    axios
      .get(ADS_URL)
      .then((res) => {
        const list = Array.isArray(res.data)
          ? res.data
          : [];

        setAds(list.slice(0, 3));
      })
      .catch((err) => {
        console.error("ads:", err);
        setAds([]);
      });
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);

      try {
        const params = {};

        if (search.trim()) {
          params.search = search.trim();
        }

        if (activeCategory) {
          params.category = activeCategory;
        }

        const responses = await Promise.all([
          axios.get(API_URL, {
            params: {
              ...params,
              tag: "vip",
            },
          }),

          axios.get(API_URL, {
            params: {
              ...params,
              tag: "hot",
            },
          }),

          axios.get(API_URL, {
            params: {
              ...params,
              tag: "eco",
            },
          }),

          axios.get(API_URL, {
            params: {
              ...params,
              tag: "normal",
            },
          }),
        ]);

        const combined = responses.flatMap(
          (response) =>
            normalizeProducts(response.data)
        );

        const seen = new Set();

        const uniqueProducts = combined.filter(
          (product) => {
            if (!product?._id) {
              return false;
            }

            if (seen.has(product._id)) {
              return false;
            }

            seen.add(product._id);

            return true;
          }
        );

        setProducts(uniqueProducts);
      } catch (err) {
        console.error("products:", err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [activeCategory, search]);

  const activeCategoryName = useMemo(() => {
    if (!activeCategory) {
      return "همه محصولات";
    }

    const found = categories.find(
      (category) =>
        category._id === activeCategory
    );

    return found?.name || "محصولات";
  }, [activeCategory, categories]);

  return (
    <div
      dir="rtl"
      className="bg-black min-h-screen text-white"
    >
      {/* HERO */}
      <section className="relative h-[48vh] min-h-[360px] overflow-hidden">
        <img
          src="/videos/hero.gif"
          alt="فروشگاه تجهیزات صنعتی"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/65 flex items-center justify-center px-5">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-black text-yellow-400">
              فروشگاه تجهیزات صنعتی
            </h1>

            <p className="text-gray-300 text-lg mt-5">
              صنعت، معدن، فولاد و تجهیزات تخصصی
            </p>
          </div>
        </div>
      </section>

      {/* SEARCH */}
      <div className="max-w-7xl mx-auto px-5 -mt-7 relative z-10">
        <div className="bg-[#020617] border border-gray-800 rounded-2xl p-3 shadow-2xl">
          <input
            type="text"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="جستجو در محصولات..."
            className="
              w-full
              bg-black
              border border-gray-800
              rounded-xl
              px-5
              py-4
              text-white
              text-right
              outline-none
              focus:border-yellow-400
            "
          />
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-5 py-16">
        {loading ? (
          <div className="min-h-[350px] flex items-center justify-center text-gray-400">
            در حال بارگذاری محصولات...
          </div>
        ) : (
          <>
            {/* MAIN SHOP */}
            <section className="grid grid-cols-12 gap-7 items-start">
              {/* RIGHT: ONE CATEGORY */}
              <div className="col-span-12 lg:col-span-2 order-1">
                <CategorySidebar
                  categories={categories}
                  activeCategory={activeCategory}
                  onCategoryChange={setActiveCategory}
                />
              </div>

              {/* CENTER: PRODUCTS */}
              <div className="col-span-12 lg:col-span-7 order-2">
                <div className="text-center mb-7">
                  <h2 className="text-3xl font-extrabold text-white">
                    {activeCategoryName}
                  </h2>

                  <p className="text-gray-500 mt-2">
                    {products.length} محصول
                  </p>
                </div>

                {products.length === 0 ? (
                  <div
                    className="
                      min-h-[360px]
                      flex
                      items-center
                      justify-center
                      text-center
                      border border-dashed border-gray-800
                      rounded-2xl
                      text-gray-500
                    "
                  >
                    محصولی در این دسته‌بندی موجود نیست.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                    {products.map((product) => (
                      <ProductCard
                        key={product._id}
                        product={product}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* LEFT: THREE ADS */}
              <div className="col-span-12 lg:col-span-3 order-3">
                <AdsSidebar ads={ads} />
              </div>
            </section>

            {/* IMPORTANT:
                CENTERED FULL-WIDTH BANNER / PRODUCT SLIDER
                DIRECTLY BEFORE CHAT
            */}
            <FiveProductSlider products={products} />

            {/* CHAT */}
            <LiveChat />

            {/* TRUST */}
            <TrustSignals />
          </>
        )}
      </main>
    </div>
  );
}