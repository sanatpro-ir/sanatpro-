import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const categories = [
  {
    id: "process",
    title: "تجهیزات فرآوری",
    desc: "سرند، نوار نقاله، فیدر، کراشر و تجهیزات خطوط فرآوری",
    img: "https://images.unsplash.com/photo-1581092580504-8987c1d9d4d6",
  },
  {
    id: "spare",
    title: "قطعات یدکی صنعتی",
    desc: "قطعات مصرفی و یدکی خطوط تولید و خردایش",
    img: "https://images.unsplash.com/photo-1580274455191-1c62238d89e7",
  },
  {
    id: "heavy",
    title: "ماشین‌آلات سنگین",
    desc: "لودر، بیل مکانیکی، دامپتراک و ماشین‌آلات معدنی",
    img: "https://images.unsplash.com/photo-1597004891225-6e3c2c7a407e",
  },
  {
    id: "safety",
    title: "ایمنی و حفاظت",
    desc: "کلاه ایمنی، کفش ایمنی، PPE و تجهیزات حفاظت فردی",
    img: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b",
  },
];

function Categories() {
  return (
    <div className="min-h-screen bg-gray-50 py-24">
      <div className="max-w-7xl mx-auto px-6">

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            دسته‌بندی
            <span className="text-[#FFC000]"> محصولات</span>
          </h1>
          <p className="text-gray-600 text-lg">
            انتخاب دسته‌بندی تجهیزات صنعتی و معدنی
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-2xl shadow-xl overflow-hidden border group"
            >
              <img
                src={cat.img}
                alt={cat.title}
                className="h-56 w-full object-cover group-hover:scale-110 transition duration-700"
              />

              <div className="p-6">
                <h3 className="text-xl font-extrabold mb-3">
                  {cat.title}
                </h3>

                <p className="text-gray-600 mb-6">
                  {cat.desc}
                </p>

                <Link
                  to={`/shop?category=${cat.id}`}
                  className="inline-block bg-[#FFC000] hover:bg-yellow-400 text-black px-6 py-3 rounded-xl font-bold transition"
                >
                  مشاهده محصولات
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default Categories;
