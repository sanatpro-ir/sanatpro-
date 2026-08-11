import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FaCogs,
  FaIndustry,
  FaHammer,
  FaTruckLoading
} from "react-icons/fa";

function ProductTypeSection() {
  const products = [
    {
      title: "سرند ارتعاشی",
      desc: "تفکیک مواد معدنی در ظرفیت‌های مختلف خطوط فرآوری",
      specs: ["ظرفیت بالا", "مقاوم در برابر سایش", "مناسب خطوط فولاد"],
      icon: <FaIndustry />,
    },
    {
      title: "نوار نقاله صنعتی",
      desc: "انتقال ایمن و پیوسته مواد در محیط‌های سنگین",
      specs: ["طول سفارشی", "موتور تقویت‌شده", "کاربری معدنی"],
      icon: <FaTruckLoading />,
    },
    {
      title: "فیدر صنعتی",
      desc: "کنترل خوراک‌دهی یکنواخت به خطوط خردایش",
      specs: ["دقت بالا", "بدنه تقویت‌شده", "قابل سفارشی‌سازی"],
      icon: <FaCogs />,
    },
    {
      title: "سنگ‌شکن فکی",
      desc: "خردایش اولیه سنگ‌های سخت و نیمه‌سخت",
      specs: ["قدرت بالا", "طول عمر زیاد", "مناسب پروژه‌های بزرگ"],
      icon: <FaHammer />,
    },
  ];

  return (
    <section className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
            تجهیزات
            <span className="text-[#FFC000]"> صنعتی</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            محصولات MinePro به‌صورت پروژه‌ای و بر اساس نیاز خطوط فولاد و معدن
            تأمین می‌شوند. برای هر تجهیز، مشخصات فنی شما بررسی خواهد شد.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">

          {products.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-gray-50 rounded-2xl shadow-xl p-8 border border-gray-200 flex flex-col"
            >
              {/* Icon */}
              <div className="text-5xl text-[#FFC000] mb-6">
                {item.icon}
              </div>

              {/* Title */}
              <h3 className="text-2xl font-extrabold mb-4">
                {item.title}
              </h3>

              {/* Desc */}
              <p className="text-gray-600 mb-6">
                {item.desc}
              </p>

              {/* Specs */}
              <ul className="text-gray-700 mb-8 space-y-2">
                {item.specs.map((spec, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-[#FFC000] rounded-full"></span>
                    {spec}
                  </li>
                ))}
              </ul>

              {/* CTA */}
          <Link
  to={`/b2b?product=${item.title}`}
  className="bg-yellow-500 text-black px-6 py-3 rounded-xl font-bold"
>
  درخواست استعلام
</Link>


            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProductTypeSection;
