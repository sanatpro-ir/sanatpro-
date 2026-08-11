import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className="w-full overflow-hidden bg-gray-900 text-white">

      {/* ================= HERO ================= */}
      <section
        className="relative h-[70vh] flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url('/videos/hero.gif')` }}
      >
        <div className="absolute inset-0 bg-black/70" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-6 max-w-4xl"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
            تأمین تخصصی تجهیزات صنایع فولاد و معدن
          </h1>
          <p className="text-lg mb-8">
            SANAT-Pro پلتفرم تخصصی استعلام، تأمین و همکاری پروژه‌ای B2B است که با تمرکز
            بر صنایع فولاد، معدن و صنایع سنگین فعالیت می‌کند.
          </p>

          <motion.img
            src="/videos/hero.gif"
            alt="Hero GIF"
            className="mt-8 w-64 mx-auto rounded-2xl shadow-xl"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          />
        </motion.div>
      </section>

      {/* ================= WHO WE ARE ================= */}
      <section className="py-28 bg-gray-800">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col justify-center text-center md:text-left"
          >
            <h2 className="text-3xl font-extrabold mb-6">
              SANATpro در یک نگاه
            </h2>
            <p className="leading-8">
              MinePro با تمرکز بر صنایع فولاد، معدن و صنایع سنگین، به‌عنوان یک
              پلتفرم تخصصی در حوزه تأمین تجهیزات صنعتی و استعلام پروژه‌ای فعالیت
              می‌کند. هدف ما ایجاد ارتباط مؤثر میان تولیدکنندگان، تأمین‌کنندگان
              و کارفرمایان صنعتی است.
            </p>
          </motion.div>

          <motion.img
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            src="/videos/hero.gif"
            alt="Industrial"
            className="rounded-2xl shadow-xl"
          />
        </div>
      </section>

      {/* ================= SERVICES ================= */}
      <section className="py-28 bg-gray-700">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-extrabold mb-16">خدمات ما</h2>

          <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-10">
            {[
              "تجهیزات فرآوری مواد معدنی",
              "قطعات یدکی صنعتی",
              "ماشین‌آلات و تجهیزات سنگین",
              "تأمین پروژه‌ای B2B"
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -8 }}
                className="bg-gray-800 rounded-2xl p-8 shadow-md flex items-center justify-center text-center font-bold text-white"
              >
                {item}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= WHY US ================= */}
      <section className="py-28 bg-gray-800">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-extrabold mb-16">چرا SANAT-Pro؟</h2>

          <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-10">
            {[
              "تمرکز اختصاصی بر صنایع فولاد و معدن",
              "فرآیند شفاف استعلام صنعتی",
              "همکاری رسمی با تأمین‌کنندگان",
              "تعهد به مشخصات فنی و زمان‌بندی"
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="border rounded-2xl p-8 flex items-center justify-center text-center text-white"
              >
                {item}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= INDUSTRIES ================= */}
      <section className="py-28 bg-gray-800">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-extrabold mb-10">صنایع هدف</h2>

          <div className="flex flex-wrap justify-center gap-6">
            {[
              "صنایع فولاد",
              "معادن فلزی و غیرفلزی",
              "پروژه‌های EPC",
              "سیمان و مصالح",
              "صنایع سنگین"
            ].map((item, i) => (
              <span
                key={i}
                className="px-6 py-3 bg-white/10 rounded-xl text-white"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="bg-gray-800 text-white flex flex-col items-center justify-center pt-32 pb-32 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-12">
          آماده همکاری صنعتی هستید؟
        </h2>

        <div className="flex justify-center items-center gap-6 flex-wrap">
          <Link to="/inquiry"
           
            className="bg-yellow-500 text-black px-10 py-4 rounded-xl font-bold hover:bg-yellow-600 transition"
          >
            ثبت درخواست استعلام
          </Link>

          <Link to="/b2b"
            className="border-2 border-white text-white px-10 py-4 rounded-xl font-bold hover:bg-white hover:text-black transition"
          >
            همکاری B2B
          </Link>
        </div>
      </section>

    </div>
  );
}
