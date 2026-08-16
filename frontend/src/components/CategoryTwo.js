import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const usedProducts = [
  {
    id: 1,
    title: "دریل واگن Atlas Copco",
    condition: "کارکرده – سالم",
    img: "https://images.unsplash.com/photo-1597004891225-6e3c2c7a407e"
  },
  {
    id: 2,
    title: "کمپرسور معدنی 900 CFM",
    condition: "استوک پروژه",
    img: "https://images.unsplash.com/photo-1581092580504-8987c1d9d4d6"
  },
  {
    id: 3,
    title: "لودر معدنی XCMG",
    condition: "بازسازی شده",
    img: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09"
  }
];

export default function CategoryTwo() {
  const { t } = useTranslation();

  return (
    <section className="bg-gradient-to-br from-black via-gray-900 to-black text-white py-28">
      <div className="max-w-7xl mx-auto px-6">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
            {t("catwo_title_1")} <span className="text-[#ffc000]">{t("catwo_title_2")}</span>
          </h2>
          <p className="text-gray-400 max-w-3xl mx-auto text-lg leading-relaxed">
            {t("catwo_desc")}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-12">
          {usedProducts.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              whileHover={{ y: -12, scale: 1.02 }}
              className="relative bg-gray-900/80 backdrop-blur-xl rounded-3xl overflow-hidden border border-gray-800 shadow-2xl group"
            >
              <div className="relative h-60 overflow-hidden">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent" />

                <span className="absolute top-4 right-4 bg-[#ffc000] text-black text-xs font-extrabold px-4 py-2 rounded-full">
                  {item.condition}
                </span>
              </div>

              <div className="p-8 space-y-4">
                <h3 className="text-xl font-extrabold leading-snug">
                  {item.title}
                </h3>

                <p className="text-[#ffc000] text-lg font-bold">
                  {t("catwo_price_contact")}
                </p>

                <Link
                  to={`/product/used/${item.id}`}
                  className="inline-flex items-center justify-center gap-3 w-full bg-[#ffc000] hover:bg-[#e6b000] text-black py-4 rounded-xl font-extrabold transition"
                >
                  {t("catwo_view_details")}
                  <FaArrowLeft />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-32 text-center"
        >
          <h3 className="text-3xl md:text-4xl font-extrabold mb-6">
            {t("catwo_cta_title")}
          </h3>
          <p className="text-gray-400 mb-12 max-w-2xl mx-auto">
            {t("catwo_cta_desc")}
          </p>

          <div className="flex justify-center">
            <Link
              to="/sell-used"
              className="inline-block bg-black border border-[#ffc000] text-[#ffc000] px-12 py-5 rounded-2xl font-extrabold hover:bg-[#ffc000] hover:text-black transition text-center"
            >
              {t("catwo_cta_button")}
            </Link>
          </div>

        </motion.div>
      </div>
    </section>
  );
}