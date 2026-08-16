import { motion } from "framer-motion";
import {
  FaIndustry,
  FaFileContract,
  FaTools,
  FaHeadset,
  FaCheckCircle,
} from "react-icons/fa";
import { useTranslation } from "react-i18next";

export default function B2B() {
  const { t } = useTranslation();

  const whyItems = [
    { icon: <FaIndustry />, title: t("b2b_why_1_title"), desc: t("b2b_why_1_desc") },
    { icon: <FaTools />, title: t("b2b_why_2_title"), desc: t("b2b_why_2_desc") },
    { icon: <FaFileContract />, title: t("b2b_why_3_title"), desc: t("b2b_why_3_desc") },
    { icon: <FaHeadset />, title: t("b2b_why_4_title"), desc: t("b2b_why_4_desc") },
  ];

  const processSteps = [
    t("b2b_process_1"),
    t("b2b_process_2"),
    t("b2b_process_3"),
    t("b2b_process_4"),
    t("b2b_process_5"),
  ];

  const formFeatures = [
    t("b2b_form_feature_1"),
    t("b2b_form_feature_2"),
    t("b2b_form_feature_3"),
    t("b2b_form_feature_4"),
  ];

  return (
    <div className="bg-[#0b0e13] text-white min-h-screen">

      {/* ================= HERO ================= */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,192,0,0.25),transparent_60%)]" />

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="relative max-w-7xl mx-auto px-6 text-center"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
            {t("b2b_hero_title_1")}
            <span className="text-[#FFC000]"> {t("b2b_hero_title_2")} </span>
          </h1>

          <p className="text-gray-400 max-w-3xl mx-auto text-lg">
            {t("b2b_hero_desc")}
          </p>
        </motion.div>
      </section>

      {/* ================= WHY MINEPRO ================= */}
      <section className="py-24 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-8 text-center">

          {whyItems.map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              className="bg-[#121722] rounded-2xl p-8 border border-gray-800 shadow-xl"
            >
              <div className="text-4xl text-[#FFC000] mb-4 flex justify-center">
                {item.icon}
              </div>
              <h3 className="font-extrabold text-lg mb-2">{item.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= PROCESS ================= */}
      <section className="py-24 bg-[#0f131c]">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-extrabold mb-14 text-center">
            {t("b2b_process_title")}
          </h2>

          <div className="grid md:grid-cols-5 gap-6 text-center">
            {processSteps.map((step, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.06 }}
                className="bg-[#121722] rounded-xl p-6 border border-gray-800 shadow"
              >
                <div className="text-[#FFC000] text-2xl font-extrabold mb-2">
                  {i + 1}
                </div>
                <p className="font-medium">{step}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FORM ================= */}
      <section className="py-28">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">

          {/* TEXT */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-extrabold mb-6">
              {t("b2b_form_title")}
            </h2>

            <p className="text-gray-400 mb-6 leading-relaxed">
              {t("b2b_form_desc")}
            </p>

            <ul className="space-y-3 text-sm">
              {formFeatures.map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-gray-300">
                  <FaCheckCircle className="text-[#FFC000]" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* FORM */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-[#121722] rounded-2xl shadow-2xl p-10 border border-gray-800"
          >
            <form className="space-y-5">
              <input
                type="text"
                placeholder={t("b2b_form_company")}
                className="w-full bg-[#0b0e13] border border-gray-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#FFC000] outline-none"
              />

              <input
                type="text"
                placeholder={t("b2b_form_fullname")}
                className="w-full bg-[#0b0e13] border border-gray-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#FFC000] outline-none"
              />

              <input
                type="tel"
                placeholder={t("b2b_form_phone")}
                className="w-full bg-[#0b0e13] border border-gray-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#FFC000] outline-none"
              />

              <textarea
                rows="4"
                placeholder={t("b2b_form_description")}
                className="w-full bg-[#0b0e13] border border-gray-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#FFC000] outline-none"
              />

              <button
                type="submit"
                className="w-full bg-[#FFC000] hover:bg-yellow-400 text-black py-4 rounded-xl font-extrabold items-center justify-center transition"
              >
                {t("b2b_form_submit")}
              </button>
            </form>
          </motion.div>

        </div>
      </section>

    </div>
  );
}