import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaPhoneAlt, FaWhatsapp, FaArrowRight } from "react-icons/fa";

const usedProducts = [
  {
    id: 1,
    title: "دریل واگن Atlas Copco",
    condition: "کارکرده – سالم",
    description:
      "دریل واگن معدنی مناسب پروژه‌های روباز و زیرزمینی، تست شده و آماده بهره‌برداری.",
    brand: "Atlas Copco",
    price: "تماس بگیرید",
    contact: "989121234567",
    img: "https://images.unsplash.com/photo-1597004891225-6e3c2c7a407e"
  },
  {
    id: 2,
    title: "کمپرسور معدنی 900 CFM",
    condition: "استوک پروژه",
    description:
      "کمپرسور صنعتی فشار بالا، مناسب حفاری و تجهیزات معدنی سنگین.",
    brand: "Kaeser",
    price: "تماس بگیرید",
    contact: "989121234567",
    img: "https://images.unsplash.com/photo-1581092580504-8987c1d9d4d6"
  },
  {
    id: 3,
    title: "لودر معدنی XCMG",
    condition: "بازسازی شده",
    description:
      "لودر معدنی بازسازی‌شده با توان بالا، مناسب معادن روباز.",
    brand: "XCMG",
    price: "تماس بگیرید",
    contact: "989121234567",
    img: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09"
  }
];

export default function UsedProductDetails() {
  const { id } = useParams();
  const product = usedProducts.find(p => p.id === Number(id));

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <h2 className="text-3xl font-bold text-red-500">
          محصول مورد نظر پیدا نشد
        </h2>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white py-24">
      <div className="max-w-6xl mx-auto px-6">

        {/* Back */}
        <Link
          to="/"
          className="inline-flex items-center gap-3 text-gray-400 hover:text-[#ffc000] mb-10 transition"
        >
          <FaArrowRight />
          بازگشت به صفحه اصلی
        </Link>

        <div className="grid md:grid-cols-2 gap-16 items-center">

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-800"
          >
            <img
              src={product.img}
              alt={product.title}
              className="w-full h-[420px] object-cover"
            />
            <span className="absolute top-6 right-6 bg-[#ffc000] text-black px-5 py-2 rounded-full text-sm font-extrabold">
              {product.condition}
            </span>
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-gray-900/80 backdrop-blur-xl p-10 rounded-3xl border border-gray-800 shadow-xl"
          >
            <h1 className="text-4xl font-extrabold mb-6">
              {product.title}
            </h1>

            <p className="text-gray-300 leading-relaxed mb-6">
              {product.description}
            </p>

            <div className="space-y-3 mb-8 text-sm text-gray-400">
              <p>برند: <span className="text-white">{product.brand}</span></p>
              <p>وضعیت: <span className="text-white">{product.condition}</span></p>
            </div>

            <p className="text-2xl font-extrabold text-[#ffc000] mb-10">
              {product.price}
            </p>

            {/* Actions */}
            <div className="grid sm:grid-cols-2 gap-4">
              <a
                href={`tel:${product.contact}`}
                className="flex items-center justify-center gap-3 bg-[#ffc000] hover:bg-[#e6b000] text-black py-4 rounded-xl font-extrabold transition"
              >
                <FaPhoneAlt />
                تماس مستقیم
              </a>

              <a
                href={`https://wa.me/${product.contact}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 bg-green-500 hover:bg-green-600 text-white py-4 rounded-xl font-extrabold transition"
              >
                <FaWhatsapp />
                واتساپ
              </a>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
