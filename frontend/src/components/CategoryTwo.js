import { Link } from "react-router-dom";

const CategoryTwo = () => {
  const items = [
    { id: 1, title: "دریل حفاری کارکرده", image: "https://picsum.photos/600?1" },
    { id: 2, title: "چکش هیدرولیکی دست دوم", image: "https://picsum.photos/600?2" },
    { id: 3, title: "کمپرسور معدنی", image: "https://picsum.photos/600?3" },
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-6">

        {/* ===== Header ===== */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold mb-4">
            تجهیزات <span className="text-yellow-500">دست دوم</span>
          </h1>
          <p className="text-gray-600 text-lg">
            تجهیزات کارکرده تأیید شده – آماده فروش یا مزایده
          </p>
        </div>

        {/* ===== Items ===== */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {items.map(item => (
            <div key={item.id} className="bg-white rounded-2xl shadow hover:shadow-lg transition p-4">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-48 object-cover rounded-xl mb-4"
              />
              <h3 className="text-lg font-bold">{item.title}</h3>
            </div>
          ))}
        </div>

        {/* ===== CTA ===== */}
        <div className="text-center">
          <Link
            to="/sell-equipment"
            className="inline-block bg-gray-900 text-white px-10 py-4 rounded-xl font-bold hover:bg-black transition"
          >
            ثبت تجهیزات دست دوم
          </Link>
        </div>

      </div>
    </div>
  );
};

export default CategoryTwo;
