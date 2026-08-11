// import { motion } from "framer-motion";
// import { Link } from "react-router-dom";

// const usedProducts = [
//   {
//     id: 1,
//     title: "دریل واگن Atlas Copco",
//     condition: "کارکرده – سالم",
//     price: "تماس بگیرید",
//     img: "https://images.unsplash.com/photo-1597004891225-6e3c2c7a407e"
//   },
//   {
//     id: 2,
//     title: "کمپرسور معدنی 900 CFM",
//     condition: "استوک پروژه",
//     price: "تماس بگیرید",
//     img: "https://images.unsplash.com/photo-1581092580504-8987c1d9d4d6"
//   },
//   {
//     id: 3,
//     title: "لودر معدنی XCMG",
//     condition: "بازسازی شده",
//     price: "تماس بگیرید",
//     img: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09"
//   }
// ];

// export default function CategoryTwo() {
//   return (
//     <div className="bg-gray-50 min-h-screen py-24">
//       <div className="max-w-7xl mx-auto px-6">

//         {/* Header */}
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="text-center mb-20"
//         >
//           <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
//             تجهیزات <span className="text-yellow-500">دست دوم معدنی</span>
//           </h1>
//           <p className="text-gray-600 max-w-3xl mx-auto text-lg">
//             تجهیزات کارکرده، استوک و بازسازی‌شده معادن با تأیید فنی و امکان عقد قرارداد رسمی
//           </p>
//         </motion.div>

//         {/* Products */}
//         <div className="grid md:grid-cols-3 gap-10">
//           {usedProducts.map((item, i) => (
//             <motion.div
//               key={item.id}
//               initial={{ opacity: 0, y: 40 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ delay: i * 0.15 }}
//               whileHover={{ y: -10 }}
//               className="bg-white rounded-2xl shadow-xl overflow-hidden border"
//             >
//               <img
//                 src={item.img}
//                 alt={item.title}
//                 className="h-56 w-full object-cover"
//               />

//               <div className="p-6">
//                 <h3 className="text-xl font-bold mb-2">{item.title}</h3>
//                 <p className="text-sm text-gray-500 mb-3">
//                   وضعیت: {item.condition}
//                 </p>

//                 <p className="text-yellow-600 font-extrabold mb-5">
//                   {item.price}
//                 </p>

//                 {/* لینک درخواست اطلاعات */}
//                 <Link
//                   to="/contact"
//                   className="block text-center bg-yellow-500 hover:bg-yellow-600 text-black py-3 rounded-xl font-bold transition"
//                 >
//                   درخواست اطلاعات
//                 </Link>
//               </div>
//             </motion.div>
//           ))}
//         </div>

//         {/* CTA */}
//         <div className="mt-24 text-center">
//           <h2 className="text-3xl font-extrabold mb-6">
//             تجهیزات دست دوم برای فروش دارید؟
//           </h2>
//           <p className="text-gray-600 mb-10">
//             MinePro امکان معرفی، فروش و عقد قرارداد رسمی تجهیزات کارکرده را فراهم می‌کند
//           </p>

//           {/* لینک ثبت تجهیزات دست دوم */}
//           <Link
//             to="/sell-used"
//             className="bg-gray-900 text-white px-10 py-4 rounded-xl font-bold hover:bg-black transition"
//           >
//             ثبت تجهیزات دست دوم
//           </Link>
//         </div>

//       </div>
//     </div>
//   );
// }

















import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const usedProducts = [
  {
    id: 1,
    title: "دریل واگن Atlas Copco",
    condition: "کارکرده – سالم",
    price: "تماس بگیرید",
    img: "https://images.unsplash.com/photo-1597004891225-6e3c2c7a407e"
  },
  {
    id: 2,
    title: "کمپرسور معدنی 900 CFM",
    condition: "استوک پروژه",
    price: "تماس بگیرید",
    img: "https://images.unsplash.com/photo-1581092580504-8987c1d9d4d6"
  },
  {
    id: 3,
    title: "لودر معدنی XCMG",
    condition: "بازسازی شده",
    price: "تماس بگیرید",
    img: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09"
  }
];

export default function CategoryTwo() {
  return (
    <section className="bg-gradient-to-br from-black via-gray-900 to-black text-white py-28">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
            تجهیزات <span className="text-[#ffc000]">دست دوم معدنی</span>
          </h2>
          <p className="text-gray-400 max-w-3xl mx-auto text-lg leading-relaxed">
            تجهیزات کارکرده، استوک و بازسازی‌شده با بررسی فنی، آماده فروش یا قرارداد رسمی
          </p>
        </motion.div>

        {/* Products */}
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
              {/* Image */}
              <div className="relative h-60 overflow-hidden">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent" />

                {/* Condition Badge */}
                <span className="absolute top-4 right-4 bg-[#ffc000] text-black text-xs font-extrabold px-4 py-2 rounded-full">
                  {item.condition}
                </span>
              </div>

              {/* Content */}
              <div className="p-8 space-y-4">
                <h3 className="text-xl font-extrabold leading-snug">
                  {item.title}
                </h3>

                <p className="text-[#ffc000] text-lg font-bold">
                  {item.price}
                </p>

                {/* CTA */}
                <Link
                  to={`/product/used/${item.id}`}
                  className="inline-flex items-center justify-center gap-3 w-full bg-[#ffc000] hover:bg-[#e6b000] text-black py-4 rounded-xl font-extrabold transition"
                >
                  مشاهده جزئیات
                  <FaArrowLeft />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Bottom */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-32 text-center"
        >
          <h3 className="text-3xl md:text-4xl font-extrabold mb-6">
            تجهیزات دست دوم برای فروش دارید؟
          </h3>
          <p className="text-gray-400 mb-12 max-w-2xl mx-auto">
            MinePro امکان معرفی، فروش امن و عقد قرارداد رسمی تجهیزات کارکرده معدنی را فراهم می‌کند
          </p>

       <div className="flex justify-center">
  <Link
    to="/sell-used"
    className="inline-block bg-black border border-[#ffc000] text-[#ffc000] px-12 py-5 rounded-2xl font-extrabold hover:bg-[#ffc000] hover:text-black transition text-center"
  >
    ثبت تجهیزات دست دوم
  </Link>
</div>

        </motion.div>
      </div>
    </section>
  );
}
