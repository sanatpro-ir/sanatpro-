import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { useTranslation } from "react-i18next";
import {
  FaSearch,
  FaIndustry,
  FaTools,
  FaHandshake,
  FaFire,
  FaMountain,
  FaCogs,
  FaHardHat,
  FaProjectDiagram,
  FaBullhorn,
} from "react-icons/fa";

import CategoryTwo from "../components/CategoryTwo";
import { API_URL as BASE_URL } from "../config";

const ICON_MAP = {
  FaFire: <FaFire />,
  FaMountain: <FaMountain />,
  FaCogs: <FaCogs />,
  FaHardHat: <FaHardHat />,
  FaProjectDiagram: <FaProjectDiagram />,
  FaIndustry: <FaIndustry />,
};

const API_HOME_SECTIONS = `${BASE_URL}/api/home-sections`;

function Home() {
  const { t } = useTranslation();
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!search.trim()) return;
    navigate(`/shop?search=${encodeURIComponent(search)}`);
  };

  // ================= FALLBACK DATA (اگه دیتابیس خالی بود) =================
  const FALLBACK_PROMOS = [
    "🟢 شروع قراردادهای جدید B2B",
    "🚚 تأمین فوری تجهیزات حفاری",
    "⚙️ حراج محدود تجهیزات معدنی",
    "🤝 همکاری با پروژه‌های ملی",
    "🏆 تامین مستقیم بدون واسطه",
  ];

  const FALLBACK_ADS = [
    { title: "قراردادهای تخصصی B2B معدن", desc: "همکاری رسمی، پیش‌فاکتور معتبر و تأمین مستقیم تجهیزات پروژه‌ای" },
    { title: "تأمین فوری تجهیزات حفاری", desc: "ارسال سریع، تضمین اصالت و پشتیبانی فنی تخصصی" },
    { title: "حذف واسطه‌ها، کاهش هزینه", desc: "خرید مستقیم از تأمین‌کننده رسمی MinePro" },
  ];

  const FALLBACK_INDUSTRIES = [
    { title: "صنایع فولاد", desc: "تأمین تجهیزات خطوط ذوب، نورد گرم و سرد و انتقال مواد", icon: "FaFire" },
    { title: "معادن سنگ‌آهن", desc: "تجهیزات حفاری، استخراج، خردایش و بارگیری مواد معدنی", icon: "FaMountain" },
    { title: "گندله‌سازی", desc: "تجهیزات فرآوری، انتقال و دانه‌بندی مواد معدنی", icon: "FaCogs" },
    { title: "کارخانه‌های سیمان", desc: "تجهیزات صنعتی سنگین و قطعات مصرفی خطوط تولید", icon: "FaHardHat" },
    { title: "پروژه‌های EPC", desc: "تأمین پروژه‌ای تجهیزات با قرارداد رسمی B2B", icon: "FaProjectDiagram" },
    { title: "صنایع سنگین", desc: "راه‌حل‌های مهندسی‌شده برای خطوط تولید صنعتی", icon: "FaIndustry" },
  ];

  const FALLBACK_STATS = [
    { title: "15+", desc: "سال تجربه صنعتی" },
    { title: "320+", desc: "پروژه موفق" },
    { title: "120+", desc: "شرکت همکار" },
  ];

  const FALLBACK_HERO = {
    title: "تأمین تخصصی تجهیزات معدنی",
    description: "فروش، تأمین پروژه‌ای و قراردادهای B2B",
    image: null,
  };

  // ================= STATE =================
  const [industries, setIndustries] = useState(FALLBACK_INDUSTRIES);
  const [promos, setPromos] = useState(FALLBACK_PROMOS);
  const [ads, setAds] = useState(FALLBACK_ADS);
  const [stats, setStats] = useState(FALLBACK_STATS);
  const [hero, setHero] = useState(FALLBACK_HERO);

  const [promoIndex, setPromoIndex] = useState(0);
  const [adIndex, setAdIndex] = useState(0);

  // ================= FETCH ALL SECTIONS =================
  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [industryRes, promoRes, adRes, statRes, heroRes] = await Promise.all([
          axios.get(`${API_HOME_SECTIONS}?type=industry`),
          axios.get(`${API_HOME_SECTIONS}?type=promo`),
          axios.get(`${API_HOME_SECTIONS}?type=ad`),
          axios.get(`${API_HOME_SECTIONS}?type=stat`),
          axios.get(`${API_HOME_SECTIONS}?type=hero`),
        ]);

        if (industryRes.data.length > 0) {
          setIndustries(
            industryRes.data.map((item) => ({
              title: item.title,
              desc: item.description,
              icon: item.icon,
            }))
          );
        }

        if (promoRes.data.length > 0) {
          setPromos(promoRes.data.map((item) => item.title));
        }

        if (adRes.data.length > 0) {
          setAds(
            adRes.data.map((item) => ({
              title: item.title,
              desc: item.description,
            }))
          );
        }

        if (statRes.data.length > 0) {
          setStats(
            statRes.data.map((item) => ({
              title: item.title,
              desc: item.description,
            }))
          );
        }

        if (heroRes.data.length > 0) {
          setHero({
            title: heroRes.data[0].title,
            description: heroRes.data[0].description,
            image: heroRes.data[0].image,
          });
        }
      } catch (err) {
        console.error("خطا در دریافت محتوای صفحه اصلی، از مقادیر پیش‌فرض استفاده می‌شود", err);
      }
    };
    fetchAll();
  }, []);

  useEffect(() => {
    if (promos.length === 0) return;
    const t = setInterval(() => {
      setPromoIndex((p) => (p + 1) % promos.length);
    }, 3000);
    return () => clearInterval(t);
  }, [promos.length]);

  useEffect(() => {
    if (ads.length === 0) return;
    const t = setInterval(() => {
      setAdIndex((a) => (a + 1) % ads.length);
    }, 4000);
    return () => clearInterval(t);
  }, [ads.length]);

  // ================= RETURN =================
  return (
    <>
      <div className="bg-gray-50 text-gray-800">
        <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-black text-white">
          <div className="absolute inset-0">
            <img
              src={hero.image ? `${BASE_URL}${hero.image}` : "/videos/hero.gif"}
              alt="mining background"
              className="w-full h-full object-cover opacity-70"
            />
          </div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,192,0,0.12),transparent_25%)]" />
          <div className="relative z-10 max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -60 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <h1 className="text-5xl md:text-6xl font-extrabold mb-6">{hero.title}</h1>
              <p className="text-lg text-gray-300 mb-6">{hero.description}</p>
              <div className="relative max-w-xl mb-10">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  placeholder={t("home_search_placeholder")}
                  className="w-full p-5 rounded-2xl text-gray-300 placeholder-gray-400 bg-blue-900/30 backdrop-blur-sm border border-blue-800 pr-14 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
                <button onClick={handleSearch} className="absolute right-3 top-1/2 -translate-y-1/2 bg-[#ffc000] p-3 rounded-xl">
                  <FaSearch />
                </button>
              </div>
              <div className="flex gap-4 flex-wrap">
                <Link to="/shop" className="bg-[#ffc000] text-black px-8 py-4 rounded-xl font-bold">
                  {t("home_enter_shop")}
                </Link>
                <a href="https://wa.me/989121234567" className="border border-[#ffc000] text-[#ffc000] px-8 py-4 rounded-xl font-bold">
                  {t("home_quick_consult")}
                </a>
              </div>
            </motion.div>
            <motion.div className="grid grid-cols-3 gap-6 text-center">
              {[
                { icon: <FaIndustry size={42} />, label: t("home_badge_mining") },
                { icon: <FaTools size={42} />, label: t("home_badge_equipment") },
                { icon: <FaHandshake size={42} />, label: t("home_badge_b2b") },
              ].map((item, i) => (
                <motion.div key={i} whileHover={{ scale: 1.1 }} className="bg-gray-900/80 p-6 rounded-2xl border border-gray-800">
                  <div className="text-[#ffc000] mb-2">{item.icon}</div>
                  <p className="font-bold">{item.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <section className="relative py-32 bg-gray-50 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,192,0,0.08),transparent_60%)]" />
          <div className="relative max-w-7xl mx-auto px-6">
            <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="text-center mb-24">
              <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
                {t("home_industries_title_1")}
                <span className="text-[#FFC000]"> {t("home_industries_title_2")}</span>
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">{t("home_industries_desc")}</p>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-14">
              {industries.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -16, rotateX: 6, rotateY: -6 }}
                  className="group relative bg-white rounded-3xl p-12 border shadow-2xl transition-all"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#FFC000]/25 to-transparent opacity-0 group-hover:opacity-100 transition blur-2xl" />
                  <div className="relative z-10 mb-8 w-20 h-20 flex items-center justify-center rounded-2xl bg-gradient-to-br from-gray-900 to-black shadow-2xl">
                    <span className="text-[#FFC000] text-4xl">{ICON_MAP[item.icon] || <FaIndustry />}</span>
                  </div>
                  <h3 className="relative z-10 text-xl font-extrabold mb-4">{item.title}</h3>
                  <p className="relative z-10 text-gray-600 leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 bg-black text-white">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="text-center mb-16">
              <h2 className="text-4xl font-extrabold mb-4">
                {t("home_categories_title_1")}
                <span className="text-[#ffc000]"> {t("home_categories_title_2")}</span>
              </h2>
              <p className="text-gray-400">{t("home_categories_desc")}</p>
            </motion.div>
            <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-8">
              {[
                { title: t("home_cat_process_title"), desc: t("home_cat_process_desc"), category: "process" },
                { title: t("home_cat_spare_title"), desc: t("home_cat_spare_desc"), category: "spare" },
                { title: t("home_cat_heavy_title"), desc: t("home_cat_heavy_desc"), category: "heavy" },
                { title: t("home_cat_b2b_title"), desc: t("home_cat_b2b_desc"), category: "b2b" },
              ].map((item, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                  <Link to={`/shop?category=${item.category}`} className="block bg-gray-900 border border-gray-800 rounded-2xl p-8 hover:border-[#ffc000] hover:-translate-y-2 transition-all duration-300">
                    <h3 className="text-xl font-extrabold mb-3">{item.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <CategoryTwo />

        <section className="py-24 bg-white relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
            {ads.length > 0 && (
              <motion.div key={adIndex} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <div className="flex items-center gap-3 mb-6 text-[#ffc000] font-bold">
                  <FaBullhorn /> {t("home_ads_badge")}
                </div>
                <h2 className="text-4xl font-extrabold mb-6">{ads[adIndex]?.title}</h2>
                <p className="text-gray-600 mb-10">{ads[adIndex]?.desc}</p>
                <Link to="/b2b" className="bg-black text-white px-10 py-4 rounded-xl font-bold">
                  {t("home_ads_cta")}
                </Link>
              </motion.div>
            )}
            <div className="grid gap-6">
              {promos.map((p, i) => (
                <motion.div key={i} animate={i === promoIndex ? { scale: 1.05 } : { scale: 1 }} className={`p-6 rounded-xl border font-bold ${i === promoIndex ? "bg-yellow-50 border-yellow-400" : "bg-gray-50"}`}>
                  {p}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative py-32 overflow-hidden bg-[#f5f5f5]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,192,0,0.25),transparent_70%)]" />
          <motion.div initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="relative max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
              {t("home_cta_title_1")}
              <span className="text-[#FFC000]"> {t("home_cta_title_2")} </span>
              {t("home_cta_title_3")}
            </h2>
            <p className="text-lg text-gray-700 mb-12">{t("home_cta_desc")}</p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }} className="inline-block">
              <Link to="/b2b" className="relative inline-flex items-center justify-center gap-3 bg-black text-white px-12 py-5 rounded-2xl font-extrabold text-lg shadow-xl hover:bg-gray-900 transition">
                {t("home_cta_button")}
                <motion.span initial={{ x: 0 }} whileHover={{ x: 6 }} transition={{ type: "spring", stiffness: 300 }}>
                  →
                </motion.span>
              </Link>
            </motion.div>
          </motion.div>
          <motion.div animate={{ y: [0, -20, 0] }} transition={{ duration: 6, repeat: Infinity }} className="absolute top-16 left-20 w-24 h-24 rounded-full bg-[#FFC000]/20 blur-2xl" />
          <motion.div animate={{ y: [0, 20, 0] }} transition={{ duration: 7, repeat: Infinity }} className="absolute bottom-16 right-24 w-32 h-32 rounded-full bg-black/10 blur-3xl" />
        </section>

        <section className="py-24 bg-white border-t">
          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-10 text-center">
            {stats.map((item, i) => (
              <motion.div key={i} whileHover={{ scale: 1.05 }} className="bg-gray-50 p-10 rounded-2xl shadow border">
                <h3 className="text-5xl font-extrabold text-yellow-500 mb-4">{item.title}</h3>
                <p className="text-gray-700">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="py-28 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-4xl font-extrabold mb-16 text-center">{t("home_services_title")}</h2>
            <div className="grid md:grid-cols-3 gap-10">
              {[
                { title: t("home_service_1_title"), desc: t("home_service_1_desc") },
                { title: t("home_service_2_title"), desc: t("home_service_2_desc") },
                { title: t("home_service_3_title"), desc: t("home_service_3_desc") },
              ].map((item, i) => (
                <motion.div key={i} whileHover={{ y: -10 }} className="bg-gray-50 p-10 rounded-2xl shadow-lg border hover:border-[#ffc000] transition">
                  <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-28 bg-gray-900 text-white">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-4xl font-extrabold mb-20 text-center">{t("home_why_title")}</h2>
            <div className="grid md:grid-cols-4 gap-12 text-center">
              {[t("home_why_1"), t("home_why_2"), t("home_why_3"), t("home_why_4")].map((item, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}>
                  <div className="text-5xl text-[#ffc000] mb-5">✔</div>
                  <h3 className="font-bold text-lg">{item}</h3>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 bg-gray-100">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-4xl font-extrabold mb-14 text-center">{t("home_process_title")}</h2>
            <div className="grid md:grid-cols-5 gap-6 text-center">
              {[
                t("home_process_1"),
                t("home_process_2"),
                t("home_process_3"),
                t("home_process_4"),
                t("home_process_5"),
              ].map((step, i) => (
                <motion.div key={i} whileHover={{ scale: 1.08 }} className="bg-gray-900 text-white p-6 rounded-xl">
                  <div className="text-[#ffc000] font-extrabold text-2xl mb-2">{i + 1}</div>
                  <p>{step}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Home;