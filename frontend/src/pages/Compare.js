import { useSearchParams, Link } from "react-router-dom";
import { motion } from "framer-motion";

const MOCK_PRODUCTS = [
  {
    title: "نوار نقاله صنعتی",
    power: "7.5 – 15 kW",
    capacity: "تا 500 تن/ساعت",
    usage: "خطوط انتقال مواد معدنی",
  },
  {
    title: "سرند ویبره",
    power: "11 – 22 kW",
    capacity: "تفکیک چندمرحله‌ای",
    usage: "فرآوری مواد معدنی",
  },
];

export default function Compare() {
  const [params] = useSearchParams();
  const selected = params.getAll("product");

  const products = MOCK_PRODUCTS.filter((p) =>
    selected.includes(p.title)
  );

  return (
    <div className="min-h-screen bg-black text-white py-24 px-6">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-4xl font-extrabold mb-16 text-center">
          مقایسه <span className="text-[#ffc000]">محصولات صنعتی</span>
        </h1>

        {products.length === 0 ? (
          <p className="text-gray-500 text-center">
            محصولی برای مقایسه انتخاب نشده
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-800 rounded-xl overflow-hidden">
              <thead className="bg-gray-900">
                <tr>
                  <th className="p-5 text-right">مشخصات</th>
                  {products.map((p, i) => (
                    <th key={i} className="p-5 text-center text-[#ffc000]">
                      {p.title}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {[
                  { label: "توان مصرفی", key: "power" },
                  { label: "ظرفیت", key: "capacity" },
                  { label: "کاربرد", key: "usage" },
                ].map((row, i) => (
                  <tr key={i} className="border-t border-gray-800">
                    <td className="p-5 font-bold">{row.label}</td>
                    {products.map((p, j) => (
                      <td key={j} className="p-5 text-center text-gray-300">
                        {p[row.key]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>

            {/* CTA */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="mt-14 text-center"
            >
              <Link
                to="/b2b"
                className="inline-block bg-[#ffc000] text-black px-14 py-5 rounded-2xl font-extrabold text-lg"
              >
                درخواست استعلام B2B
              </Link>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
